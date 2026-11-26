import { useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft, ArrowUpRight, BookOpen, CheckCircle2, Eye, EyeOff,
  Leaf, LoaderCircle, LockKeyhole, Mail, ShieldCheck, Sparkles, TrendingUp,
} from 'lucide-react';
import { go } from '../lib/router';
import { getRedirectPath, authErrorMessage, getAuthCallbackUrl } from '../lib/auth-routing';
import { supabase } from '../lib/supabase';
import { useAuth } from '../lib/AuthProvider';

function hashSearch() {
  const hash = window.location.hash || '';
  const index = hash.indexOf('?');
  return index >= 0 ? hash.slice(index + 1) : '';
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function AuthForm({ mode, redirect }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [visible, setVisible] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const isSignup = mode === 'signup';

  const submit = async (event) => {
    event.preventDefault();
    setError('');
    setNotice('');
    const cleanEmail = email.trim();
    const nextEmailError = !cleanEmail
      ? 'Enter your email address.'
      : !EMAIL_PATTERN.test(cleanEmail)
        ? 'Enter a valid email address.'
        : '';
    const nextPasswordError = !password
      ? 'Enter your password.'
      : isSignup && password.length < 8
        ? 'Use at least 8 characters for your password.'
        : '';
    setEmailError(nextEmailError);
    setPasswordError(nextPasswordError);
    if (nextEmailError || nextPasswordError) return;
    if (!supabase) {
      setError('Secure sign-in is not configured for this deployment yet. Please contact the CNR-IA-2 administrator.');
      return;
    }

    setBusy(true);
    try {
      if (isSignup) {
        const { data, error: authError } = await supabase.auth.signUp({
          email: cleanEmail,
          password,
          options: {
            data: name.trim() ? { full_name: name.trim() } : {},
            emailRedirectTo: getAuthCallbackUrl('/auth/callback'),
          },
        });
        if (authError) throw authError;
        if (data.session) go(redirect);
        else setNotice('Your account has been created. Check your inbox to verify your email, then sign in.');
      } else {
        const { error: authError } = await supabase.auth.signInWithPassword({
          email: cleanEmail,
          password,
        });
        if (authError) throw authError;
        go(redirect);
      }
    } catch (authError) {
      setError(authErrorMessage(authError));
    } finally {
      setBusy(false);
    }
  };

  return (
    <form className="auth-form" onSubmit={submit} noValidate>
      {isSignup && (
        <label className="auth-field" htmlFor="auth-name">
          <span>Your name <small>Optional</small></span>
          <input id="auth-name" name="name" type="text" autoComplete="name" value={name}
            onChange={(event) => setName(event.target.value)} placeholder="How should we address you?" />
        </label>
      )}
      <label className="auth-field" htmlFor="auth-email">
        <span>Email address</span>
        <span className="auth-input-wrap">
          <Mail size={18} aria-hidden="true" />
          <input id="auth-email" name="email" type="email" inputMode="email" required autoComplete="email"
            value={email} aria-invalid={Boolean(emailError)} aria-describedby={emailError ? 'auth-email-error' : undefined}
            onChange={(event) => { setEmail(event.target.value); setEmailError(''); }}
            placeholder="you@example.com" />
        </span>
        {emailError && <span className="auth-field-error" id="auth-email-error">{emailError}</span>}
      </label>
      <label className="auth-field" htmlFor="auth-password">
        <span>Password</span>
        <span className="auth-input-wrap auth-password-wrap">
          <LockKeyhole size={18} aria-hidden="true" />
          <input id="auth-password" name="password" type={visible ? 'text' : 'password'} required
            autoComplete={isSignup ? 'new-password' : 'current-password'} value={password}
            aria-invalid={Boolean(passwordError)} aria-describedby={passwordError ? 'auth-password-error' : undefined}
            onChange={(event) => { setPassword(event.target.value); setPasswordError(''); }}
            placeholder={isSignup ? 'At least 8 characters' : 'Enter your password'} />
          <button type="button" className="auth-password-toggle" onClick={() => setVisible((value) => !value)}
            aria-label={visible ? 'Hide password' : 'Show password'} aria-pressed={visible}>
            {visible ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </span>
        {passwordError && <span className="auth-field-error" id="auth-password-error">{passwordError}</span>}
      </label>

      {!isSignup && (
        <div className="auth-form-meta">
          <span className="auth-secure-note"><ShieldCheck size={14} /> Secure account access</span>
          <button type="button" className="auth-text-link" onClick={() => go('/reset-password')}>Forgot password?</button>
        </div>
      )}
      {error && <p className="auth-message is-error" role="alert">{error}</p>}
      {notice && <p className="auth-message is-success" role="status">{notice}</p>}
      <button className="auth-submit" type="submit" disabled={busy}>
        {busy ? <LoaderCircle size={18} className="auth-spin" /> : <span>{isSignup ? 'Create account' : 'Sign in to your workspace'}</span>}
        {!busy && <ArrowUpRight size={18} aria-hidden="true" />}
        {busy && <span>{isSignup ? 'Creating account…' : 'Signing you in…'}</span>}
      </button>
      <div className="auth-divider"><span>OR</span></div>
      <p className="auth-switch">
        {isSignup ? 'Already have an account?' : 'New to the learning workspace?'}
        <button type="button" onClick={() => go(isSignup ? '/auth' : '/signup')}>
          {isSignup ? 'Sign in' : 'Create an account'}
        </button>
      </p>
    </form>
  );
}

function ResetPassword() {
  const { user, loading, configured, missing } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState('');
  const [error, setError] = useState('');

  const submit = async (event) => {
    event.preventDefault();
    setBusy(true);
    setError('');
    setNotice('');
    try {
      if (!supabase) throw new Error('Supabase is not configured. Add the required environment variables and rebuild the app.');
      if (user) {
        if (password.length < 8) throw new Error('Use a password with at least 8 characters.');
        const { error: updateError } = await supabase.auth.updateUser({ password });
        if (updateError) throw updateError;
        setNotice('Your password has been updated. You can return to your study workspace.');
        setPassword('');
      } else {
        if (!EMAIL_PATTERN.test(email.trim())) throw new Error('Enter a valid email address.');
        const { error: resetError } = await supabase.auth.resetPasswordForEmail(email.trim(), {
          redirectTo: getAuthCallbackUrl('/reset-password'),
        });
        if (resetError) throw resetError;
        setNotice('If an account exists for that address, a password reset link will arrive in your inbox.');
      }
    } catch (resetError) {
      setError(authErrorMessage(resetError));
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="auth-card" aria-labelledby="auth-panel-title">
      <div className="auth-card-kicker"><span className="auth-card-icon"><Mail size={18} /></span><span>ACCOUNT RECOVERY</span></div>
      <h1 id="auth-panel-title">{user ? 'Create a new password' : 'Reset your password'}</h1>
      <p className="auth-card-description">{user ? 'Choose a strong password for your account.' : 'We’ll send a secure recovery link to your email address.'}</p>
      {!configured && <ConfigurationNotice missing={missing} />}
      <form className="auth-form auth-recovery-form" onSubmit={submit}>
        {!user && <label className="auth-field" htmlFor="reset-email"><span>Email address</span><span className="auth-input-wrap"><Mail size={18} /><input id="reset-email" type="email" required autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" /></span></label>}
        {user && <label className="auth-field" htmlFor="reset-new-password"><span>New password</span><span className="auth-input-wrap auth-password-wrap"><LockKeyhole size={18} /><input id="reset-new-password" type={visible ? 'text' : 'password'} minLength={8} required autoComplete="new-password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="At least 8 characters" /><button type="button" className="auth-password-toggle" onClick={() => setVisible((value) => !value)} aria-label={visible ? 'Hide password' : 'Show password'}>{visible ? <EyeOff size={18} /> : <Eye size={18} />}</button></span></label>}
        {error && <p className="auth-message is-error" role="alert">{error}</p>}
        {notice && <p className="auth-message is-success" role="status">{notice}</p>}
        <button className="auth-submit" type="submit" disabled={busy || loading}>{busy ? <LoaderCircle size={18} className="auth-spin" /> : <span>{user ? 'Update password' : 'Send recovery link'}</span>}</button>
      </form>
      <button type="button" className="auth-back-link" onClick={() => go('/auth')}><ArrowLeft size={16} /> Back to sign in</button>
    </section>
  );
}

function ConfigurationNotice({ missing = [] }) {
  return <div className="auth-message is-error auth-config-notice" role="alert">
    <strong>Authentication setup required.</strong>
    <span>Supabase is not configured for this build{missing.length ? ' (missing: ' + missing.join(', ') + ').' : '.'} Sign-in is unavailable until configuration is complete.</span>
  </div>;
}

function BrandPanel({ compact = false }) {
  const benefits = [
    { icon: BookOpen, title: 'Smart Learning Workspace', detail: 'Focused tools for every study session.' },
    { icon: Sparkles, title: 'Interactive Study Resources', detail: 'Explore concepts with clarity and context.' },
    { icon: TrendingUp, title: 'Personalized Learning Progress', detail: 'Keep your revision journey moving.' },
  ];

  return (
    <section className={'auth-visual' + (compact ? ' is-compact' : '')} aria-label="CNR-IA-2 learning platform">
      <div className="auth-ambient auth-ambient-one" aria-hidden="true" />
      <div className="auth-ambient auth-ambient-two" aria-hidden="true" />
      <div className="auth-orbit-scene" aria-hidden="true">
        <div className="auth-orbit auth-orbit-a" />
        <div className="auth-orbit auth-orbit-b" />
        <div className="auth-earth">
          <span className="auth-earth-land auth-earth-land-one" />
          <span className="auth-earth-land auth-earth-land-two" />
          <span className="auth-earth-glow" />
        </div>
        <span className="auth-orbit-satellite"><Leaf size={15} /></span>
        <span className="auth-orbit-star auth-star-one" />
        <span className="auth-orbit-star auth-star-two" />
        <span className="auth-orbit-star auth-star-three" />
      </div>

      <div className="auth-visual-inner">
        <a className="auth-brand" href="#/" aria-label="CNR-IA-2 home">
          <span className="auth-brand-mark"><Leaf size={24} /></span>
          <span className="auth-brand-copy"><strong>CNR-IA-2</strong><small>LEARN · CONSERVE · GROW</small></span>
        </a>

        <div className="auth-visual-copy">
          <span className="auth-eyebrow"><span /> YOUR ENVIRONMENTAL LEARNING SPACE</span>
          <h2>Welcome Back to Your <em>Learning Space</em></h2>
          <p>Reconnect with Conservation of Natural Resources and continue your VTU exam preparation with a calmer, smarter study experience.</p>
          <div className="auth-course-chip"><span className="auth-course-dot" /> BCV755B <span className="auth-chip-divider" /> VTU EXAM PREPARATION</div>
        </div>

        <div className="auth-benefits">
          {benefits.map(({ icon: Icon, title, detail }) => (
            <div className="auth-benefit" key={title}>
              <span className="auth-benefit-icon"><Icon size={18} /></span>
              <span><strong>{title}</strong><small>{detail}</small></span>
              <CheckCircle2 className="auth-benefit-check" size={16} />
            </div>
          ))}
        </div>

        <div className="auth-visual-footer">
          <span><ShieldCheck size={15} /> A focused space for meaningful progress</span>
          <span>01 / 03</span>
        </div>
      </div>
    </section>
  );
}

function AuthPanel({ path, redirect }) {
  const { user, loading, configured, missing } = useAuth();
  const mode = path === '/signup' ? 'signup' : 'login';

  if (path === '/reset-password') return <ResetPassword />;

  if (path === '/auth/callback') {
    return (
      <section className="auth-card auth-callback-card" aria-labelledby="auth-panel-title">
        <div className="auth-card-kicker"><span className="auth-card-icon"><ShieldCheck size={18} /></span><span>SECURE ACCOUNT VERIFICATION</span></div>
        <h1 id="auth-panel-title">Finishing your sign in</h1>
        <p className="auth-card-description">{loading ? 'Confirming your secure session…' : user ? 'Your email is verified and your account is ready.' : 'This verification link may have expired or already been used. Return to sign in or request a new link.'}</p>
        {!configured && <ConfigurationNotice missing={missing} />}
        {loading ? <p className="auth-loading"><LoaderCircle size={18} className="auth-spin" /> Restoring your session…</p> : <button className="auth-submit" type="button" onClick={() => go(user ? redirect : '/auth')}>{user ? 'Continue to workspace' : 'Return to sign in'} <ArrowUpRight size={18} /></button>}
      </section>
    );
  }

  return (
    <section className="auth-card" aria-labelledby="auth-panel-title">
      <div className="auth-card-topline"><span>WELCOME BACK</span><span className="auth-live-indicator"><i /> SECURE ACCESS</span></div>
      <div className="auth-card-kicker"><span className="auth-card-icon"><ShieldCheck size={18} /></span><span>{mode === 'signup' ? 'CREATE YOUR ACCOUNT' : 'YOUR LEARNING JOURNEY AWAITS'}</span></div>
      <h1 id="auth-panel-title">{mode === 'signup' ? 'Create your learning account' : 'Welcome back'}</h1>
      <p className="auth-card-description">{mode === 'signup' ? 'Set up your account and make this learning space yours.' : 'Sign in to pick up right where your learning journey paused.'}</p>
      {!configured && <ConfigurationNotice missing={missing} />}
      {user ? (
        <div className="auth-message is-success" role="status">
          You are signed in as {user.email}.
          <button className="auth-inline-link" type="button" onClick={() => go(redirect)}>Continue to workspace</button>
        </div>
      ) : loading ? (
        <p className="auth-loading"><LoaderCircle size={18} className="auth-spin" /> Restoring your secure session…</p>
      ) : configured ? (
        <AuthForm key={mode} mode={mode} redirect={redirect} />
      ) : (
        <div className="auth-unavailable"><LockKeyhole size={18} /><span>Sign-in is temporarily unavailable while the secure connection is configured.</span></div>
      )}
      <p className="auth-privacy-note"><ShieldCheck size={14} /> Your study materials remain public. Your locally saved progress stays on this device.</p>
    </section>
  );
}

export default function AuthPage({ path }) {
  const { user, loading } = useAuth();
  const redirect = useMemo(() => getRedirectPath(hashSearch()), []);

  useEffect(() => {
    if (!loading && user && (path === '/auth' || path === '/signup')) go(redirect);
  }, [loading, user, path, redirect]);

  const isSecondaryFlow = path === '/reset-password' || path === '/auth/callback';
  return (
    <main className="auth-page">
      <BrandPanel compact={isSecondaryFlow} />
      <section className="auth-content">
        <div className="auth-content-top">
          <a href="#/" className="auth-home-link"><ArrowLeft size={16} /> Back to home</a>
          <span className="auth-content-label"><span /> CNR LEARNING PORTAL</span>
        </div>
        <div className="auth-panel-wrap">
          <AuthPanel path={path} redirect={redirect} />
          <p className="auth-legal">By continuing, you agree to use this learning platform responsibly.</p>
        </div>
        <footer className="auth-content-footer"><span>© CNR-IA-2 · BCV755B</span><span>BUILT FOR BETTER LEARNING</span></footer>
      </section>
    </main>
  );
}

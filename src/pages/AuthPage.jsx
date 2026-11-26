import { useMemo, useState } from 'react';
import { ArrowLeft, Eye, EyeOff, Leaf, LoaderCircle, Mail, ShieldCheck } from 'lucide-react';
import { go } from '../lib/router';
import { getRedirectPath, authErrorMessage, getAuthCallbackUrl } from '../lib/auth-routing';
import { supabase } from '../lib/supabase';
import { useAuth } from '../lib/AuthProvider';

function hashSearch() {
  const hash = window.location.hash || '';
  const index = hash.indexOf('?');
  return index >= 0 ? hash.slice(index + 1) : '';
}

function AuthForm({ mode, redirect }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [visible, setVisible] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const isSignup = mode === 'signup';

  const submit = async (event) => {
    event.preventDefault();
    setError('');
    setNotice('');
    if (!supabase) {
      setError('Authentication is not configured yet. Add the Supabase environment variables and rebuild the app.');
      return;
    }
    if (password.length < 8) {
      setError('Use a password with at least 8 characters.');
      return;
    }
    setBusy(true);
    try {
      if (isSignup) {
        const { data, error: authError } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: {
            data: name.trim() ? { full_name: name.trim() } : {},
            emailRedirectTo: getAuthCallbackUrl('/auth/callback'),
          },
        });
        if (authError) throw authError;
        if (data.session) go(redirect);
        else setNotice('Account created. Check your inbox for the verification link, then return here to sign in.');
      } else {
        const { error: authError } = await supabase.auth.signInWithPassword({
          email: email.trim(),
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
      {isSignup && <label className="auth-field">
        <span>Your name <small>(optional)</small></span>
        <input autoComplete="name" value={name} onChange={(event) => setName(event.target.value)} placeholder="How should we address you?" />
      </label>}
      <label className="auth-field">
        <span>Email address</span>
        <input type="email" required autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" />
      </label>
      <label className="auth-field">
        <span>Password</span>
        <span className="auth-password-wrap">
          <input type={visible ? 'text' : 'password'} required autoComplete={isSignup ? 'new-password' : 'current-password'} value={password} onChange={(event) => setPassword(event.target.value)} placeholder={isSignup ? 'At least 8 characters' : 'Enter your password'} />
          <button type="button" className="auth-password-toggle" onClick={() => setVisible((value) => !value)} aria-label={visible ? 'Hide password' : 'Show password'} aria-pressed={visible}>
            {visible ? <EyeOff size={17} /> : <Eye size={17} />}
          </button>
        </span>
      </label>
      {error && <p className="auth-message is-error" role="alert">{error}</p>}
      {notice && <p className="auth-message is-success" role="status">{notice}</p>}
      <button className="auth-submit" type="submit" disabled={busy || !email.trim() || !password}>
        {busy ? <LoaderCircle size={17} className="auth-spin" /> : <ShieldCheck size={17} />}
        {busy ? 'Please wait…' : isSignup ? 'Create your account' : 'Sign in securely'}
      </button>
      {!isSignup && <button type="button" className="auth-text-link" onClick={() => go('/reset-password')}>Forgot your password?</button>}
    </form>
  );
}

function ResetPassword() {
  const { user, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState('');
  const [error, setError] = useState('');

  const submit = async (event) => {
    event.preventDefault();
    setBusy(true); setError(''); setNotice('');
    try {
      if (!supabase) throw new Error('Supabase is not configured. Add the required environment variables and rebuild the app.');
      if (user) {
        if (password.length < 8) throw new Error('Use a password with at least 8 characters.');
        const { error: updateError } = await supabase.auth.updateUser({ password });
        if (updateError) throw updateError;
        setNotice('Your password has been updated. You can return to your study workspace.');
        setPassword('');
      } else {
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

  return <div className="auth-card">
    <div className="auth-card-heading"><span className="auth-icon"><Mail size={19} /></span><div><h2>{user ? 'Choose a new password' : 'Reset your password'}</h2><p>{user ? 'Set a new password for your account.' : 'We will email you a secure password reset link.'}</p></div></div>
    <form className="auth-form" onSubmit={submit}>
      {!user && <label className="auth-field"><span>Email address</span><input type="email" required autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" /></label>}
      {user && <label className="auth-field"><span>New password</span><span className="auth-password-wrap"><input type={visible ? 'text' : 'password'} minLength={8} required autoComplete="new-password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="At least 8 characters" /><button type="button" className="auth-password-toggle" onClick={() => setVisible((value) => !value)} aria-label={visible ? 'Hide password' : 'Show password'}>{visible ? <EyeOff size={17} /> : <Eye size={17} />}</button></span></label>}
      {error && <p className="auth-message is-error" role="alert">{error}</p>}
      {notice && <p className="auth-message is-success" role="status">{notice}</p>}
      <button className="auth-submit" type="submit" disabled={busy || loading || (!user && !email.trim()) || (Boolean(user) && !password)}>{busy ? <LoaderCircle size={17} className="auth-spin" /> : <ShieldCheck size={17} />}{busy ? 'Please wait…' : user ? 'Update password' : 'Send reset link'}</button>
    </form>
  </div>;
}

export default function AuthPage({ path }) {
  const { user, loading, configured, missing } = useAuth();
  const redirect = useMemo(() => getRedirectPath(hashSearch()), []);
  const mode = path === '/signup' ? 'signup' : 'login';

  if (path === '/reset-password') return <main className="auth-page"><div className="auth-wrap"><a href="#/" className="auth-back"><ArrowLeft size={16} /> Back to CNR-IA-2</a><AuthBrand /><ResetPassword /></div></main>;

  if (path === '/auth/callback') return <main className="auth-page"><div className="auth-wrap"><AuthBrand /><section className="auth-card"><span className="auth-icon"><ShieldCheck size={20} /></span><h1>Finishing your sign-in</h1><p>{loading ? 'Confirming your secure session…' : user ? 'Your email is verified and your account is ready.' : 'The link may have expired or already been used. Try signing in or request a new verification email.'}</p><button className="auth-submit" type="button" onClick={() => go(user ? redirect : '/auth')}>{user ? 'Continue to workspace' : 'Go to sign in'}</button></section></div></main>;

  return <main className="auth-page"><div className="auth-wrap">
    <a href="#/" className="auth-back"><ArrowLeft size={16} /> Back to study workspace</a>
    <AuthBrand />
    <section className="auth-card">
      <div className="auth-tabs" role="tablist" aria-label="Account access">
        <button type="button" role="tab" aria-selected={mode === 'login'} className={mode === 'login' ? 'is-active' : ''} onClick={() => go('/auth')}>Sign in</button>
        <button type="button" role="tab" aria-selected={mode === 'signup'} className={mode === 'signup' ? 'is-active' : ''} onClick={() => go('/signup')}>Create account</button>
      </div>
      <div className="auth-card-heading"><span className="auth-icon"><ShieldCheck size={19} /></span><div><h1>{mode === 'signup' ? 'Start your CNR learning account' : 'Welcome back'}</h1><p>{mode === 'signup' ? 'Create an account with your email to get started.' : 'Sign in to your CNR-IA-2 account.'}</p></div></div>
      {!configured && <div className="auth-message is-error" role="alert"><strong>Supabase setup required.</strong><span> Missing: {missing.join(', ')}. Add these values to your deployment environment and rebuild. No demo login is available.</span></div>}
      {user && <p className="auth-message is-success" role="status">You are signed in as {user.email}. <button className="auth-inline-link" type="button" onClick={() => go(redirect)}>Continue</button></p>}
      {loading ? <p className="auth-loading"><LoaderCircle size={17} className="auth-spin" /> Restoring your session…</p> : configured && !user && <AuthForm key={mode} mode={mode} redirect={redirect} />}
      <p className="auth-footnote">Your study materials remain public. Signing in does not upload or replace your locally saved study progress.</p>
    </section>
  </div></main>;
}

function AuthBrand() {
  return <div className="auth-brand"><span className="auth-brand-mark"><Leaf size={25} /></span><div><strong>CNR-IA-2</strong><span>CONSERVATION OF NATURAL RESOURCES · BCV755B</span></div></div>;
}

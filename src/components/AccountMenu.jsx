import { useState } from 'react';
import { CircleUserRound, LogIn, LogOut, LoaderCircle } from 'lucide-react';
import { go } from '../lib/router';
import { useAuth } from '../lib/AuthProvider';

export default function AccountMenu() {
  const { user, loading, configured, signOut } = useAuth();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const logout = async () => {
    setBusy(true); setError('');
    try {
      await signOut();
      go('/');
    } catch (signOutError) {
      setError(signOutError?.message || 'Could not sign out. Please try again.');
    } finally {
      setBusy(false);
    }
  };

  if (loading) return <span className="account-status" aria-label="Restoring account session"><LoaderCircle size={16} className="auth-spin" /></span>;
  if (!user) return <a href="#/auth" className="account-entry" title={configured ? 'Sign in or create an account' : 'Supabase setup required'}><LogIn size={16} /><span>Sign in</span></a>;

  return <div className="account-menu" title={user.email || 'Signed in'}>
    <CircleUserRound size={17} aria-hidden="true" />
    <span className="account-email">{user.email}</span>
    <button type="button" onClick={logout} disabled={busy} aria-label="Sign out" title="Sign out">{busy ? <LoaderCircle size={15} className="auth-spin" /> : <LogOut size={15} />}</button>
    {error && <span className="account-error" role="alert">{error}</span>}
  </div>;
}

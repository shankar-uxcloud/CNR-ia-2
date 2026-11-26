import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { supabase, supabaseConfig } from './supabase';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(supabaseConfig.configured);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return undefined;
    }

    let active = true;
    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (!active) return;
      setSession(nextSession);
      setLoading(false);
      setError('');
    });

    supabase.auth.getSession()
      .then(({ data, error: sessionError }) => {
        if (!active) return;
        if (sessionError) setError(sessionError.message);
        setSession(data?.session || null);
      })
      .catch((sessionError) => {
        if (active) setError(sessionError?.message || 'Could not restore your session.');
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  const value = useMemo(() => ({
    session,
    user: session?.user || null,
    loading,
    error,
    configured: supabaseConfig.configured,
    missing: supabaseConfig.missing,
    async signOut() {
      if (!supabase) throw new Error('Supabase authentication is not configured.');
      const { error: signOutError } = await supabase.auth.signOut();
      if (signOutError) throw signOutError;
    },
  }), [session, loading, error]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider.');
  return context;
}

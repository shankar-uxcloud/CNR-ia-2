import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim();
const supabaseKey = (
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  ''
).trim();

const validSupabaseUrl = (() => {
  try {
    const parsed = new URL(supabaseUrl);
    return parsed.protocol === 'https:' || parsed.hostname === 'localhost' || parsed.hostname === '127.0.0.1';
  } catch {
    return false;
  }
})();

export const supabaseConfig = Object.freeze({
  configured: Boolean(validSupabaseUrl && supabaseKey),
  missing: [
    ...(!supabaseUrl ? ['VITE_SUPABASE_URL'] : !validSupabaseUrl ? ['VITE_SUPABASE_URL (valid HTTPS URL required)'] : []),
    ...(!supabaseKey ? ['VITE_SUPABASE_ANON_KEY (or VITE_SUPABASE_PUBLISHABLE_KEY)'] : []),
  ],
});

export const supabase = supabaseConfig.configured
  ? createClient(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
        flowType: 'pkce',
      },
    })
  : null;

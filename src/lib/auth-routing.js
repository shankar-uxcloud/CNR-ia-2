const AUTH_PATHS = new Set(['/auth', '/signup', '/reset-password', '/auth/callback']);

export function sanitizeRedirectPath(candidate, fallback = '/dashboard') {
  if (typeof candidate !== 'string' || !candidate.startsWith('/') || candidate.startsWith('//') || candidate.includes('\\')) return fallback;
  const path = candidate.split(/[?#]/, 1)[0];
  if (!path || AUTH_PATHS.has(path) || path.startsWith('/auth/')) return fallback;
  return candidate;
}

export function getRedirectPath(search = '') {
  const params = new URLSearchParams(search.startsWith('?') ? search.slice(1) : search);
  return sanitizeRedirectPath(params.get('redirect'));
}

export function getAuthCallbackUrl(route = '/auth/callback') {
  const base = window.location.origin + window.location.pathname;
  const url = new URL(base);
  url.hash = '#' + route;
  return url.toString();
}

export function authErrorMessage(error) {
  const message = String(error?.message || '').toLowerCase();
  if (message.includes('invalid login credentials')) return 'Email or password is incorrect. Check your details and try again.';
  if (message.includes('email not confirmed')) return 'Please verify your email using the link we sent before signing in.';
  if (message.includes('already registered') || message.includes('user already registered')) return 'An account with this email already exists. Sign in instead.';
  if (message.includes('password') && (message.includes('length') || message.includes('characters'))) return 'Choose a stronger password that meets your Supabase password policy.';
  if (message.includes('rate limit') || message.includes('too many requests')) return 'Too many attempts. Wait a little and try again.';
  if (message.includes('network') || message.includes('fetch')) return 'Could not reach the authentication service. Check your connection and try again.';
  return error?.message || 'Authentication could not be completed. Please try again.';
}

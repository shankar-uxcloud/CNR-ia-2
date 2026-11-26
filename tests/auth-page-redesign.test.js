import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = (path) => readFileSync(new URL(path, import.meta.url), 'utf8');

test('authentication routes render as a dedicated full-page experience outside the workspace shell', () => {
  const app = read('../src/App.jsx');
  const page = read('../src/pages/AuthPage.jsx');
  assert.ok(app.includes('const isAuthRoute ='));
  assert.ok(app.includes('if (isAuthRoute) return <Suspense'));
  assert.ok(page.includes('Welcome Back to Your'));
  assert.ok(page.includes('auth-visual'));
  assert.ok(page.includes('auth-content'));
});

test('sign-in keeps the real Supabase flow and validates empty and malformed credentials inline', () => {
  const page = read('../src/pages/AuthPage.jsx');
  assert.ok(page.includes('signInWithPassword'));
  assert.ok(page.includes('supabase.auth.signUp'));
  assert.ok(page.includes('resetPasswordForEmail'));
  assert.ok(page.includes('EMAIL_PATTERN'));
  assert.ok(page.includes('Enter your email address.'));
  assert.ok(page.includes('Enter your password.'));
  assert.ok(page.includes('aria-invalid'));
  assert.ok(page.includes('Authentication setup required.'));
  assert.ok(!page.includes('demo.signIn'));
});

test('premium auth page consumes semantic theme tokens and supports reduced motion and mobile layouts', () => {
  const css = read('../src/styles/auth.css');
  for (const token of ['--bg-primary', '--surface-primary', '--text-primary', '--cyber-accent', '--cyber-secondary', '--input-bg', '--input-border', '--button-primary-bg', '--status-danger', '--status-success']) {
    assert.ok(css.includes(token), 'Expected theme token ' + token);
  }
  assert.ok(css.includes('@media (max-width: 820px)'));
  assert.ok(css.includes('@media (max-width: 520px)'));
  assert.ok(css.includes('@media (prefers-reduced-motion: reduce)'));
  assert.ok(css.includes('auth-orbit-scene'));
  assert.ok(css.includes('backdrop-filter: blur'));
});

test('sign-in does not claim a remember-me option or persist credentials outside Supabase', () => {
  const page = read('../src/pages/AuthPage.jsx');
  assert.ok(!page.toLowerCase().includes('remember me'));
  assert.ok(!page.includes('localStorage.setItem'));
});

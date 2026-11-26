import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = (path) => readFileSync(new URL(path, import.meta.url), 'utf8');

test('Supabase authentication is real, optional when unconfigured, and never simulated', () => {
  const client = read('../src/lib/supabase.js');
  const provider = read('../src/lib/AuthProvider.jsx');
  const page = read('../src/pages/AuthPage.jsx');
  assert.ok(client.includes("from '@supabase/supabase-js'"));
  assert.ok(client.includes('persistSession: true'));
  assert.ok(client.includes('autoRefreshToken: true'));
  assert.ok(provider.includes('onAuthStateChange'));
  assert.ok(provider.includes('getSession()'));
  assert.ok(page.includes('signInWithPassword'));
  assert.ok(page.includes('signUp'));
  assert.ok(page.includes('resetPasswordForEmail'));
  assert.ok(page.includes('updateUser'));
  assert.ok(page.includes('Supabase setup required'));
  assert.ok(!page.includes('demo.signIn'));
});

test('hash auth routes are integrated without gating public study pages', () => {
  const app = read('../src/App.jsx');
  const shell = read('../src/components/Shell.jsx');
  assert.ok(app.includes("path === '/auth' || path === '/signup'"));
  assert.ok(app.includes('<AuthProvider>'));
  assert.ok(shell.includes('<AccountMenu currentPath={path} />'));
  assert.ok(!app.includes('ProtectedRoute'));
});

test('service worker bypasses auth traffic, authorization requests and PKCE callback URLs', () => {
  const worker = read('../src/pwa/sw.js');
  assert.ok(worker.includes('isAuthTraffic'));
  assert.ok(worker.includes("request.headers.has('authorization')"));
  assert.ok(worker.includes("url.searchParams.has('code')"));
  assert.ok(worker.includes('if (isAuthTraffic) return;'));
});

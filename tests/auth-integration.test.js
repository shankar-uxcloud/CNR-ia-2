import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';

const read = (path) => readFileSync(new URL(path, import.meta.url), 'utf8');

test('all students can enter the app without an account or authentication provider', () => {
  const app = read('../src/App.jsx');
  const shell = read('../src/components/Shell.jsx');
  const main = read('../src/main.jsx');
  assert.ok(app.includes('StudyAccessHub'));
  assert.ok(app.includes("if (path === '/' || legacyAccessRoute)"));
  assert.ok(app.includes("go('/')"));
  assert.ok(!app.includes('AuthProvider'));
  assert.ok(!app.includes('AuthPage'));
  assert.ok(!shell.includes('AccountMenu'));
  assert.ok(!main.includes('auth.css'));
});

test('authentication implementation, styles, configuration and dependency are removed', () => {
  const pkg = JSON.parse(read('../package.json'));
  const lock = JSON.parse(read('../package-lock.json'));
  assert.ok(!pkg.dependencies?.['@supabase/supabase-js']);
  assert.ok(!lock.packages?.['']?.dependencies?.['@supabase/supabase-js']);
  assert.ok(!Object.keys(lock.packages || {}).some((name) => name.toLowerCase().includes('supabase')));
  for (const path of [
    '../src/lib/AuthProvider.jsx', '../src/lib/auth-routing.js', '../src/lib/supabase.js',
    '../src/pages/AuthPage.jsx', '../src/components/AccountMenu.jsx', '../src/styles/auth.css',
    '../.env.example',
  ]) assert.equal(existsSync(new URL(path, import.meta.url)), false, path + ' should be removed');
});

test('study state remains browser-local and the service worker retains offline API safeguards', () => {
  const study = read('../src/lib/study.jsx');
  const worker = read('../src/pwa/sw.js');
  assert.ok(study.includes("const KEY = 'vtu-examprep-v1'"));
  assert.ok(study.includes('localStorage.setItem(KEY, JSON.stringify(state))'));
  assert.ok(worker.includes('CORE_FILES'));
  assert.ok(worker.includes('const isApiTraffic'));
  assert.ok(worker.includes("request.headers.has('authorization')"));
});

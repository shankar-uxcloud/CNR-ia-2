import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = (path) => readFileSync(new URL(path, import.meta.url), 'utf8');

test('legacy account URLs lead to the open Study Access Hub instead of authentication screens', () => {
  const app = read('../src/App.jsx');
  assert.ok(app.includes('legacyAccessRoute'));
  assert.ok(app.includes("['/auth', '/signup', '/reset-password', '/auth/callback']"));
  assert.ok(app.includes("if (legacyAccessRoute) go('/')"));
  assert.ok(app.includes('StudyAccessHub'));
  assert.ok(!app.includes('AuthPage'));
  assert.ok(!app.includes('AuthProvider'));
});

test('existing public learning routes remain directly addressable', () => {
  const app = read('../src/App.jsx');
  for (const route of ["path === '/dashboard'", "path === '/questions' || path === '/answers'", "path === '/planner'", "path === '/cnr-notes'"]) {
    assert.ok(app.includes(route), 'Missing direct learning route: ' + route);
  }
  assert.ok(app.includes("path.match(/^\\/module\\/([345])$/)"));
});

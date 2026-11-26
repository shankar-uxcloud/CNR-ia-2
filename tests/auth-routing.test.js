import test from 'node:test';
import assert from 'node:assert/strict';
import { sanitizeRedirectPath, getRedirectPath, authErrorMessage } from '../src/lib/auth-routing.js';

test('redirect targets accept safe in-app hash routes', () => {
  assert.equal(sanitizeRedirectPath('/cnr-notes/module/3'), '/cnr-notes/module/3');
  assert.equal(getRedirectPath('?redirect=%2Fdashboard'), '/dashboard');
});

test('redirect targets reject external, protocol-relative and auth-loop destinations', () => {
  assert.equal(sanitizeRedirectPath('https://example.com'), '/dashboard');
  assert.equal(sanitizeRedirectPath('//example.com/path'), '/dashboard');
  assert.equal(sanitizeRedirectPath('/auth'), '/dashboard');
  assert.equal(sanitizeRedirectPath('/auth/callback'), '/dashboard');
  assert.equal(sanitizeRedirectPath('/\\\\evil.example'), '/dashboard');
});

test('authentication errors are translated into actionable messages', () => {
  assert.match(authErrorMessage({ message: 'Invalid login credentials' }), /incorrect/i);
  assert.match(authErrorMessage({ message: 'Email not confirmed' }), /verify your email/i);
  assert.match(authErrorMessage({ message: 'Too many requests' }), /wait/i);
});

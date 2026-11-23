import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = (path) => readFileSync(new URL(path, import.meta.url), 'utf8');

test('CNR Notes hub and module deep links are wired into the existing application router', () => {
  const app = read('../src/App.jsx');
  assert.ok(app.includes("path === '/cnr-notes'"));
  assert.ok(app.includes('cnrNotesModule = path.match'));
  assert.ok(app.includes('initialModule={Number(cnrNotesModule[1])}'));
  assert.ok(app.includes("path === '/materials'"));
});

test('the primary navigation and landing page expose the integrated CNR Notes hub', () => {
  const shell = read('../src/components/Shell.jsx');
  const landing = read('../src/pages/Landing.jsx');
  assert.ok(shell.includes("to: '/cnr-notes', label: 'CNR Notes Hub'"));
  assert.ok(landing.includes("title: 'CNR Notes Library'"));
  assert.ok(landing.includes("href: '#/cnr-notes'"));
});

test('the hub and shared reader use the existing real resource catalogue', () => {
  const hub = read('../src/pages/CNRNotes.jsx');
  const vault = read('../src/pages/ResourceVault.jsx');
  assert.ok(hub.includes('DRIVE_RESOURCES'));
  assert.ok(hub.includes('RESOURCE_CATEGORIES'));
  assert.ok(vault.includes("initialModule = 'all'"));
  assert.ok(vault.includes('String(initialModule)'));
});

test('integration documentation explicitly excludes demo authentication and placeholder answers', () => {
  const docs = read('../docs/CNR-NOTES-INTEGRATION.md');
  assert.ok(docs.includes('sample placeholders'));
  assert.ok(docs.includes('simulated sign-in'));
  assert.ok(docs.includes('payments are disabled'));
});

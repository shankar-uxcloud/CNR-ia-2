import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = (path) => readFileSync(new URL(path, import.meta.url), 'utf8');

test('CNR Notes hub and module deep links are wired into the existing application router', () => {
  const app = read('../src/App.jsx');
  assert.match(app, /path === '\/cnr-notes'/);
    assert.ok(app.includes('cnrNotesModule = path.match'));
  assert.match(app, /initialModule=\{Number\(cnrNotesModule\[1\]\)\}/);
  assert.match(app, /path === '\/materials'/);
});

test('the primary navigation and landing page expose the integrated CNR Notes hub', () => {
  const shell = read('../src/components/Shell.jsx');
  const landing = read('../src/pages/Landing.jsx');
  assert.match(shell, /to: '\/cnr-notes', label: 'CNR Notes Hub'/);
  assert.match(landing, /title: 'CNR Notes Library'.*href: '#\/cnr-notes'/);
});

test('the hub and shared reader use the existing real resource catalogue', () => {
  const hub = read('../src/pages/CNRNotes.jsx');
  const vault = read('../src/pages/ResourceVault.jsx');
  assert.match(hub, /DRIVE_RESOURCES/);
  assert.match(hub, /RESOURCE_CATEGORIES/);
  assert.match(vault, /initialModule = 'all'/);
  assert.match(vault, /String\(initialModule\)/);
});

test('integration documentation explicitly excludes demo authentication and placeholder answers', () => {
  const docs = read('../docs/CNR-NOTES-INTEGRATION.md');
  assert.match(docs, /sample placeholders/);
  assert.match(docs, /simulated sign-in/);
  assert.match(docs, /payments are disabled/);
});

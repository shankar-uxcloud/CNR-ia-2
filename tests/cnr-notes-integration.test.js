import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = (path) => readFileSync(new URL(path, import.meta.url), 'utf8');

test('CNR Notes hub and module deep links remain wired into the application router', () => {
  const app = read('../src/App.jsx');
  assert.ok(app.includes("path === '/cnr-notes'"));
  assert.ok(app.includes('cnrNotesModule = path.match'));
  assert.ok(app.includes('initialModule={Number(cnrNotesModule[1])}'));
  assert.ok(app.includes("path === '/materials'"));
});

test('primary navigation and Study Access Hub expose the integrated CNR Notes hub', () => {
  const shell = read('../src/components/Shell.jsx');
  const hub = read('../src/pages/StudyAccessHub.jsx');
  assert.ok(shell.includes("to: '/cnr-notes', label: 'CNR Notes Hub'"));
  assert.ok(hub.includes("title: 'CNR Notes'"));
  assert.ok(hub.includes("href: '#/cnr-notes'"));
});

test('the hub and shared reader use the existing real resource catalogue', () => {
  const hub = read('../src/pages/CNRNotes.jsx');
  const vault = read('../src/pages/ResourceVault.jsx');
  assert.ok(hub.includes('DRIVE_RESOURCES'));
  assert.ok(hub.includes('RESOURCE_CATEGORIES'));
  assert.ok(vault.includes("initialModule = 'all'"));
  assert.ok(vault.includes('String(initialModule)'));
});

test('CNR Notes integration documentation remains separate from account services', () => {
  const docs = read('../docs/CNR-NOTES-INTEGRATION.md');
  assert.ok(docs.includes('sample placeholders'));
  assert.ok(docs.includes('demo-store'));
  assert.ok(!docs.includes('VITE_SUPABASE'));
  assert.ok(!docs.includes('Supabase Auth'));
});

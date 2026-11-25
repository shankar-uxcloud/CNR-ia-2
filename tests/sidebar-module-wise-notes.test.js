import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const read = (path) => fs.readFileSync(new URL('../' + path, import.meta.url), 'utf8');
const shell = read('src/components/Shell.jsx');
const app = read('src/App.jsx');
const vault = read('src/pages/ResourceVault.jsx');
const catalog = read('src/data/resourceCatalog.js');

test('Study Material exposes All Modules and direct links for Modules 1–5', () => {
  for (const [label, route] of [
    ['All Modules', '/cnr-notes/all'],
    ['Module 1', '/cnr-notes/module/1'],
    ['Module 2', '/cnr-notes/module/2'],
    ['Module 3', '/cnr-notes/module/3'],
    ['Module 4', '/cnr-notes/module/4'],
    ['Module 5', '/cnr-notes/module/5'],
  ]) {
    assert.ok(shell.includes("to: '" + route + "'"), 'missing route ' + route);
    assert.ok(shell.includes("label: '" + label + "'"), 'missing label ' + label);
  }
});

test('module navigation counts are derived from published note catalogue, not question counts', () => {
  assert.match(shell, /DRIVE_RESOURCES\.filter\(\(item\) => item\.category === 'notes'\)/);
  for (let module = 1; module <= 5; module += 1) {
    assert.ok(shell.includes("Number(item.module) === " + module), 'missing note count for module ' + module);
  }
  for (let module = 1; module <= 5; module += 1) {
    assert.match(catalog, new RegExp("module: " + module + ",\\s+category: 'notes'"));
  }
});

test('all-modules and individual module routes open the shared vault filtered to notes', () => {
  assert.match(app, /path === '\/cnr-notes\/all'\) return <ResourceVault initialCategory="notes"/);
  assert.match(app, /cnrNotesModule\) return <ResourceVault initialModule=\{Number\(cnrNotesModule\[1\]\)\} initialCategory="notes"/);
  assert.match(vault, /initialCategory = 'all'/);
  assert.match(vault, /useState\(initialCategory\)/);
});

test('All Modules note results are visibly grouped into module sections', () => {
  assert.match(vault, /const notesByModule = \[1, 2, 3, 4, 5\]/);
  assert.match(vault, /categoryFilter === 'notes' && moduleFilter === 'all'/);
  assert.match(vault, /Study notes grouped by module/);
  assert.match(vault, /Module \{group\.number\} notes/);
  assert.match(vault, /group\.items\.map\(renderResourceCard\)/);
});

test('existing resource search, category, saved and reader actions remain in place', () => {
  assert.match(vault, /aria-label="Search resources"/);
  assert.match(vault, /categoryFilter === 'all' \|\| item\.category === categoryFilter/);
  assert.match(vault, /savedOnly \|\| bookmarks\.includes\(item\.id\)/);
  assert.match(vault, /onClick=\{\(\) => openResource\(item\)\}/);
});

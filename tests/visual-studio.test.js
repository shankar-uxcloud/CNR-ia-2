import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const read = (p) => fs.readFileSync(new URL('../' + p, import.meta.url), 'utf8');
const visual = read('src/pages/VisualStudio.jsx');
const store = read('src/lib/study.jsx');
const questions = read('src/data/questions.js');
const diagrams = read('src/diagrams/index.js');

test('visual studio concepts are mapped to the ten existing main-bank questions', () => {
  const qids = [...questions.matchAll(/id: '(q\\d+)'/g)].map((m) => m[1]);
  const topicQids = [...visual.matchAll(/q:'(q\\d+)'/g)].map((m) => m[1]);
  assert.equal(topicQids.length, 10);
  assert.deepEqual([...new Set(topicQids)].sort(), qids.sort());
});

test('visual studio has six usable learning workspaces and interactive controls', () => {
  for (const key of ["mindmap","flows","cards","compare","diagrams","revision"]) {
    assert.match(visual, new RegExp("tab===['\"]" + key + "['\"]"));
  }
  for (const label of ['Zoom in','Zoom out','Reset view','Fit to screen']) assert.match(visual, new RegExp(label));
  assert.match(visual, /setFlipped/);
  assert.match(visual, /setCompareLeft|setCompareRight/);
  assert.match(visual, /completeVisualExercise/);
});

test('all diagram IDs used by Visual Studio exist in the verified diagram registry', () => {
  const registry = [...diagrams.matchAll(/^  ([a-z]+): \{ title:/gm)].map((m) => m[1]);
  const used = [...visual.matchAll(/diagram:'([a-z]+)'/g)].map((m) => m[1]);
  const usedArrays = [...visual.matchAll(/diagrams:\[([^\]]+)\]/g)].flatMap((m) => [...m[1].matchAll(/'([a-z]+)'/g)].map((n) => n[1]));
  for (const id of [...used, ...usedArrays]) assert.ok(registry.includes(id), 'missing registry diagram: ' + id);
});

test('visual progress persistence is backward-compatible with existing local storage', () => {
  assert.match(store, /const KEY = 'vtu-examprep-v1'/);
  assert.match(store, /visualStudio: \{ viewed: \{\}, completedMaps: \{\}, exercises: \{\}, favorites: \{\} \}/);
  assert.match(store, /markVisualViewed/);
  assert.match(store, /completeVisualMap/);
  assert.match(store, /completeVisualExercise/);
  assert.match(store, /toggleVisualFavorite/);
});

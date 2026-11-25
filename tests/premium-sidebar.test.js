import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const read = (path) => fs.readFileSync(new URL('../' + path, import.meta.url), 'utf8');
const shell = read('src/components/Shell.jsx');
const styles = read('src/styles/components.css');
const app = read('src/App.jsx');

test('sidebar navigation is grouped into the six academic sections', () => {
  for (const label of ['Overview', 'Study Material', 'Exam Preparation', 'Learning Tools', 'Resources', 'System']) {
    assert.ok(shell.includes("title: '" + label + "'"), 'missing navigation group: ' + label);
  }
  assert.match(shell, /defaultOpen: true/);
  assert.match(shell, /defaultOpen: false/);
});

test('question, note-module and bookmark badges use live source data rather than fixed counts', () => {
  assert.match(shell, /count: QUESTIONS\.length/);
  assert.match(shell, /DRIVE_RESOURCES\.filter\(\(item\) => item\.category === 'notes'\)\.length/);
  for (let module = 1; module <= 5; module += 1) {
    assert.ok(shell.includes("Number(item.module) === " + module), 'missing live note count for module ' + module);
  }
  assert.match(shell, /Object\.keys\(bookmarks \|\| \{\}\)\.length/);
  assert.match(shell, /QUESTIONS\.filter\(\(question\) => Boolean\(completed\?\.\[question\.id\]\)\)\.length/);
  assert.doesNotMatch(shell, /count: 10|count: 2|count: 4/);
});

test('model question papers are nested and existing application routes remain registered', () => {
  assert.match(shell, /children: \[/);
  assert.match(shell, /label: 'Solved Question Papers'/);
  assert.match(shell, /to: '\/model-paper-21cv654', label: '21CV654 Complete Model Answers'/);
  assert.match(shell, /\/dec-jan-2026/);
  assert.match(shell, /\/question-papers\/june-july-2026/);
  assert.doesNotMatch(shell, /label: 'Model Question Papers'/);
  assert.doesNotMatch(shell, /to: '\/model-paper-21cv654', label: '21CV654 Complete Model Answers'.*?\n\s*\{ to: '\/mqps'/s);
  for (const route of ['/dashboard', '/learning-hub', '/analytics', '/questions', '/answers', '/model-paper-21cv654', '/module', '/bookmarks', '/revision', '/practice', '/quiz', '/exam', '/study-coach', '/visual-studio', '/environment-lab', '/smart-revision', '/planner', '/ecoweb', '/cnr-notes', '/resources', '/additional-notes', '/welcome', '/data-backup']) {
    assert.ok(app.includes(route), 'existing route not found: ' + route);
  }
});

test('sidebar supports active route expansion, collapse mode and dynamic progress', () => {
  assert.match(shell, /groupIsActive/);
  assert.match(shell, /setExpanded/);
  assert.match(shell, /sidebar-collapsed/);
  assert.match(shell, /cnr-sidebar-collapsed-v1/);
  assert.match(shell, /aria-valuenow=\{completedQuestions\}/);
  assert.match(shell, /href="#\/analytics"/);
  assert.match(shell, /title=\{collapsed \? item\.label : undefined\}/);
});

test('sidebar styles consume semantic theme tokens and respect accessibility preferences', () => {
  assert.match(styles, /--surface-primary/);
  assert.match(styles, /--cyber-accent/);
  assert.match(styles, /data-ui-mode='glass'/);
  assert.match(styles, /data-ui-mode='nebula'/);
  assert.match(styles, /prefers-reduced-motion: reduce/);
  assert.match(styles, /prefers-reduced-transparency: reduce/);
  assert.match(styles, /forced-colors: active/);
  assert.match(styles, /sidebar-command-search/);
  assert.match(styles, /sidebar-module-progress/);
  assert.match(styles, /sidebar-progress-ring/);
  assert.match(styles, /sidebar-brand-mark/);
});

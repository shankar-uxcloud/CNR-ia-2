import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = (path) => readFileSync(new URL(path, import.meta.url), 'utf8');

test('root entry renders the Study Access Hub while legacy auth links resolve there', () => {
  const app = read('../src/App.jsx');
  const hub = read('../src/pages/StudyAccessHub.jsx');
  assert.ok(app.includes("if (path === '/' || legacyAccessRoute)"));
  assert.ok(app.includes('<StudyAccessHub />'));
  assert.ok(hub.includes('Your Learning Journey'));
  assert.ok(!app.includes("import Landing from './pages/Landing'"));
});

test('Study Access Hub exposes the existing learning routes without duplicate pages', () => {
  const hub = read('../src/pages/StudyAccessHub.jsx');
  for (const route of ['#/dashboard', '#/questions', '#/module/3', '#/module/4', '#/module/5', '#/smart-revision', '#/practice', '#/quiz', '#/planner', '#/cnr-notes', '#/mqps']) {
    assert.ok(hub.includes(route), 'missing access destination: ' + route);
  }
});

test('hub styling uses theme tokens and supports responsive and reduced-motion layouts', () => {
  const styles = read('../src/pages/StudyAccessHub.css');
  for (const token of ['--text-primary', '--text-muted', '--bg-primary', '--surface-primary', '--border-color', '--cyber-accent', '--cyber-secondary']) {
    assert.ok(styles.includes(token), 'missing shared design token: ' + token);
  }
  assert.ok(styles.includes('@media(max-width:900px)'));
  assert.ok(styles.includes('@media(max-width:640px)'));
  assert.ok(styles.includes('@media(prefers-reduced-motion:reduce)'));
});

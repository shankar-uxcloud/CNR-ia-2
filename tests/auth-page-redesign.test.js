import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = (path) => readFileSync(new URL(path, import.meta.url), 'utf8');

test('Study Access Hub contains every requested open learning destination', () => {
  const hub = read('../src/pages/StudyAccessHub.jsx');
  for (const text of [
    'Your Learning Journey', 'Starts Here', 'No accounts. No barriers. Just learning.',
    'Start Learning', 'Explore VTU Answers', 'Module Library', 'Smart Revision',
    'Practice & Quiz', 'Study Planner', 'CNR Notes', 'Previous Question Papers',
    'Free for every student', 'No registration required', 'Progress saved locally',
    'Study anytime', 'Knowledge belongs to everyone.',
  ]) assert.ok(hub.includes(text), 'Missing Study Access Hub content: ' + text);
  for (const route of ['/dashboard', '/questions', '/module/3', '/module/4', '/module/5', '/smart-revision', '/practice', '/quiz', '/planner', '/cnr-notes', '/mqps']) {
    assert.ok(hub.includes('#' + route), 'Missing existing destination: ' + route);
  }
});

test('Study Access Hub uses the existing theme system and responsive reduced-motion styling', () => {
  const css = read('../src/pages/StudyAccessHub.css');
  for (const token of ['--bg-primary', '--surface-primary', '--text-primary', '--text-secondary', '--border-color', '--cyber-accent', '--cyber-secondary']) {
    assert.ok(css.includes(token), 'Expected theme token ' + token);
  }
  assert.ok(css.includes('@media(max-width:900px)'));
  assert.ok(css.includes('@media(max-width:640px)'));
  assert.ok(css.includes('@media(prefers-reduced-motion:reduce)'));
});

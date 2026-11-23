import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const page = readFileSync(new URL('../src/pages/Landing.jsx', import.meta.url), 'utf8');
const styles = readFileSync(new URL('../src/pages/Landing.css', import.meta.url), 'utf8');
const app = readFileSync(new URL('../src/App.jsx', import.meta.url), 'utf8');

test('homepage keeps the root route and uses the shared application landing component', () => {
  assert.match(app, /if \(path === '\/'\) return <>\s*<Landing \/>/);
  assert.match(page, /export default function Landing/);
});

test('homepage exposes direct entry points to the current learning hub, vault, paper and dashboard', () => {
  for (const route of ['#/learning-hub', '#/resources', '#/question-papers/june-july-2026', '#/dashboard']) {
    assert.ok(page.includes(route), 'missing homepage destination: ' + route);
  }
  assert.match(page, /cnr-quick-access/);
});

test('homepage feature cards include both question-paper routes and visual learning', () => {
  assert.match(page, /title: 'June \/ July 2026 paper'/);
  assert.match(page, /title: 'December \/ January paper'/);
  assert.match(page, /title: 'Visual Learning Studio'/);
});

test('homepage colors are driven by the same semantic tokens as the rest of CNR-IA-2', () => {
  for (const token of ['--text-primary', '--text-muted', '--bg-primary', '--surface-primary', '--border-color', '--cyber-accent', '--landing-bg']) {
    assert.ok(styles.includes(token), 'missing shared design token: ' + token);
  }
  assert.match(styles, /data-ui-mode='glass'/);
  assert.match(styles, /data-ui-mode='nebula'/);
  assert.match(styles, /data-ui-mode='holographic'/);
});

test('homepage quick access and responsive layouts preserve small-screen usability', () => {
  assert.match(styles, /\.cnr-quick-access-inner/);
  assert.match(styles, /@media\(max-width:760px\)/);
  assert.match(styles, /@media\(max-width:430px\)/);
  assert.match(styles, /prefers-reduced-motion:reduce/);
  assert.match(styles, /prefers-reduced-transparency:reduce/);
});

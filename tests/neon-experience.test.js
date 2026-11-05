import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const read = (p) => fs.readFileSync(new URL('../' + p, import.meta.url), 'utf8');
const css = read('src/index.css');
const shell = read('src/components/Shell.jsx');
const store = read('src/lib/study.jsx');

test('Ultra Neon 4.0 defines a coordinated dark and clean light visual token system', () => {
  for (const token of ['--ux-bg', '--ux-panel', '--ux-line', '--ux-ink', '--ux-muted', '--ux-cyan', '--ux-violet']) {
    assert.ok(css.includes(token), 'missing design token: ' + token);
  }
  for (const color of ['#050816', '#0c1427', '#00e5ff', '#2979ff', '#a855f7', '#39ff88', '#ff38d1']) {
    assert.ok(css.toLowerCase().includes(color), 'missing palette color: ' + color);
  }
  assert.match(css, /data-theme='dark'/);
  assert.match(css, /data-theme='light'/);
});

test('global visual layer styles navigation, study cards, reading content and learning tools', () => {
  for (const selector of ['aside a[aria-current=', 'header.topbar', '.card', '.reading', '.visual-studio', '.lab-control', '[role=']) {
    assert.ok(css.includes(selector), 'missing website-wide styling hook: ' + selector);
  }
  assert.match(css, /@media \(max-width: 640px\)/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(css, /@media print/);
});

test('navigation exposes the active state for nested question routes as well as exact routes', () => {
  assert.match(shell, /const active = path === it\.to \|\| \(it\.to === '\/questions' && path\.startsWith\('\/q\/'\)\)/);
  assert.match(shell, /aria-current=\{active \? 'page' : undefined\}/);
  assert.match(shell, /\$\{active \? 'bg-brand\/12 text-brand'/);
});

test('theme preference remains persisted in the existing study settings store', () => {
  assert.match(store, /const KEY = 'vtu-examprep-v1'/);
  assert.match(store, /settings: \{ theme: null/);
  assert.match(store, /toggleTheme: \(\) => setState/);
  assert.match(store, /setSetting: \(k, v\)/);
});

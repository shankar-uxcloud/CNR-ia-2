import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const read = (p) => fs.readFileSync(new URL('../' + p, import.meta.url), 'utf8');
const css = ['src/styles/tokens.css','src/styles/themes.css','src/styles/global.css','src/styles/components.css','src/styles/utilities.css'].map(read).join('\n');
const shell = read('src/components/Shell.jsx');
const store = read('src/lib/study.jsx');

test('Neon dark mode is the first-visit default before and after React hydration', () => {
  assert.ok(store.includes("settings: { theme: 'dark'"));
  assert.ok(store.includes("const theme = state.settings.theme || 'dark'"));
  const html = read('index.html');
  assert.ok(html.includes("var mode = ['dark', 'light'].includes(settings.theme) ? settings.theme : 'dark'"));
  assert.ok(html.includes("setAttribute('data-visual-theme', mode === 'dark' ? 'neon' : 'light')"));
});

test('central tokens define the neon spectrum and semantic theme contract', () => {
  for (const token of ['--ux-bg','--ux-panel','--ux-line','--ux-ink','--ux-muted','--ux-cyan','--ux-violet','--bg-primary','--surface-primary','--text-primary','--border-color','--input-bg','--status-success']) {
    assert.ok(css.includes(token), 'missing design token: ' + token);
  }
  for (const color of ['#070914','#0D1224','#111A30','#00F5FF','#3B82F6','#A855F7','#39FF88','#FF3CAC']) {
    assert.ok(css.toLowerCase().includes(color), 'missing palette color: ' + color);
  }
  assert.match(css, /data-theme='dark'/);
  assert.match(css, /data-theme='light'/);
});

test('shared design system styles navigation, study cards, answers and learning tools', () => {
  for (const selector of ['aside nav a[aria-current','header.topbar','.card','.reading','.visual-studio','.lab-control','[role=\'dialog\']','.cyber-hud-cell']) {
    assert.ok(css.includes(selector), 'missing website-wide styling hook: ' + selector);
  }
  assert.match(css, /@media \(max-width: 767px\)/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(css, /@media print/);
});

test('navigation exposes active state for nested question routes', () => {
  assert.match(shell, /const active = path === it\.to \|\| \(it\.to === '\/questions' && path\.startsWith\('\/q\/'\)\)/);
  assert.match(shell, /aria-current=\{active \? 'page' : undefined\}/);
  assert.match(shell, /\$\{active \? 'bg-brand\/12 text-brand'/);
});

test('theme preference remains persisted in the existing study store', () => {
  assert.match(store, /const KEY = 'vtu-examprep-v1'/);
  const html = read('index.html');
  assert.match(store, /toggleTheme: \(\) => setState/);
  assert.match(store, /setSetting: \(k, v\)/);
});

import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const css = fs.readFileSync(new URL('../src/neon-completion.css', import.meta.url), 'utf8');
const main = fs.readFileSync(new URL('../src/main.jsx', import.meta.url), 'utf8');

test('Neon Completion 6.0 is loaded after the established design system', () => {
  assert.match(main, /import '\.\/neon-completion\.css'/);
  assert.match(main, /import '\.\/index\.css'/);
  assert.ok(main.indexOf("import './index.css'") < main.indexOf("import './neon-completion.css'"));
});

test('global neon tokens and shared surfaces cover the complete interface', () => {
  for (const token of ['--neon-bg:', '--neon-surface:', '--neon-cyan:', '--neon-purple:', '--neon-green:', '--neon-magenta:', '--neon-text:', '--neon-muted:']) {
    assert.ok(css.includes(token), 'missing design token ' + token);
  }
  for (const selector of ['.card', 'aside', 'header.topbar', 'input,select,textarea', 'main table', '[role=\'dialog\']', '[role=\'alert\']', '.reading', '.visual-studio', '.lab-control', '.skeleton']) {
    assert.ok(css.includes(selector), 'missing coverage for ' + selector);
  }
});

test('neon completion preserves accessibility, responsive behavior and print output', () => {
  assert.match(css, /:focus-visible/);
  assert.match(css, /prefers-reduced-motion: reduce/);
  assert.match(css, /max-width: 767px/);
  assert.match(css, /@media print/);
  assert.match(css, /color-scheme: dark/);
});

test('legacy utility surfaces are normalized only within dark themed content', () => {
  assert.match(css, /\[data-theme='dark'\] main/);
  assert.match(css, /bg-white/);
  assert.match(css, /text-gray-900/);
  assert.match(css, /border-gray-200/);
});

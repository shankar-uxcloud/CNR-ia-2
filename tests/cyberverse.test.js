import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const read = (p) => fs.readFileSync(new URL('../' + p, import.meta.url), 'utf8');
const css = read('src/index.css');
const shell = read('src/components/Shell.jsx');
const store = read('src/lib/study.jsx');

test('Cyberverse offers four selectable, persisted visual themes', () => {
  for (const name of ['ultra-cyber', 'arctic', 'purple', 'eco']) {
    assert.ok(shell.includes(`value: '${name}'`), 'missing theme option: ' + name);
    assert.ok(css.includes(`data-neon-theme='${name}'`) || name === 'ultra-cyber' && css.includes('data-neon-theme=\'ultra-cyber\''));
  }
  assert.match(store, /cyberTheme: 'ultra-cyber'/);
  assert.match(store, /setAttribute\('data-neon-theme', cyberTheme\)/);
  assert.match(shell, /setSetting\('cyberTheme', e\.target\.value\)/);
});

test('ambient effects and card energy lighting are CSS-first and respect reduced motion', () => {
  assert.match(css, /@keyframes cyber-drift/);
  assert.match(css, /body::before/);
  assert.match(css, /\.card\[data-energy='active'\]/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(shell, /requestAnimationFrame/);
  assert.match(shell, /cancelAnimationFrame/);
  assert.match(shell, /matchMedia\?\.\('\(prefers-reduced-motion: reduce\)'\)/);
});

test('pointer-reactive effects are limited to fine-pointer devices and cleaned up', () => {
  assert.match(shell, /\(hover: hover\) and \(pointer: fine\)/);
  assert.match(shell, /pointermove/);
  assert.match(shell, /pointerout/);
  assert.match(shell, /removeEventListener\('pointermove'/);
  assert.match(shell, /removeEventListener\('pointerout'/);
});

test('mobile drawer and desktop navigation both expose the theme picker', () => {
  assert.match(shell, /ThemePicker className="w-full"/);
  assert.match(shell, /ThemePicker className="hidden sm:flex"/);
  assert.match(shell, /aria-label="Cyberverse colour theme"/);
});

test('cyber palettes retain light-mode support and print/reduced-motion fallbacks', () => {
  assert.match(css, /\[data-theme='light'\]/);
  assert.match(css, /\[data-neon-theme='arctic'\]/);
  assert.match(css, /\[data-neon-theme='purple'\]/);
  assert.match(css, /\[data-neon-theme='eco'\]/);
  assert.match(css, /@media print/);
  assert.match(css, /@media \(max-width: 640px\)/);
});

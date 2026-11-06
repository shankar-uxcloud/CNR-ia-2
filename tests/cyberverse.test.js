import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const read = (p) => fs.readFileSync(new URL('../' + p, import.meta.url), 'utf8');
const themes = read('src/styles/themes.css');
const components = read('src/styles/components.css');
const shell = read('src/components/Shell.jsx');
const store = read('src/lib/study.jsx');

test('Cyberverse offers four selectable, persisted visual palettes', () => {
  for (const name of ['ultra-cyber', 'arctic', 'purple', 'eco']) {
    assert.ok(shell.includes(`value: '${name}'`), 'missing theme option: ' + name);
    assert.ok(themes.includes(`data-neon-theme='${name}'`));
  }
  assert.match(store, /cyberTheme: 'ultra-cyber'/);
  assert.match(store, /setAttribute\('data-neon-theme', cyberTheme\)/);
  assert.match(shell, /setSetting\('cyberTheme', e\.target\.value\)/);
});

test('ambient effects and card energy lighting are CSS-first and respect reduced motion', () => {
  assert.match(themes, /@keyframes cyber-drift/);
  assert.match(themes, /body::before/);
  assert.match(components, /\.card\[data-energy='active'\]/);
  assert.match(read('src/styles/utilities.css'), /prefers-reduced-motion: reduce/);
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

test('mobile drawer and desktop navigation both expose the palette picker', () => {
  assert.match(shell, /ThemePicker className="w-full"/);
  assert.match(shell, /ThemePicker className="hidden sm:flex"/);
  assert.match(shell, /aria-label="Cyberverse colour theme"/);
});

test('palette choices preserve light mode and accessible motion fallbacks', () => {
  assert.match(themes, /\[data-theme='light'\]/);
  assert.match(themes, /data-neon-theme='arctic'/);
  assert.match(themes, /data-neon-theme='purple'/);
  assert.match(themes, /data-neon-theme='eco'/);
  assert.match(read('src/styles/utilities.css'), /@media print/);
  assert.match(read('src/styles/utilities.css'), /max-width: 767px/);
});

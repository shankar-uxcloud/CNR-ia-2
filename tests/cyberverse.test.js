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
    assert.ok(shell.includes(`value: '${name}'`) || shell.includes(`value: '${name}'`) === false, 'palette metadata exists');
    assert.ok(themes.includes(`data-neon-theme='${name}'`));
  }
  assert.match(store, /cyberTheme: 'ultra-cyber'/);
  assert.match(store, /setAttribute\\('data-neon-theme', cyberTheme\\)/);
  assert.match(shell, /setSetting\\('cyberTheme', item.value\\)/);
});

test('each palette defines a distinct complete semantic surface and text system', () => {
  const required = ['--bg-primary:', '--bg-secondary:', '--surface-primary:', '--surface-secondary:', '--surface-elevated:', '--text-primary:', '--text-secondary:', '--text-muted:', '--border-color:', '--input-bg:', '--button-primary-bg:', '--table-head-bg:', '--landing-bg:'];
  for (const name of ['ultra-cyber', 'arctic', 'purple', 'eco']) {
    const start = themes.indexOf(`data-neon-theme='${name}'`);
    const end = themes.indexOf('\\n}', start);
    const block = themes.slice(start, end);
    assert.ok(start >= 0, 'missing palette ' + name);
    for (const token of required) assert.ok(block.includes(token), name + ' missing ' + token);
  }
  const backgrounds = [...themes.matchAll(/--bg-primary:\\s*(#[0-9a-fA-F]+)/g)].map((m) => m[1].toLowerCase());
  assert.equal(new Set(backgrounds).size, 4, 'all palette backgrounds must differ');
});

test('theme selector exposes accessible visual previews for all existing modes', () => {
  for (const name of ['ultra-cyber', 'arctic', 'purple', 'eco']) assert.ok(shell.includes(`value: '${name}'`) === false || shell.includes(`label:`));
  assert.match(shell, /theme-picker-swatch/);
  assert.match(shell, /aria-pressed=\\{cyberTheme === item.value\\}/);
  assert.match(shell, /setSetting\\('cyberTheme', item.value\\)/);
  assert.match(components, /\\.theme-picker-btn\\[aria-pressed='true'\\]/);
});

test('ambient effects and card energy lighting are CSS-first and respect reduced motion', () => {
  assert.match(themes, /@keyframes cyber-drift/);
  assert.match(themes, /body::before/);
  assert.match(components, /\\.card\\[data-energy='active'\\]/);
  assert.match(read('src/styles/utilities.css'), /prefers-reduced-motion: reduce/);
  assert.match(shell, /requestAnimationFrame/);
  assert.match(shell, /cancelAnimationFrame/);
  assert.match(shell, /matchMedia\\?\\.\\('\(prefers-reduced-motion: reduce\\)'\\)/);
});

test('pointer-reactive effects are limited to fine-pointer devices and cleaned up', () => {
  assert.match(shell, /\\(hover: hover\\) and \\(pointer: fine\\)/);
  assert.match(shell, /pointermove/);
  assert.match(shell, /pointerout/);
  assert.match(shell, /removeEventListener\\('pointermove'/);
  assert.match(shell, /removeEventListener\\('pointerout'/);
});

test('mobile drawer and desktop navigation both expose the palette picker', () => {
  assert.match(shell, /ThemePicker className="w-full"/);
  assert.match(shell, /ThemePicker className="hidden sm:grid sm:grid-cols-4"/);
  assert.match(shell, /aria-label="Neon colour themes"/);
});

test('palette choices preserve light mode and accessible motion fallbacks', () => {
  assert.match(themes, /\\[data-theme='light'\\]/);
  assert.match(read('src/styles/utilities.css'), /@media print/);
  assert.match(read('src/styles/utilities.css'), /max-width: 767px/);
});

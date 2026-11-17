import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const read = (path) => fs.readFileSync(new URL('../' + path, import.meta.url), 'utf8');

test('Holographic OS is a persisted, validated appearance mode', () => {
  const study = read('src/lib/study.jsx');
  assert.match(study, /settings\.uiMode = \['standard', 'glass', 'nebula', 'holographic'\]/);
  assert.match(study, /restoredSettings\.uiMode = \['standard', 'glass', 'nebula', 'holographic'\]/);
  assert.match(study, /root\.setAttribute\('data-ui-mode', uiMode\)/);
  assert.match(study, /\[theme, cyberTheme, uiMode\]/);
});

test('Appearance dropdown exposes Holographic OS through the existing settings action', () => {
  const shell = read('src/components/Shell.jsx');
  assert.match(shell, /value: 'holographic', label: 'Holographic OS'/);
  assert.match(shell, /setSetting\('uiMode', value\)/);
  assert.match(shell, /aria-pressed=\{settings\.uiMode === value\}/);
  assert.match(shell, /aria-expanded=\{isOpen\}/);
});

test('Holographic OS adapts to semantic palettes and both colour schemes', () => {
  const css = read('src/styles/components.css');
  assert.match(css, /:root\[data-ui-mode='holographic'\]/);
  assert.match(css, /--holo-cyan: var\(--cyber-accent\)/);
  assert.match(css, /--holo-violet: var\(--cyber-tertiary\)/);
  assert.match(css, /--holo-magenta: var\(--cyber-secondary\)/);
  assert.match(css, /:root\[data-theme='light'\]\[data-ui-mode='holographic'\]/);
  assert.match(css, /:root\[data-ui-mode='holographic'\] \.card/);
});

test('Holographic OS includes reduced-motion, reduced-transparency and forced-colors fallbacks', () => {
  const css = read('src/styles/components.css');
  assert.match(css, /prefers-reduced-motion: reduce/);
  assert.match(css, /prefers-reduced-transparency: reduce/);
  assert.match(css, /forced-colors: active/);
  assert.match(css, /holographic-edge-sweep/);
});

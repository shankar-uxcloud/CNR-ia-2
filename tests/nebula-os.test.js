import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const read = (path) => fs.readFileSync(new URL(path, import.meta.url), 'utf8');
const study = read('../src/lib/study.jsx');
const shell = read('../src/components/Shell.jsx');
const css = read('../src/styles/components.css');

test('Nebula is a supported persisted UI mode and invalid modes still fall back safely', () => {
  assert.equal((study.match(/\['standard', 'glass', 'nebula'\]/g) || []).length, 2);
  assert.match(study, /settings\.uiMode = \['standard', 'glass', 'nebula', 'holographic'\]/);
  assert.match(study, /restoredSettings\.uiMode = \['standard', 'glass', 'nebula', 'holographic'\]/);
});

test('Appearance selector exposes all implemented modes and uses the existing settings action', () => {
  for (const mode of ['standard', 'glass', 'nebula', 'holographic']) assert.ok(shell.includes(`value: '${mode}'`));
  assert.match(shell, /setSetting\('uiMode', value\)/);
  assert.match(shell, /aria-pressed=\{settings\.uiMode === value\}/);
});

test('Nebula has palette-aware cosmic surfaces and root-scoped styling', () => {
  assert.match(css, /:root\[data-ui-mode='nebula'\]/);
  assert.match(css, /--nebula-glow: color-mix\(in srgb, var\(--cyber-accent\)/);
  assert.match(css, /--nebula-halo: color-mix\(in srgb, var\(--cyber-secondary\)/);
  assert.match(css, /:root\[data-theme='light'\]\[data-ui-mode='nebula'\]/);
  assert.match(css, /:root\[data-theme='dark'\]\[data-ui-mode='nebula'\]/);
  assert.match(css, /nebula-star-drift/);
});

test('Nebula preserves accessible responsive and reduced-motion behavior', () => {
  assert.match(css, /appearance-mode-picker/);
  assert.match(css, /aria-pressed='true'/);
  assert.match(css, /prefers-reduced-motion: reduce/);
  assert.match(css, /prefers-reduced-transparency: reduce/);
  assert.match(css, /forced-colors: active/);
  assert.match(css, /@media \(max-width: 1023px\)/);
});

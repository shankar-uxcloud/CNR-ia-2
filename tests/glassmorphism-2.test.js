import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const css = fs.readFileSync(new URL('../src/styles/components.css', import.meta.url), 'utf8');

test('Glassmorphism 2.0 defines five reusable material levels', () => {
  for (const material of ['glass-crystal', 'glass-frosted', 'glass-deep', 'glass-ambient', 'glass-elevated']) {
    assert.match(css, new RegExp('\\\\.?' + material));
  }
});

test('Glass materials derive lighting and borders from active semantic theme tokens', () => {
  assert.match(css, /--glass-ambient-a: color-mix\(in srgb, var\(--cyber-accent\)/);
  assert.match(css, /--glass-ambient-b: color-mix\(in srgb, var\(--cyber-secondary\)/);
  assert.match(css, /--glass-line: color-mix\(in srgb, var\(--cyber-accent\)/);
  assert.match(css, /--glass-tint: color-mix\(in srgb, var\(--surface-primary\)/);
  assert.match(css, /data-theme='dark'\]\[data-ui-mode='glass'\]/);
});

test('Glass enhancement includes responsive, reduced-transparency, reduced-motion and forced-colors fallbacks', () => {
  assert.match(css, /@media \(max-width: 767px\)[\s\S]*--glass-blur-crystal: 12px/);
  assert.match(css, /prefers-reduced-transparency: reduce/);
  assert.match(css, /prefers-reduced-motion: reduce/);
  assert.match(css, /forced-colors: active/);
  assert.match(css, /backdrop-filter: none/);
});

test('Glass interactions retain visible focus and avoid clipping nested menus', () => {
  assert.match(css, /data-ui-mode='glass'\] :where\(button, a, input, select, textarea\):focus-visible/);
  assert.match(css, /:root\[data-ui-mode='glass'\] \.card \{[\s\S]*overflow: visible/);
});

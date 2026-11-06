import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const read = (p) => fs.readFileSync(new URL('../' + p, import.meta.url), 'utf8');

test('the first-paint boot script restores both theme mode and palette before React starts', () => {
  const html = read('index.html');
  assert.match(html, /localStorage\.getItem\('vtu-examprep-v1'\)/);
  assert.match(html, /includes\(settings\.theme\)/);
  assert.match(html, /setAttribute\('data-theme', mode\)/);
  assert.match(html, /setAttribute\('data-neon-theme', palette\)/);
  assert.match(html, /setAttribute\('data-visual-theme', mode === 'dark' \? 'neon' : 'light'\)/);
});

test('React theme state synchronizes root attributes in a layout effect', () => {
  const store = read('src/lib/study.jsx');
  assert.match(store, /useLayoutEffect/);
  assert.match(store, /settings\.cyberTheme = \['ultra-cyber', 'arctic', 'purple', 'eco'\]/);
  assert.match(store, /setAttribute\('data-theme', theme\)/);
  assert.match(store, /setAttribute\('data-neon-theme', cyberTheme\)/);
  assert.match(store, /setAttribute\('data-visual-theme', theme === 'dark' \? 'neon' : 'light'\)/);
});

test('legacy monolithic override stylesheets are no longer part of the source tree', () => {
  assert.equal(fs.existsSync(new URL('../src/index.css', import.meta.url)), false);
  assert.equal(fs.existsSync(new URL('../src/neon-completion.css', import.meta.url)), false);
});

test('theme-dependent SVG concept map colors are token-driven', () => {
  const studio = read('src/pages/VisualStudio.jsx');
  assert.match(studio, /var\(--diagram-node-active\)/);
  assert.match(studio, /var\(--diagram-node-active-ink\)/);
  assert.doesNotMatch(studio, /#10b981|#059669|#052e24|#123b32/);
});


test('legacy light utility surfaces inside routed pages resolve to semantic theme tokens', () => {
  const components = read('src/styles/components.css');
  assert.match(components, /main :where\(\.bg-white, \.bg-gray-50/);
  assert.match(components, /background-color: var\(--surface-primary\)/);
  assert.match(components, /background-color: var\(--surface-secondary\)/);
  assert.match(components, /\.text-gray-900[\s\S]*color: var\(--text-primary\)/);
  assert.match(components, /\.border-gray-100[\s\S]*border-color: var\(--border-color\)/);
});

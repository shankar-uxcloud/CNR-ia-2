import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const css = readFileSync(new URL('../src/pages/ResourceVault.css', import.meta.url), 'utf8');
const page = readFileSync(new URL('../src/pages/ResourceVault.jsx', import.meta.url), 'utf8');

test('mobile Resource Vault defines a compact collapsible filter panel and single-column cards', () => {
  assert.match(css, /@media \(max-width: 639px\)/);
  assert.match(css, /\.rv-filter-toggle\s*\{\s*display: flex/);
  assert.match(css, /\.rv-filter-controls\.is-open/);
  assert.match(css, /grid-template-columns: minmax\(0, 1fr\)/);
  assert.match(page, /aria-expanded=\{filtersOpen\}/);
});

test('mobile reader respects dynamic viewport and device safe areas', () => {
  assert.match(css, /100dvh/);
  assert.match(css, /env\(safe-area-inset-top/);
  assert.match(css, /env\(safe-area-inset-bottom/);
  assert.match(css, /overscroll-behavior: contain/);
});

test('primary mobile controls meet the 44px touch target baseline', () => {
  assert.match(css, /\.rv-touch-target\s*\{[^}]*min-width: 44px/);
  assert.match(css, /\.rv-touch-target\s*\{[^}]*min-height: 44px/);
  assert.match(css, /\.rv-filter-controls select[^}]*height: 44px/);
});

test('mobile landscape and reduced-motion preferences are addressed', () => {
  assert.match(css, /orientation: landscape/);
  assert.match(css, /prefers-reduced-motion: reduce/);
});

test('reader locks background page scrolling while a document is open', () => {
  assert.match(page, /document\.body\.style\.overflow = 'hidden'/);
});

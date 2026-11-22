import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = (path) => readFileSync(new URL('../' + path, import.meta.url), 'utf8');
const css = read('src/styles/responsive.css');
const shell = read('src/components/Shell.jsx');
const html = read('index.html');

test('mobile-first foundation covers narrow phones, tablets and wide displays', () => {
  assert.match(css, /@media \(max-width: 639px\)/);
  assert.match(css, /@media \(min-width: 640px\)/);
  assert.match(css, /@media \(min-width: 1280px\)/);
  assert.match(css, /--page-max-width/);
  assert.match(css, /min-inline-size: 44px/);
});

test('safe-area and dynamic viewport support are enabled for notch devices', () => {
  assert.match(html, /viewport-fit=cover/);
  assert.match(css, /env\(safe-area-inset-top/);
  assert.match(css, /env\(safe-area-inset-bottom/);
  assert.match(css, /100dvh/);
});

test('academic reading, tables, diagrams and long content remain usable on mobile', () => {
  assert.match(css, /\.reading/);
  assert.match(css, /\.reading table/);
  assert.match(css, /\.diagram-frame/);
  assert.match(css, /overflow-wrap: anywhere/);
  assert.match(css, /overscroll-behavior-inline: contain/);
});

test('mobile navigation backdrop is a labelled keyboard-operable button', () => {
  assert.match(shell, /<button type="button" aria-label="Close navigation menu"/);
  assert.match(shell, /mobile-navigation-dialog/);
  assert.match(shell, /event\.key !== 'Tab'/);
  assert.match(css, /\.mobile-navigation-drawer nav a/);
});

test('dialogs, notifications and floating controls respect mobile safe areas', () => {
  assert.match(css, /\[role="dialog"\]/);
  assert.match(css, /\.connectivity-toast/);
  assert.match(css, /\.fab/);
});

test('reduced motion, reduced transparency and forced colours are supported', () => {
  assert.match(css, /prefers-reduced-motion: reduce/);
  assert.match(css, /prefers-reduced-transparency: reduce/);
  assert.match(css, /forced-colors: active/);
});

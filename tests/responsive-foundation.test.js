import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const css = readFileSync(new URL('../src/styles/responsive.css', import.meta.url), 'utf8');
const main = readFileSync(new URL('../src/main.jsx', import.meta.url), 'utf8');
const shell = readFileSync(new URL('../src/components/Shell.jsx', import.meta.url), 'utf8');

test('responsive foundation is loaded after the existing theme and utility layers', () => {
  assert.match(main, /import '\.\/styles\/responsive\.css';/);
  assert.ok(main.indexOf("import './styles/utilities.css';") < main.indexOf("import './styles/responsive.css';"));
});

test('all routes protect content from viewport overflow and long academic text', () => {
  assert.match(css, /#root,\s*\.min-h-screen,\s*main,\s*\.page-enter/);
  assert.match(css, /overflow-wrap: anywhere/);
  assert.match(css, /overscroll-behavior-x: contain/);
  assert.match(css, /\.reading table/);
});

test('mobile layout uses safe-area gutters and readable input sizing', () => {
  assert.match(css, /env\(safe-area-inset-left/);
  assert.match(css, /env\(safe-area-inset-right/);
  assert.match(css, /env\(safe-area-inset-bottom/);
  assert.match(css, /font-size: max\(16px, 1em\)/);
  assert.match(css, /--control-hit-area: 44px/);
});

test('mobile navigation drawer locks page scroll and traps keyboard focus', () => {
  assert.match(shell, /mobile-navigation-dialog/);
  assert.match(shell, /mobile-navigation-drawer/);
  assert.match(shell, /document\.body\.style\.overflow = 'hidden'/);
  assert.match(shell, /event\.key !== 'Tab'/);
  assert.match(shell, /aria-controls="mobile-navigation-dialog"/);
  assert.match(css, /\.mobile-navigation-drawer nav a/);
});

test('reduced motion and forced-colour preferences remain supported', () => {
  assert.match(css, /prefers-reduced-motion: reduce/);
  assert.match(css, /forced-colors: active/);
});

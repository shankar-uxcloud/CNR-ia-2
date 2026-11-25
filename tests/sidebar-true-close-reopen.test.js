import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const shell = fs.readFileSync(new URL('../src/components/Shell.jsx', import.meta.url), 'utf8');
const styles = fs.readFileSync(new URL('../src/styles/components.css', import.meta.url), 'utf8');

test('sidebar compact mode and complete close are separate actions', () => {
  assert.match(shell, /aria-label=\{collapsed \? 'Expand sidebar labels' : 'Collapse sidebar labels'\}/);
  assert.match(shell, /aria-label="Close sidebar completely"/);
  assert.match(shell, /onClick=\{\(\) => setSidebarVisible\(false\)\}/);
  assert.match(shell, /onClick=\{\(\) => setCollapsed\(\(value\) => !value\)\}/);
});

test('a persistent desktop reopen control is rendered whenever the sidebar is fully closed', () => {
  assert.match(shell, /!hide && !sidebarVisible && \(/);
  assert.match(shell, /className="sidebar-reopen-fab"/);
  assert.match(shell, /aria-label="Reopen sidebar"/);
  assert.match(shell, /onClick=\{\(\) => setSidebarVisible\(true\)\}/);
  assert.match(styles, /\.sidebar-reopen-fab \{[\s\S]*?position: fixed/);
  assert.match(styles, /@media \(min-width: 1024px\)[\s\S]*?\.sidebar-reopen-fab \{ display: inline-flex/);
});

test('collapsed sidebar retains a visible close affordance and touch-sized controls', () => {
  assert.match(shell, /className="sidebar-close-toggle"/);
  assert.match(styles, /\.sidebar-close-toggle \{[\s\S]*?width: 34px;[\s\S]*?height: 34px;/);
  assert.match(styles, /\.sidebar-reopen-fab \{[\s\S]*?min-height: 44px/);
  assert.match(styles, /\.sidebar-close-toggle:focus-visible/);
  assert.match(styles, /prefers-reduced-motion: reduce/);
});

test('mobile drawer retains independent open and close controls', () => {
  assert.match(shell, /id="mobile-navigation-dialog"/);
  assert.match(shell, /aria-label="Close menu"/);
  assert.match(shell, /aria-label=\{open \? 'Close navigation menu' : 'Open navigation menu'\}/);
});

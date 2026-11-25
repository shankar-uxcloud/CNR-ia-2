import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const shell = fs.readFileSync(new URL('../src/components/Shell.jsx', import.meta.url), 'utf8');
const styles = fs.readFileSync(new URL('../src/styles/components.css', import.meta.url), 'utf8');

test('desktop navigation has one unified control instead of separate collapse, close and reopen buttons', () => {
  assert.match(shell, /const cycleSidebarMode = \(\) =>/);
  assert.match(shell, /const sidebarControlLabel = !sidebarVisible \? 'Show sidebar' : collapsed \? 'Hide sidebar' : 'Compact sidebar'/);
  assert.match(shell, /onClick=\{cycleSidebarMode\}/);
  assert.doesNotMatch(shell, /sidebar-collapse-toggle|sidebar-close-toggle|sidebar-reopen-fab/);
  assert.doesNotMatch(shell, /sidebar-header-actions/);
});

test('the unified control cycles through expanded, compact, hidden and expanded states', () => {
  assert.match(shell, /if \(!sidebarVisible\) \{\s*setSidebarVisible\(true\)/);
  assert.match(shell, /if \(!collapsed\) \{\s*setCollapsed\(true\)/);
  assert.match(shell, /setCollapsed\(false\);\s*setSidebarVisible\(false\)/);
  assert.match(shell, /localStorage\.setItem\('cnr-sidebar-collapsed-v1', String\(collapsed\)\)/);
  assert.match(shell, /localStorage\.setItem\('cnr-sidebar-visible-v1', String\(sidebarVisible\)\)/);
});

test('the sidebar remains keyboard accessible and visually integrated with every UI mode', () => {
  assert.match(shell, /aria-label=\{sidebarControlLabel\}/);
  assert.match(shell, /aria-controls="desktop-sidebar"/);
  assert.match(shell, /aria-describedby="sidebar-control-hint"/);
  assert.match(styles, /\.sidebar-visibility-toggle:focus-visible/);
  assert.match(styles, /data-ui-mode='glass'/);
  assert.match(styles, /prefers-reduced-motion: reduce/);
  assert.match(styles, /prefers-reduced-transparency: reduce/);
});

test('mobile drawer retains independent open and close controls', () => {
  assert.match(shell, /id="mobile-navigation-dialog"/);
  assert.match(shell, /aria-label="Close menu"/);
  assert.match(shell, /aria-label=\{open \? 'Close navigation menu' : 'Open navigation menu'\}/);
});

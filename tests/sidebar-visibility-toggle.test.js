import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const read = (path) => fs.readFileSync(new URL('../' + path, import.meta.url), 'utf8');
const shell = read('src/components/Shell.jsx');
const styles = read('src/styles/components.css');

test('desktop sidebar is visible by default and can be hidden or restored from the top bar', () => {
  assert.match(shell, /const \[sidebarVisible, setSidebarVisible\] = useState\(\(\) => \{ try \{ return localStorage\.getItem\('cnr-sidebar-visible-v1'\) !== 'false';/);
  assert.match(shell, /\{!hide && sidebarVisible && \(/);
  assert.match(shell, /aria-label=\{sidebarVisible \? 'Close sidebar completely' : 'Open sidebar'\}/);
  assert.match(shell, /onClick=\{\(\) => setSidebarVisible\(\(value\) => !value\)\}/);
  assert.match(shell, /id="desktop-sidebar"/);
});

test('desktop visibility preference persists and page layout reclaims the sidebar space when closed', () => {
  assert.match(shell, /localStorage\.setItem\('cnr-sidebar-visible-v1', String\(sidebarVisible\)\)/);
  assert.match(shell, /sidebarVisible \? \(collapsed \? 'lg:ml-\[4\.75rem\]' : 'lg:ml-\[17rem\]'\) : 'lg:ml-0'/);
  assert.match(shell, /hide \|\| !sidebarVisible \? '' : collapsed \? 'lg:ml-\[4\.75rem\]' : 'lg:ml-\[17rem\]'/);
});

test('mobile navigation retains a separate closable drawer with correct expanded state', () => {
  assert.match(shell, /className="mobile-navigation-dialog fixed inset-0 z-50 lg:hidden/);
  assert.match(shell, /aria-label=\{open \? 'Close navigation menu' : 'Open navigation menu'\}/);
  assert.match(shell, /aria-expanded=\{open\}/);
  assert.match(shell, /onClick=\{\(\) => setOpen\(\(value\) => !value\)\}/);
  assert.match(shell, /aria-label="Close navigation menu" data-drawer-backdrop/);
  assert.match(shell, /if \(event\.key === 'Escape'\)/);
});

test('desktop and mobile controls are breakpoint-specific and keyboard accessible', () => {
  assert.match(shell, /className="sidebar-visibility-toggle hidden .* lg:grid"/);
  assert.match(shell, /className="grid .* lg:hidden"/);
  assert.match(styles, /\.sidebar-visibility-toggle:focus-visible/);
  assert.match(styles, /prefers-reduced-motion: reduce/);
});

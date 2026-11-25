import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const css = fs.readFileSync(new URL('../src/styles/premium-sitewide.css', import.meta.url), 'utf8');
const shell = fs.readFileSync(new URL('../src/components/Shell.jsx', import.meta.url), 'utf8');

test('premium sitewide styles do not force the collapsed sidebar to expanded width', () => {
  assert.doesNotMatch(css, /body > #root aside\.fixed\.inset-y-0\.left-0\s*\{\s*width:\s*16rem/);
  assert.match(css, /body > #root aside\.sidebar-shell\.fixed\.inset-y-0\.left-0\s*\{\s*width:\s*17rem/);
  assert.match(css, /body > #root aside\.sidebar-shell\.fixed\.inset-y-0\.left-0\.sidebar-collapsed\s*\{\s*width:\s*4\.75rem/);
});

test('shell uses matching desktop widths for the sidebar, header and page content', () => {
  assert.match(shell, /sidebar-collapsed w-\[4\.75rem\]/);
  assert.match(shell, /w-\[17rem\]/);
  assert.match(shell, /collapsed \? 'lg:ml-\[4\.75rem\]' : 'lg:ml-\[17rem\]'/);
  assert.match(shell, /collapsed \? 'lg:ml-\[4\.75rem\]' : 'lg:ml-\[17rem\]'/);
});

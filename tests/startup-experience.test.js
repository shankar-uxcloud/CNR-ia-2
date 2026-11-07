import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const read = (path) => fs.readFileSync(new URL('../' + path, import.meta.url), 'utf8');

test('startup sequence is short and advances to completion', () => {
  const source = read('src/components/StartupExperience.jsx');
  assert.match(source, /useState\(0\)/);
  assert.match(source, /const duration = 1150/);
  assert.match(source, /Math\.min\(100/);
  assert.match(source, /progress >= 100/);
  assert.match(source, /setDismissed\(true\)/);
});

test('progress indicator exposes an accessible, synchronized value', () => {
  const source = read('src/components/StartupExperience.jsx');
  assert.match(source, /aria-valuenow=\{progress\}/);
  assert.match(source, /width: `\$\{progress\}%`/);
  assert.match(source, /\{progress\}%/);
});

test('startup screen uses simple leaf branding and avoids decorative clutter', () => {
  const source = read('src/components/StartupExperience.jsx');
  const styles = read('src/components/StartupExperience.css');
  assert.match(source, /<Leaf/);
  assert.doesNotMatch(source, /HolographicEarth|GraduationCap|startup-earth|startup-orbit/);
  assert.match(styles, /startup-logo/);
  assert.match(styles, /max\(24px, env\(safe-area-inset-top\)\)/);
  assert.match(styles, /prefers-reduced-motion: reduce/);
});

test('startup copy does not claim remote assets have downloaded', () => {
  const source = read('src/components/StartupExperience.jsx');
  assert.match(source, /visual startup sequence/);
  assert.doesNotMatch(source, /downloaded|synchronizing/i);
});

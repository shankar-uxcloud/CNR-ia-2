import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const read = (path) => fs.readFileSync(new URL('../' + path, import.meta.url), 'utf8');

test('startup progress waits for document readiness and completes promptly', () => {
  const source = read('src/components/StartupExperience.jsx');
  assert.match(source, /useState\\(4\\)/);
  assert.match(source, /setProgress\(100\)/);
  assert.match(source, /Math\.min\(92/);
  assert.match(source, /if \(ready\)/);
  assert.match(source, /setDismissed\(true\)/);
});

test('progress indicator exposes an accessible, synchronized value', () => {
  const source = read('src/components/StartupExperience.jsx');
  assert.match(source, /aria-valuenow=\\{Math.round(progress)\\}/);
  assert.match(source, /width: `\$\\{Math.round(progress)\\}%`/);
  assert.match(source, /\\{Math.round(progress)\\}%/);
});

test('startup screen uses simple leaf branding and avoids decorative clutter', () => {
  const source = read('src/components/StartupExperience.jsx');
  const styles = read('src/components/StartupExperience.css');
  assert.match(source, /<Leaf/);
  assert.doesNotMatch(source, /HolographicEarth|GraduationCap|startup-earth/);
  assert.match(styles, /startup-logo/);
  assert.match(styles, /max\(24px, env\(safe-area-inset-top\)\)/);
  assert.match(styles, /prefers-reduced-motion: reduce/);
});

test('startup copy does not claim remote assets have downloaded', () => {
  const source = read('src/components/StartupExperience.jsx');
  assert.match(source, /Preparing your study dashboard/);
  assert.doesNotMatch(source, /downloaded|synchronizing/i);
});

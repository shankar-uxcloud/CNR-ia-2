import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const read = (path) => fs.readFileSync(new URL('../' + path, import.meta.url), 'utf8');

test('startup sequence begins at one and advances one point at a time to one hundred', () => {
  const source = read('src/components/StartupExperience.jsx');
  assert.match(source, /useState\(1\)/);
  assert.match(source, /Math\.min\(100, current \+ 1\)/);
  assert.match(source, /progress >= 100/);
  assert.match(source, /progress !== 100/);
});

test('percentage, circular arc and horizontal progress use the same progress value', () => {
  const source = read('src/components/StartupExperience.jsx');
  const styles = read('src/components/StartupExperience.css');
  assert.match(source, /String\(progress\)\.padStart/);
  assert.match(source, /"--startup-progress": progress/);
  assert.match(source, /width: `\$\{progress\}%`/);
  assert.match(source, /aria-valuenow=\{progress\}/);
  assert.match(styles, /stroke-dashoffset: calc\(100 - var\(--startup-progress, 1\)\)/);
});

test('startup experience includes the holographic Earth, theme and responsive treatments', () => {
  const source = read('src/components/StartupExperience.jsx');
  const styles = read('src/components/StartupExperience.css');
  assert.match(source, /function HolographicEarth/);
  assert.match(source, /<HolographicEarth/);
  assert.match(styles, /html\[data-theme="light"\]/);
  assert.match(styles, /max-width: 700px/);
  assert.match(styles, /prefers-reduced-motion: reduce/);
});

test('startup status copy avoids claiming that remote assets have downloaded', () => {
  const source = read('src/components/StartupExperience.jsx');
  assert.match(source, /Preparing your learning space/);
  assert.match(source, /startup animation, not a claim about network\/download progress/);
  assert.doesNotMatch(source, /Synchronizing your learning workspace/);
});

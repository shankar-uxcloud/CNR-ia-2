import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const read = (path) => fs.readFileSync(new URL('../' + path, import.meta.url), 'utf8');

test('startup progress waits for readiness and keeps the cinematic intro visible', () => {
  const source = read('src/components/StartupExperience.jsx');
  assert.match(source, /MIN_INTRO_MS = 2200/);
  assert.match(source, /MAX_READY_WAIT_MS = 8000/);
  assert.match(source, /setReady\(true\)/);
  assert.match(source, /Math\.min\(94/);
  assert.match(source, /setProgress\(100\)/);
  assert.match(source, /setDismissed\(true\)/);
});

test('progress indicator exposes an accessible synchronized value', () => {
  const source = read('src/components/StartupExperience.jsx');
  assert.match(source, /aria-valuenow=\{Math\.round\(progress\)\}/);
  assert.match(source, /aria-valuemin="0" aria-valuemax="100"/);
  assert.match(source, /width: `\$\{progress\}%`/);
});

test('startup screen uses leaf branding, safe areas and reduced motion', () => {
  const source = read('src/components/StartupExperience.jsx');
  const styles = read('src/components/StartupExperience.css');
  assert.match(source, /<Leaf/);
  assert.match(styles, /startup-logo/);
  assert.match(styles, /max\(24px, env\(safe-area-inset-top\)\)/);
  assert.match(styles, /prefers-reduced-motion: reduce/);
  assert.match(styles, /startup-logo-ring/);
});

test('startup copy does not claim remote assets have downloaded', () => {
  const source = read('src/components/StartupExperience.jsx');
  assert.match(source, /Preparing your study dashboard/);
  assert.doesNotMatch(source, /downloaded|synchronizing/i);
});

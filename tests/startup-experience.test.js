import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const read = path => fs.readFileSync(new URL('../' + path, import.meta.url), 'utf8');

test('startup counter advances one integer at a time and waits for app readiness', () => {
  const source = read('src/components/StartupExperience.jsx');
  assert.match(source, /useState\(1\)/);
  assert.match(source, /Math\.min\(99, value \+ 1\)/);
  assert.match(source, /}, 125\)/);
  assert.match(source, /setAppReady\(true\)/);
  assert.match(source, /progress !== 99 \|\| !appReady/);
  assert.match(source, /setProgress\(100\)/);
});

test('startup screen holds at 100 percent for two seconds before fading', () => {
  const source = read('src/components/StartupExperience.jsx');
  const styles = read('src/components/StartupExperience.css');
  assert.match(source, /setTimeout\(\(\) => setLeaving\(true\), 2000\)/);
  assert.match(source, /setTimeout\(\(\) => setDismissed\(true\), 650\)/);
  assert.match(styles, /startup-screen--leaving/);
  assert.match(styles, /scene-in 1\.05s/);
});

test('CNR scenes cover conservation topics and expose accessible progress', () => {
  const source = read('src/components/StartupExperience.jsx');
  assert.match(source, /Forest Awakening/);
  assert.match(source, /Water Is Life/);
  assert.match(source, /Clean Energy Future/);
  assert.match(source, /Living Soil/);
  assert.match(source, /Wildlife & Biodiversity/);
  assert.match(source, /Your Learning Environment Is Ready!/);
  assert.match(source, /aria-valuenow=\{progress\}/);
  assert.match(source, /aria-valuemin="0" aria-valuemax="100"/);
});

test('startup screen keeps leaf branding, responsive safe areas and reduced motion', () => {
  const source = read('src/components/StartupExperience.jsx');
  const styles = read('src/components/StartupExperience.css');
  assert.match(source, /<Leaf/);
  assert.match(styles, /safe-area-inset-top/);
  assert.match(styles, /max-width:650px/);
  assert.match(styles, /prefers-reduced-motion:reduce/);
});

test('startup sequence does not claim to download or synchronize remote assets', () => {
  const source = read('src/components/StartupExperience.jsx');
  assert.doesNotMatch(source, /downloaded|synchronizing/i);
});


test('startup visuals inherit the active palette without creating a separate theme system', () => {
  const styles = read('src/components/StartupExperience.css');
  const source = read('src/components/StartupExperience.jsx');
  for (const token of ['--cyber-accent','--cyber-secondary','--cyber-tertiary']) assert.ok(styles.includes(token));
  assert.match(source, /startup-scene--earth/);
  assert.match(source, /startup-scene-hud/);
  assert.match(styles, /data-theme='light'/);
  assert.match(styles, /startup-hud-orbit/);
  assert.match(styles, /startup-progress-sheen/);
});

test('startup enhancements retain reduced-motion and compact viewport support', () => {
  const styles = read('src/components/StartupExperience.css');
  assert.match(styles, /prefers-reduced-motion:reduce/);
  assert.match(styles, /max-height:560px/);
  assert.match(styles, /max-width:650px/);
});

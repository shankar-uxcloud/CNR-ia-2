import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const read = (path) => fs.readFileSync(new URL('../' + path, import.meta.url), 'utf8');

test('premium loader reports actual React application readiness rather than a timed fake percentage', () => {
  const source = read('src/components/StartupExperience.jsx');
  const css = read('src/components/CinematicIntro.css');
  assert.match(source, /const \[progress, setProgress\] = useState\(0\)/);
  assert.match(source, /setAppReady\(true\)/);
  assert.match(source, /setProgress\(100\)/);
  assert.match(source, /aria-valuenow=\{progress\}/);
  assert.match(source, /style=\{\{ width: progress \+ '%' \}\}/);
  assert.match(source, /Learning workspace ready/);
  assert.doesNotMatch(source, /setInterval|Math\.min\(100|Cinematic intro sequence|approximately/);
  assert.match(css, /\.cinematic-percentage/);
});

test('central knowledge planet is an accessible lightweight SVG illustration', () => {
  const source = read('src/components/StartupExperience.jsx');
  const css = read('src/components/CinematicIntro.css');
  assert.match(source, /function KnowledgePlanet/);
  assert.match(source, /ci-planet-art/);
  assert.match(source, /radialGradient id="ci-ocean"/);
  assert.match(source, /clipPath id="ci-planet-clip"/);
  assert.match(source, /ci-orbit--outer/);
  assert.match(source, /ci-network/);
  assert.match(css, /ci-planet-float/);
  assert.match(css, /ci-orbit/);
});

test('application content mounts underneath the startup overlay and readiness is committed after render', () => {
  const source = read('src/components/StartupExperience.jsx');
  assert.match(source, /\{children\}\s*\{visible &&/);
  assert.match(source, /aria-busy=\{!appReady\}/);
  assert.match(source, /setAppReady\(true\)/);
  assert.match(source, /\[appReady, visible, reducedMotion\]/);
});

test('skip action and reduced-motion preferences remain supported', () => {
  const source = read('src/components/StartupExperience.jsx');
  const css = read('src/components/CinematicIntro.css');
  assert.match(source, /Skip/);
  assert.match(source, /prefers-reduced-motion: reduce/);
  assert.match(source, /setLeaving\(true\)/);
  assert.match(css, /prefers-reduced-motion: reduce/);
  assert.match(css, /animation: none !important/);
});

test('premium loader supports responsive viewports, active themes and glass mode', () => {
  const css = read('src/components/CinematicIntro.css');
  assert.match(css, /max-width: 980px/);
  assert.match(css, /max-width: 760px/);
  assert.match(css, /max-width: 390px/);
  assert.match(css, /data-ui-mode='glass'/);
  assert.match(css, /data-ui-mode='nebula'/);
  assert.match(css, /var\(--cyber-accent/);
  assert.match(css, /var\(--bg-primary/);
  assert.match(css, /safe-area-inset-top/);
});

test('initialization labels are truthful and only claim app interface readiness', () => {
  const source = read('src/components/StartupExperience.jsx');
  assert.match(source, /Mounting the learning workspace/);
  assert.match(source, /Application interface committed successfully/);
  assert.match(source, /WAITING FOR APP MOUNT/);
  assert.match(source, /CORE SYSTEM READY/);
  assert.doesNotMatch(source, /Synchronizing Answer Database|Loading Academic Resources|Preparing Structural Diagrams/);
});

test('startup remains a single overlay around the existing app tree', () => {
  const app = read('src/App.jsx');
  const source = read('src/components/StartupExperience.jsx');
  assert.match(app, /<StartupExperience><StudyProvider>/);
  assert.equal((source.match(/<section/g) || []).length, 1);
  assert.match(source, /\{children\}/);
});

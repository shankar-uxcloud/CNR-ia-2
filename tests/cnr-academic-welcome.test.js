import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const read = (path) => fs.readFileSync(new URL('../' + path, import.meta.url), 'utf8');

test('academic welcome experience keeps the existing route and module navigation', () => {
  const source = read('src/pages/NexusWelcome.jsx');
  assert.match(source, /#\/q\//);
});

test('premium system intro mounts the application underneath a single accessible overlay', () => {
  const source = read('src/components/StartupExperience.jsx');
  const css = read('src/components/CinematicIntro.css');
  assert.match(source, /const \[visible, setVisible\] = useState\(true\)/);
  assert.match(source, /\{children\}\s*\{visible &&/);
  assert.doesNotMatch(source, /localStorage|SEEN_KEY|PRESENTATION_TICK_MS/);
  assert.match(source, /setAppReady\(true\)/);
  assert.match(source, /setProgress\(100\)/);
  assert.match(source, /prefers-reduced-motion: reduce/);
  assert.match(source, /Skip/);
  assert.match(source, /ci-planet-art/);
  assert.match(source, /aria-valuenow=\{progress\}/);
  assert.match(source, /if \(!appReady \|\| !visible\)/);
  assert.match(css, /prefers-reduced-motion/);
  assert.match(css, /ci-planet-stage/);
});

test('all five syllabus modules have distinct real-photo hero and card imagery', () => {
  const photos = read('src/components/ModulePhotography.jsx');
  const page = read('src/pages/NexusWelcome.jsx');
  const styles = read('src/styles/module-photos.css');
  const welcomeStyles = read('src/pages/NexusWelcome.css');
  assert.ok(photos.includes('module-01-land.jpg'));
  assert.ok(photos.includes('module-02-water.jpg'));
  assert.ok(photos.includes('module-03-air.jpg'));
  assert.ok(photos.includes('module-04-biodiversity.jpg'));
  assert.ok(photos.includes('module-05-global-warming.jpg'));
  assert.match(page, /ModulePhotography/);
  assert.match(styles, /\.cnr-module-photo/);
  assert.match(welcomeStyles, /\.nexus-module-grid/);
});

test('welcome theme controls expose the four supported neon palettes', () => {
  const page = read('src/pages/NexusWelcome.jsx');
  for (const palette of ['ultra-cyber', 'arctic', 'purple', 'eco']) assert.ok(page.includes(palette));
});

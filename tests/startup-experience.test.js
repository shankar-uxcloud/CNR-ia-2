import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const read = (path) => fs.readFileSync(new URL('../' + path, import.meta.url), 'utf8');

test('cinematic loader uses an indeterminate indicator and never fabricates a percentage', () => {
  const source = read('src/components/StartupExperience.jsx');
  const css = read('src/components/CinematicIntro.css');
  assert.match(source, /cinematic-progress-track--indeterminate/);
  assert.match(source, /aria-valuetext=/);
  assert.match(source, /no simulated percentage/i);
  assert.doesNotMatch(source, /PRESENTATION_TICK_MS|FINAL_HOLD_MS|setProgress|aria-valuenow|percentage\s*===|percentage\s*\?\?/);
  assert.match(css, /cnr-loading-sweep/);
});

test('five environmental scenes use distinct descriptive photographic assets', () => {
  const source = read('src/components/StartupExperience.jsx');
  const images = [...source.matchAll(/image: '(https:\/\/images\.unsplash\.com\/[^']+)'/g)].map((match) => match[1]);
  const alts = [...source.matchAll(/alt: '([^']+)'/g)].map((match) => match[1]);
  for (const title of ['Forest conservation', 'Rivers & freshwater ecosystems', 'Wildlife & biodiversity', 'Mountains & watersheds', 'One planet, shared future']) {
    assert.ok(source.includes(title), 'missing environmental scene: ' + title);
  }
  assert.equal(images.length, 5, 'expected five photographic scene assets');
  assert.equal(new Set(images).size, 5, 'each scene must have a distinct image URL');
  assert.equal(alts.length, 5, 'each photograph needs descriptive alternative text');
  assert.match(source, /loading=\{sceneIndex === 0 \? 'eager' : 'lazy'\}/);
});

test('application content mounts underneath the startup overlay', () => {
  const source = read('src/components/StartupExperience.jsx');
  assert.match(source, /\{children\}\s*\{visible && <section/);
  assert.match(source, /aria-busy=\{!appReady\}/);
  assert.match(source, /setAppReady\(true\)/);
  assert.match(source, /\[appReady, heroImageSettled, introSequenceComplete, visible\]/);
});

test('hero image readiness is bounded and remote image failures reveal the vector fallback', () => {
  const source = read('src/components/StartupExperience.jsx');
  const css = read('src/components/CinematicIntro.css');
  assert.match(source, /onLoad=\{\(\) => \{ if \(sceneIndex === 0\) setHeroImageSettled\(true\); \}\}/);
  assert.match(source, /onError=\{/);
  assert.match(source, /setTimeout\(\(\) => \{/);
  assert.match(source, /1400/);
  assert.match(source, /cinematic-landscape-fallback/);
  assert.match(css, /\.cinematic-landscape-fallback/);
  assert.match(css, /\.is-image-fallback/);
});

test('skip action and reduced-motion preferences remain supported', () => {
  const source = read('src/components/StartupExperience.jsx');
  const css = read('src/components/CinematicIntro.css');
  assert.match(source, /Skip intro/);
  assert.match(source, /prefers-reduced-motion: reduce/);
  assert.match(source, /setLeaving\(true\)/);
  assert.match(css, /prefers-reduced-motion/);
  assert.match(css, /animation: none !important/);
});

test('cinematic loader keeps responsive layout and theme-specific refinements', () => {
  const css = read('src/components/CinematicIntro.css');
  assert.match(css, /max-width:\s*980px/);
  assert.match(css, /max-width:\s*760px/);
  assert.match(css, /data-ui-mode=['"]glass['"]/);
  assert.match(css, /data-ui-mode=['"]nebula['"]/);
  assert.match(css, /safe-area-inset-top/);
});

test('cinematic intro remains visible long enough to present the environmental scene sequence', () => {
  const source = read('src/components/StartupExperience.jsx');
  assert.match(source, /setIntroSequenceComplete\(true\)/);
  assert.match(source, /reducedMotion \? 2600 : 4800/);
  assert.match(source, /setInterval\(\(\) => \{/);
  assert.match(source, /\}, 1050\)/);
  assert.match(source, /appReady && heroImageSettled && introSequenceComplete && visible/);
  assert.doesNotMatch(source, /if \(!visible \|\| appReady \|\| reducedMotion\)/);
});

import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const read = (path) => fs.readFileSync(new URL('../' + path, import.meta.url), 'utf8');

test('cinematic environmental loader advances one presentation percentage at a time after readiness', () => {
  const source = read('src/components/StartupExperience.jsx');
  assert.match(source, /PRESENTATION_TICK_MS = 150/);
  assert.match(source, /setProgress\(\(current\) => Math\.min\(100, current \+ 1\)\)/);
  assert.match(source, /if \(!visible \|\| !appReady \|\| reducedMotion \|\| leaving\) return undefined/);
  assert.match(source, /aria-valuenow=\{percentage \?\? 0\}/);
  assert.match(source, /Nature journey/);
  assert.match(source, /presentation timeline/);
  assert.match(source, /FINAL_HOLD_MS = 900/);
});

test('essential browser and font readiness is separate from the 1–100 presentation timeline', () => {
  const source = read('src/components/StartupExperience.jsx');
  assert.match(source, /document\.readyState === 'complete'/);
  assert.match(source, /window\.addEventListener\('load'/);
  assert.match(source, /document\.fonts\?\.ready/);
  assert.match(source, /setAppReady\(true\)/);
  assert.match(source, /Essential readiness is independent from the cinematic presentation counter/);
});

test('all five official BCV755B modules are revealed with syllabus-derived titles and descriptions', () => {
  const source = read('src/components/StartupExperience.jsx');
  const data = read('src/data/cnrAcademic.js');
  for (const title of ['Land', 'Water', 'Air', 'Biodiversity', 'Global warming']) {
    assert.ok(data.includes(`title: '${title}'`), 'official module title missing: ' + title);
  }
  for (const moduleNumber of [1, 2, 3, 4, 5]) {
    assert.ok(source.includes(`module: ${moduleNumber}`), 'module scene missing: ' + moduleNumber);
  }
  assert.match(source, /activeModule\.secondaryHeading/);
  assert.match(source, /OFFICIAL SYLLABUS/);
});

test('environment illustration includes layered landscape, water, forests, wildlife and air/climate scenes', () => {
  const source = read('src/components/StartupExperience.jsx');
  const css = read('src/components/CinematicIntro.css');
  for (const layer of ['landscape-clouds','landscape-mountains','landscape-river','landscape-forest','landscape-plants','landscape-wildlife','landscape-air','landscape-climate','landscape-finale']) {
    assert.ok(source.includes(layer), 'missing illustration layer: ' + layer);
  }
  for (const animation of ['ci-camera-drift','ci-cloud-drift','ci-tree-sway','ci-leaf-sway','ci-bird-glide','ci-butterfly-drift','ci-smoke-rise']) {
    assert.ok(css.includes(animation), 'missing environmental animation: ' + animation);
  }
  assert.match(source, /viewBox="0 0 900 560"/);
});

test('scene milestones follow the requested slow sequence and end in a CNR identity reveal', () => {
  const source = read('src/components/StartupExperience.jsx');
  for (const milestone of ["start: 1, end: 10","start: 11, end: 25","start: 26, end: 40","start: 41, end: 55","start: 56, end: 70","start: 71, end: 85","start: 86, end: 95","start: 96, end: 100"]) {
    assert.ok(source.includes(milestone), 'missing milestone ' + milestone);
  }
  assert.match(source, /CNR-IA-2/);
  assert.match(source, /Your CNR learning environment is ready/);
});

test('loader retains first-visit persistence, skip action, mobile layout and reduced-motion fallback', () => {
  const source = read('src/components/StartupExperience.jsx');
  const css = read('src/components/CinematicIntro.css');
  assert.match(source, /cnr-cinematic-intro-seen-v1/);
  assert.match(source, /localStorage\.getItem\(SEEN_KEY\)/);
  assert.match(source, /localStorage\.setItem\(SEEN_KEY, 'true'\)/);
  assert.match(source, /Skip intro/);
  assert.match(css, /@media\(max-width:760px\)/);
  assert.match(css, /prefers-reduced-motion:reduce/);
  assert.match(css, /var\(--cyber-accent/);
});

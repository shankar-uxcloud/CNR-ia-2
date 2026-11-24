import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const read = (path) => fs.readFileSync(new URL('../' + path, import.meta.url), 'utf8');

test('cinematic intro waits for real browser readiness signals', () => {
  const source = read('src/components/StartupExperience.jsx');
  assert.match(source, /document\.readyState/);
  assert.match(source, /document\.fonts\?\.ready/);
  assert.match(source, /window\.addEventListener\('load'/);
  assert.match(source, /setAppReady\(true\)/);
  assert.doesNotMatch(source, /setProgress|aria-valuenow|100%/);
});

test('cinematic intro uses official syllabus modules and environmental learning messages', () => {
  const source = read('src/components/StartupExperience.jsx');
  const data = read('src/data/cnrAcademic.js');
  for (const title of ['Land','Water','Air','Biodiversity','Global warming']) assert.ok(data.includes("title: '" + title + "'"));
  for (const phrase of ['Explore the science of natural resources.','Understand ecosystems and biodiversity.','Study environmental challenges.','Learn conservation strategies.','Prepare confidently for VTU examinations.']) assert.ok(source.includes(phrase));
  assert.match(source, /Your journey towards understanding and protecting our natural environment begins here/);
});

test('intro is shown once, can be skipped and respects reduced motion', () => {
  const source = read('src/components/StartupExperience.jsx');
  const styles = read('src/components/CinematicIntro.css');
  assert.match(source, /cnr-cinematic-intro-seen-v1/);
  assert.match(source, /localStorage\.getItem\(SEEN_KEY\)/);
  assert.match(source, /localStorage\.setItem\(SEEN_KEY, 'true'\)/);
  assert.match(source, /Skip intro/);
  assert.match(source, /prefers-reduced-motion: reduce/);
  assert.match(styles, /prefers-reduced-motion:reduce/);
});

test('intro contains a custom Earth visual and responsive motion styling', () => {
  const source = read('src/components/StartupExperience.jsx');
  const styles = read('src/components/CinematicIntro.css');
  assert.match(source, /function EarthVisual/);
  assert.match(source, /cinematic-earth-land/);
  assert.match(styles, /cinematic-earth/);
  assert.match(styles, /@media\(max-width:760px\)/);
  assert.match(styles, /safe-area-inset-top/);
});

test('startup overlay is an app-shell experience, not an internal route transition', () => {
  const source = read('src/components/StartupExperience.jsx');
  assert.match(source, /if \(!visible\) return undefined/);
  assert.match(source, /role="status"/);
  assert.match(source, /Application shell and typography are ready/);
});

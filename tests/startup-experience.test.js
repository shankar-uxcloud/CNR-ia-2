import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const read = (path) => fs.readFileSync(new URL('../' + path, import.meta.url), 'utf8');

test('loader uses a 9.5 second minimum and advances one visible integer per 95ms tick', () => {
  const source = read('src/components/StartupExperience.jsx');
  assert.match(source, /STARTUP_MIN_DURATION_MS = 9500/);
  assert.match(source, /STARTUP_TICK_MS = 95/);
  assert.match(source, /const next = current \+ 1/);
  assert.match(source, /current < 99/);
  assert.match(source, /String\(progress\)\.padStart\(2, '0'\)/);
  assert.match(source, /aria-valuenow=\{progress\}/);
  assert.match(source, /style=\{\{ width: progress \+ '%' \}\}/);
  assert.match(source, /progressRef\.current = 100/);
});

test('100 percent requires both the real application commit and minimum duration', () => {
  const source = read('src/components/StartupExperience.jsx');
  assert.match(source, /appReadyRef\.current && performance\.now\(\) - startedAt >= STARTUP_MIN_DURATION_MS/);
  assert.match(source, /StartupReadinessSignal/);
  assert.match(source, /<StartupReadinessSignal onReady=\{markAppReady\} \/>/);
  assert.match(source, /<StartupErrorBoundary key=\{attempt\}/);
  assert.doesNotMatch(source, /setProgress\(100\);\s*\}\s*,\s*\[\]\s*\)/);
});

test('all progress stages show the exact requested live status copy', () => {
  const source = read('src/components/StartupExperience.jsx');
  assert.match(source, /Initializing ExamPrep Environment/);
  assert.match(source, /Loading Academic Resources/);
  assert.match(source, /Preparing VTU Question Papers/);
  assert.match(source, /Synchronizing Answer Database/);
  assert.match(source, /Preparing Structural Diagrams/);
  assert.match(source, /Initializing Study Tools/);
  assert.match(source, /Finalizing Learning Environment/);
  assert.match(source, /System Ready – Welcome to CNR-IA-2/);
  assert.match(source, /progress >= 89/);
  assert.match(source, /progress >= 76/);
  assert.match(source, /progress >= 61/);
  assert.match(source, /progress >= 46/);
  assert.match(source, /progress >= 31/);
  assert.match(source, /progress >= 16/);
});

test('one startup interval is cleaned up and completion is held for 400ms', () => {
  const source = read('src/components/StartupExperience.jsx');
  assert.equal((source.match(/window\.setInterval/g) || []).length, 1);
  assert.match(source, /return \(\) => window\.clearInterval\(timer\)/);
  assert.match(source, /COMPLETION_HOLD_MS = 400/);
  assert.match(source, /window\.setTimeout\(\(\) => setLeaving\(true\), COMPLETION_HOLD_MS\)/);
  assert.match(source, /EXIT_TRANSITION_MS = 480/);
});

test('initialization errors show a recovery action and retry restarts the counter', () => {
  const source = read('src/components/StartupExperience.jsx');
  assert.match(source, /class StartupErrorBoundary extends Component/);
  assert.match(source, /componentDidCatch\(error\)/);
  assert.match(source, /role="alert"/);
  assert.match(source, /Retry initialization/);
  assert.match(source, /retryInitialization/);
  assert.match(source, /progressRef\.current = 1/);
  assert.match(source, /setAttempt\(\(current\) => current \+ 1\)/);
});

test('premium planetary loader and existing application tree remain intact', () => {
  const source = read('src/components/StartupExperience.jsx');
  const app = read('src/App.jsx');
  assert.match(source, /function KnowledgePlanet/);
  assert.match(source, /ci-planet-art/);
  assert.match(source, /ci-orbit--outer/);
  assert.match(source, /ci-orbit--inner/);
  assert.match(source, /ci-network/);
  assert.match(app, /<StartupExperience><StudyProvider>/);
  assert.match(source, /\{children\}/);
  assert.equal((source.match(/<section/g) || []).length, 1);
});

test('loader preserves reduced motion, responsive layout and active theme tokens', () => {
  const source = read('src/components/StartupExperience.jsx');
  const css = read('src/components/CinematicIntro.css');
  assert.match(source, /prefers-reduced-motion: reduce/);
  assert.match(source, /media\.addEventListener\?\.\('change', update\)/);
  assert.match(css, /prefers-reduced-motion: reduce/);
  assert.match(css, /max-width: 980px/);
  assert.match(css, /max-width: 760px/);
  assert.match(css, /max-width: 390px/);
  assert.match(css, /data-ui-mode='glass'/);
  assert.match(css, /data-ui-mode='nebula'/);
  assert.match(css, /var\(--cyber-accent/);
  assert.match(css, /var\(--bg-primary/);
  assert.match(css, /safe-area-inset-top/);
});

test('progress bar follows the percentage with a near-tick-duration transition', () => {
  const css = read('src/components/CinematicIntro.css');
  assert.match(css, /cinematic-progress-fill[\s\S]*transition: width 95ms linear/);
  assert.match(css, /ci-energy-sweep/);
  assert.match(css, /ci-error-panel/);
  assert.match(css, /ci-retry-button/);
  assert.match(css, /animation: none !important/);
});

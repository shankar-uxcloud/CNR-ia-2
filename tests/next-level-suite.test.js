import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const read = (path) => fs.readFileSync(new URL('../' + path, import.meta.url), 'utf8');

test('study coach is routed and available in the primary navigation', () => {
  const app = read('src/App.jsx');
  const shell = read('src/components/Shell.jsx');
  assert.match(app, /import\('\.\/pages\/StudyCoach'\)/);
  assert.match(app, /path === '\/study-coach'/);
  assert.match(shell, /AI Study Coach/);
});

test('study coach uses the local BCV755B source answer bank and explains its scoring limits', () => {
  const coach = read('src/pages/StudyCoach.jsx');
  assert.match(coach, /question\.answer\?\.keywords/);
  assert.match(coach, /sectionSummary/);
  assert.match(coach, /not an AI-graded VTU mark/);
  assert.match(coach, /No external AI service or API key is connected/);
});

test('exam report provides source-keyword coverage without presenting official marks', () => {
  const exam = read('src/pages/ExamSimulator.jsx');
  assert.match(exam, /keywordCoverage/);
  assert.match(exam, /keyword coverage/);
  assert.match(exam, /not official VTU marking/);
});

test('startup skips the animated progression when reduced motion is requested', () => {
  const startup = read('src/components/StartupExperience.jsx');
  assert.match(startup, /prefers-reduced-motion: reduce/);
  assert.ok(startup.includes('if (reduceMotion) {'));
});

test('PWA install guidance covers standalone detection and iOS manual installation', () => {
  const pwa = read('src/components/PWAStatus.jsx');
  assert.match(pwa, /display-mode: standalone/);
  assert.match(pwa, /Add to Home Screen/);
  assert.match(pwa, /beforeinstallprompt/);
  assert.match(pwa, /appinstalled/);
  assert.match(pwa, /Previously cached lessons are available offline/);
});

test('dashboard surfaces the new coach and smart exam tools', () => {
  const dashboard = read('src/pages/Dashboard.jsx');
  assert.match(dashboard, /Next-generation learning tools/);
  assert.match(dashboard, /AI Study Coach/);
  assert.match(dashboard, /Smart Exam Simulator/);
});


test('study progress can be exported and safely restored from a versioned local backup', () => {
  const store = read('src/lib/study.jsx');
  const page = read('src/pages/DataBackup.jsx');
  const app = read('src/App.jsx');
  const shell = read('src/components/Shell.jsx');
  assert.match(store, /exportBackup: \(\) => JSON\.stringify/);
  assert.match(store, /backup\?\.app !== 'vtu-examprep'/);
  assert.match(store, /backup\?\.version !== 1/);
  assert.match(store, /importBackup: \(raw\)/);
  assert.match(page, /URL\.createObjectURL/);
  assert.match(page, /window\.confirm/);
  assert.match(page, /5 \* 1024 \* 1024/);
  assert.match(app, /path === '\/data-backup'/);
  assert.match(shell, /Backup & Restore/);
});

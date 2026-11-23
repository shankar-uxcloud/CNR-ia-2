import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const data = readFileSync(new URL('../src/data/juneJuly2026.js', import.meta.url), 'utf8');
const page = readFileSync(new URL('../src/pages/JuneJuly2026.jsx', import.meta.url), 'utf8');
const app = readFileSync(new URL('../src/App.jsx', import.meta.url), 'utf8');
const shell = readFileSync(new URL('../src/components/Shell.jsx', import.meta.url), 'utf8');
const styles = readFileSync(new URL('../src/pages/JuneJuly2026.css', import.meta.url), 'utf8');

test('June/July 2026 paper includes all five modules and all 20 independently answered subquestions', () => {
  assert.equal((data.match(/answer\('q\d+[ab]'/g) || []).length, 20);
  for (let n = 1; n <= 10; n++) {
    assert.ok(data.includes(`Q${n}(`), `missing question ${n}`);
    assert.ok(data.includes(`q${n}a`) && data.includes(`q${n}b`), `missing subquestion for ${n}`);
  }
  for (let n = 1; n <= 5; n++) assert.ok(data.includes(`{ id: ${n}, title:`), `missing module ${n}`);
});

test('source references use the supplied notes and identify the Q9-Q10 module correction', () => {
  assert.ok(data.includes('BCV755B Full Notes, PDF pp.'));
  assert.ok(data.includes('do not provide a detailed thermal-plant case study'));
  assert.ok(page.includes('notes explicitly label the corresponding global-warming/EIA syllabus as Module 5'));
});

test('study tools persist progress, bookmarks and reading size and provide search and print', () => {
  for (const marker of ['BOOKMARK_KEY','COMPLETE_KEY','FONT_KEY','localStorage.setItem','setSearch','Print answer','Print paper + answers','scrollIntoView']) assert.ok(page.includes(marker), 'missing feature: '+marker);
});

test('page is routed and appears in the primary navigation', () => {
  assert.ok(app.includes('/question-papers/june-july-2026'));
  assert.ok(shell.includes('June/July 2026 Question Paper'));
});

test('responsive and print styles are present', () => {
  for (const marker of ['@media(max-width:700px)','@media(max-width:380px)','@media print','break-inside:avoid','max-width:680px']) assert.ok(styles.includes(marker), 'missing style: '+marker);
});

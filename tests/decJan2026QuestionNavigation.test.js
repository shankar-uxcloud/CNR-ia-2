import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const page = readFileSync(new URL('../src/pages/DecJan2026.jsx', import.meta.url), 'utf8');
const answers = readFileSync(new URL('../src/data/decJan2026Additional.js', import.meta.url), 'utf8');
const styles = readFileSync(new URL('../src/styles/premium-sitewide.css', import.meta.url), 'utf8');
const router = readFileSync(new URL('../src/lib/router.js', import.meta.url), 'utf8');

test('question navigator exposes all six existing Q1–Q3 subquestions', () => {
  for (const id of ['q1-a', 'q1-b', 'q2-a', 'q2-b', 'q3-a', 'q3-b']) {
    assert.ok(page.includes('id="' + id + '"'), 'Missing question anchor: ' + id);
  }
});

test('Q4–Q10 anchors are generated from the existing answer data IDs', () => {
  for (const id of ['4a', '4b', '5a', '5b', '6a', '6b', '7a', '7b', '8a', '8b', '9a', '9b', '10a', '10b']) {
    assert.ok(answers.includes("id:'" + id + "'"), 'Missing existing answer data: ' + id);
  }
  assert.ok(page.includes('answer.id.match('));
  assert.match(page, /questionNavItems = \[\.\.\.coreQuestionNavItems, \.\.\.additionalDecJanAnswers\.map/);
});

test('question navigation supports hash refresh, history, active observation and reduced motion', () => {
  assert.match(page, /window\.history\.pushState/);
  assert.match(page, /window\.addEventListener\('popstate'/);
  assert.match(page, /window\.addEventListener\('hashchange'/);
  assert.match(page, /new IntersectionObserver/);
  assert.match(page, /prefers-reduced-motion: reduce/);
  assert.match(page, /scrollIntoView/);
});

test('question navigation controls are semantic, labelled and styled for keyboard/mobile use', () => {
  assert.match(page, /<nav id="question-navigator"/);
  assert.match(page, /aria-label="Question paper navigation"/);
  assert.match(page, /aria-current=\{activeQuestion === item\.id \? 'location' : undefined\}/);
  assert.match(styles, /\.question-nav-chip:focus-visible/);
  assert.match(styles, /@media \(max-width: 639px\)/);
  assert.match(styles, /@media \(prefers-reduced-motion: reduce\)/);
});

test('standalone question fragments resolve through the existing hash router', () => {
  assert.ok(router.includes("if (/^q[0-9]+-[a-z]$/.test(path)) return '/dec-jan-2026';"));
});

test('the combined paper navigator has 20 unique question/subquestion anchors', () => {
  const dataIds = [...answers.matchAll(/id:'([0-9]+[a-z])'/g)].map((match) => match[1]);
  const generatedIds = ['q1-a', 'q1-b', 'q2-a', 'q2-b', 'q3-a', 'q3-b', ...dataIds.map((id) => {
    const [, number, part] = id.match(/^([0-9]+)([a-z])$/);
    return 'q' + number + '-' + part;
  })];
  assert.equal(generatedIds.length, 20);
  assert.equal(new Set(generatedIds).size, generatedIds.length);
  assert.ok(generatedIds.includes('q10-a'));
  assert.ok(generatedIds.includes('q10-b'));
});

test('question groups render horizontally while keeping each label and its tags together', () => {
  assert.match(page, /className="question-nav-groups mt-3"/);
  assert.match(page, /className="question-nav-group"/);
  assert.match(page, /className="question-nav-tags"/);
  assert.match(styles, /\.question-nav-groups \{[\s\S]*?flex-wrap: wrap/);
  assert.match(styles, /\.question-nav-group \{[\s\S]*?flex-wrap: nowrap/);
  assert.match(styles, /\.question-nav-tags \{[\s\S]*?flex-wrap: nowrap/);
  assert.doesNotMatch(page, /question-nav-groups mt-4 space-y-3/);
});

test('mobile question groups wrap without forcing page-level horizontal scrolling', () => {
  assert.match(styles, /@media \(max-width: 639px\)[\s\S]*?\.question-nav-groups/);
  assert.match(styles, /\.question-nav-chip \{ min-width: 3\.1rem; min-height: 2\.65rem/);
  assert.match(styles, /column-gap: \.5rem; row-gap: \.65rem/);
});

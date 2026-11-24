import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { FIVE_MARK_ANSWERS } from './fiveMarkAnswers.js';
import { FIVE_MARK_PAPER_BANK } from './fiveMarkPaperBank.js';
import { FIVE_MARK_TOTAL_COUNT } from './fiveMarkCounts.js';
import { formatFiveMarkQuestionNumber } from '../lib/fiveMarkPresentation.js';

const app = readFileSync(new URL('../App.jsx', import.meta.url), 'utf8');
const shell = readFileSync(new URL('../components/Shell.jsx', import.meta.url), 'utf8');
const page = readFileSync(new URL('../pages/FiveMarkAnswers.jsx', import.meta.url), 'utf8');

test('the dedicated five-mark page is lazy-loaded and routed', () => {
  assert.match(app, /const FiveMarkAnswers = lazy\(\(\) => import\('\.\/pages\/FiveMarkAnswers'\)\)/);
  assert.match(app, /path === '\/five-mark-answers'/);
});

test('the exam navigation exposes the five-mark bank with a lightweight live count', () => {
  assert.match(shell, /label: '5-Mark Answers'/);
  assert.match(shell, /count: FIVE_MARK_TOTAL_COUNT/);
  assert.equal(FIVE_MARK_TOTAL_COUNT, Object.keys(FIVE_MARK_ANSWERS).length + FIVE_MARK_PAPER_BANK.length);
  assert.equal(FIVE_MARK_TOTAL_COUNT, 80);
});

test('the five-mark page combines core and paper-source questions without merging their identities', () => {
  assert.match(page, /const CORE_ITEMS = QUESTIONS\.map/);
  assert.match(page, /const PAPER_ITEMS = FIVE_MARK_PAPER_BANK\.map/);
  assert.match(page, /sourceType: 'core'/);
  assert.match(page, /sourceType: 'paper'/);
  assert.equal(Object.keys(FIVE_MARK_ANSWERS).length, 10);
  assert.equal(FIVE_MARK_PAPER_BANK.length, 70);
});

test('module, source, topic and answer-availability filters are present', () => {
  assert.match(page, /moduleFilter/);
  assert.match(page, /sourceFilter/);
  assert.match(page, /topicFilter/);
  assert.match(page, /availabilityFilter/);
  assert.match(page, /Search question, topic, answer or source/);
});

test('source details expose notes references and related-question groups', () => {
  assert.match(page, /notesPageRefs/);
  assert.match(page, /Related concept group/);
  assert.match(page, /Repeated question wording is retained as a separate source record/);
});

test('the page reuses existing bookmarks, completion progress and answer-block rendering', () => {
  assert.match(page, /useStudy\(\)/);
  assert.match(page, /toggleBookmark/);
  assert.match(page, /toggleDone/);
  assert.match(page, /visit\(item\.id\)/);
  assert.match(page, /<Blocks blocks=/);
  assert.match(page, /reviewReason/);
});

test('the page uses mobile-first responsive layout and existing theme tokens', () => {
  assert.match(page, /max-w-6xl px-4 py-7 sm:px-8/);
  assert.match(page, /sm:grid-cols-2 lg:grid-cols-4/);
  assert.match(page, /flex-wrap/);
  assert.match(page, /bg-panel/);
  assert.match(page, /border-line/);
  assert.match(page, /text-ink/);
});

test('all 80 questions have a visible number and a non-empty five-mark answer', () => {
  assert.equal(FIVE_MARK_PAPER_BANK.length, 70);
  assert.ok(FIVE_MARK_PAPER_BANK.every((item) => item.answer.length > 0));
  assert.ok(Object.values(FIVE_MARK_ANSWERS).every((answer) => answer.length > 0));
  assert.equal(Object.keys(FIVE_MARK_ANSWERS).length + FIVE_MARK_PAPER_BANK.length, 80);
  assert.equal(formatFiveMarkQuestionNumber({ sourceType: 'paper', sourceQuestionId: 'Q1(a)' }), 'Q1(a)');
  assert.equal(formatFiveMarkQuestionNumber({ sourceType: 'core', id: 'q01' }), 'Core Q01');
});

test('answers are expanded by default so students see answer content without an extra click', () => {
  assert.match(page, /useState\(\(\) => Object\.fromEntries\(/);
  assert.match(page, /FIVE_MARK_ITEMS\.filter\(\(item\) => item\.answer\.length > 0\)/);
  assert.match(page, /Question \{formatFiveMarkQuestionNumber\(item\)\}/);
  assert.match(page, /complete 5-mark answers are expanded by default/);
});

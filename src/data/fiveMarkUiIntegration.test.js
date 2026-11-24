import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { FIVE_MARK_ANSWERS } from './fiveMarkAnswers.js';
import { FIVE_MARK_PAPER_BANK } from './fiveMarkPaperBank.js';

const app = readFileSync(new URL('../App.jsx', import.meta.url), 'utf8');
const shell = readFileSync(new URL('../components/Shell.jsx', import.meta.url), 'utf8');
const page = readFileSync(new URL('../pages/FiveMarkAnswers.jsx', import.meta.url), 'utf8');

test('the dedicated five-mark page is lazy-loaded and routed', () => {
  assert.match(app, /const FiveMarkAnswers = lazy\(\(\) => import\('\.\/pages\/FiveMarkAnswers'\)\)/);
  assert.match(app, /path === '\/five-mark-answers'/);
});

test('the exam navigation exposes the five-mark bank with a live count', () => {
  assert.match(shell, /label: '5-Mark Answers'/);
  assert.match(shell, /Object\.keys\(FIVE_MARK_ANSWERS\)\.length \+ FIVE_MARK_PAPER_BANK\.length/);
  assert.equal(Object.keys(FIVE_MARK_ANSWERS).length + FIVE_MARK_PAPER_BANK.length, 80);
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

test('the page reuses existing bookmarks, completion progress and answer-block rendering', () => {
  assert.match(page, /useStudy\(\)/);
  assert.match(page, /toggleBookmark/);
  assert.match(page, /toggleDone/);
  assert.match(page, /visit\(item\.id\)/);
  assert.match(page, /<Blocks blocks=/);
  assert.match(page, /reviewReason/);
});

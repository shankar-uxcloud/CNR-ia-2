import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { QUESTIONS } from '../data/questions.js';
import { FIVE_MARK_PAPER_BANK } from '../data/fiveMarkPaperBank.js';

const page = readFileSync(new URL('./FiveMarkAnswers.jsx', import.meta.url), 'utf8');
const styles = readFileSync(new URL('../styles/global.css', import.meta.url), 'utf8');
const records = [
  ...QUESTIONS.map((item) => ({ id: item.id })),
  ...FIVE_MARK_PAPER_BANK,
];

test('five-mark page renders a horizontal quick navigator from the currently filtered question list', () => {
  assert.match(page, /<nav className="five-mark-question-navigator mt-5" aria-label="Jump to a five-mark question">/);
  assert.match(page, /\{filtered\.map\(\(item\) => \(/);
  assert.match(page, /formatFiveMarkQuestionNumber\(item\)/);
  assert.equal(records.length, 80);
  assert.equal(new Set(records.map((item) => item.id)).size, 80);
});

test('each navigator item targets a matching question card, expands it and records the visit', () => {
  assert.match(page, /id=\{'five-mark-question-' \+ item\.id\}/);
  assert.match(page, /getElementById\('five-mark-question-' \+ item\.id\)/);
  assert.match(page, /setExpanded\(\(current\) => \(\{ \.\.\.current, \[item\.id\]: true \}\)\)/);
  assert.match(page, /visit\(item\.id\)/);
  assert.match(page, /aria-label=\{'Go to ' \+ formatFiveMarkQuestionNumber\(item\)/);
});

test('navigator supports horizontal touch scrolling, keyboard focus and mobile layout', () => {
  const navStyles = styles.slice(styles.indexOf('/* Horizontal question-number navigator'));
  assert.match(navStyles, /display: flex/);
  assert.match(navStyles, /overflow-x: auto/);
  assert.match(navStyles, /-webkit-overflow-scrolling: touch/);
  assert.match(navStyles, /:focus-visible/);
  assert.match(navStyles, /@media \(max-width: 639px\)/);
  assert.match(navStyles, /prefers-reduced-motion: reduce/);
});

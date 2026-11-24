import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { FIVE_MARK_ANSWERS } from '../data/fiveMarkAnswers.js';
import { FIVE_MARK_PAPER_BANK } from '../data/fiveMarkPaperBank.js';
import { QUESTIONS } from '../data/questions.js';

const page = readFileSync(new URL('./FiveMarkAnswers.jsx', import.meta.url), 'utf8');
const blocks = readFileSync(new URL('../components/Blocks.jsx', import.meta.url), 'utf8');
const styles = readFileSync(new URL('../styles/global.css', import.meta.url), 'utf8');

const answerRecords = [
  ...QUESTIONS.map((question) => ({
    id: question.id,
    module: question.module,
    answer: FIVE_MARK_ANSWERS[question.id] || [],
  })),
  ...FIVE_MARK_PAPER_BANK,
];

test('the dedicated page renders question, section and subsection headings with semantic hierarchy', () => {
  assert.match(page, /five-mark-question-title/);
  assert.match(page, /<h3 className="five-mark-section-title/);
  assert.match(page, /<h4 className="five-mark-subsection-title/);
  assert.match(page, /five-mark-answer-card/);
});

test('all eighty five-mark records retain their IDs, module mappings and answer section titles', () => {
  assert.equal(answerRecords.length, 80);
  assert.equal(new Set(answerRecords.map((item) => item.id)).size, 80);
  for (const item of answerRecords) {
    assert.ok(item.id);
    assert.ok(item.module >= 1 && item.module <= 5);
    for (const section of item.answer) {
      assert.ok(section.title?.trim(), 'Missing section heading in ' + item.id);
      for (const subsection of section.subsections || []) {
        assert.ok(subsection.title?.trim(), 'Missing nested heading in ' + item.id);
      }
    }
  }
});

test('paragraphs and ordinary numbered or bulleted explanations remain body content', () => {
  assert.match(blocks, /case 'p': return <p><Inline text={b\.text} \/><\/p>/);
  assert.match(blocks, /case 'list':/);
  assert.match(blocks, /<li key={i}><Inline text={it} \/><\/li>/);
  assert.doesNotMatch(blocks, /case 'p': return <h[1-6]/);
});

test('heading styling is scoped to five-mark answers and uses semantic theme tokens', () => {
  assert.match(styles, /\.five-mark-answer-card > \.five-mark-question-title/);
  assert.match(styles, /\.five-mark-answer \.five-mark-section-title/);
  assert.match(styles, /\.five-mark-answer \.five-mark-subsection-title/);
  assert.match(styles, /var\(--cyber-accent\)/);
  assert.match(styles, /var\(--text-primary\)/);
  assert.match(styles, /var\(--surface-secondary\)/);
  assert.doesNotMatch(styles.slice(styles.indexOf('/* Five-mark answer hierarchy:')), /#[0-9a-fA-F]{3,8}\b/);
});

test('five-mark heading styles include small-screen wrapping and reduced-motion safeguards', () => {
  const headingStyles = styles.slice(styles.indexOf('/* Five-mark answer hierarchy:'));
  assert.match(headingStyles, /@media \(max-width: 639px\)/);
  assert.match(headingStyles, /overflow-wrap: anywhere/);
  assert.match(headingStyles, /prefers-reduced-motion: reduce/);
});

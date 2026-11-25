import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { FIVE_MARK_ANSWERS } from '../data/fiveMarkAnswers.js';
import { FIVE_MARK_PAPER_BANK } from '../data/fiveMarkPaperBank.js';
import { QUESTIONS } from '../data/questions.js';
const read = (path) => readFileSync(new URL(path, import.meta.url), 'utf8');
const page = read('./FiveMarkAnswers.jsx');
const structure = read('../components/FiveMarkStructure.jsx');
const heading = read('../components/FiveMarkHeading.jsx');
const blocks = read('../components/Blocks.jsx');
const styles = read('../styles/global.css');
const answerRecords = [...QUESTIONS.map((q) => ({ id: q.id, module: q.module, answer: FIVE_MARK_ANSWERS[q.id] || [] })), ...FIVE_MARK_PAPER_BANK];
const gitBlobSha = (content) => createHash('sha1').update('blob ' + Buffer.byteLength(content) + String.fromCharCode(0) + content).digest('hex');

test('the five-mark answer uses a semantic four-level heading system', () => {
  assert.ok(page.includes('FiveMarkHeading level={4} className="five-mark-section-title mb-2"'));
  assert.ok(page.includes('FiveMarkHeading level={5} className="five-mark-subsection-title mb-2"'));
  assert.ok(structure.includes('FiveMarkHeading level={3} className="five-mark-structure-root"'));
  for (const role of ['five-mark-answer-title', 'five-mark-section-title', 'five-mark-subsection-title', 'five-mark-minor-title']) assert.ok(heading.includes(role));
});

test('all eighty five-mark records retain their IDs, module mappings and answer headings', () => {
  assert.equal(answerRecords.length, 80);
  assert.equal(new Set(answerRecords.map((item) => item.id)).size, 80);
  for (const item of answerRecords) {
    assert.ok(item.id);
    assert.ok(item.module >= 1 && item.module <= 5);
    for (const section of item.answer) {
      assert.ok(section.title?.trim(), 'Missing section heading in ' + item.id);
      for (const subsection of section.subsections || []) assert.ok(subsection.title?.trim(), 'Missing nested heading in ' + item.id);
    }
  }
});

test('academic answer data, question IDs and module mappings are byte-for-byte preserved', () => {
  const snapshots = [
    ['../data/fiveMarkAnswers.js', '7e5ce48139fecb9377eeca90d5f70a4e2391e3f7'],
    ['../data/fiveMarkPaperBank.js', 'f1797730b9546c54d036e2d80214bc879830706c'],
    ['../data/questions.js', '1efbfd58383264fd8aaec23883312464da766db7'],
  ];
  for (const [path, expected] of snapshots) assert.equal(gitBlobSha(read(path)), expected, path + ' must remain unchanged');
});

test('ordinary paragraphs and numbered or bulleted explanations remain body content', () => {
  assert.ok(blocks.includes("case 'p': return <p><Inline text={b.text} /></p>;"));
  assert.ok(blocks.includes("case 'list':"));
  assert.ok(blocks.includes('<li key={i}><Inline text={it} /></li>'));
  assert.ok(!blocks.includes("case 'p': return <h"));
});

test('theme-aware typography is scoped to five-mark answers and has four distinct roles', () => {
  const s = styles.slice(styles.indexOf('/* Five-mark answer hierarchy:'), styles.indexOf('/* Five-mark answer maps:'));
  for (const token of ['--cyber-accent', '--cyber-secondary', '--cyber-tertiary', '--text-secondary', '--text-primary', '--surface-secondary', '--border-color']) assert.ok(s.includes('var(' + token));
  for (const role of ['.five-mark-answer-title', '.five-mark-section-title', '.five-mark-subsection-title', '.five-mark-minor-title']) assert.ok(s.includes(role));
  assert.ok(!s.includes('#'));
  assert.ok(!s.includes('.reading') && !s.includes('.two-mark') && !s.includes('.ten-mark'));
});

test('five-mark heading styles wrap responsively and respect reduced motion', () => {
  const s = styles.slice(styles.indexOf('/* Five-mark answer hierarchy:'), styles.indexOf('/* Five-mark answer maps:'));
  assert.ok(s.includes('@media (max-width: 639px)'));
  assert.ok(s.includes('@media (min-width: 640px) and (max-width: 1023px)'));
  assert.ok(s.includes('overflow-wrap: anywhere'));
  assert.ok(s.includes('prefers-reduced-motion: reduce'));
});

import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { FIVE_MARK_ANSWERS } from '../data/fiveMarkAnswers.js';
import { FIVE_MARK_PAPER_BANK } from '../data/fiveMarkPaperBank.js';
import { QUESTIONS } from '../data/questions.js';
const page = readFileSync(new URL('./FiveMarkAnswers.jsx', import.meta.url), 'utf8');
const structure = readFileSync(new URL('../components/FiveMarkStructure.jsx', import.meta.url), 'utf8');
const heading = readFileSync(new URL('../components/FiveMarkHeading.jsx', import.meta.url), 'utf8');
const blocks = readFileSync(new URL('../components/Blocks.jsx', import.meta.url), 'utf8');
const styles = readFileSync(new URL('../styles/global.css', import.meta.url), 'utf8');
const answerRecords = [...QUESTIONS.map((q) => ({ id: q.id, module: q.module, answer: FIVE_MARK_ANSWERS[q.id] || [] })), ...FIVE_MARK_PAPER_BANK];
const gitBlobSha = (content) => createHash('sha1').update('blob ' + Buffer.byteLength(content) + String.fromCharCode(0) + content).digest('hex');

test('the five-mark answer uses a semantic four-level heading system', () => {
  assert.match(page, /FiveMarkHeading level=\\{4\\} className="five-mark-section-title"/);
  assert.match(page, /FiveMarkHeading level=\\{5\\} className="five-mark-subsection-title"/);
  assert.match(structure, /FiveMarkHeading level=\\{3\\} className="five-mark-structure-root"/);
  for (const role of ['five-mark-answer-title', 'five-mark-section-title', 'five-mark-subsection-title', 'five-mark-minor-title']) assert.ok(heading.includes(role));
});

test('all eighty five-mark records retain their IDs, module mappings and answer headings', () => {
  assert.equal(answerRecords.length, 80); assert.equal(new Set(answerRecords.map((item) => item.id)).size, 80);
  for (const item of answerRecords) { assert.ok(item.id); assert.ok(item.module >= 1 && item.module <= 5); for (const section of item.answer) { assert.ok(section.title?.trim()); for (const subsection of section.subsections || []) assert.ok(subsection.title?.trim()); } }
});

test('academic answer data, question IDs and module mappings are byte-for-byte preserved', () => {
  const snapshots = [['../data/fiveMarkAnswers.js', '7e5ce48139fecb9377ecca90d5f70a4e2391e3f7'], ['../data/fiveMarkPaperBank.js', 'f1797730b9546c54d036e2d80214bc879830706c'], ['../data/questions.js', '1efbfd58383264fd8aaec23883312464da766db7']];
  for (const [path, expected] of snapshots) assert.equal(gitBlobSha(readFileSync(new URL(path, import.meta.url), 'utf8')), expected, path + ' must remain unchanged');
});

test('ordinary paragraphs and numbered or bulleted explanations remain body content', () => {
  assert.match(blocks, /case 'p': return <p><Inline text=\\{b\\.text\\} \\/><\\/p>/);
  assert.match(blocks, /case 'list':/); assert.match(blocks, /<li key=\\{i\\}><Inline text=\\{it\\} \\/><\\/li>/); assert.doesNotMatch(blocks, /case 'p': return <h[1-6]/);
});

test('theme-aware typography is scoped to five-mark answers and has four distinct roles', () => {
  const s = styles.slice(styles.indexOf('/* Five-mark answer hierarchy:'), styles.indexOf('/* Five-mark answer maps:'));
  for (const token of ['--cyber-accent', '--cyber-secondary', '--cyber-tertiary', '--text-secondary', '--text-primary', '--surface-secondary', '--border-color']) assert.ok(s.includes('var(' + token));
  for (const role of ['.five-mark-answer-title', '.five-mark-section-title', '.five-mark-subsection-title', '.five-mark-minor-title']) assert.ok(s.includes(role));
  assert.doesNotMatch(s, /#[0-9a-fA-F]{3,8}\\b/); assert.doesNotMatch(s, /(^|\\n)\\s*(?:\\.reading|\\.two-mark|\\.ten-mark)/m);
});

test('five-mark heading styles wrap responsively and respect reduced motion', () => {
  const s = styles.slice(styles.indexOf('/* Five-mark answer hierarchy:'), styles.indexOf('/* Five-mark answer maps:'));
  assert.match(s, /@media \\(max-width: 639px\\)/); assert.match(s, /@media \\(min-width: 640px\\) and \\(max-width: 1023px\\)/); assert.match(s, /overflow-wrap: anywhere/); assert.match(s, /prefers-reduced-motion: reduce/);
});

import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const page = readFileSync(new URL('../src/pages/DecJan2026.jsx', import.meta.url), 'utf8');
const styles = readFileSync(new URL('../src/styles/premium-sitewide.css', import.meta.url), 'utf8');
const data = readFileSync(new URL('../src/data/decJan2026Additional.js', import.meta.url), 'utf8');

test('Dec-Jan paper retains six authored anchors and fourteen data-driven answers', () => {
  const authored = [...page.matchAll(/id="(q[1-3]-[ab])" data-question-anchor/g)].map((match) => match[1]);
  assert.deepEqual(authored, ['q1-a', 'q1-b', 'q2-a', 'q2-b', 'q3-a', 'q3-b']);
  assert.equal((data.match(/^\s*id:\s*'\d+[a-z]'/gm) || []).length, 14);
  assert.match(page, /additionalDecJanAnswers\.map\(\(answer\)/);
});

test('question labels and the shared ANSWER treatment cover the authored and mapped content', () => {
  for (const label of ['1)a)', '1)b)', '2)a)', '2)b)', '3)a)', '3)b)']) assert.ok(page.includes(label));
  assert.match(page, /answer\.id\.match\(\//);
  assert.match(styles, /unified premium question and answer reading system/);
  assert.match(styles, /content: "ANSWER"/);
  assert.match(styles, /--study-font-scale/);
});

test('layout uses theme tokens, responsive overflow handling and print rules', () => {
  for (const token of ['var(--surface-primary)', 'var(--text-secondary)', '@media (max-width: 639px)', '@media print', 'overflow-x: auto', 'scroll-margin-top: 7.25rem']) {
    assert.ok(styles.includes(token), \`missing layout support: \${token}\`);
  }
});

test('horizontal question navigation behavior remains present', () => {
  for (const token of ['question-nav-groups', 'question-nav-chip', 'navigateToQuestion', 'IntersectionObserver', 'popstate', 'hashchange', 'Viewing:']) {
    assert.ok(page.includes(token), \`missing navigation feature: \${token}\`);
  }
});

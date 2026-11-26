import test from 'node:test';
import assert from 'node:assert/strict';
import { createStructuredSections } from './answerPresentation.js';

test('adds sequential display numbers and clean headings without changing source titles', () => {
  const source = [
    { id: 'intro', title: '1. Introduction', blocks: [{ type: 'p', text: 'Keep this wording.' }] },
    { id: 'effects', title: '2) Major Effects', blocks: [{ type: 'list', items: ['One', 'Two'] }] },
  ];
  const result = createStructuredSections(source);

  assert.deepEqual(result.map((item) => item.structuredNumber), ['01', '02']);
  assert.deepEqual(result.map((item) => item.structuredTitle), ['Introduction', 'Major Effects']);
  assert.equal(result[0].title, '1. Introduction');
  assert.strictEqual(result[0].blocks, source[0].blocks);
  assert.deepEqual(source.map((item) => item.title), ['1. Introduction', '2) Major Effects']);
});

test('handles an empty or invalid section collection safely', () => {
  assert.deepEqual(createStructuredSections([]), []);
  assert.deepEqual(createStructuredSections(null), []);
});

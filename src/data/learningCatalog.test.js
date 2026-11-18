import test from 'node:test';
import assert from 'node:assert/strict';
import { LEARNING_MODULES, LEARNING_TOOLS } from './learningCatalog.js';

test('learning hub lists all five modules in order', () => {
  assert.deepEqual(LEARNING_MODULES.map((item) => item.number), [1, 2, 3, 4, 5]);
});
test('only modules with existing question-bank content are marked available', () => {
  assert.deepEqual(LEARNING_MODULES.filter((item) => item.status === 'available').map((item) => item.number), [3, 4, 5]);
});
test('planned resource areas are not exposed as working links', () => {
  for (const item of LEARNING_TOOLS.filter((tool) => tool.status === 'planned')) assert.equal(item.href, null);
});

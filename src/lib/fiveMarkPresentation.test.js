import test from 'node:test';
import assert from 'node:assert/strict';
import { formatFiveMarkQuestionNumber } from './fiveMarkPresentation.js';

test('formats question-paper parts consistently across VTU source formats', () => {
  assert.equal(formatFiveMarkQuestionNumber({ sourceType: 'paper', sourceQuestionId: 'Q1(a)' }), 'Q1(a)');
  assert.equal(formatFiveMarkQuestionNumber({ sourceType: 'paper', sourceQuestionId: '1(b)' }), 'Q1(b)');
  assert.equal(formatFiveMarkQuestionNumber({ sourceType: 'paper', sourceQuestionId: 'q10c' }), 'Q10(c)');
});

test('keeps the core question bank visibly distinct from paper question numbering', () => {
  assert.equal(formatFiveMarkQuestionNumber({ sourceType: 'core', id: 'q01' }), 'Core Q01');
  assert.equal(formatFiveMarkQuestionNumber({ sourceType: 'core', id: 'q10' }), 'Core Q10');
});

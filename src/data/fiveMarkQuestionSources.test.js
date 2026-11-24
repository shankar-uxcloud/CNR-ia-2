import test from 'node:test';
import assert from 'node:assert/strict';
import {
  FIVE_MARK_SOURCE_QUESTIONS,
  getFiveMarkSourceQuestionsByCategory,
  getFiveMarkSourceQuestionsByModule,
} from './fiveMarkQuestionSources.js';

test('the source register accounts for all catalogued paper subquestions without merging sources', () => {
  assert.equal(FIVE_MARK_SOURCE_QUESTIONS.length, 70);
  assert.equal(new Set(FIVE_MARK_SOURCE_QUESTIONS.map((item) => item.id)).size, 70);
  assert.equal(getFiveMarkSourceQuestionsByCategory('catalogued-university-question-paper').length, 40);
  assert.equal(getFiveMarkSourceQuestionsByCategory('supplementary-model-paper').length, 30);
});

test('every source record has a valid module, target marks, source identity and review status', () => {
  for (const item of FIVE_MARK_SOURCE_QUESTIONS) {
    assert.ok(Number.isInteger(item.module) && item.module >= 1 && item.module <= 5, 'Invalid module for ' + item.id);
    assert.equal(item.targetMarks, 5);
    assert.ok(item.source?.title && item.source?.file, 'Missing source identity for ' + item.id);
    assert.ok(item.sourceQuestionId, 'Missing source question identifier for ' + item.id);
    assert.ok(item.question?.trim(), 'Missing question wording or explicitly labelled summary for ' + item.id);
    assert.ok(Array.isArray(item.sourcePageRefs));
    assert.notEqual(item.answerStatus, 'verified');
  }
});

test('the June/July 2026 paper contributes twenty distinct question parts', () => {
  const records = FIVE_MARK_SOURCE_QUESTIONS.filter((item) => item.id.startsWith('june-july-2026-'));
  assert.equal(records.length, 20);
  assert.ok(records.every((item) => item.originalMarks === 10));
  assert.ok(records.every((item) => item.questionTextStatus === 'transcribed-from-existing-question-data'));
  assert.ok(records.every((item) => item.sourceVerificationStatus === 'needs-original-pdf-comparison'));
});

test('the December/January collection retains all twenty records and blocks six summary-only questions', () => {
  const records = FIVE_MARK_SOURCE_QUESTIONS.filter((item) => item.id.startsWith('dec-jan-2026-'));
  assert.equal(records.length, 20);
  const summaryOnly = records.filter((item) => item.questionTextStatus === 'summary-only');
  assert.equal(summaryOnly.length, 6);
  assert.ok(summaryOnly.every((item) => item.originalMarks === null));
  assert.ok(summaryOnly.every((item) => item.answerStatus === 'blocked-exact-question-wording'));
  assert.equal(records.filter((item) => item.originalMarks === 10).length, 14);
});

test('the 21CV654 supplementary model paper retains all thirty subquestions and its source-support statuses', () => {
  const records = getFiveMarkSourceQuestionsByCategory('supplementary-model-paper');
  assert.equal(records.length, 30);
  assert.ok(records.every((item) => [6, 7, 8].includes(item.originalMarks)));
  assert.ok(records.every((item) => ['supported', 'partial', 'gap'].includes(item.sourceSupportStatus)));
  assert.ok(records.every((item) => item.sourceVerificationStatus === 'mapped-in-existing-source-audit'));
});

test('the repeated zoological-garden model-paper question is retained as two source records', () => {
  const repeated = FIVE_MARK_SOURCE_QUESTIONS.filter((item) => item.repeatGroup === '21cv654-zoological-garden-repeat');
  assert.equal(repeated.length, 2);
  assert.deepEqual(repeated.map((item) => item.sourceQuestionId).sort(), ['8(c)', '9(c)']);
});

test('module filters preserve each source record and return only the requested module', () => {
  for (const moduleNumber of [1, 2, 3, 4, 5]) {
    const records = getFiveMarkSourceQuestionsByModule(moduleNumber);
    assert.ok(records.length > 0, 'Expected source questions for module ' + moduleNumber);
    assert.ok(records.every((item) => item.module === moduleNumber));
  }
});

import test from 'node:test';
import assert from 'node:assert/strict';
import { FIVE_MARK_SOURCE_QUESTIONS, getFiveMarkSourceQuestionsByCategory } from '../src/data/fiveMarkQuestionSources.js';

const university = getFiveMarkSourceQuestionsByCategory('catalogued-university-question-paper');
const model = getFiveMarkSourceQuestionsByCategory('supplementary-model-paper');

test('all three supplied paper PDFs have complete verified question transcription', () => {
  assert.equal(university.length, 40);
  assert.equal(model.length, 30);
  assert.equal(FIVE_MARK_SOURCE_QUESTIONS.length, 70);
  assert.ok(FIVE_MARK_SOURCE_QUESTIONS.every((item) => item.questionTextStatus === 'verified-against-uploaded-pdf'));
  assert.ok(FIVE_MARK_SOURCE_QUESTIONS.every((item) => item.sourceVerificationStatus === 'verified-against-uploaded-pdf'));
});

test('December/January six core questions use exact wording and retain original ten-mark allocation', () => {
  const core = university.filter((item) => item.id.startsWith('dec-jan-2026-q'));
  assert.equal(core.length, 6);
  assert.ok(core.every((item) => item.originalMarks === 10));
  assert.ok(core.every((item) => !['summary-only', 'blocked-exact-question-wording'].includes(item.questionTextStatus)));
  assert.match(core.find((item) => item.sourceQuestionId === 'Q1(a)').question, /economical importance of land as a natural resource/);
  assert.match(core.find((item) => item.sourceQuestionId === 'Q3(b)').question, /inter basin water transfer and its importance in India/);
});

test('the June/July paper preserves its printed Module 3 heading while study-mapping Q9-Q10 to Module 5', () => {
  const q9 = university.find((item) => item.id === 'june-july-2026-q9a');
  const q10 = university.find((item) => item.id === 'june-july-2026-q10b');
  assert.equal(q9.module, 5);
  assert.equal(q10.module, 5);
  assert.equal(q9.source.title, 'BCV755B Question Paper — June / July 2026');
});

test('21CV654 is kept as a separate supplementary paper with all original marks', () => {
  assert.equal(model.length, 30);
  assert.ok(model.every((item) => [6, 7, 8].includes(item.originalMarks)));
  assert.equal(model.filter((item) => item.repeatGroup === '21cv654-zoological-garden-repeat').length, 2);
  assert.match(model.find((item) => item.sourceQuestionId === '6(b)').question, /rock forming minerals such as quartz, mica, Feldspar and amphibole/);
});

import test from 'node:test';
import assert from 'node:assert/strict';
import { QUESTIONS } from './questions.js';
import { TWO_MARK_ANSWERS, TWO_MARK_QUESTIONS } from './twoMarkAnswers.js';

test('every website question has a dedicated 2-mark question and model answer', () => {
  assert.equal(Object.keys(TWO_MARK_ANSWERS).length, QUESTIONS.length);
  for (const question of QUESTIONS) {
    assert.ok(TWO_MARK_QUESTIONS[question.id]?.trim(), `Missing 2-mark question for ${question.code}`);
    assert.ok(TWO_MARK_ANSWERS[question.id]?.length, `Missing 2-mark answer for ${question.code}`);
  }
});

test('all 2-mark answers use valid, non-empty renderer blocks', () => {
  for (const question of QUESTIONS) {
    for (const section of TWO_MARK_ANSWERS[question.id]) {
      assert.ok(section.id && section.title?.trim(), 'Every section needs an id and title');
      assert.ok(Array.isArray(section.blocks) && section.blocks.length, 'Every section needs blocks');
      for (const block of section.blocks) {
        assert.ok(['p', 'list', 'table', 'eq', 'diagram', 'note', 'key'].includes(block.type), 'Unsupported block type');
        if (block.type === 'p') assert.ok(block.text?.trim(), 'Empty paragraph');
        if (block.type === 'list') assert.ok(block.items?.length, 'Empty list');
      }
    }
  }
});

test('two-mark answers preserve the key terms for conservation and pollution topics', () => {
  const conservation = JSON.stringify(TWO_MARK_ANSWERS.q07).toLowerCase();
  const equipment = JSON.stringify(TWO_MARK_ANSWERS.q09).toLowerCase();
  const ozone = JSON.stringify(TWO_MARK_ANSWERS.q10).toLowerCase();
  for (const term of ['in-situ', 'ex-situ', 'national parks', 'gene banks']) {
    assert.ok(conservation.includes(term), `Conservation answer is missing ${term}`);
  }
  for (const term of ['electrostatic force', 'fabric filtration', 'centrifugal force', 'wet scrubber']) {
    assert.ok(equipment.includes(term), `Equipment answer is missing ${term}`);
  }
  for (const term of ['ozone depletion', 'cfc', 'halons']) {
    assert.ok(ozone.includes(term), `Ozone answer is missing ${term}`);
  }
});

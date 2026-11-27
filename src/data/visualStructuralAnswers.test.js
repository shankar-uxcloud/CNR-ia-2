import test from 'node:test';
import assert from 'node:assert/strict';
import { VISUAL_STRUCTURAL_ANSWERS } from './visualStructuralAnswers.js';

test('visual structural answer catalogue covers every one of the 70 paper question parts', () => {
  assert.equal(VISUAL_STRUCTURAL_ANSWERS.length, 70);
  assert.equal(new Set(VISUAL_STRUCTURAL_ANSWERS.map((item) => item.id)).size, 70);
  assert.equal(VISUAL_STRUCTURAL_ANSWERS.filter((item) => item.id.startsWith('dec-jan-2026-')).length, 20);
  assert.equal(VISUAL_STRUCTURAL_ANSWERS.filter((item) => item.id.startsWith('june-july-2026-')).length, 20);
  assert.equal(VISUAL_STRUCTURAL_ANSWERS.filter((item) => item.id.startsWith('21cv654-')).length, 30);
});

test('each question has a separate structural visual and exam-writing sequence', () => {
  for (const item of VISUAL_STRUCTURAL_ANSWERS) {
    assert.ok(item.visualSections.length > 0, item.id);
    assert.ok(item.visualSections.every((section) => section.points.length > 0), item.id);
    assert.ok(item.visualType, item.id);
    assert.ok(item.examSequence.length > 0, item.id);
  }
});

test('the repeated 21CV654 zoological garden question remains two separate visual records', () => {
  const repeats = VISUAL_STRUCTURAL_ANSWERS.filter((item) => item.repeatGroup === '21cv654-zoological-garden-repeat');
  assert.deepEqual(repeats.map((item) => item.sourceQuestionId).sort(), ['8(c)', '9(c)']);
});

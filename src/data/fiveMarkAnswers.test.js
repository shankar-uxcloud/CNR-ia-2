import test from 'node:test';
import assert from 'node:assert/strict';
import { QUESTIONS } from './questions.js';
import { FIVE_MARK_ANSWERS } from './fiveMarkAnswers.js';

test('every published question has a separate 5-mark model answer', () => {
  assert.equal(Object.keys(FIVE_MARK_ANSWERS).length, QUESTIONS.length);
  for (const question of QUESTIONS) {
    assert.ok(FIVE_MARK_ANSWERS[question.id], 'Missing a question 5-mark answer');
    assert.ok(FIVE_MARK_ANSWERS[question.id].length >= 2, 'Answer needs multiple sections');
  }
});

test('all 5-mark answer sections and blocks have valid, non-empty structure', () => {
  for (const question of QUESTIONS) {
    const sections = FIVE_MARK_ANSWERS[question.id];
    const sectionIds = sections.map((section) => section.id);
    assert.equal(new Set(sectionIds).size, sectionIds.length, 'Duplicate section IDs');
    for (const section of sections) {
      assert.ok(section.title?.trim(), 'Missing section title');
      assert.ok(Array.isArray(section.blocks) && section.blocks.length > 0, 'Missing section blocks');
      for (const block of section.blocks) {
        assert.ok(['p', 'list', 'table', 'eq', 'diagram', 'note', 'key'].includes(block.type), 'Unsupported block type');
        if (block.type === 'list') assert.ok(block.items?.length > 0, 'Empty list block');
        if (block.type === 'p') assert.ok(block.text?.trim(), 'Empty paragraph block');
      }
    }
  }
});

test('Module 3 equipment answer covers all four requested devices and their operation', () => {
  const text = JSON.stringify(FIVE_MARK_ANSWERS.q09).toLowerCase();
  for (const term of ['electrostatic precipitator', 'baghouse filter', 'cyclone separator', 'wet scrubber', 'principle', 'applications', 'hopper']) {
    assert.ok(text.includes(term), 'Equipment answer is missing a required topic');
  }
});


test('Module 4 and Module 5 answers retain key details from the uploaded notes', () => {
  const globalEffects = JSON.stringify(FIVE_MARK_ANSWERS.q02).toLowerCase();
  const biodiversity = JSON.stringify(FIVE_MARK_ANSWERS.q05).toLowerCase();
  const conservation = JSON.stringify(FIVE_MARK_ANSWERS.q07).toLowerCase();
  const cycles = JSON.stringify(FIVE_MARK_ANSWERS.q08).toLowerCase();

  for (const term of ['sundarbans', 'lakshadweep', 'himalayan']) {
    assert.ok(globalEffects.includes(term), `Global-warming effects answer is missing ${term}`);
  }
  assert.ok(biodiversity.includes('climate-regulation value'));
  assert.ok(conservation.includes('pollen culture'));
  for (const term of ['denitrification', 'runoff', 'infiltration']) {
    assert.ok(cycles.includes(term), `Biogeochemical-cycles answer is missing ${term}`);
  }
});

test('ozone-depletion answer covers causes, mechanism, effects and international control', () => {
  const text = JSON.stringify(FIVE_MARK_ANSWERS.q10).toLowerCase();
  for (const term of ['cfc', 'halon', 'chlorine', 'bromine', 'uv-b', 'montreal protocol', 'antarctica']) {
    assert.ok(text.includes(term), 'Ozone answer is missing a required topic');
  }
});

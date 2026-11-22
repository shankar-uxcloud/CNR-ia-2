import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { additionalDecJanAnswers, moduleNames } from '../src/data/decJan2026Additional.js';

test('Dec/Jan 2026 additional paper answers include every sub-question from Q4 to Q10', () => {
  assert.equal(additionalDecJanAnswers.length, 14);
  assert.deepEqual(additionalDecJanAnswers.map((answer) => answer.id), [
    '4a','4b','5a','5b','6a','6b','7a','7b','8a','8b','9a','9b','10a','10b',
  ]);
});

test('every answer is mapped to its expected syllabus module and has a complete study structure', () => {
  const expectedModules = [2,2,3,3,3,3,4,4,4,4,5,5,5,5];
  additionalDecJanAnswers.forEach((answer, index) => {
    assert.equal(answer.module, expectedModules[index], answer.id);
    assert.ok(answer.question.length > 20, answer.id);
    assert.ok(answer.intro.length > 50, answer.id);
    assert.ok(answer.sections.length >= 3, answer.id);
    assert.ok(answer.sections.every((section) => section.points.length >= 3), answer.id);
    assert.ok(answer.diagram.length > 30, answer.id);
    assert.ok(answer.conclusion.length > 50, answer.id);
    assert.ok(moduleNames[answer.module], answer.id);
  });
});

test('source-verification limitations are explicit instead of fabricated page or figure citations', () => {
  const source = additionalDecJanAnswers.map((answer) => answer.note || '').join(' ');
  assert.match(source, /latest notification|full pollutant-wise table|complete legal Schedule/i);
  const page = fs.readFileSync(new URL('../src/pages/DecJan2026.jsx', import.meta.url), 'utf8');
  assert.match(page, /could not be inspected and verified/);
  assert.match(page, /not a numbered figure reproduced/);
});

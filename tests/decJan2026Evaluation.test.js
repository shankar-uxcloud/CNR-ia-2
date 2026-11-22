import test from 'node:test';
import assert from 'node:assert/strict';
import { evaluationScheme } from '../src/data/decJan2026Evaluation.js';
import { additionalDecJanAnswers } from '../src/data/decJan2026Additional.js';

test('evaluation scheme covers every additional Q4(a)-Q10(b) answer', () => {
  const expected = ['4a','4b','5a','5b','6a','6b','7a','7b','8a','8b','9a','9b','10a','10b'];
  assert.deepEqual(Object.keys(evaluationScheme).sort(), expected.sort());
  assert.deepEqual(additionalDecJanAnswers.map((answer) => answer.id).sort(), expected.sort());
  for (const id of expected) {
    assert.ok(evaluationScheme[id].marks, `missing mark allocation for ${id}`);
    assert.ok(evaluationScheme[id].requirements.length > 0, `missing checklist for ${id}`);
  }
});

test('Q9(b) supplies at least twenty distinct project examples', () => {
  const projects = evaluationScheme['9b'].projects;
  assert.ok(projects.length >= 20);
  assert.equal(new Set(projects).size, projects.length);
});

test('Q6(b) includes all twelve pollutant entries in the 2009 NAAQS table', () => {
  assert.equal(evaluationScheme['6b'].naaqs.length, 12);
  assert.ok(evaluationScheme['6b'].naaqs.some(([name]) => name === 'PM₂.₅'));
  assert.ok(evaluationScheme['6b'].naaqs.some(([name]) => name === 'PM₁₀'));
});

test('Q8(b) allocates 2.5 marks to each of its four short notes', () => {
  assert.equal(evaluationScheme['8b'].requirements.length, 4);
  assert.ok(evaluationScheme['8b'].requirements.every(([marks]) => marks === '2.5 marks'));
});

import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { QUESTIONS } from './questions.js';
import { FIVE_MARK_ANSWERS } from './fiveMarkAnswers.js';
import { FIVE_MARK_BANK, getFiveMarkQuestion, getFiveMarkQuestionsByModule } from './fiveMarkBank.js';
import { TWO_MARK_ANSWERS } from './twoMarkAnswers.js';

const supportedBlockTypes = new Set(['p', 'list', 'table', 'eq', 'diagram', 'note', 'key']);
const diagramRegistrySource = readFileSync(new URL('../diagrams/index.js', import.meta.url), 'utf8');

test('the independent five-mark bank has one record for every current catalogue question', () => {
  assert.equal(FIVE_MARK_BANK.length, QUESTIONS.length);
  assert.deepEqual(
    FIVE_MARK_BANK.map((item) => item.id).sort(),
    QUESTIONS.map((item) => item.id).sort(),
  );
  assert.equal(new Set(FIVE_MARK_BANK.map((item) => item.id)).size, FIVE_MARK_BANK.length);
});

test('every five-mark record has a unique ID, exact question, valid module and five-mark value', () => {
  const questionById = new Map(QUESTIONS.map((question) => [question.id, question]));
  for (const item of FIVE_MARK_BANK) {
    const original = questionById.get(item.id);
    assert.ok(original, 'Five-mark record must map to a real catalogue question');
    assert.equal(item.question, original.question);
    assert.ok(Number.isInteger(item.module) && item.module >= 1 && item.module <= 5, 'Invalid module number');
    assert.equal(item.marks, 5);
    assert.ok(Array.isArray(item.topicTags) && item.topicTags.length > 0);
    assert.ok(item.source?.document, 'Source document metadata is required where available');
    assert.ok(Array.isArray(item.source.references) && item.source.references.length > 0);
    assert.equal(item.verificationStatus, 'needs-review', 'AI-authored content must not be marked verified automatically');
  }
});

test('missing-answer detection catches every missing or empty five-mark answer', () => {
  for (const question of QUESTIONS) {
    const answer = FIVE_MARK_ANSWERS[question.id];
    assert.ok(Array.isArray(answer) && answer.length >= 2, 'Missing five-mark answer for ' + question.id);
    assert.ok(getFiveMarkQuestion(question.id), 'Missing normalized bank record for ' + question.id);
  }
});

test('answer sections and blocks use the supported renderer schema', () => {
  for (const item of FIVE_MARK_BANK) {
    const sectionIds = item.answer.map((section) => section.id);
    assert.equal(new Set(sectionIds).size, sectionIds.length, 'Duplicate section IDs for ' + item.id);
    for (const section of item.answer) {
      assert.ok(section.title?.trim(), 'Missing section title for ' + item.id);
      assert.ok(Array.isArray(section.blocks) && section.blocks.length > 0, 'Missing blocks for ' + item.id);
      for (const block of section.blocks) {
        assert.ok(supportedBlockTypes.has(block.type), 'Unsupported block type for ' + item.id + ': ' + block.type);
        if (block.type === 'p') assert.ok(block.text?.trim(), 'Empty paragraph block');
        if (block.type === 'list') assert.ok(Array.isArray(block.items) && block.items.length > 0, 'Empty list block');
        if (block.type === 'table') {
          assert.ok(Array.isArray(block.head) && block.head.length > 0, 'Table needs headings');
          assert.ok(Array.isArray(block.rows) && block.rows.length > 0, 'Table needs rows');
        }
        if (block.type === 'diagram') assert.ok(block.id || block.caption, 'Diagram needs a reference or caption');
        if (block.type === 'note') assert.ok(block.text?.trim(), 'Note block needs text');
        if (block.type === 'key') assert.ok(block.text?.trim(), 'Key block needs text');
      }
    }
  }
});

test('marks categories remain isolated from the existing 2-mark and 10-mark records', () => {
  for (const item of FIVE_MARK_BANK) {
    const original = QUESTIONS.find((question) => question.id === item.id);
    assert.equal(item.marks, 5);
    assert.equal(original.marks, 10);
    assert.ok(TWO_MARK_ANSWERS[item.id]?.length > 0, 'The separate 2-mark answer is missing for ' + item.id);
    assert.notStrictEqual(item.answer, original.answer.sections, 'Five-mark content must not alias the 10-mark sections');
  }
});

test('module filtering returns only records from the requested module', () => {
  for (const moduleNumber of [3, 4, 5]) {
    assert.ok(getFiveMarkQuestionsByModule(moduleNumber).length > 0);
    assert.ok(getFiveMarkQuestionsByModule(moduleNumber).every((item) => item.module === moduleNumber));
  }
  assert.deepEqual(getFiveMarkQuestionsByModule(1), []);
  assert.deepEqual(getFiveMarkQuestionsByModule(2), []);
});

test('five-mark diagram references resolve through the existing diagram registry without importing JSX', () => {
  for (const item of FIVE_MARK_BANK) {
    for (const diagramId of item.diagramRefs) {
      assert.match(diagramRegistrySource, new RegExp('^\\s*' + diagramId + ':', 'm'), 'Unknown diagram reference: ' + diagramId);
    }
  }
});

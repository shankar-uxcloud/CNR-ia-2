import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import {
  FIVE_MARK_PAPER_BANK,
  getFiveMarkPaperQuestion,
  getFiveMarkPaperQuestionsByModule,
} from './fiveMarkPaperBank.js';
import { FIVE_MARK_PAPER_ANSWERS } from './answers5/index.js';
import { FIVE_MARK_SOURCE_QUESTIONS } from './fiveMarkQuestionSources.js';

const supportedBlockTypes = new Set(['p', 'list', 'table', 'eq', 'diagram', 'note', 'key']);
const diagramRegistrySource = readFileSync(new URL('../diagrams/index.js', import.meta.url), 'utf8');

test('the assembled paper bank preserves all seventy source records', () => {
  assert.equal(FIVE_MARK_PAPER_BANK.length, 70);
  assert.equal(new Set(FIVE_MARK_PAPER_BANK.map((item) => item.id)).size, 70);
  assert.deepEqual(
    FIVE_MARK_PAPER_BANK.map((item) => item.id).sort(),
    FIVE_MARK_SOURCE_QUESTIONS.map((item) => item.id).sort(),
  );
});

test('all module-one and module-two source questions have an answer or explicit review status', () => {
  const firstTwoModules = FIVE_MARK_PAPER_BANK.filter((item) => item.module === 1 || item.module === 2);
  assert.equal(firstTwoModules.length, 28);
  for (const item of firstTwoModules) {
    assert.equal(item.marks, 5);
    assert.ok(item.source?.title && item.source?.file);
    assert.notEqual(item.reviewStatus, 'not-started', 'Untracked module answer status: ' + item.id);
    if (item.answer.length === 0) {
      assert.ok(['needs-source', 'blocked-question-text'].includes(item.reviewStatus), 'Missing answer must have an explicit review state: ' + item.id);
      assert.ok(item.reviewReason, 'Missing answer must explain the review blocker: ' + item.id);
    }
  }
});

test('Module 1 and Module 2 now have an answer for every source question', () => {
  const firstTwoModuleAnswers = FIVE_MARK_PAPER_ANSWERS.filter((item) => {
    const source = getFiveMarkPaperQuestion(item.id);
    return source && source.module <= 2;
  });
  assert.equal(firstTwoModuleAnswers.length, 28);
  assert.ok(firstTwoModuleAnswers.every((item) => item.answer.length > 0));
  assert.ok(firstTwoModuleAnswers.every((item) => item.reviewStatus !== 'not-started'));
});

test('Module 3 has an answer draft for every source question', () => {
  const moduleThree = getFiveMarkPaperQuestionsByModule(3);
  assert.equal(moduleThree.length, 14);
  assert.equal(moduleThree.filter((item) => item.answer.length > 0).length, 14);
  assert.ok(moduleThree.every((item) => item.answer.length > 0));
});

test('six December/January core questions retain answer drafts after exact PDF wording is verified', () => {
  const core = FIVE_MARK_PAPER_BANK.filter((item) => item.id.startsWith('dec-jan-2026-q'));
  assert.equal(core.length, 6);
  assert.ok(core.every((item) => item.questionTextStatus === 'verified-against-uploaded-pdf'));
  assert.ok(core.every((item) => item.sourceVerificationStatus === 'verified-against-uploaded-pdf'));
  assert.ok(core.every((item) => item.answer.length > 0));
  assert.ok(core.every((item) => item.reviewStatus === 'draft-needs-pdf-review'));
  assert.ok(core.every((item) => item.reviewReason && item.sourceQuestionId.startsWith('Q')));
});

test('Module 4 has an answer draft for every source question', () => {
  const moduleFour = getFiveMarkPaperQuestionsByModule(4);
  assert.equal(moduleFour.length, 14);
  assert.equal(moduleFour.filter((item) => item.answer.length > 0).length, 14);
  assert.ok(moduleFour.every((item) => item.answer.length > 0));
});

test('Module 5 has an answer draft for every source question', () => {
  const moduleFive = getFiveMarkPaperQuestionsByModule(5);
  assert.equal(moduleFive.length, 14);
  assert.equal(moduleFive.filter((item) => item.answer.length > 0).length, 14);
  assert.ok(moduleFive.every((item) => item.answer.length > 0));
});

test('all seventy source questions now have a complete answer draft and traceable review status', () => {
  assert.ok(FIVE_MARK_PAPER_BANK.every((item) => item.answer.length > 0));
  assert.ok(FIVE_MARK_PAPER_BANK.every((item) => item.reviewStatus !== 'not-started'));
  assert.ok(FIVE_MARK_PAPER_BANK.every((item) => item.sourceQuestionId && item.source?.title));
  assert.ok(FIVE_MARK_PAPER_BANK.every((item) => item.answer.every((section) => section.title && section.blocks?.length)));
});

test('the assembled bank contains seventy answer records across all five modules', () => {
  assert.equal(FIVE_MARK_PAPER_ANSWERS.length, 70);
  assert.equal(FIVE_MARK_PAPER_ANSWERS.filter((item) => item.answer.length > 0).length, 70);
  assert.equal(FIVE_MARK_PAPER_ANSWERS.filter((item) => item.answer.length === 0).length, 0);
});

test('answer IDs map to known source questions without duplicates', () => {
  const sourceIds = new Set(FIVE_MARK_PAPER_BANK.map((item) => item.id));
  const answerIds = FIVE_MARK_PAPER_ANSWERS.map((item) => item.id);
  assert.equal(new Set(answerIds).size, answerIds.length);
  for (const id of answerIds) {
    assert.ok(sourceIds.has(id), 'Answer maps to unknown source question: ' + id);
    assert.ok(getFiveMarkPaperQuestion(id));
  }
});

test('module-one and module-two answer blocks use the supported schema and registered diagrams', () => {
  for (const item of FIVE_MARK_PAPER_BANK.filter((question) => question.module <= 2 && question.answer.length)) {
    assert.equal(item.marks, 5);
    for (const section of item.answer) {
      assert.ok(section.title?.trim());
      assert.ok(Array.isArray(section.blocks) && section.blocks.length > 0);
      for (const block of section.blocks) {
        assert.ok(supportedBlockTypes.has(block.type), 'Unsupported block type in ' + item.id + ': ' + block.type);
        if (block.type === 'p') assert.ok(block.text?.trim());
        if (block.type === 'list') assert.ok(Array.isArray(block.items) && block.items.length > 0);
        if (block.type === 'table') {
          assert.ok(Array.isArray(block.head) && block.head.length > 0);
          assert.ok(Array.isArray(block.rows) && block.rows.length > 0);
        }
        if (block.type === 'diagram') {
          assert.ok(item.diagramRefs.includes(block.id));
          assert.match(diagramRegistrySource, new RegExp('^\\s*' + block.id + ':\\s*\\{', 'm'));
        }
      }
    }
  }
});

test('module filters return the correct source-question counts', () => {
  assert.equal(getFiveMarkPaperQuestionsByModule(1).length, 14);
  assert.equal(getFiveMarkPaperQuestionsByModule(2).length, 14);
  assert.equal(getFiveMarkPaperQuestionsByModule(3).length, 14);
  assert.equal(getFiveMarkPaperQuestionsByModule(4).length, 14);
  assert.equal(getFiveMarkPaperQuestionsByModule(5).length, 14);
});

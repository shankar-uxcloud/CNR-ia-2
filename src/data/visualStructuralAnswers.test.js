import test from 'node:test';
import assert from 'node:assert/strict';
import { VISUAL_STRUCTURAL_ANSWERS, VISUAL_COVERAGE_REPORT } from './visualStructuralAnswers.js';
import { FIVE_MARK_PAPER_BANK } from './fiveMarkPaperBank.js';

test('the diagram audit covers every question and subquestion in all three papers', () => {
  assert.equal(VISUAL_STRUCTURAL_ANSWERS.length, 70);
  assert.equal(new Set(VISUAL_STRUCTURAL_ANSWERS.map((item) => item.id)).size, 70);
  assert.equal(VISUAL_STRUCTURAL_ANSWERS.filter((item) => item.id.startsWith('dec-jan-2026-')).length, 20);
  assert.equal(VISUAL_STRUCTURAL_ANSWERS.filter((item) => item.id.startsWith('june-july-2026-')).length, 20);
  assert.equal(VISUAL_STRUCTURAL_ANSWERS.filter((item) => item.id.startsWith('21cv654-')).length, 30);
  assert.equal(VISUAL_COVERAGE_REPORT.length, 70);
});

test('every question has a real connected diagram, not a heading or question-only placeholder', () => {
  for (const item of VISUAL_STRUCTURAL_ANSWERS) {
    assert.ok(item.visualSections.length > 0, item.id + ' has no source sections');
    assert.ok(item.visualSections.every((section) => section.title && section.points.length > 0), item.id);
    assert.ok(item.visualGraph.nodes.length >= 3, item.id + ' has too few visual nodes');
    assert.ok(item.visualGraph.edges.length >= 2, item.id + ' has too few relationships');
    assert.ok(item.visualGraph.edges.every((edge) =>
      item.visualGraph.nodes.some((node) => node.id === edge.from)
      && item.visualGraph.nodes.some((node) => node.id === edge.to)
      && edge.relation
    ), item.id + ' has a dangling or unlabeled edge');
    assert.equal(item.diagramAudit.status, 'complete', item.id + ' is not complete');
    assert.equal(item.diagramAudit.hasDirectionalRelationships, true, item.id);
  }
  assert.equal(VISUAL_COVERAGE_REPORT.every((entry) => entry.status === 'complete'), true);
});

test('visual layer preserves all original question and answer data by reference', () => {
  const originalById = new Map(FIVE_MARK_PAPER_BANK.map((item) => [item.id, item]));
  for (const visual of VISUAL_STRUCTURAL_ANSWERS) {
    const original = originalById.get(visual.id);
    assert.ok(original, visual.id);
    assert.equal(visual.question, original.question, visual.id + ' question text changed');
    assert.equal(visual.answer, original.answer, visual.id + ' answer object was replaced');
    assert.equal(visual.sourceQuestionId, original.sourceQuestionId, visual.id + ' source question id changed');
  }
});

test('the six December/January core diagrams use the uploaded scheme outline pages 2–3', () => {
  const ids = ['q1-a', 'q1-b', 'q2-a', 'q2-b', 'q3-a', 'q3-b'];
  for (const id of ids) {
    const item = VISUAL_STRUCTURAL_ANSWERS.find((entry) => entry.id === 'dec-jan-2026-' + id);
    assert.ok(item, id);
    assert.equal(item.diagramAudit.status, 'complete', id);
    assert.ok([2, 3].includes(item.diagramAudit.sourcePage), id);
    assert.ok(item.visualSections.flatMap((section) => section.points).length >= 4, id);
  }
});

test('the repeated 21CV654 zoological garden question remains two separate complete diagrams', () => {
  const repeats = VISUAL_STRUCTURAL_ANSWERS.filter((item) => item.repeatGroup === '21cv654-zoological-garden-repeat');
  assert.deepEqual(repeats.map((item) => item.sourceQuestionId).sort(), ['8(c)', '9(c)']);
  assert.equal(repeats.every((item) => item.diagramAudit.status === 'complete'), true);
});

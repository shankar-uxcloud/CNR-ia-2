import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { buildFiveMarkStructure } from '../lib/fiveMarkStructure.js';
import { FIVE_MARK_ANSWERS } from '../data/fiveMarkAnswers.js';
import { FIVE_MARK_PAPER_BANK } from '../data/fiveMarkPaperBank.js';
import { QUESTIONS } from '../data/questions.js';
const records = [
  ...QUESTIONS.map((question) => ({ id: question.id, question: question.question, answer: FIVE_MARK_ANSWERS[question.id] || [] })),
  ...FIVE_MARK_PAPER_BANK,
];
const authored = records.filter((item) => item.answer?.length);
test('every authored five-mark answer gets a visual branch for every section', () => {
  assert.ok(authored.length > 0);
  for (const item of authored) {
    const structure = buildFiveMarkStructure(item);
    assert.ok(structure.title, 'Missing root title for ' + item.id);
    assert.equal(structure.branches.length, item.answer.length, 'Missing section branch for ' + item.id);
    for (const branch of structure.branches) {
      assert.ok(branch.title, 'Missing branch title for ' + item.id);
      assert.ok(branch.nodes.length, 'Missing visual detail for ' + item.id + ' / ' + branch.title);
    }
  }
});
test('diagram labels are derived from existing answer text without changing source records', () => {
  const item = { question: 'Explain biodiversity conservation', answer: [{
    id: 'methods', title: 'Methods', blocks: [{ type: 'list', items: [
      'In-situ conservation protects species in natural habitats.',
      'Ex-situ conservation protects species outside natural habitats.',
    ] }],
  }] };
  const before = JSON.stringify(item);
  assert.deepEqual(buildFiveMarkStructure(item).branches[0].nodes, [
    'In-situ conservation protects species in natural habitats.',
    'Ex-situ conservation protects species outside natural habitats.',
  ]);
  assert.equal(JSON.stringify(item), before);
});
test('the five-mark page places the visual map before the detailed answer sections', () => {
  const page = readFileSync(new URL('../pages/FiveMarkAnswers.jsx', import.meta.url), 'utf8');
  assert.match(page, /<FiveMarkStructure item=\{item\} \/>/);
  assert.ok(page.indexOf('<FiveMarkStructure item={item} />') < page.indexOf('<Blocks blocks={section.blocks'));
});
test('records without authored answers do not receive invented diagram content', () => {
  assert.equal(buildFiveMarkStructure({ question: 'Pending', answer: [] }).branches.length, 0);
});

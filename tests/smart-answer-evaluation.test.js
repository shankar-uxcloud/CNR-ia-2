import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const source = fs.readFileSync(new URL('../src/pages/Practice.jsx', import.meta.url), 'utf8');
const questionsSource = fs.readFileSync(new URL('../src/data/questions.js', import.meta.url), 'utf8');
const fiveSource = fs.readFileSync(new URL('../src/data/fiveMarkAnswers.js', import.meta.url), 'utf8');

function extractObject(source, start, end) {
  const from = source.indexOf(start);
  const to = source.indexOf(end, from);
  assert.ok(from >= 0 && to > from, 'expected source section to exist');
  return source.slice(from, to);
}

const conceptSource = extractObject(source, 'const CONCEPT_GROUPS = {', '\n};') + '\nCONCEPT_GROUPS;';
const fiveKeyIds = [...fiveSource.matchAll(/^  (q\d+): \[/gm)].map((match) => match[1]);
const questionIds = [...questionsSource.matchAll(/id: '(q\d+)'/g)].map((match) => match[1]);
const conceptKeys = [...conceptSource.matchAll(/^  (q\d+): \[/gm)].map((match) => match[1]);

test('all 10 current questions have both answer-length references and concept maps', () => {
  assert.equal(questionIds.length, 10);
  assert.deepEqual(fiveKeyIds, questionIds);
  assert.deepEqual(conceptKeys, questionIds);
});

test('transparent rubric includes six weighted criteria totalling 100 percent', () => {
  const rubricText = extractObject(source, 'const evaluateAnswer =', '\n}\n\nconst stripFormatting');
  assert.match(rubricText, /Concept coverage/);
  assert.match(rubricText, /Technical terminology/);
  assert.match(rubricText, /Answer structure/);
  assert.match(rubricText, /Explanation depth/);
  assert.match(rubricText, /Relevant examples/);
  assert.match(rubricText, /Diagram acknowledgement/);
  const weights = [...rubricText.matchAll(/weight: (0\.\d+)/g)].map((m) => Number(m[1]));
  assert.equal(weights.reduce((a, b) => a + b, 0), 1);
});

test('history storage remains backward compatible and has selective clearing', () => {
  const store = fs.readFileSync(new URL('../src/lib/study.jsx', import.meta.url), 'utf8');
  assert.match(store, /const KEY = 'vtu-examprep-v1'/);
  assert.match(store, /clearEvaluationHistory: \(predicate\)/);
  assert.match(store, /evaluationAttempts: \(s\.evaluationAttempts \|\| \[\]\)\.filter/);
});

test('the UI clearly labels the evaluator as rule-based and not official grading', () => {
  assert.match(source, /Rule-based practice rubric/);
  assert.match(source, /not AI grading or an official VTU marks prediction/);
  assert.match(source, /cannot reliably identify false statements/);
});

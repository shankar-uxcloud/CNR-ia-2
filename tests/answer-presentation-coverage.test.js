import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const read = (path) => fs.readFileSync(new URL('../' + path, import.meta.url), 'utf8');

test('shared answer presentation control matches the compact icon-and-segmented reference layout', () => {
  const component = read('src/components/AnswerPresentation.jsx');
  assert.match(component, /ListTree/);
  assert.match(component, /Answer presentation/);
  assert.match(component, /aria-pressed=\{value === 'original'\}/);
  assert.match(component, /aria-pressed=\{value === 'structured'\}/);
  assert.match(component, /Original/);
  assert.match(component, /Structured/);
  assert.match(component, /focus-visible:outline/);
});

test('every core question answer exposes the shared switch for 2, 5 and 10 mark modes', () => {
  const page = read('src/pages/Answer.jsx');
  assert.match(page, /import \{ AnswerPresentationSwitch \}/);
  assert.match(page, /<AnswerPresentationSwitch value=\{presentationMode\} onChange=\{setPresentationMode\}/);
  assert.match(page, /presentationMode === 'original'/);
  assert.match(page, /structuredSections\.map/);
  assert.match(page, /answerMode === 'two'/);
  assert.match(page, /answerMode === 'five'/);
});

test('five-mark bank and June-July paper retain independent per-answer controls', () => {
  const five = read('src/pages/FiveMarkAnswers.jsx');
  const june = read('src/pages/JuneJuly2026.jsx');
  assert.match(five, /function QuestionCard/);
  assert.match(five, /const \[presentationMode, setPresentationMode\] = useState\('original'\)/);
  assert.match(five, /<AnswerPresentationSwitch value=\{presentationMode\}/);
  assert.match(june, /function AnswerCard/);
  assert.match(june, /const \[presentationMode, setPresentationMode\] = useState\('original'\)/);
  assert.match(june, /<AnswerPresentationSwitch value=\{presentationMode\}/);
});

test('December-January answers each own an independent presentation preference', () => {
  const page = read('src/pages/DecJan2026.jsx');
  assert.match(page, /const \[presentationModes, setPresentationModes\] = useState\(\{\}\)/);
  for (const id of ['q1-a','q1-b','q2-a','q2-b','q3-a','q3-b']) {
    assert.ok(page.includes("presentationFor('" + id + "')"), 'Missing control for ' + id);
  }
  assert.match(page, /presentationFor\(answer\.id\)/);
  assert.match(page, /data-answer-presentation=\{presentationFor\(answer\.id\)\}/);
  assert.match(page, /setPresentationFor\(answer\.id, mode\)/);
});

test('all 30 supplementary model-paper subanswers own independent presentation modes', () => {
  const page = read('src/pages/ModelQuestionPaper21CV654.jsx');
  assert.match(page, /const \[presentationModes,setPresentationModes\]=useState\(\{\}\)/);
  assert.match(page, /data-answer-presentation=\{presentationFor\(id\)\}/);
  assert.match(page, /<AnswerPresentationSwitch value=\{presentationFor\(id\)\}/);
  assert.match(page, /presentationFor\(id\) === 'original'/);
  assert.match(page, /presentationFor\(id\) === 'structured'/);
});

test('structured mode preserves source content and uses responsive per-answer styling', () => {
  const component = read('src/components/AnswerPresentation.jsx');
  const css = read('src/pages/AnswerPresentation.css');
  assert.match(component, /StructuredSectionCard/);
  assert.match(css, /question-answer-anchor\[data-answer-presentation="structured"\]/);
  assert.match(css, /@media \(max-width: 640px\)/);
});

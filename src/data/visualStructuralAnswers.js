import { FIVE_MARK_PAPER_BANK } from './fiveMarkPaperBank.js';
import { additionalDecJanAnswers } from './decJan2026Additional.js';
import { MODEL_21CV654 } from './modelQuestionPaper21cv654.js';

const clean = (value = '') => String(value).replace(/\*\*/g, '').replace(/\s+/g, ' ').trim();
const blockText = (block) => {
  if (!block) return '';
  return clean([
    block.text, block.caption, ...(block.items || []), ...(block.lines || []),
    ...(block.head || []), ...(block.rows || []).flat(),
  ].filter(Boolean).join(' '));
};

function fromFiveMark(item) {
  return (item.answer || []).map((section) => ({
    title: clean(section.title),
    points: [
      ...(section.blocks || []).map(blockText).filter(Boolean),
      ...(section.subsections || []).flatMap((sub) => [
        clean(sub.title), ...(sub.blocks || []).map(blockText),
      ]).filter(Boolean),
    ],
  })).filter((section) => section.points.length);
}

function fromDecJan(item) {
  return [
    ...(item.intro ? [{ title: 'Meaning / introduction', points: [clean(item.intro)] }] : []),
    ...(item.sections || []).map((section) => ({
      title: clean(section.title),
      points: (section.points || []).flatMap((point) => Array.isArray(point)
        ? [clean(point[0] + ': ' + point[1])]
        : [clean(point)]).filter(Boolean),
    })),
    ...(item.conclusion ? [{ title: 'Conclusion', points: [clean(item.conclusion)] }] : []),
  ].filter((section) => section.points.length);
}

function fromModel(part) {
  const text = clean(part.answer || '');
  const paragraphs = text.split(/\n+/).map(clean).filter(Boolean);
  const sections = [];
  let current = { title: 'Core explanation', points: [] };
  for (const paragraph of paragraphs) {
    const heading = paragraph.match(/^\*\*(.+?)\*\*$/);
    if (heading) {
      if (current.points.length) sections.push(current);
      current = { title: clean(heading[1]), points: [] };
    } else {
      current.points.push(paragraph.replace(/^\d+\.\s*/, ''));
    }
  }
  if (current.points.length) sections.push(current);
  return sections;
}

const modelParts = MODEL_21CV654.flatMap((group) => group.parts.map((part) => ({
  code: part.code, module: group.module, answer: part.answer, question: part.question,
})));
const decJanById = new Map(additionalDecJanAnswers.map((item) => [item.id, item]));
const modelByCode = new Map(modelParts.map((item) => [item.code, item]));

const fallbackStructure = (question) => [{
  title: 'Question focus',
  points: [clean(question)],
}];

export const VISUAL_STRUCTURAL_ANSWERS = FIVE_MARK_PAPER_BANK.map((item) => {
  let sections = fromFiveMark(item);
  let sourceAnswerType = sections.length ? 'existing five-mark answer bank' : 'question-only source record';

  if (!sections.length && item.source.title.includes('December')) {
    const decJan = decJanById.get(item.sourceQuestionId.replace(/^Q/, '').toLowerCase());
    if (decJan) {
      sections = fromDecJan(decJan);
      sourceAnswerType = 'existing December/January expanded answer';
    }
  }

  if (!sections.length && item.source.category === 'supplementary-model-paper') {
    const model = modelByCode.get(item.sourceQuestionId);
    if (model?.answer) {
      sections = fromModel(model);
      sourceAnswerType = 'existing 21CV654 model answer';
    }
  }

  const hasSourceAnswer = sections.length > 0;
  if (!hasSourceAnswer) sections = fallbackStructure(item.question);

  const normalized = sections.map((section, index) => ({
    id: item.id + '-section-' + index,
    title: section.title || 'Key points',
    points: section.points.filter(Boolean),
  })).filter((section) => section.points.length);

  const text = normalized.flatMap((section) => [section.title, ...section.points]).join(' ');
  const type = /compare|difference|distinguish|versus|vs\./i.test(item.question) ? 'comparison'
    : /cycle|lifecycle|life cycle/i.test(item.question) ? 'cycle'
    : /classify|classification|types of|categories/i.test(item.question) ? 'classification'
    : /steps|process|procedure|working|mechanism|flowchart|clearance/i.test(item.question) ? 'flow'
    : /structure|components|architecture|system|plant/i.test(item.question) ? 'block'
    : normalized.length > 3 ? 'tree' : 'concept';

  return {
    ...item,
    visualSections: normalized,
    visualType: type,
    visualKeywords: [...new Set((text.match(/\b[A-Z][A-Za-z-]{3,}\b/g) || []).slice(0, 12))],
    visualSourceStatus: hasSourceAnswer ? 'derived-from-existing-answer' : 'question-only-no-answer-source',
    visualSourceLabel: sourceAnswerType,
    examSequence: normalized.map((section) => section.title),
  };
});

export const VISUAL_PAPER_OPTIONS = [
  { value: 'all', label: 'All three papers' },
  { value: 'dec-jan', label: 'December 2025 / January 2026' },
  { value: 'june-july', label: 'June / July 2026' },
  { value: '21cv654', label: '21CV654 supplementary model paper' },
];

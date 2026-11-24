import { EXAM_QUESTION_PAPER } from './juneJuly2026.js';
import { additionalDecJanAnswers } from './decJan2026Additional.js';
import { evaluationScheme } from './decJan2026Evaluation.js';
import { MODEL_21CV654 } from './modelQuestionPaper21cv654.js';

const DEC_JAN_CORE_SUMMARIES = [
  { id: 'q1-a', module: 1, question: 'Ecological and economic importance of land', sourceQuestionId: 'Q1(a)' },
  { id: 'q1-b', module: 1, question: 'Objectives and strategies for conservation of landforms', sourceQuestionId: 'Q1(b)' },
  { id: 'q2-a', module: 1, question: 'Indicators and improvement of soil health', sourceQuestionId: 'Q2(a)' },
  { id: 'q2-b', module: 1, question: 'Causes and impacts of deforestation', sourceQuestionId: 'Q2(b)' },
  { id: 'q3-a', module: 2, question: 'Global water resources', sourceQuestionId: 'Q3(a)' },
  { id: 'q3-b', module: 2, question: 'Inter-basin water transfer in India', sourceQuestionId: 'Q3(b)' },
];

const DEC_JAN_SOURCE = {
  title: 'BCV755B Question Paper — December 2025 / January 2026',
  category: 'catalogued-university-question-paper',
  file: 'resources/question-papers/BCV755B-dec-2025-jan-2026.pdf',
  supportingFile: 'resources/question-papers/SCH_BCV755B DEC.2025-JAN.2026.pdf',
};

const JUNE_JULY_SOURCE = {
  title: 'BCV755B Question Paper — June / July 2026',
  category: 'catalogued-university-question-paper',
  file: 'resources/question-papers/June-July 2026.pdf',
};

const MODEL_SOURCE = {
  title: 'Conservation of Natural Resources — supplementary 21CV654 model paper',
  category: 'supplementary-model-paper',
  file: 'resources/question-papers/[studocu.com] - 21CV654 Model Question Paper - Conservation of Natural Resources.pdf',
};

const MODEL_SUPPORT = {
  '1(a)': 'partial', '1(b)': 'partial', '1(c)': 'supported',
  '2(a)': 'supported', '2(b)': 'supported', '2(c)': 'supported',
  '3(a)': 'supported', '3(b)': 'gap', '3(c)': 'supported',
  '4(a)': 'supported', '4(b)': 'supported', '4(c)': 'partial',
  '5(a)': 'supported', '5(b)': 'partial', '5(c)': 'supported',
  '6(a)': 'partial', '6(b)': 'gap', '6(c)': 'gap',
  '7(a)': 'supported', '7(b)': 'supported', '7(c)': 'partial',
  '8(a)': 'partial', '8(b)': 'partial', '8(c)': 'partial',
  '9(a)': 'partial', '9(b)': 'supported', '9(c)': 'partial',
  '10(a)': 'supported', '10(b)': 'partial', '10(c)': 'partial',
};

const juneJulyQuestions = EXAM_QUESTION_PAPER.flatMap((questionGroup) => (
  [...questionGroup.parts, ...questionGroup.alternative].map((part) => ({
    id: 'june-july-2026-' + part.id,
    sourceQuestionId: part.id,
    question: part.text,
    module: questionGroup.module,
    targetMarks: 5,
    originalMarks: 10,
    source: JUNE_JULY_SOURCE,
    questionTextStatus: 'transcribed-from-existing-question-data',
    sourceVerificationStatus: 'needs-original-pdf-comparison',
    sourceSupportStatus: 'not-audited',
    answerStatus: 'not-started',
    sourcePageRefs: [],
  }))
));

const decJanCoreQuestions = DEC_JAN_CORE_SUMMARIES.map((item) => ({
  id: 'dec-jan-2026-' + item.id,
  sourceQuestionId: item.sourceQuestionId,
  question: item.question,
  module: item.module,
  targetMarks: 5,
  originalMarks: null,
  source: DEC_JAN_SOURCE,
  questionTextStatus: 'summary-only',
  sourceVerificationStatus: 'needs-exact-wording-from-original-pdf',
  sourceSupportStatus: 'not-audited',
  answerStatus: 'blocked-exact-question-wording',
  sourcePageRefs: [],
}));

const decJanAdditionalQuestions = additionalDecJanAnswers.map((item) => ({
  id: 'dec-jan-2026-' + item.id,
  sourceQuestionId: item.id,
  question: item.question,
  module: item.module,
  targetMarks: 5,
  originalMarks: evaluationScheme[item.id] ? 10 : null,
  source: DEC_JAN_SOURCE,
  questionTextStatus: 'transcribed-from-existing-answer-record',
  sourceVerificationStatus: 'needs-original-pdf-comparison',
  sourceSupportStatus: 'not-audited',
  answerStatus: 'not-started',
  sourcePageRefs: [],
}));

const modelQuestions = MODEL_21CV654.flatMap((questionGroup) => (
  questionGroup.parts.map((part) => ({
    id: '21cv654-' + part.code.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    sourceQuestionId: part.code,
    question: part.question,
    module: questionGroup.module,
    targetMarks: 5,
    originalMarks: part.marks,
    source: MODEL_SOURCE,
    questionTextStatus: 'transcribed-from-model-paper-data',
    sourceVerificationStatus: 'mapped-in-existing-source-audit',
    sourceSupportStatus: MODEL_SUPPORT[part.code] || 'not-audited',
    answerStatus: 'not-started',
    sourcePageRefs: part.pages ? [part.pages] : [],
    repeatGroup: ['8(c)', '9(c)'].includes(part.code) ? '21cv654-zoological-garden-repeat' : null,
  }))
));

export const FIVE_MARK_SOURCE_QUESTIONS = [
  ...decJanCoreQuestions,
  ...decJanAdditionalQuestions,
  ...juneJulyQuestions,
  ...modelQuestions,
];

export const getFiveMarkSourceQuestionsByModule = (moduleNumber) => (
  FIVE_MARK_SOURCE_QUESTIONS.filter((item) => item.module === Number(moduleNumber))
);

export const getFiveMarkSourceQuestionsByCategory = (category) => (
  FIVE_MARK_SOURCE_QUESTIONS.filter((item) => item.source.category === category)
);

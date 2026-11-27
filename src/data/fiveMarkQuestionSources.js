import { EXAM_QUESTION_PAPER } from './juneJuly2026.js';
import { additionalDecJanAnswers } from './decJan2026Additional.js';
import { evaluationScheme } from './decJan2026Evaluation.js';
import { MODEL_21CV654 } from './modelQuestionPaper21cv654.js';

const DEC_JAN_CORE_SUMMARIES = [
  { id: 'q1-a', module: 1, question: 'Discuss the ecological and economical importance of land as a natural resource.', sourceQuestionId: 'Q1(a)' },
  { id: 'q1-b', module: 1, question: 'What are the objectives of conservation of land forms? Explain the strategies to conserve land forms.', sourceQuestionId: 'Q1(b)' },
  { id: 'q2-a', module: 1, question: 'Explain the indicators of soil health and discuss the strategies to improve soil health.', sourceQuestionId: 'Q2(a)' },
  { id: 'q2-b', module: 1, question: 'Brief the causes and impact of deforestation on land resource.', sourceQuestionId: 'Q2(b)' },
  { id: 'q3-a', module: 2, question: 'Discuss briefly on global water resource.', sourceQuestionId: 'Q3(a)' },
  { id: 'q3-b', module: 2, question: 'Explain briefly inter basin water transfer and its importance in India.', sourceQuestionId: 'Q3(b)' },
];

const DEC_JAN_SOURCE = {
  title: 'BCV755B Question Paper — December 2025 / January 2026',
  category: 'catalogued-university-question-paper',
  file: 'resources/question-papers/SCH_BCV755B DEC.2025-JAN.2026.pdf',
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


// Verbatim transcription checked against the two scanned question pages in the
// user-supplied 21CV654 model-paper PDF. The original model-paper answer file is
// intentionally left untouched; this source register owns the exact paper text.
const MODEL_PAPER_VERBATIM = {
  '1(a)': 'Explain about different types of natural resources with suitable examples.',
  '1(b)': 'List the different types of land form? Explain in brief.',
  '1(c)': 'Discuss the ecological and economic importance of soil as a natural resource.',
  '2(a)': 'Describe the impact of soil degradation on food security.',
  '2(b)': 'Write a short note on Soil health.',
  '2(c)': 'List and explain the principles for sustainable land use planning.',
  '3(a)': 'Discuss briefly about water deficit and water surplus basins of India.',
  '3(b)': 'Illustrate on conjunctive use of ground water.',
  '3(c)': 'Explain briefly about inter basin water transfers.',
  '4(a)': 'Illustrate on global water resource.',
  '4(b)': 'Describe briefly about water resource system planning.',
  '4(c)': 'Explain briefly about the water usage means in agriculture sector.',
  '5(a)': 'Explain the effect of air pollution on human health.',
  '5(b)': 'List and explain the national ambient air quality standards.',
  '5(c)': 'Discuss on air quality index and its levels for health concerns.',
  '6(a)': 'What is ozone depletion and its impact on human health.',
  '6(b)': 'Explain briefly about rock forming minerals such as quartz, mica, Feldspar and amphibole.',
  '6(c)': 'Explain briefly about weathering due to physical and biogeochemical processes.',
  '7(a)': 'Explain the importance of bio-diversity.',
  '7(b)': 'Discuss about ecological restoration for conservation of bio-diversity.',
  '7(c)': 'Figure out the various natural and anthropogenic agents which causes disturbance on climate.',
  '8(a)': 'List and explain the various wild life sanctuaries in India.',
  '8(b)': 'Illustrate the various drugs derived from biodiversity plants.',
  '8(c)': 'Describe the zoological garden with respect to biodiversity.',
  '9(a)': 'Develop a flowchart of hydropower plant EIA environmental clearance under EIA notifications.',
  '9(b)': 'Discuss briefly about global climate change-indicators.',
  '9(c)': 'Describe the zoological garden with respect to biodiversity.',
  '10(a)': 'List and explain the various health impacts due to global warming.',
  '10(b)': 'List and explain the projects needing environmental clearance under EIA.',
  '10(c)': 'Explain the importance of EIA in implementing projects like thermal power plants.',
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
    questionTextStatus: 'verified-against-uploaded-pdf',
    sourceVerificationStatus: 'verified-against-uploaded-pdf',
    sourceSupportStatus: 'not-audited',
    answerStatus: 'not-started',
    notesPageRefs: [],
  }))
));

const decJanCoreQuestions = DEC_JAN_CORE_SUMMARIES.map((item) => ({
  id: 'dec-jan-2026-' + item.id,
  sourceQuestionId: item.sourceQuestionId,
  question: item.question,
  module: item.module,
  targetMarks: 5,
  originalMarks: 10,
  source: DEC_JAN_SOURCE,
  questionTextStatus: 'verified-against-uploaded-pdf',
  sourceVerificationStatus: 'verified-against-uploaded-pdf',
  sourceSupportStatus: 'not-audited',
  answerStatus: 'draft-needs-source-and-academic-review',
  notesPageRefs: [],
}));

const decJanAdditionalQuestions = additionalDecJanAnswers.map((item) => ({
  id: 'dec-jan-2026-' + item.id,
  sourceQuestionId: item.id,
  question: item.question,
  module: item.module,
  targetMarks: 5,
  originalMarks: evaluationScheme[item.id] ? 10 : null,
  source: DEC_JAN_SOURCE,
  questionTextStatus: 'verified-against-uploaded-pdf',
  sourceVerificationStatus: 'verified-against-uploaded-pdf',
  sourceSupportStatus: 'not-audited',
  answerStatus: 'not-started',
  notesPageRefs: [],
}));

const modelQuestions = MODEL_21CV654.flatMap((questionGroup) => (
  questionGroup.parts.map((part) => ({
    id: '21cv654-' + part.code.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    sourceQuestionId: part.code,
    question: MODEL_PAPER_VERBATIM[part.code] || part.question,
    module: questionGroup.module,
    targetMarks: 5,
    originalMarks: part.marks,
    source: MODEL_SOURCE,
    questionTextStatus: 'verified-against-uploaded-pdf',
    sourceVerificationStatus: 'verified-against-uploaded-pdf',
    sourceSupportStatus: MODEL_SUPPORT[part.code] || 'not-audited',
    answerStatus: 'not-started',
    notesPageRefs: part.pages ? [part.pages] : [],
    repeatGroup: ['8(c)', '9(c)'].includes(part.code) ? '21cv654-zoological-garden-repeat' : null,
  }))
));

const SOURCE_QUESTION_RECORDS = [
  ...decJanCoreQuestions,
  ...decJanAdditionalQuestions,
  ...juneJulyQuestions,
  ...modelQuestions,
];

const CONCEPT_GROUPS = {
  'june-july-2026-q1b': 'soil-importance',
  '21cv654-1-c-': 'soil-importance',
  'june-july-2026-q2a': 'soil-degradation-food-security',
  '21cv654-2-a-': 'soil-degradation-food-security',
  'june-july-2026-q2b': 'sustainable-land-use-planning',
  '21cv654-2-c-': 'sustainable-land-use-planning',
  'june-july-2026-q3a': 'water-surplus-deficit-basins',
  'dec-jan-2026-4a': 'water-surplus-deficit-basins',
  '21cv654-3-a-': 'water-surplus-deficit-basins',
  'june-july-2026-q3b': 'global-water-resources',
  '21cv654-4-a-': 'global-water-resources',
  'june-july-2026-q4a': 'inter-basin-water-transfer',
  '21cv654-3-c-': 'inter-basin-water-transfer',
  'june-july-2026-q4b': 'seawater-ingress',
  'dec-jan-2026-4b': 'seawater-ingress',
  'june-july-2026-q5a': 'air-pollution-sources-classification',
  'dec-jan-2026-5a': 'air-pollution-sources-classification',
  'june-july-2026-q5b': 'air-pollution-human-health',
  'dec-jan-2026-5b': 'air-pollution-human-health',
  '21cv654-5-a-': 'air-pollution-human-health',
  'june-july-2026-q6b': 'ozone-depletion',
  'dec-jan-2026-6a': 'ozone-depletion',
  '21cv654-6-a-': 'ozone-depletion',
  'june-july-2026-q7a': 'biodiversity-importance',
  'dec-jan-2026-7a': 'biodiversity-importance',
  '21cv654-7-a-': 'biodiversity-importance',
  'june-july-2026-q7b': 'ecological-restoration',
  '21cv654-7-b-': 'ecological-restoration',
  'dec-jan-2026-8a': 'climate-disturbance-agents',
  '21cv654-7-c-': 'climate-disturbance-agents',
  'june-july-2026-q9a': 'global-warming-causes-effects',
  'dec-jan-2026-9a': 'global-warming-causes-effects',
  'june-july-2026-q10b': 'eia-thermal-power-plant',
  'dec-jan-2026-10a': 'eia-thermal-power-plant',
  '21cv654-10-c-': 'eia-thermal-power-plant',
  'dec-jan-2026-9b': 'environmental-clearance-project-categories',
  '21cv654-10-b-': 'environmental-clearance-project-categories',
  '21cv654-8-c-': 'zoological-gardens',
  '21cv654-9-c-': 'zoological-gardens',
};

export const FIVE_MARK_SOURCE_QUESTIONS = SOURCE_QUESTION_RECORDS.map((item) => ({
  ...item,
  conceptGroup: CONCEPT_GROUPS[item.id] || null,
}));

export const getFiveMarkSourceQuestionsByModule = (moduleNumber) => (
  FIVE_MARK_SOURCE_QUESTIONS.filter((item) => item.module === Number(moduleNumber))
);

export const getFiveMarkSourceQuestionsByCategory = (category) => (
  FIVE_MARK_SOURCE_QUESTIONS.filter((item) => item.source.category === category)
);

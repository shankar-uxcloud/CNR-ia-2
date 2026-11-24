import { FIVE_MARK_SOURCE_QUESTIONS } from './fiveMarkQuestionSources.js';
import { FIVE_MARK_PAPER_ANSWERS } from './answers5/index.js';

const answersById = new Map(FIVE_MARK_PAPER_ANSWERS.map((item) => [item.id, item]));

export const FIVE_MARK_PAPER_BANK = FIVE_MARK_SOURCE_QUESTIONS.map((source) => {
  const answerRecord = answersById.get(source.id);
  const answer = answerRecord?.answer || [];
  const diagramRefs = [...new Set(
    answer.flatMap((section) => section.blocks || [])
      .filter((block) => block.type === 'diagram' && block.id)
      .map((block) => block.id),
  )];

  let reviewStatus = answerRecord?.reviewStatus || 'not-started';
  if (!answerRecord && source.answerStatus === 'blocked-exact-question-wording') {
    reviewStatus = 'blocked-question-text';
  }

  return {
    ...source,
    marks: source.targetMarks,
    answer,
    topicTags: answerRecord?.topicTags || [],
    diagramRefs,
    reviewStatus,
    reviewReason: answerRecord?.reviewReason || (
      source.answerStatus === 'blocked-exact-question-wording'
        ? 'Exact original question wording must be transcribed from the source PDF before answer authoring.'
        : null
    ),
  };
});

export const getFiveMarkPaperQuestionsByModule = (moduleNumber) => (
  FIVE_MARK_PAPER_BANK.filter((item) => item.module === Number(moduleNumber))
);

export const getFiveMarkPaperQuestion = (questionId) => (
  FIVE_MARK_PAPER_BANK.find((item) => item.id === questionId) || null
);

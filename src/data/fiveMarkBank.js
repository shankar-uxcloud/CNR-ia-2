import { QUESTIONS } from './questions.js';
import { FIVE_MARK_ANSWERS } from './fiveMarkAnswers.js';

const blocksFor = (sections = []) => sections.flatMap((section) => [
  ...(section.blocks || []),
  ...(section.subsections || []).flatMap((subsection) => subsection.blocks || []),
]);

/**
 * A marks-aware view over the existing five-mark companion answers.
 * The original question catalogue and all existing 2-mark / 10-mark answer
 * files remain the source of truth for their own categories.
 */
export const FIVE_MARK_BANK = QUESTIONS.map((question) => {
  const answer = FIVE_MARK_ANSWERS[question.id] || [];
  const source = question.answer?.source || null;

  return {
    id: question.id,
    question: question.question,
    module: question.module,
    marks: 5,
    answer,
    diagramRefs: [...new Set(
      blocksFor(answer)
        .filter((block) => block.type === 'diagram' && block.id)
        .map((block) => block.id),
    )],
    source: source ? {
      document: source.doc || null,
      references: source.refs || [],
      additionalReferences: source.extra || [],
    } : null,
    topicTags: question.answer?.keywords || [],
    verificationStatus: 'needs-review',
  };
});

export const getFiveMarkQuestionsByModule = (moduleNumber) => (
  FIVE_MARK_BANK.filter((item) => item.module === Number(moduleNumber))
);

export const getFiveMarkQuestion = (questionId) => (
  FIVE_MARK_BANK.find((item) => item.id === questionId) || null
);

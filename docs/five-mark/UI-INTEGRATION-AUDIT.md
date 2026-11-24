# CNR-IA-2 — Five-Mark User Experience Audit

## Dedicated entry point

A dedicated **5-Mark Answers** destination is available at /five-mark-answers and is linked under Exam Preparation in the sidebar. The sidebar count is derived from the ten existing core companion answers plus the seventy source-question records.

The existing Answers destination and its 2-mark / 10-mark content remain separate. The new page explicitly tells students that it is dedicated to five-mark preparation.

## Bank composition

| Group | Records | Draft answers | Review-only |
|---|---:|---:|---:|
| Existing core syllabus five-mark companion bank | 10 | 10 | 0 |
| Source-linked question-paper bank | 70 | 56 | 14 |
| **Total shown in the dedicated page** | **80** | **66** | **14** |

Core syllabus questions and paper-derived questions retain separate identities and source labels. Similar topics are not silently merged. The repeated model-paper zoological-garden question remains a separate paper-source record.

## Navigation and discovery

- Search covers question text, answer text, source labels, source identifiers and topic tags.
- Module filters cover Modules 1–5 and show the number of records in each module.
- Additional filters separate core syllabus questions from paper sources.
- Topic filtering is populated from the answer-bank topic tags.
- Answer-availability filtering separates records with a draft from review-only records.
- Source title, source question ID, original paper marks and available notes-reference pages are shown with each paper-derived question.

## Answer presentation

- Questions and five-mark status are shown before the expandable answer.
- Existing answer blocks are rendered through the existing Blocks component.
- Existing diagrams are rendered through the existing diagram registry, including the six additive diagrams from the Modules 1–2 phase.
- Source gaps and exact-question-wording blockers are shown with an explicit review note rather than a fabricated answer.
- Draft answers display their pending PDF or academic review state.

## Progress, bookmarks and compatibility

- The page uses the existing useStudy bookmark, completion and visit functions.
- Existing localStorage keys and data structures are not changed.
- The ten existing core five-mark question IDs remain unchanged, preserving their existing bookmark/progress identity.
- Paper-derived questions use stable source-prefixed IDs to avoid collisions with existing question IDs.
- No PWA or service-worker code is modified.
- Existing theme tokens and responsive utility classes are used; no separate theme system is introduced.

## Automated checks

The UI integration test checks:
- Lazy route and sidebar navigation registration.
- Dynamic navigation count of 80.
- Separation of ten core questions and seventy paper-source questions.
- Module, source, topic and answer-availability filters.
- Existing bookmark, completion and visit functions.
- Reuse of the existing answer-block renderer.

Responsive layout is implemented with the project's existing mobile-first layout utilities. Browser/device visual review remains part of the final QA phase.

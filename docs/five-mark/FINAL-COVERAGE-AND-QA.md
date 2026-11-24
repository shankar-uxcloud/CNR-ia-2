# CNR-IA-2 — Five-Mark Answer Bank Final Coverage and QA Audit

## Overall source coverage

The repository source register contains 70 paper-derived question records across all five modules. Each source record now has either an answer draft or an explicit review-only state.

| Module | Source questions | Answer drafts | Review-only |
|---|---:|---:|---:|
| Module 1 | 14 | 8 | 6 |
| Module 2 | 14 | 11 | 3 |
| Module 3 | 14 | 12 | 2 |
| Module 4 | 14 | 12 | 2 |
| Module 5 | 14 | 13 | 1 |
| **Total** | **70** | **56** | **14** |

The dedicated user experience also retains the ten pre-existing core syllabus five-mark companion answers as a separate group. The page therefore presents 80 records: 66 answer drafts and 14 review-only source records.

## Source inventory and limitations

| Source group | Records | Current treatment |
|---|---:|---|
| June/July 2026 university-paper collection | 20 | Question text transcribed from existing repository data; PDF header and exact wording still require verification |
| December/January 2025–26 university-paper collection | 20 | 14 detailed question parts plus six summary-only core records; PDF header and wording still require verification |
| 21CV654 supplementary model paper | 30 | Mapped to the existing source audit and notes reference pages; explicitly treated as supplementary, not as an official VTU model paper |

The resource catalogue also lists a separate scheme-specific December/January PDF and a 2026–27 syllabus PDF. The current 70-record source register does not claim that those additional documents have been fully compared against every question. The university-paper collections are catalogued in the repository but are not certified as official VTU documents until their PDF headers and exact question wording are checked.

The binary PDF files could not be read through the repository file-content interface during this implementation pass. Therefore:
- No paper-header verification is claimed.
- The six December/January summary-only records remain blocked.
- The notes-page references attached to model-paper questions are explicitly labelled as notes PDF viewer pages, not question-paper page numbers.
- The 2026–27 official syllabus has not yet been checked line-by-line against all 70 source questions.

## Review-only records

The 14 source questions without an answer draft are intentionally visible and traceable:

- Six December/January core questions whose exact wording is only available as a summary in the existing structured repository data.
- Three Module 1–2 supplementary model-paper gaps: natural-resource classification, landform classification and conjunctive use of surface water and groundwater.
- Two Module 3 model-paper gaps: rock-forming minerals and physical/biogeochemical weathering.
- Two Module 4 model-paper gaps: named wildlife sanctuaries in India and a sufficiently detailed zoological-garden answer.
- One Module 5 repeated zoological-garden question, retained as its own source record but blocked for the same notes-coverage limitation.

No missing answer is filled with invented question wording or unsupported examples.

## Draft quality and verification status

There are 56 answer drafts. Draft availability is not the same as academic verification:
- Official-paper drafts still require exact PDF comparison.
- Several model-paper drafts carry needs-source-review status because the supplied notes only partially support the requested scope.
- No AI-authored answer is marked verified merely because it has been generated.
- The audit documents the questions that require a new approved source or manual academic review.

Answer records are question-specific. Similar questions across papers are not silently merged. The source register now includes conceptGroup metadata for repeated or related topics. The exact repeated zoological-garden model-paper question Q8(c)/Q9(c) remains two separate records with a repeatGroup marker.

## Existing-content protection

The protected-content test compares Git blob fingerprints for existing:
- Question catalogue and question IDs/mappings.
- 2-mark answer data.
- Existing 5-mark core companion answers.
- 10-mark module answer data.
- June/July paper answer data.
- December/January paper answer data and evaluation scheme.
- Supplementary model-paper content.
- Existing June/July and December/January answer pages.
- Answer-content helpers and Blocks renderer.
- Existing diagram components and shared diagram kit.

The diagram registry is extended additively. All 13 pre-existing diagram IDs remain registered; six new study diagrams are added for the five-mark bank. No existing diagram component is rewritten.

## Compatibility and user experience

The dedicated /five-mark-answers page:
- Shows the ten existing core five-mark questions separately from seventy paper-derived questions.
- Displays module, source, topic, answer availability and review state.
- Searches question, answer, topic and source text.
- Uses module, source, topic and answer-availability filters.
- Uses the existing bookmark, completion and visit functions.
- Does not change existing localStorage keys or data structures.
- Uses the existing theme tokens and mobile-first layout utilities.
- Does not change PWA/service-worker behavior.
- Leaves the existing 2-mark and 10-mark Answers area intact.

Static UI checks cover the route, navigation, filters, data counts, study-state integration and responsive layout classes. Browser/device screenshot review remains a manual final check.

## Automated QA

The implementation phases run the repository's existing test suite and production build. The PR checks record:
- Dependency installation.
- Full existing and new Node test suite.
- Production Vite build.
- Source-register count and uniqueness.
- Answer/source ID mapping.
- Missing-answer and invalid-module detection.
- Supported answer-block schema.
- Diagram reference resolution.
- 2/5/10-mark category isolation.
- Review-state coverage.
- Related-concept grouping.
- Existing content fingerprints.
- UI route, filters, bookmarks, progress and responsive class checks.

## PR sequence

1. PR #117 — protected five-mark foundation.
2. PR #118 — source-question register.
3. PR #119 — Modules 1 and 2.
4. PR #120 — Module 3.
5. PR #121 — Module 4.
6. PR #122 — Module 5.
7. PR #123 — dedicated UI integration.
8. PR #124 — final coverage and QA audit.

All PRs are intended for manual review and must remain unmerged until the owner approves them. The final acceptance criteria are not fully satisfied until the PDF headers/question wording, official syllabus mapping, partial-source answers and manual academic checks are completed.

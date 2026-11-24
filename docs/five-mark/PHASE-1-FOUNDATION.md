# CNR-IA-2 — Five-Mark Answer Bank Foundation

## Phase 1 scope

This phase establishes an independent, marks-aware data adapter and regression guardrails. It does not create new academic answers, change question wording, edit existing answer content, or change application navigation.

## Repository baseline

- Repository: shankar-uxcloud/CNR-ia-2
- Base branch: main
- Stack: React 18, Vite 5, Tailwind CSS 3, JavaScript ES modules.
- Routing: existing hash-based router in src/lib/router.js and src/App.jsx.
- Study state: existing React context and browser localStorage.
- Existing PWA/service-worker and GitHub Pages setup remain out of scope for modification.

## Existing answer-bank architecture

| Category | Existing location | Current relationship |
|---|---|---|
| Question catalogue and module mapping | src/data/questions.js | Ten core question records, q01–q10, currently Modules 3–5; records carry marks: 10 |
| Existing 10-mark answers | src/data/answers/module3.js, module4.js, module5.js | Structured section/block data imported by the question catalogue |
| Existing 2-mark answers | src/data/twoMarkAnswers.js | Separate q01–q10 mapping |
| Existing 5-mark answers | src/data/fiveMarkAnswers.js | Separate q01–q10 mapping, already rendered as a mode in Practice.jsx |
| Diagram registry | src/diagrams/index.js | Existing reusable diagram components referenced by answer content |
| Current practice experience | src/pages/Practice.jsx | Has a five-mark mode, but it is not a complete source-derived question-paper bank |
| Navigation and routes | src/components/Shell.jsx, src/App.jsx | No dedicated all-source 5-mark answer destination yet |

The new src/data/fiveMarkBank.js adapter exposes explicit question ID, question text, module, marks=5, answer blocks, diagram references, inherited source metadata, topic tags and a conservative review status. It does not mutate or replace the original question or answer records.

All current records are marked needs-review. Existing answer data and inherited source metadata are not, by themselves, proof that each answer has passed the new question-specific academic verification process.

## Source inventory discovered in the repository

### Syllabus and notes

- BCV755B, VTU 2022 Scheme syllabus is identified in docs/CNR-WELCOME-ACADEMIC-AUDIT.md.
- src/data/resourceCatalog.js lists module-note PDFs and presentations for all five modules.
- The repository's earlier 21CV654 source audit records inspection of BCV755B Full Notes.pdf (57 PDF viewer pages), with module ranges: Module 1 pages 1–13, Module 2 pages 14–22, Module 3 pages 23–31, Module 4 pages 32–46, and Module 5 pages 47–57.
- Separate module note documents are referenced by the existing answer files for Modules 3–5.

### Question-paper collections

The resource catalogue identifies these separate source groups:

1. BCV755B Question Paper — December 2025 / January 2026.
2. BCV755B Scheme Question Paper — December 2025 / January 2026.
3. BCV755B Question Paper — June / July 2026.
4. A supplementary model paper whose original filename references 21CV654.

The 21CV654-named paper must remain explicitly labelled supplementary. The repository's academic audit says it is not represented as an official BCV755B VTU paper.

### Existing source-audit documents and boundaries

- docs/21cv654/PHASE-0-1-AUDIT.md records the repository and question-bank audit.
- docs/21cv654/PHASE-2-SOURCE-MAP.md maps 30 subquestions from the supplementary 21CV654 model paper to BCV755B Full Notes.pdf viewer pages and identifies supported, partial and gap cases.
- That source map is not a complete source-to-question map for the December/January and June/July official BCV755B papers.
- src/data/juneJuly2026.js contains ten main question-answer records, grouped across all five modules.
- src/data/decJan2026Additional.js contains additional Dec/Jan 2026 answer records grouped by module. The full original-paper question inventory and exact question-to-answer relationship still require a dedicated extraction audit.
- Existing FIVE_MARK_ANSWERS currently has ten core answers q01–q10, all Modules 3–5. It does not establish five-mark coverage for Modules 1 and 2 or for every question in the separate paper collections.

## Protected-content baseline

The new test tests Git blob SHA-1 values for the following existing files:

- src/data/questions.js
- src/data/answers/module3.js
- src/data/answers/module4.js
- src/data/answers/module5.js
- src/data/twoMarkAnswers.js
- src/diagrams/index.js

These checks make accidental edits to the existing question mapping, 10-mark answer files, 2-mark answers and diagram registry fail the test suite. Future phases should add independent 5-mark files and avoid editing these protected files.

## Phase 1 validation

- Five-mark record count equals the current question catalogue count.
- Question IDs are unique and map to existing questions.
- Each record explicitly carries marks=5 and a valid module number.
- Missing or empty answers are detected.
- Supported answer block types and required block fields are checked.
- Source metadata and topic tags are required where inherited source data exists.
- Five-mark records are checked separately from existing 2-mark and 10-mark records.
- Diagram references are checked against the existing diagram registry.
- Existing protected content is checked byte-for-byte using Git blob hashes.

## Explicit unresolved coverage

| Area | Current state | Required next action |
|---|---|---|
| Modules 1 and 2 | No core q01–q10 catalogue entries or five-mark records | Extract question wording from the available module notes and official paper sources; add independent module records |
| Module 3 | Existing core five-mark answers q09–q10 | Verify against exact question-paper wording and module source pages; separately audit all applicable PYQ items |
| Module 4 | Existing core five-mark answers q05–q08 | Verify all concepts and diagram needs against the source notes; separately audit all applicable PYQ items |
| Module 5 | Existing core five-mark answers q01–q04 | Verify source coverage and distinguish biodiversity agreements from climate-action agreements |
| Dec/Jan 2025–26 papers | Resource files and additional answer data exist | Extract every question, subpart, module, marks allocation and exact source mapping |
| June/July 2026 paper | Ten main question records exist in code | Extract every subpart and create independent five-mark answer mappings |
| 21CV654 supplementary model paper | Thirty subquestions have an existing source map | Preserve its supplementary classification; create five-mark variants only where applicable and supported |

No question is marked complete or verified solely because an answer already exists or was AI-generated. Unsupported or partial-source content must remain flagged for manual review until evidence is recorded.

## Change boundary

This phase adds only:
- src/data/fiveMarkBank.js
- src/data/fiveMarkBank.test.js
- tests/protected-answer-content.test.js
- docs/five-mark/PHASE-1-FOUNDATION.md

It does not edit existing answers, diagrams, module mappings, themes, localStorage schemas, PWA files or navigation. The PR must remain open for manual review and must not be merged automatically.

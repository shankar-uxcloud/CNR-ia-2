# CNR-IA-2 — Five-Mark Question Source Register

## Purpose

This is a source inventory for the independent 5-mark answer bank. It preserves each paper's own question identity and wording instead of merging similar questions. Target marks=5 applies only to the new answer format; original paper marks remain separate metadata. The register maps all source records to answer drafts. Draft presence is not a claim that an answer is academically verified.

## Current inventory

| Source collection | Parts | Classification | Extraction state |
|---|---:|---|---|
| BCV755B June / July 2026 question paper | 20 | Catalogued university question paper | All parts exist in EXAM_QUESTION_PAPER; compare exact wording with the PDF |
| BCV755B December 2025 / January 2026 question paper | 20 | Catalogued university question paper | 14 question texts exist in additionalDecJanAnswers; six core entries are navigation summaries only |
| 21CV654 model question paper | 30 | Supplementary model paper | All parts exist in MODEL_21CV654 and the existing Phase 2 source map |
| **Total** | **70** | **40 catalogued university-paper parts + 30 supplementary parts** | **64 full texts + 6 topic summaries; every record now has an answer draft** |

The December/January question-paper PDF and scheme/solutions PDF remain separate resources. The scheme is supporting mark-allocation evidence, not another question paper.

## Source identities

### June / July 2026
- Question paper: resources/question-papers/June-July 2026.pdf
- Structured data: src/data/juneJuly2026.js, export EXAM_QUESTION_PAPER.
- Ten full-question groups, two subparts each: twenty question parts.
- Module mapping is preserved from the group records, including the printed-heading note on the Module 5 group.
- The source data records ten marks per subpart; the new bank targets five marks.
- PDF header and exact wording comparison remain required.

### December 2025 / January 2026
- Question paper: resources/question-papers/BCV755B-dec-2025-jan-2026.pdf
- Supporting scheme: resources/question-papers/SCH_BCV755B DEC.2025-JAN.2026.pdf
- Question/answer data: src/data/decJan2026Additional.js
- Mark-allocation data: src/data/decJan2026Evaluation.js
- Fourteen additional subquestions (Q4(a) through Q10(b)) have question text in the existing answer data and ten-mark scheme allocations.
- Six core entries (Q1(a), Q1(b), Q2(a), Q2(b), Q3(a), Q3(b)) currently have only short navigation summaries in DecJan2026.jsx. They remain marked summary-only, have no asserted original mark allocation, and now have topic-aligned answer drafts. The exact wording and scope must still be checked against the original PDF.
- No question page number is asserted without source evidence.

### 21CV654 supplementary model paper
- Resource: resources/question-papers/[studocu.com] - 21CV654 Model Question Paper - Conservation of Natural Resources.pdf
- Structured data: src/data/modelQuestionPaper21cv654.js, export MODEL_21CV654.
- Thirty subquestions retain their original module, code, wording and original marks (6, 7 or 8).
- docs/21cv654/PHASE-2-SOURCE-MAP.md provides support status and PDF viewer-page mapping.
- This is a supplementary model paper, not an official BCV755B VTU paper.
- The repeated zoological-garden question in Q8(c) and Q9(c) remains two separate source records.

## Syllabus and notes inventory

The resource catalogue lists BCV755B note PDFs and presentations for Modules 1–5, the June/July and December/January question-paper resources, the supplementary model paper and a CNR 2026–27 syllabus reference. The earlier 57-page BCV755B Full Notes audit is a separate reference map and is not a substitute for line-by-line verification against the current official syllabus.

The earlier 57-page BCV755B Full Notes audit records these PDF viewer page ranges:
- Module 1: 1–13
- Module 2: 14–22
- Module 3: 23–31
- Module 4: 32–46
- Module 5: 47–57

The existing Phase 2 map's supported/partial/gap labels describe support in the inspected notes. They do not mean a five-mark answer has passed verification.

## Data contract and validation

Each record in src/data/fiveMarkQuestionSources.js contains:
- Stable project ID and original source question identifier.
- Exact question text or an explicitly marked summary-only label.
- Module, target marks=5 and original paper marks where established.
- Source title, category and repository file path.
- Question-text and source-verification status.
- Notes-support status where an existing audit provides one.
- Answer status, including draft, academic-review and exact-PDF-review states.
- Notes PDF viewer-page references from the existing source map where available; these are not question-paper page numbers.
- Repeat-group metadata when a paper repeats a question.

Tests validate 70 unique source records, source separation, module validity, marks, the six summary-only question records, answer-body completeness for all 70 records, all 30 supplementary model-paper questions and the repeated question.

## Accuracy rules and next gates

- Similar concepts across different papers remain separate records.
- A repeated question within one paper remains separate when the source repeats it.
- Navigation summaries remain explicitly labelled as summaries; answer drafts address the recorded topic without claiming verbatim paper wording.
- Original marks are preserved; targetMarks=5 applies only to the new answer bank.
- The supplementary 21CV654 paper is never mixed into the university-paper category.
- Verify PDF headers and exact question wording for the two university-paper collections.
- Audit each question against the relevant module notes and BCV755B syllabus.
- Keep supplementary answers visibly marked for academic review; do not present supplementary material as notes-derived or officially verified.
- Keep answers in separate module-wise files and render the question number and answer directly in the dedicated UI.

No question is marked complete or academically verified merely because it appears in an existing 10-mark answer file or because an answer has been generated.


## Repeated questions and related concept groups

The structured register assigns a conceptGroup to clearly repeated or closely related questions, while retaining every original source record and answer mapping. A concept group is a review aid, not permission to reuse an answer without checking the exact wording and subparts.

Current clusters include:
- Soil ecological/economic importance.
- Soil degradation and food security.
- Sustainable land-use planning.
- Water-surplus and water-deficit basins.
- Global water resources.
- Inter-basin water transfer.
- Seawater ingress.
- Air-pollution sources and classification.
- Air-pollution human-health effects.
- Ozone depletion.
- Biodiversity importance.
- Ecological restoration.
- Natural and anthropogenic climate disturbance.
- Global-warming causes and effects.
- EIA for thermal power plants.
- Environmental-clearance project categories.
- Zoological gardens.

The zoological-garden question in model-paper Q8(c) and Q9(c) is the exact repeated-question case and retains two separate records under the same concept group and repeatGroup. Other clusters identify related wording or overlapping concepts; their answers remain separately authored and scoped to their own question.

## Verification labels

The two university-paper collections are catalogued in the repository but are not yet certified as official VTU documents in this register. Their PDF headers and exact question wording must be checked before the source records are marked verified. The 21CV654 paper remains explicitly supplementary. The six December/January core summaries now have topic-aligned drafts, but their exact wording and original marks remain unverified until the original PDF and scheme are checked.

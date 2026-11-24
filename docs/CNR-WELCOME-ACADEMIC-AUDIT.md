# CNR-IA-2 academic welcome and module explorer audit

## Primary academic source
- Visvesvaraya Technological University, 2022 Scheme syllabus, course BCV755B — Conservation of Natural Resources: https://vtu.ac.in/pdf/2022_3to8/4civsyll.pdf
- Repository syllabus catalogue entry: public/resources/syllabus/CNR civsyll-26-27.pdf (listed in src/data/resourceCatalog.js).

The five module headings and topic lists in src/data/cnrAcademic.js follow the BCV755B syllabus entry. Module 4 retains the syllabus structure of Biodiversity with Ecosystem as its additional heading. The five official course outcomes are kept separate from explanatory module introductions.

## Repository resource inventory
The module file links and counts are derived from src/data/resourceCatalog.js, not guessed from PDF names:
- Module 1: three catalogued PDF note files and one presentation.
- Module 2: two catalogued PDF note files and one presentation.
- Module 3: two catalogued PDF note files and one presentation.
- Module 4: two catalogued PDF note files and one presentation.
- Module 5: two catalogued PDF note files and one presentation.
- Whole-course reference collection: syllabus files, December 2025 / January 2026 papers, June / July 2026 paper, and one supplementary model paper whose original filename references 21CV654.

Question counts and answer-diagram counts are derived at runtime from src/data/questions.js and the linked answer data. The current question bank contains 10 published answers in Modules 3–5; it does not contain Module 1 or Module 2 question-wise answers.

## Accuracy boundaries
- No PDF page numbers or figure numbers are published because the files were not page-indexed as part of this implementation.
- Whole-course examination papers are not assigned to a specific module.
- The 21CV654-named model paper is labelled supplementary and is not represented as an official BCV755B VTU paper.
- The Study Coach is described as an offline/local keyword-coverage tool, not as a connected generative AI service.
- The offline description is limited to the PWA application shell and visited same-origin resources; it does not promise that every PDF is pre-downloaded.

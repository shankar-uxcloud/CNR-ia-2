# 21CV654 Answer Upgrade — Phase 0–1 Audit

**Audit base:** `main` at `ea995dbab5057627daa02900bbd45ac7e7865258`  
**Scope:** 21CV654 model question paper and the existing core CNR answer bank.  
**Change type:** Documentation only. No application code or answer content changed.

## Phase 0 — Repository baseline

- Existing application retained: React 18, Vite 5, Tailwind CSS 3, JavaScript/JSX.
- Existing navigation uses a custom hash-based router.
- Study state is managed through React context and localStorage.
- Existing PWA/service-worker and GitHub Pages deployment are in scope for preservation.
- Answer-bank locations:
  - `src/data/questions.js`
  - `src/data/answers/module3.js`
  - `src/data/answers/module4.js`
  - `src/data/answers/module5.js`
  - `src/data/modelQuestionPaper21cv654.js`
  - `src/data/fiveMarkAnswers.js`
  - `src/data/twoMarkAnswers.js`
  - `src/data/juneJuly2026.js`
  - `src/data/decJan2026Additional.js`
  - `src/data/decJan2026Evaluation.js`
- Main long-form question-bank mapping: Module 3 contains Q09–Q10; Module 4 contains Q05–Q08; Module 5 contains Q01–Q04.
- Existing examination collections remain separate; June/July 2026 and Dec/Jan 2026 content must not be merged into the 21CV654 model-paper set.
- The inspected baseline GitHub Actions run `45341603471` passed `npm ci`, `npm test` and `npm run build`. Deployment run `45341603485` passed.
- These are GitHub Actions baseline results. A local clone/build was not performed as part of this audit.

## Phase 1 — Audit summary

### Audit counts

| Area | Count | Result |
|---|---:|---|
| 21CV654 model-paper subquestions | 30 | All need source-by-source verification and/or answer expansion |
| Existing core CNR long-form answers | 10 | Existing answers need source-card/page verification and selective improvement |
| Total long-form audit scope | 40 | 0 classified as fully adequate and source-verified at audit time |
| Two-mark companion bank | Separate | Not counted as 10-mark answers |
| Five-mark companion bank | Separate | Not counted as 10-mark answers |

### Model-paper question audit

| Question | Module | Marks | Audit finding |
|---|---:|---:|---|
| 1(a) Explain about different types of natural resources with suitable examples. | 1 | 7 | Existing answer superficial; source coverage needs classification check |
| 1(b) List the different types of land form? Explain in brief. | 1 | 7 | Existing answer superficial; types need direct source verification |
| 1(c) Discuss the ecological and economic importance of soil as a natural resource. | 1 | 6 | Existing answer superficial |
| 2(a) Describe the impact of soil degradation on food security. | 1 | 7 | Existing answer superficial |
| 2(b) Write a short note on Soil health. | 1 | 6 | Existing answer superficial |
| 2(c) List and explain the principles for sustainable land use planning | 1 | 7 | Existing answer superficial |
| 3(a) Discuss briefly about water deficit and water surplus basins of India. | 2 | 7 | Existing answer superficial |
| 3(b) Illustrate on conjunctive use of ground water. | 2 | 7 | Missing directly verified diagram/source treatment |
| 3(c) Explain briefly about inter basin water transfers. | 2 | 6 | Existing answer superficial |
| 4(a) Illustrate on global water resource. | 2 | 6 | Existing answer superficial |
| 4(b) Describe briefly about water resource system planning | 2 | 6 | Existing answer superficial |
| 4(c) Explain briefly about the water usage means in agriculture sector. | 2 | 8 | Existing answer superficial |
| 5(a) Explain the effect of air pollution on human health. | 3 | 6 | Existing answer superficial |
| 5(b) List and explain the national ambient air quality standards. | 3 | 6 | Existing answer superficial; full standard table needs verification |
| 5(c) Discuss on air quality index and its levels for health concerns. | 3 | 8 | Existing answer superficial |
| 6(a) What is ozone depletion and its impact on human health. | 3 | 7 | Existing answer superficial |
| 6(b) Explain briefly about rock forming minerals such as quartz, mica, Feldspar and amphibole. | 3 | 7 | Direct source not identified in supplied full notes |
| 6(c) Explain briefly about weathering due to physical and biogeochemical processes. | 3 | 6 | Direct source not identified in supplied full notes |
| 7(a) Explain the importance of bio-diversity. | 4 | 6 | Existing answer superficial |
| 7(b) Discuss about ecological restoration for conservation of bio-diversity. | 4 | 6 | Existing answer superficial |
| 7(c) Figure out the various natural and anthropogenic agents which causes disturbance on climate. | 4 | 8 | Existing answer superficial; source alignment needs care |
| 8(a) List and explain the various wild life sanctuaries in India. | 4 | 8 | Existing source does not establish a comprehensive India sanctuary list |
| 8(b) Illustrate the various drugs derived from biodiversity plants. | 4 | 6 | Existing source has limited drug examples; needs more direct support |
| 8(c) Describe the zoological garden with respect to biodiversity. | 4 | 6 | Existing source support is brief; needs expansion without unsupported detail |
| 9(a) Develop a flowchart of hydropower plant EIA environmental clearance under EIA notifications. | 5 | 8 | Missing a verified complete clearance flowchart |
| 9(b) Discuss briefly about global climate change-indicators. | 5 | 6 | Existing answer superficial |
| 9(c) Describe the zoological garden with respect to biodiversity. | 5 | 6 | Duplicate in original paper; preserve it |
| 10(a) List and explain the various health impacts due to global warming. | 5 | 7 | Existing answer superficial |
| 10(b) List and explain the projects needing environmental clearance under EIA | 5 | 7 | Existing answer superficial; schedule/threshold detail needs verification |
| 10(c) Explain the importance of EIA in implementing projects like thermal power plants | 5 | 6 | Existing answer superficial |

### Existing core CNR answer-bank audit

| ID | Module | Existing question | Audit finding |
|---|---:|---|---|
| Q01 | 5 | Define global warming. Explain the greenhouse effect, major greenhouse gases and indicators of global warming. | 708 words; source metadata/page mapping needs verification |
| Q02 | 5 | Explain the major effects of global warming, with suitable examples from India. | 705 words; source metadata/page mapping needs verification |
| Q03 | 5 | Explain global efforts and international agreements for biodiversity conservation and climate action. | 656 words; climate-action coverage needs verification |
| Q04 | 5 | Define Environmental Impact Assessment (EIA). Explain its objectives, need and major steps in India. | 773 words; source metadata/page mapping needs verification |
| Q05 | 4 | Define biodiversity and explain its three levels—genetic diversity, species diversity and ecosystem diversity. Discuss the ecological, economic, genetic, ethical and aesthetic values of biodiversity. | 773 words; depth of all diversity levels/values needs verification |
| Q06 | 4 | Explain the major threats to biodiversity, including habitat destruction and fragmentation, pollution, overexploitation, invasive species and climate change. Suggest suitable measures for biodiversity conservation. | 669 words; source metadata/page mapping needs verification |
| Q07 | 4 | Differentiate between in-situ and ex-situ conservation of biodiversity. Explain relevant methods and examples, including national parks, wildlife sanctuaries, biosphere reserves, zoos, botanical gardens, gene banks and cryopreservation. | 701 words; source metadata/page mapping needs verification |
| Q08 | 4 | Explain the carbon, nitrogen, oxygen, phosphorus and water cycles with suitable diagrams. Discuss how biogeochemical cycles help maintain soil fertility, ecosystem productivity and ecological balance. | 830 words; direct cycle descriptions and diagrams need verification |
| Q09 | 3 | Explain the principle, working mechanism and applications of air-pollution-control equipment. Discuss ESP, baghouse filter, cyclone separator and wet scrubber. | 892 words; source metadata/page mapping needs verification |
| Q10 | 3 | What is ozone depletion? Explain its causes, effects and international measures for controlling ozone depletion. | 883 words; source metadata/page mapping needs verification |

## Preservation and implementation rules

1. Preserve original model-paper wording, question numbering, marks and the duplicate Q9(c).
2. Do not mix model-paper questions with June/July 2026 or Dec/Jan 2026 examination collections.
3. Do not replace existing answers blindly; inspect and selectively improve them.
4. Do not invent PDF page numbers, figure numbers, examples, standards or source cards.
5. Flag source gaps explicitly and request missing material when required.
6. Keep existing routes, question banks, diagrams, theme modes, study state, localStorage, PWA/offline behavior and unrelated features intact.
7. Do not merge PRs automatically.

## Next gate

Phase 2 is a separate source-verification PR. It will map every question to exact supplied-PDF pages and figures, distinguish supported/partial/missing material, and document gaps before answer rewriting begins.

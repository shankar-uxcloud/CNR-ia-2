# Premium Sidebar Redesign

## Summary
Reorganizes the existing CNR-IA-2 navigation into six concise academic sections without deleting routes, pages, data, or study functionality.

## Navigation structure
- **Overview:** Dashboard, Learning Hub, Progress & Analytics
- **Study Material:** All Questions, Modules 3–5, Bookmarks, Revision Mode
- **Exam Preparation:** Practice Centre, Quiz Centre, VTU Exam Simulator, with Dec/Jan 2026 and June/July 2026 papers nested under Model Question Papers
- **Learning Tools:** AI Study Coach, Visual Learning Studio, 3D Science Lab, Weakness & Revision, Study Planner, and the existing EcoWeb Architect
- **Resources:** CNR Notes Hub, Academic Resource Vault, Additional Source Notes, Welcome & Platform Tour
- **System:** Backup & Restore

Settings is intentionally not added because the current app has no dedicated settings page or settings route; appearance controls remain available in the existing top bar.

## Behaviour and implementation
- Question and module counts are derived from \`QUESTIONS\`; bookmark counts come from the persisted \`bookmarks\` object.
- Completion progress counts only real question IDs in the persisted \`completed\` object and links to Progress & Analytics.
- Active routes automatically reveal their parent section; question-answer routes highlight their corresponding module.
- Desktop sidebar supports a persisted expanded/collapsed preference. Collapsed links retain accessible labels and native title tooltips.
- Mobile retains the existing slide-in drawer, backdrop close, Escape handling, focus trap, focus restoration, and body scroll lock.
- Styling uses existing semantic theme tokens and scopes glass, nebula, holographic, reduced-motion, reduced-transparency, and forced-colour behaviour without introducing new theme dependencies.

## Validation
The focused sidebar tests are included in \`tests/premium-sidebar.test.js\`. GitHub Actions runs the complete Node test suite and production Vite build for this pull request.

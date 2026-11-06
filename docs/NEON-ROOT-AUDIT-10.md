# CNR-IA-2 · Neon Mode Root-Level Audit 10.0

## Audit scope

Audited the current `main` source tree before the rebuild: the application entry point, persisted study/theme store, Tailwind configuration, shell/navigation, the global and Neon Completion stylesheets, reusable components, all routed page components, the SVG diagram system, and the Environmental Science Lab renderer.

The source review covered 19 React component/page files, plus the global styles and theme bootstrap. This was a source-level audit; it was not a browser-computed-style or screenshot audit.

## Root causes found

1. **Theme attributes were applied after the first paint.** `StudyProvider` used `useEffect` to set `data-theme` and `data-neon-theme`. The HTML bootstrap script set only `data-theme`, so the first render could briefly use the wrong palette and the selected accent was not restored until React effects ran.
2. **There was no single semantic token contract.** The CSS accumulated overlapping `--c-*`, `--dg-*`, `--ux-*`, `--neon-*` and `--cyber-*` namespaces. Components and page CSS could use different values for the same concept.
3. **The main stylesheet had become a progressive patch stack.** `src/index.css` had 978 lines and multiple successive Neon/Cyberverse layers that redefined cards, buttons, navigation, reading content, diagrams, focus styles and motion.
4. **A second global override layer was masking the underlying styling.** `src/neon-completion.css` added broad element and utility selectors, including several `!important` declarations. That could force some legacy surfaces dark without correcting the component's own theme contract.
5. **Some SVG learning-map nodes used fixed green fills and text colors.** Those values ignored the selected Cyberverse accent and could become unreadable in alternate palettes.
6. **The landing illustration contained fixed brand colors.** These are now expressed through named landing tokens instead of being embedded directly in SVG markup and arbitrary color utility classes.
7. **Some remaining inline styles are not theme colors.** Dynamic widths, animation delays, diagram stroke widths and module-specific colors are functional or semantic values and were not blindly replaced.
8. **The Environmental Science Lab canvas contains a purpose-built illustration palette.** Its forest, water, soil, energy and resource-marker colors communicate the educational scene rather than generic UI chrome. These semantic illustration colors were intentionally retained instead of indiscriminately recoloring scientific content.

## Architecture implemented

- `src/styles/tokens.css`: single source for semantic backgrounds, surfaces, typography, borders, controls, statuses, radii, transitions, neon spectrum, legacy Tailwind aliases and SVG diagram tokens.
- `src/styles/themes.css`: the root-level theme/palette selectors, four Cyberverse palettes, ambient background and particle treatment.
- `src/styles/global.css`: Tailwind layers, typography, reading layout and shared SVG diagram primitives.
- `src/styles/components.css`: reusable cards, buttons, navigation, form controls, tables, dialogs, feedback, Visual Learning Studio and dashboard surfaces.
- `src/styles/utilities.css`: responsive behavior, reduced-motion handling, overflow safeguards and print rules.

The application keeps the existing persisted `vtu-examprep-v1` settings schema, dark/light preference, and four Cyberverse palette choices. The root now exposes `data-theme`, `data-neon-theme` and `data-visual-theme`; dark mode is explicitly identified as the Neon visual theme. The HTML bootstrap restores the mode and palette before first paint, while React synchronizes updates in a layout effect.

The old monolithic `src/index.css` and duplicate `src/neon-completion.css` layers were removed from the source tree and replaced by the modular architecture.

## Component migrations

- Landing hero SVG and CTA theme colors now consume named tokens.
- Visual Learning Studio concept-map active node, border and label colors now consume semantic theme tokens.
- Existing page components continue to use the established Tailwind semantic aliases, which now resolve from the centralized token set.
- Existing module/status/diagram colors and the canvas scene's educational illustration colors remain semantically distinct.

## Automated checks

New and updated Node test coverage checks:
- ordered loading of the modular CSS files;
- semantic token coverage and four palette variants;
- first-paint theme restoration and React root-attribute synchronization;
- removal of the old monolithic stylesheet files;
- tokenized Visual Learning Studio SVG node colors;
- responsive, reduced-motion and print safeguards;
- existing navigation and persistence contracts.

CI/build results are recorded in the pull request after GitHub Actions completes.

## Visual QA limitations

No interactive browser/device session or screenshot-capture capability was available during this repository edit. Therefore, no route-by-route screenshots, manual browser interaction checks, mobile-device verification, computed contrast audit or performance profiling are claimed. These remain required before describing the implementation as visually verified production-ready.

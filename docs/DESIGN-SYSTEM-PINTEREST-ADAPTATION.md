# Pinterest-inspired design adaptation

## 1. Overview

CNR-IA-2 uses Pinterest's content-first editorial composition as a reference for the Question Library. The implementation adds a responsive masonry-style question discovery layout and a user-controlled list alternative. It does not copy Pinterest branding, assets, proprietary typefaces or product UI.

Use the editorial grid when scanning, browsing or rediscovering questions. Use list view when a compact, linear reading order is preferable. The existing dashboard, answer reader, navigation, study state and other learning tools remain owned by their current components.

## 2. Tokens and foundations

The reference system contributes layout principles, not a replacement palette. CNR-IA-2 continues to own the rendered theme and all semantic values.

| Concern | CNR token source |
|---|---|
| Page and card surfaces | `--bg-primary`, `--surface-primary`, `--surface-secondary`, `--surface-elevated` |
| Primary and secondary text | `--text-primary`, `--text-secondary`, `--text-muted` |
| Accent and focus | `--cyber-accent`, `--border-active`, `--focus-ring` |
| Borders and elevation | `--border-color`, `--surface-outline`, `--surface-shadow`, `--surface-shadow-hover` |
| Shape | `--radius-medium`, `--radius-large`, `--radius-full` |
| Rhythm | `--layout-card-gap`, existing Tailwind spacing utilities |
| Motion | `--transition-fast`, reduced-motion media preference |

Do not import Pin Sans or replace the current Inter/system and reading-font stacks. Do not hardcode Pinterest red, black or off-white into components. Dark/light and all existing neon palettes must continue to resolve through the CNR theme variables.

## 3. Anatomy, variants and responsive behavior

- **Question Library heading:** page title and supporting description remain unchanged.
- **Search and module filters:** retain the existing query and navigation behavior.
- **Layout control:** a two-option Grid/List button group exposes the current layout with `aria-pressed`.
- **Editorial grid:** CSS columns create a masonry rhythm. Cards avoid splitting across columns and retain their existing question, module, marks, completion and bookmark information.
- **List view:** preserves the original single-column card arrangement.
- **Responsive rules:** one column below 640px, two columns from 640px, and three columns from 1100px.
- **Module grouping:** the default all-question view keeps its module headings and module photography; each module's cards use the selected layout.

The masonry is CSS-only; no layout library, image dependency or runtime measurement is introduced.

## 4. States and interactions

| State | Expected behavior |
|---|---|
| Default | Grid is selected on initial entry; cards show existing content and study status. |
| Hover | Pointer-capable devices receive a restrained lift and theme-aware border/shadow change. |
| Focus-visible | Layout buttons and card links have a visible theme-aware focus indicator. |
| Active | Layout control gives a subtle pressed response. |
| Disabled | If a layout control is ever disabled by a future state, it uses reduced opacity and a not-allowed cursor. |
| Loading | Existing route-level Suspense skeleton remains responsible for page loading. |
| Error | Existing application error handling remains authoritative; this enhancement adds no new async work. |
| Empty | Existing no-results and no-bookmarks Empty states remain in place. |
| Overflow | Long titles and question summaries remain constrained by the existing card text layout; cards do not force horizontal page scrolling. |

Keyboard: Tab reaches Grid, List, search, filters, sort and question/bookmark controls in DOM order. Enter/Space activates native buttons; focus is not trapped. Touch targets retain the existing minimum control sizing.

## 5. Accessibility

- The layout switch is a labelled `role="group"`; each native button has a concise accessible name and `aria-pressed`.
- The question result count remains in an `aria-live="polite"` region.
- Question cards remain semantic `article` elements and preserve their existing link and bookmark button labels.
- Focus indicators use the active CNR theme tokens.
- Reduced-motion preferences suppress the new hover transform and transition.
- Verify text and control contrast in every supported theme; do not infer contrast from hue alone.

Pass criteria: every action is keyboard reachable, focus remains visible, Grid/List state is announced, and the bookmark action remains independently operable from the question link.

## 6. Content guidelines

Keep titles specific and scannable. Preserve question codes, module identity, marks, diagram counts and completion state. Do not truncate or rewrite source question wording to make cards visually uniform. Use sentence case for descriptive copy and keep exam terminology intact.

## 7. Anti-patterns

- **Do not apply Pinterest's red palette globally:** it would break CNR's existing theme identity and neon palette contract.
- **Do not turn answer pages into masonry:** long-form academic reading, equations and tables need a stable linear measure.
- **Do not make cards image-only:** question titles, module labels and study status are essential educational context.
- **Do not nest buttons inside links:** the bookmark remains a separate control from the question link.
- **Do not add a masonry dependency:** CSS columns are sufficient for this small, static question catalogue.
- **Do not force masonry on narrow screens:** a single column preserves readability and touch comfort.

## Definition of Done

- [x] Grid and list variants are implemented without changing question data.
- [x] Responsive 1/2/3-column behavior is defined.
- [x] Theme-aware colors, borders, focus and surfaces reuse existing tokens.
- [x] Keyboard and screen-reader state labels are present.
- [x] Empty states and bookmark behavior are preserved.
- [x] Reduced-motion behavior is included.
- [ ] CI production build and automated tests pass.
- [ ] Visual verification completed at narrow mobile and desktop breakpoints.

# CNR-IA-2 Mobile-First Responsive Overhaul

## Scope
This change strengthens the existing responsive foundation without replacing the React/Vite architecture, route model, theme system, resource data, or PWA lifecycle.

## Implemented
- Added shared responsive layout tokens for page width, gutters, section rhythm, card spacing and bottom safe-area spacing.
- Improved narrow-screen typography, academic reading line-height, table scrolling and diagram containment.
- Added safe-area-aware header, navigation drawer, floating action and dialog sizing.
- Enabled `viewport-fit=cover` for modern notched devices.
- Converted the mobile navigation backdrop from a click-only `div` into a labelled button, preserving the existing Escape handling, focus trap and body scroll lock.
- Added touch-target refinements, dynamic viewport sizing, reduced-motion, reduced-transparency and forced-colour handling.
- Kept the existing responsive Resource Vault, PDF reader, themes, connectivity toast and PWA components intact.

## Routes covered by the shared shell
The shared shell wraps dashboard, question library, bookmarks, revision, practice, quiz, exam simulator, analytics, visual studio, environmental lab, smart revision, additional notes, study coach, backup/restore, EcoWeb, planner, learning hub, resource vault, model question papers, Dec/Jan 2026 answers, module routes and individual answer routes. The landing and welcome experiences retain their dedicated layouts and styles.

## Verification
- Added regression tests for viewport breakpoints, safe-area support, academic content, mobile navigation semantics, dialogs and accessibility preferences.
- CI is configured to run the full existing Node test suite and production Vite build.

## Manual browser verification still required
No real-browser viewport automation or physical-device session is available in this implementation environment. After CI, visually inspect 320, 360, 375, 390, 414, 430, 600, 768, 1024, 1280, 1440 and 1920 CSS-pixel widths, including light/dark and all existing UI modes. Verify iOS Safari safe areas, Android Chrome drawer scrolling, PDF pinch zoom, offline/online toast placement, keyboard focus and landscape dialogs. Do not treat these manual checks as completed until tested on devices or browser automation.

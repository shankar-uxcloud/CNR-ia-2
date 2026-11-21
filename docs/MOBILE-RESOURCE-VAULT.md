# Mobile-first Resource Vault

This change adds a responsive, touch-oriented layout to the existing Resource Vault without changing the resource catalogue or adding runtime dependencies.

## Implemented

- Single-column resource cards and full-width primary actions on narrow screens.
- Collapsible mobile filter controls while retaining visible desktop filters.
- Full-viewport reader sizing with dynamic viewport units and safe-area insets.
- Compact mobile document toolbar, icon-sized controls and a compact footer.
- 44px minimum touch target baseline for primary controls.
- Background-page scroll locking while the reader is open.
- Mobile landscape adjustments, focus-visible states and reduced-motion handling.
- Existing PDF/Office/Drive preview providers are preserved.

## Viewer-provider limitations

The embedded PDF and Microsoft Office viewers are cross-origin browser surfaces. The parent application cannot reliably inspect their current page/slide, apply its own pinch-zoom or double-tap logic, implement slide swipes inside their content, or persist provider-internal zoom/page state. PDF touch zoom and document controls depend on the browser's built-in PDF viewer; Office touch navigation depends on Microsoft's viewer. This change does not claim custom PDF.js rendering, a custom PPTX slide engine, thumbnail navigation, or verified slide-swipe support.

## Responsive validation

Automated tests assert the mobile CSS contract (single-column cards, filter disclosure, dynamic viewport/safe-area support, touch-target baseline, landscape and reduced-motion rules). These are source-level tests, not screenshots or real-device tests. The listed device viewport matrix and Android/iOS touch behaviour still require manual browser/device verification before release.

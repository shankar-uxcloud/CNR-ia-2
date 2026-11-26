/**
 * Build presentation metadata for the structured answer view.
 *
 * The original answer sections and their block arrays are never rewritten.
 * This helper adds display-only numbering and a clean heading label.
 */
export function createStructuredSections(sections = []) {
  if (!Array.isArray(sections)) return [];
  return sections.map((section, index) => ({
    ...section,
    structuredNumber: String(index + 1).padStart(2, '0'),
    structuredTitle: String(section?.title ?? '').replace(/^\s*\d+[.)]\s*/, ''),
  }));
}

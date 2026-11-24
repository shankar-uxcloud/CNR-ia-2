const clean = (value) => String(value || '').replace(/\*\*/g, '').replace(/\*/g, '').replace(/\s+/g, ' ').trim();
const shorten = (value, limit = 112) => {
  const text = clean(value);
  if (text.length <= limit) return text;
  const boundary = text.lastIndexOf(' ', limit - 1);
  return text.slice(0, boundary > 55 ? boundary : limit - 1).trimEnd() + '…';
};
function blockSummaries(block) {
  if (!block) return [];
  if (block.type === 'list') return (block.items || []).slice(0, 3).map((item) => shorten(item));
  if (block.type === 'table') return (block.rows || []).slice(0, 3).map((row) => {
    const cells = (row || []).map(clean).filter(Boolean);
    return shorten(cells.length > 1 ? cells[0] + ': ' + cells[1] : cells[0] || '');
  }).filter(Boolean);
  if (block.type === 'p') {
    const sentence = clean(block.text).split(/(?<=[.!?])\s+/)[0];
    return sentence ? [shorten(sentence)] : [];
  }
  if (block.type === 'eq') return (block.lines || []).slice(0, 2).map((line) => shorten(line));
  if (block.type === 'diagram') return block.caption ? [shorten(block.caption)] : [];
  if (block.type === 'key' || block.type === 'note') return block.text ? [shorten(block.text)] : [];
  return [];
}
export function buildFiveMarkStructure(item) {
  const sections = item?.answer || [];
  return {
    title: clean(item?.question) || 'Five-mark answer structure',
    branches: sections.map((section, index) => {
      const summaries = (section.blocks || []).flatMap(blockSummaries).filter(Boolean);
      const nested = (section.subsections || []).map((subsection) => clean(subsection.title)).filter(Boolean);
      const nodes = [...summaries, ...nested].slice(0, 3);
      return {
        id: section.id || section.title || String(index),
        number: index + 1,
        title: clean(section.title) || 'Answer point ' + (index + 1),
        nodes: nodes.length ? nodes : ['Refer to the detailed explanation below'],
      };
    }),
  };
}

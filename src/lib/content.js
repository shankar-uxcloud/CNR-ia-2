import { DIAGRAMS } from '../diagrams';

const strip = (s = '') => s.replace(/\*\*/g, '');

/** All blocks of an answer in order, including those inside subsections. */
export function allBlocks(answer) {
  const out = [];
  answer.sections.forEach((s) => {
    s.blocks.forEach((b) => out.push(b));
    (s.subsections || []).forEach((sub) => sub.blocks.forEach((b) => out.push(b)));
  });
  return out;
}
export const diagramsOf = (answer) => allBlocks(answer).filter((b) => b.type === 'diagram');
export const keyPointsOf = (answer) => allBlocks(answer).filter((b) => b.type === 'key');

/** Plain-text version of an answer (used by Copy Answer and the search index). */
export function answerToText(q) {
  const L = [];
  L.push(`${q.code}. ${q.title} (${q.marks} Marks) – Module ${q.module}`);
  L.push(`Subject: BCV755B – Conservation of Natural Resources`);
  L.push('', `Question: ${q.question}`, '');
  const block = (b) => {
    if (b.type === 'p') L.push(strip(b.text), '');
    else if (b.type === 'list') { b.items.forEach((it, i) => L.push(`${b.ordered ? `${i + 1}.` : '•'} ${strip(it)}`)); L.push(''); }
    else if (b.type === 'table') { L.push(b.head.join(' | ')); b.rows.forEach((r) => L.push(r.map(strip).join(' | '))); L.push(''); }
    else if (b.type === 'eq') { if (b.title) L.push(b.title + ':'); b.lines.forEach((l) => L.push('   ' + l)); L.push(''); }
    else if (b.type === 'diagram') L.push(`[Diagram: ${DIAGRAMS[b.id]?.title} – ${b.caption}]`, '');
    else if (b.type === 'note') L.push(`Note (${b.kind === 'added' ? 'additional explanation' : b.kind === 'gap' ? 'gap in source notes' : 'tip'}): ${strip(b.text)}`, '');
    else if (b.type === 'key') L.push(`${b.title}: ${strip(b.text)}`, '');
  };
  q.answer.sections.forEach((s) => {
    L.push(s.title.toUpperCase());
    s.blocks.forEach(block);
    (s.subsections || []).forEach((sub) => { L.push(sub.title); sub.blocks.forEach(block); });
  });
  L.push('Source: ' + q.answer.source.doc + ' – ' + q.answer.source.refs.join('; '));
  return L.join('\n').replace(/\n{3,}/g, '\n\n').trim();
}

/** Lower-cased text used for instant search. */
export function searchBlob(q) {
  const heads = q.answer.sections.flatMap((s) => [s.title, ...(s.subsections || []).map((x) => x.title)]);
  const searchableBlocks = allBlocks(q.answer).flatMap((b) => {
    if (b.type === 'p' || b.type === 'note' || b.type === 'key') return [b.text || '', b.title || ''];
    if (b.type === 'list') return b.items || [];
    if (b.type === 'table') return [...(b.head || []), ...(b.rows || []).flat()];
    if (b.type === 'eq') return [b.title || '', ...(b.lines || [])];
    return [];
  });
  return [q.code, q.title, q.question, `module ${q.module}`, ...q.answer.keywords, ...heads, ...searchableBlocks].join(' ').toLowerCase();
}

export const readMinutes = (q) => Math.max(3, Math.round(answerToText(q).split(/\s+/).length / 190));

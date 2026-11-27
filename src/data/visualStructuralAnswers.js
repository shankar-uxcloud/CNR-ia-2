import { FIVE_MARK_PAPER_BANK } from './fiveMarkPaperBank.js';
import { additionalDecJanAnswers } from './decJan2026Additional.js';
import { MODEL_21CV654 } from './modelQuestionPaper21cv654.js';
import { DEC_JAN_VISUAL_SCHEME } from './decJanVisualScheme.js';

const clean = (value = '') => String(value).replace(/\*\*/g, '').replace(/\s+/g, ' ').trim();

function blockPoints(block) {
  if (!block) return [];
  if (block.type === 'table') {
    const head = (block.head || []).join(' | ');
    return [
      ...(head ? [`Comparison columns: ${head}`] : []),
      ...(block.rows || []).map((row) => row.map(clean).join(' — ')),
    ].filter(Boolean);
  }
  if (block.type === 'list') return (block.items || []).map(clean).filter(Boolean);
  if (block.type === 'diagram') return [clean(block.caption || block.text)];
  if (block.type === 'note') return [clean(block.text)];
  return [clean(block.text || block.caption)].filter(Boolean);
}

function fromFiveMark(item) {
  return (item.answer || []).map((section) => ({
    title: clean(section.title),
    points: (section.blocks || []).flatMap(blockPoints)
      .concat((section.subsections || []).flatMap((sub) => [
        clean(sub.title), ...(sub.blocks || []).flatMap(blockPoints),
      ]))
      .filter(Boolean),
  })).filter((section) => section.points.length);
}

function fromDecJan(item) {
  return [
    ...(item.intro ? [{ title: 'Meaning / introduction', points: [clean(item.intro)] }] : []),
    ...(item.sections || []).map((section) => ({
      title: clean(section.title),
      points: (section.points || []).flatMap((point) => Array.isArray(point)
        ? [clean(point[0] + ': ' + point[1])]
        : [clean(point)]).filter(Boolean),
    })),
    ...(item.conclusion ? [{ title: 'Conclusion', points: [clean(item.conclusion)] }] : []),
  ].filter((section) => section.points.length);
}

function fromScheme(item) {
  return (item.sections || []).map((section) => ({
    title: clean(section.title),
    points: (section.points || []).map(clean).filter(Boolean),
  })).filter((section) => section.points.length);
}

function fromModel(part) {
  const paragraphs = String(part.answer || '').trim().split(/\n+/)
    .map((paragraph) => paragraph.trim()).filter(Boolean);
  const sections = [];
  let current = { title: 'Core explanation', points: [] };
  for (const paragraph of paragraphs) {
    const heading = paragraph.match(/^\*\*(.+?)\*\*$/);
    if (heading) {
      if (current.points.length) sections.push(current);
      current = { title: clean(heading[1]), points: [] };
    } else {
      const point = clean(paragraph.replace(/^[-•]\s*/, '').replace(/^\d+[.)]\s*/, ''));
      if (point) current.points.push(point);
    }
  }
  if (current.points.length) sections.push(current);
  return sections;
}

const modelParts = MODEL_21CV654.flatMap((group) => group.parts.map((part) => ({
  code: part.code, module: group.module, answer: part.answer, question: part.question,
})));
const decJanById = new Map(additionalDecJanAnswers.map((item) => [item.id, item]));
const modelByCode = new Map(modelParts.map((item) => [item.code, item]));

function inferDiagramType(question, sections) {
  if (/compare|difference|distinguish|versus|\bvs\b/i.test(question)) return 'comparison';
  if (/cycle|lifecycle|life cycle/i.test(question)) return 'cycle';
  if (/classify|classification|types of|categories/i.test(question)) return 'classification';
  if (/calculate|numerical|solve|compute|formula/i.test(question)) return 'formula';
  if (/steps|process|procedure|stages|clearance/i.test(question)) return 'flow';
  if (/working|mechanism|architecture|components|system|plant|structure/i.test(question)) return 'block';
  if (sections.length > 1) return 'tree';
  return 'concept';
}

function buildGraph(item, sections, type) {
  const nodes = [{ id: 'root', kind: 'root', label: item.sourceQuestionId, detail: item.question }];
  const edges = [];
  sections.forEach((section, sectionIndex) => {
    const sectionId = `section-${sectionIndex}`;
    nodes.push({ id: sectionId, kind: 'branch', label: section.title, detail: '' });
    edges.push({ from: 'root', to: sectionId, relation: 'contains' });
    section.points.forEach((point, pointIndex) => {
      const pointId = `${sectionId}-point-${pointIndex}`;
      nodes.push({ id: pointId, kind: 'detail', label: point, detail: '' });
      edges.push({ from: sectionId, to: pointId, relation: 'includes' });
    });
  });

  if (['flow', 'block', 'formula'].includes(type)) {
    const sequence = nodes.filter((node) => node.kind !== 'root');
    for (let index = 0; index < sequence.length - 1; index += 1) {
      edges.push({ from: sequence[index].id, to: sequence[index + 1].id, relation: 'next' });
    }
  }
  if (type === 'cycle') {
    const sequence = nodes.filter((node) => node.kind !== 'root');
    if (sequence.length > 1) edges.push({
      from: sequence[sequence.length - 1].id, to: sequence[0].id, relation: 'repeats',
    });
  }

  return { nodes, edges };
}

export const VISUAL_STRUCTURAL_ANSWERS = FIVE_MARK_PAPER_BANK.map((item) => {
  let sections = fromFiveMark(item);
  let sourceAnswerType = sections.length ? 'existing five-mark answer bank' : '';

  if (!sections.length && item.source.title.includes('December')) {
    const id = item.id.replace('dec-jan-2026-', '');
    const scheme = DEC_JAN_VISUAL_SCHEME[id];
    const decJan = decJanById.get(id);
    if (scheme) {
      sections = fromScheme(scheme);
      sourceAnswerType = `VTU Scheme & Solutions outline · PDF page ${scheme.sourcePage}`;
    } else if (decJan) {
      sections = fromDecJan(decJan);
      sourceAnswerType = 'existing December/January expanded answer';
    }
  }

  if (!sections.length && item.source.category === 'supplementary-model-paper') {
    const model = modelByCode.get(item.sourceQuestionId);
    if (model?.answer) {
      sections = fromModel(model);
      sourceAnswerType = 'existing 21CV654 model answer';
    }
  }

  const visualType = inferDiagramType(item.question, sections);
  const graph = buildGraph(item, sections, visualType);
  const visualKeywords = [...new Set(
    sections.flatMap((section) => [section.title, ...section.points])
      .join(' ').match(/\b[A-Z][A-Za-z-]{3,}\b/g) || [],
  )].slice(0, 12);
  const nodeCount = graph.nodes.length;
  const edgeCount = graph.edges.length;
  const hasSourceContent = sections.length > 0 && sections.every((section) => section.points.length > 0);
  const hasConnectedDiagram = nodeCount >= 3 && edgeCount >= 2;

  return {
    ...item,
    visualSections: sections,
    visualType,
    visualGraph: graph,
    visualKeywords,
    visualSourceStatus: hasSourceContent ? 'source-content-present' : 'missing-source-content',
    visualSourceLabel: sourceAnswerType || 'No source answer found',
    examSequence: sections.map((section) => section.title),
    diagramAudit: {
      status: hasSourceContent && hasConnectedDiagram ? 'complete' : 'missing',
      nodeCount,
      edgeCount,
      hasDirectionalRelationships: edgeCount > 0,
      sourcePage: DEC_JAN_VISUAL_SCHEME[item.id.replace('dec-jan-2026-', '')]?.sourcePage || null,
      diagramType: visualType,
    },
  };
});

export const VISUAL_COVERAGE_REPORT = VISUAL_STRUCTURAL_ANSWERS.map((item) => ({
  paper: item.source.category === 'supplementary-model-paper'
    ? '21CV654 MQP'
    : item.source.title.includes('December') ? 'Dec/Jan 2026' : 'June/July 2026',
  question: item.sourceQuestionId,
  questionText: item.question,
  diagramType: item.diagramAudit.diagramType,
  nodeCount: item.diagramAudit.nodeCount,
  edgeCount: item.diagramAudit.edgeCount,
  status: item.diagramAudit.status,
  source: item.visualSourceLabel,
}));

export const VISUAL_PAPER_OPTIONS = [
  { value: 'all', label: 'All three papers' },
  { value: 'dec-jan', label: 'December 2025 / January 2026' },
  { value: 'june-july', label: 'June / July 2026' },
  { value: '21cv654', label: '21CV654 supplementary model paper' },
];

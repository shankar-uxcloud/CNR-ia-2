import React from 'react';

const PALETTE = ['blue', 'violet', 'cyan', 'emerald', 'amber', 'rose', 'indigo'];
const tone = (index) => PALETTE[index % PALETTE.length];
const estimateHeight = (text, width = 280) => {
  const charsPerLine = Math.max(22, Math.floor(width / 7.2));
  const lines = Math.max(2, Math.ceil(String(text || '').length / charsPerLine));
  return Math.min(220, Math.max(88, 58 + lines * 19));
};

function SvgNode({ node, x, y, width, height, index = 0 }) {
  const kind = node.kind || 'detail';
  return <foreignObject x={x} y={y} width={width} height={height} className="visual-svg-foreign">
    <div xmlns="http://www.w3.org/1999/xhtml" className={`visual-svg-node tone-${tone(index)} visual-svg-node--${kind}`}>
      {kind === 'root' && <span className="visual-svg-kicker">QUESTION / CORE CONCEPT</span>}
      <strong>{node.label}</strong>
      {node.detail && <p>{node.detail}</p>}
    </div>
  </foreignObject>;
}

function SvgEdge({ x1, y1, x2, y2, label = 'includes', curved = false }) {
  const midX = (x1 + x2) / 2;
  const midY = (y1 + y2) / 2;
  const path = curved
    ? `M ${x1} ${y1} C ${x1} ${midY} ${x2} ${midY} ${x2} ${y2}`
    : `M ${x1} ${y1} L ${x2} ${y2}`;
  return <g className="visual-svg-edge">
    <path d={path} markerEnd="url(#visual-arrow)" />
    <text x={midX + 8} y={midY - 4}>{label}</text>
  </g>;
}

function DiagramSvg({ title, width, height, children, className = '' }) {
  return <svg className={`visual-diagram-svg ${className}`} viewBox={`0 0 ${width} ${height}`} role="img" aria-label={title} preserveAspectRatio="xMidYMin meet">
    <title>{title}</title>
    <defs>
      <marker id="visual-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" className="visual-arrow-head" />
      </marker>
      <linearGradient id="visual-edge-gradient" x1="0" x2="1">
        <stop offset="0%" stopColor="#2563eb" /><stop offset="100%" stopColor="#0891b2" />
      </linearGradient>
    </defs>
    {children}
  </svg>;
}

function TreeDiagram({ item, mode = 'tree' }) {
  const sections = item.visualSections;
  const width = 1080;
  const colWidth = 340;
  const cols = Math.min(3, Math.max(1, sections.length));
  const rowCount = Math.ceil(sections.length / cols);
  const leafHeights = sections.map((section) => section.points.map((point) => estimateHeight(point, 290)));
  const rowHeights = Array.from({ length: rowCount }, (_, row) => {
    const group = sections.slice(row * cols, (row + 1) * cols);
    const tallestBranch = Math.max(1, ...group.map((section, index) =>
      leafHeights[row * cols + index].reduce((sum, value) => sum + value + 18, 0)
    ));
    return tallestBranch + 190;
  });
  const rowTops = rowHeights.map((_, index) => 180 + rowHeights.slice(0, index).reduce((sum, value) => sum + value, 0));
  const height = 200 + rowHeights.reduce((sum, value) => sum + value, 0);
  const root = item.visualGraph.nodes[0];
  return <DiagramSvg title={`${mode} diagram for ${item.sourceQuestionId}`} width={width} height={height} className="visual-tree-svg">
    <SvgNode node={root} x={390} y={20} width={300} height={112} index={0}/>
    {sections.map((section, index) => {
      const row = Math.floor(index / cols);
      const col = index % cols;
      const x = 20 + col * colWidth;
      const y = rowTops[row];
      const branch = { kind: 'branch', label: section.title };
      const branchHeight = 82;
      let leafCursor = y + 120;
      const leafPositions = section.points.map((point) => {
        const node = { kind: 'detail', label: point };
        const nodeHeight = estimateHeight(point, 290);
        const leafY = leafCursor;
        leafCursor += nodeHeight + 18;
        return { node, leafY, nodeHeight };
      });
      return <g key={section.id}>
        <SvgEdge x1={540} y1={132} x2={x + 145} y2={y} label="branches into" curved/>
        <SvgNode node={branch} x={x} y={y} width={290} height={branchHeight} index={index + 1}/>
        {leafPositions.map(({ node, leafY, nodeHeight }, pointIndex) => <g key={pointIndex}>
          <SvgEdge x1={x + 145} y1={y + branchHeight} x2={x + 145} y2={leafY} label="includes"/>
          <SvgNode node={node} x={x} y={leafY} width={290} height={nodeHeight} index={index + pointIndex + 2}/>
        </g>)}
      </g>;
    })}
  </DiagramSvg>;
}

function Flowchart({ item, mode = 'flow' }) {
  const steps = item.visualSections.flatMap((section) => section.points.map((point, index) => ({
    title: index === 0 ? section.title : `${section.title} · continued`,
    detail: point,
  })));
  const width = 940;
  const x = 150;
  const cardWidth = 640;
  const heights = steps.map((step) => estimateHeight(step.detail, cardWidth - 30) + 18);
  const rootHeight = estimateHeight(item.question, cardWidth - 30) + 18;
  const positions = [];
  let cursor = 20 + rootHeight + 54;
  heights.forEach((height) => {
    positions.push(cursor);
    cursor += height + 54;
  });
  const root = { kind: 'root', label: item.sourceQuestionId, detail: item.question };
  return <DiagramSvg title={`${mode} diagram for ${item.sourceQuestionId}`} width={width} height={cursor + 10} className="visual-flow-svg">
    <SvgNode node={root} x={x} y={20} width={cardWidth} height={rootHeight} index={0}/>
    {steps.map((step, index) => {
      const nodeY = positions[index];
      const node = { kind: 'detail', label: step.title, detail: step.detail };
      const previousY = index === 0 ? 20 + rootHeight : positions[index - 1] + heights[index - 1];
      return <g key={index}>
        <SvgEdge x1={width / 2} y1={previousY} x2={width / 2} y2={nodeY} label={index === 0 ? 'begins with' : 'then'} />
        <SvgNode node={node} x={x} y={nodeY} width={cardWidth} height={heights[index]} index={index + 1}/>
      </g>;
    })}
  </DiagramSvg>;
}

function BlockDiagram({ item }) {
  const sections = item.visualSections;
  const width = 1080;
  const cols = Math.min(3, Math.max(1, sections.length));
  const rows = Math.ceil(sections.length / cols);
  const rowHeight = 270;
  const height = 160 + rows * rowHeight;
  const root = item.visualGraph.nodes[0];
  return <DiagramSvg title={`Connected block diagram for ${item.sourceQuestionId}`} width={width} height={height} className="visual-block-svg">
    <SvgNode node={root} x={390} y={18} width={300} height={112} index={0}/>
    {sections.map((section, index) => {
      const row = Math.floor(index / cols);
      const col = index % cols;
      const x = 20 + col * 350;
      const y = 190 + row * rowHeight;
      const detail = section.points.join('  •  ');
      const node = { kind: 'branch', label: section.title, detail };
      const nodeHeight = Math.min(250, estimateHeight(detail, 270) + 80);
      return <g key={section.id}>
        <SvgEdge x1={540} y1={130} x2={x + 145} y2={y} label="connects to" curved/>
        <SvgNode node={node} x={x} y={y} width={290} height={nodeHeight} index={index + 1}/>
      </g>;
    })}
  </DiagramSvg>;
}

function CycleDiagram({ item }) {
  const nodes = item.visualSections.length > 1
    ? item.visualSections.map((section) => ({ label: section.title, detail: section.points.join(' • ') }))
    : item.visualSections[0].points.map((point, index) => ({
      label: index === 0 ? item.visualSections[0].title : `Stage ${index + 1}`,
      detail: point,
    }));
  const width = 1080, height = 920, cx = 540, cy = 460, radius = 300;
  const positions = nodes.map((node, index) => {
    const angle = -Math.PI / 2 + (2 * Math.PI * index) / Math.max(1, nodes.length);
    return { x: cx + Math.cos(angle) * radius - 130, y: cy + Math.sin(angle) * radius - 54, node };
  });
  return <DiagramSvg title={`Lifecycle cycle diagram for ${item.sourceQuestionId}`} width={width} height={height} className="visual-cycle-svg">
    <circle cx={cx} cy={cy} r={radius - 45} className="visual-cycle-orbit"/>
    {positions.map((position, index) => {
      const next = positions[(index + 1) % positions.length];
      const x1 = position.x + 130, y1 = position.y + 54;
      const x2 = next.x + 130, y2 = next.y + 54;
      return <g key={index}>
        <SvgEdge x1={x1} y1={y1} x2={x2} y2={y2} label="continues to" curved/>
        <SvgNode node={{ kind: 'detail', ...position.node }} x={position.x} y={position.y} width={260} height={108} index={index}/>
      </g>;
    })}
  </DiagramSvg>;
}

function ComparisonChart({ item }) {
  const sections = item.visualSections;
  const width = 1080;
  const cols = Math.min(3, Math.max(1, sections.length));
  const height = Math.max(420, 220 + Math.max(...sections.map((section) => section.points.length)) * 145);
  const root = item.visualGraph.nodes[0];
  return <DiagramSvg title={`Comparison chart for ${item.sourceQuestionId}`} width={width} height={height} className="visual-comparison-svg">
    <SvgNode node={root} x={390} y={15} width={300} height={112} index={0}/>
    {sections.map((section, index) => {
      const x = 20 + index * (1040 / cols);
      const colWidth = 300;
      const node = { kind: 'branch', label: section.title };
      return <g key={section.id}>
        <SvgEdge x1={540} y1={127} x2={x + colWidth / 2} y2={170} label="compared by" curved/>
        <SvgNode node={node} x={x} y={170} width={colWidth} height={82} index={index + 1}/>
        {section.points.map((point, pointIndex) => {
          const y = 280 + pointIndex * 145;
          return <g key={pointIndex}>
            <SvgEdge x1={x + colWidth / 2} y1={252} x2={x + colWidth / 2} y2={y} label="aspect"/>
            <SvgNode node={{ kind: 'detail', label: point }} x={x} y={y} width={colWidth} height={estimateHeight(point, colWidth - 10)} index={index + pointIndex + 2}/>
          </g>;
        })}
      </g>;
    })}
  </DiagramSvg>;
}

function FormulaDiagram({ item }) {
  return <Flowchart item={item} mode="formula / calculation layout"/>;
}

export function VisualStructureRenderer({ item, type }) {
  const selected = type || item.visualType;
  switch (selected) {
    case 'flow': return <Flowchart item={item}/>;
    case 'timeline': return <Flowchart item={item} mode="step timeline"/>;
    case 'tree': return <TreeDiagram item={item}/>;
    case 'classification': return <TreeDiagram item={item} mode="classification tree"/>;
    case 'block': return <BlockDiagram item={item}/>;
    case 'comparison': return <ComparisonChart item={item}/>;
    case 'cycle': return <CycleDiagram item={item}/>;
    case 'formula': return <FormulaDiagram item={item}/>;
    default: return <TreeDiagram item={item} mode="concept map"/>;
  }
}

export { Flowchart, TreeDiagram, BlockDiagram, ComparisonChart, CycleDiagram, FormulaDiagram };
export function ProcessTimeline({ item }) { return <Flowchart item={item} mode="process timeline"/>; }
export function ClassificationDiagram({ item }) { return <TreeDiagram item={item} mode="classification tree"/>; }
export function ConceptMap({ item }) { return <TreeDiagram item={item} mode="concept map"/>; }

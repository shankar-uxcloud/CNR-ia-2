import React from 'react';

const PALETTE = ['blue', 'violet', 'cyan', 'emerald', 'amber', 'rose', 'indigo'];
const pick = (index) => PALETTE[index % PALETTE.length];

function Node({ title, children, index = 0, number }) {
  return <div className={`visual-node tone-${pick(index)}`}>
    {number != null && <span className="visual-node-number">{number}</span>}
    {title && <strong>{title}</strong>}
    {children && <p>{children}</p>}
  </div>;
}
function Arrow() { return <div className="visual-arrow" aria-hidden="true"><span>↓</span></div>; }

export function Flowchart({ sections }) {
  const steps = sections.flatMap((section) => section.points.map((point, i) => ({
    title: i === 0 ? section.title : '', point,
  })));
  return <div className="visual-flow" aria-label="Flowchart answer">{steps.map((step, i) => <React.Fragment key={i}>
    <Node title={step.title} index={i} number={i + 1}>{step.point}</Node>{i < steps.length - 1 && <Arrow />}
  </React.Fragment>)}</div>;
}
export function TreeDiagram({ sections }) {
  return <div className="visual-tree">
    <div className="visual-tree-root"><Node title="Main concept" index={0}>{sections[0]?.title}</Node></div>
    <div className="visual-tree-branches">{sections.map((section, i) => <section className="visual-tree-branch" key={section.id}>
      <Node title={section.title} index={i + 1}>{section.points[0]}</Node>
      <div className="visual-tree-leaves">{section.points.slice(1).map((point, j) => <Node key={j} index={i + j + 2}>{point}</Node>)}</div>
    </section>)}</div>
  </div>;
}
export function BlockDiagram({ sections }) {
  return <div className="visual-blocks">{sections.map((section, i) => <React.Fragment key={section.id}>
    <Node title={section.title} index={i}>{section.points.join(' ')}</Node>
    {i < sections.length - 1 && <span className="visual-block-connector" aria-hidden="true">→</span>}
  </React.Fragment>)}</div>;
}
export function ProcessTimeline({ sections }) {
  return <ol className="visual-timeline">{sections.map((section, i) => <li key={section.id}>
    <span className="visual-timeline-marker">{i + 1}</span><div><h4>{section.title}</h4>
    {section.points.map((point, j) => <p key={j}>{point}</p>)}</div>
  </li>)}</ol>;
}
export function ComparisonChart({ sections }) {
  return <div className="visual-comparison-wrap"><table className="visual-comparison"><thead><tr><th>Aspect</th><th>Explanation / key points</th></tr></thead>
    <tbody>{sections.flatMap((section) => section.points.map((point, i) => <tr key={section.id + i}>
      <th>{i === 0 ? section.title : 'Key detail'}</th><td>{point}</td>
    </tr>))}</tbody></table></div>;
}
export function ClassificationDiagram({ sections }) {
  return <div className="visual-classification"><div className="visual-classification-root"><Node title="Classification" index={0}>{sections[0]?.title}</Node></div>
    <div className="visual-classification-grid">{sections.map((section, i) => <div key={section.id} className="visual-classification-card">
      <Node title={section.title} index={i + 1}>{section.points[0]}</Node>
      {section.points.slice(1).map((point, j) => <p className="visual-classification-detail" key={j}>{point}</p>)}
    </div>)}</div>
  </div>;
}
export function CycleDiagram({ sections }) {
  const items = sections.flatMap((section) => section.points.map((point, i) => ({ title: i ? '' : section.title, point })));
  return <div className="visual-cycle">{items.map((item, i) => <React.Fragment key={i}>
    <Node title={item.title} index={i} number={i + 1}>{item.point}</Node>
    {i < items.length - 1 && <span className="visual-cycle-arrow" aria-hidden="true">↻</span>}
  </React.Fragment>)}</div>;
}
export function ConceptMap({ sections }) {
  return <div className="visual-concept-map"><div className="visual-concept-center"><Node title="Core concept" index={0}>{sections[0]?.title}</Node></div>
    <div className="visual-concept-links">{sections.map((section, i) => <Node key={section.id} title={section.title} index={i + 1}>{section.points.join(' ')}</Node>)}</div>
  </div>;
}

export function VisualStructureRenderer({ item, type }) {
  const props = { sections: item.visualSections };
  switch (type || item.visualType) {
    case 'flow': return <Flowchart {...props} />;
    case 'tree': return <TreeDiagram {...props} />;
    case 'block': return <BlockDiagram {...props} />;
    case 'timeline': return <ProcessTimeline {...props} />;
    case 'comparison': return <ComparisonChart {...props} />;
    case 'classification': return <ClassificationDiagram {...props} />;
    case 'cycle': return <CycleDiagram {...props} />;
    default: return <ConceptMap {...props} />;
  }
}

import { useMemo, useState } from 'react';
import { Search, ZoomIn, ZoomOut, Maximize2, Network, BookOpenText } from 'lucide-react';
import { VISUAL_STRUCTURAL_ANSWERS, VISUAL_PAPER_OPTIONS, VISUAL_COVERAGE_REPORT } from '../data/visualStructuralAnswers';
import { VisualStructureRenderer } from '../components/VisualStructures';
import './VisualStructuralAnswers.css';

const paperFor = (item) => item.id.startsWith('dec-jan-2026-') ? 'dec-jan'
  : item.id.startsWith('june-july-2026-') ? 'june-july' : '21cv654';
const paperTitle = (item) => item.source.category === 'supplementary-model-paper'
  ? '21CV654 · Supplementary MQP'
  : item.source.title.includes('December') ? 'December 2025 / January 2026' : 'June / July 2026';

export default function VisualStructuralAnswers() {
  const [paper, setPaper] = useState('all');
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState('');
  const [zoom, setZoom] = useState(1);
  const [layout, setLayout] = useState('auto');
  const questions = useMemo(() => VISUAL_STRUCTURAL_ANSWERS.filter((item) => {
    const matchesPaper = paper === 'all' || paperFor(item) === paper;
    const matchesQuery = !query || [item.question, item.sourceQuestionId, item.source.title].join(' ').toLowerCase().includes(query.toLowerCase());
    return matchesPaper && matchesQuery;
  }), [paper, query]);
  const current = questions.find((item) => item.id === selectedId) || questions[0] || null;
  const coverageComplete = VISUAL_COVERAGE_REPORT.filter((item) => item.status === 'complete').length;
  const coverageMissing = VISUAL_COVERAGE_REPORT.length - coverageComplete;
  const paperCounts = ['Dec/Jan 2026', 'June/July 2026', '21CV654 MQP'].map((name) => ({
    name, total: VISUAL_COVERAGE_REPORT.filter((item) => item.paper === name).length,
    complete: VISUAL_COVERAGE_REPORT.filter((item) => item.paper === name && item.status === 'complete').length,
  }));
  const changePaper = (value) => { setPaper(value); setSelectedId(''); };
  const changeQuery = (value) => { setQuery(value); setSelectedId(''); };
  const visualType = layout === 'auto' ? current?.visualType : layout;

  return <main className="visual-answer-page space-y-5">
    <section className="visual-answer-hero">
      <div className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-[.14em] text-brand"><Network size={15}/> Visual structural learning</div>
      <h1 className="mt-2 text-2xl font-black tracking-tight sm:text-3xl">Visual Answer Studio</h1>
      <p className="mt-2 max-w-3xl text-sm leading-7 text-mute">Explore chart-based answer structures for all 70 question parts across the three supplied papers. Existing written answers remain separate and unchanged.</p>
      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-xl border border-line bg-surface/80 p-3"><strong className="block text-2xl">70</strong><span className="text-xs text-mute">Question / subquestion records</span></div>
        <div className="rounded-xl border border-line bg-surface/80 p-3"><strong className="block text-2xl">3</strong><span className="text-xs text-mute">Paper collections</span></div>
        <div className="rounded-xl border border-line bg-surface/80 p-3"><strong className="block text-2xl">8</strong><span className="text-xs text-mute">Connected SVG diagram forms</span></div>
        <div className="rounded-xl border border-line bg-surface/80 p-3"><strong className="block text-2xl">{Math.round((coverageComplete / Math.max(1, VISUAL_COVERAGE_REPORT.length)) * 100)}%</strong><span className="text-xs text-mute">Verified diagram coverage</span></div>
      </div>
    </section>

    <section className="card p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div><h2 className="text-base font-black">Question-by-question diagram coverage audit</h2>
          <p className="mt-1 text-xs text-mute">A question passes only when source content, at least three diagram nodes and at least two directional relationships are present.</p>
        </div>
        <span className={coverageMissing === 0 ? 'visual-coverage-pass' : 'visual-coverage-fail'}>
          {coverageComplete}/{VISUAL_COVERAGE_REPORT.length} diagrams complete
        </span>
      </div>
      <div className="visual-audit-summary mt-3">
        {paperCounts.map((entry) => <div key={entry.name}><strong className="block text-lg tabular-nums">{entry.complete}/{entry.total}</strong><span className="text-[11px] text-mute">{entry.name}</span></div>)}
      </div>
      <details className="mt-4">
        <summary className="cursor-pointer text-sm font-bold text-brand">Open full coverage report · all individual subquestions</summary>
        <div className="visual-coverage-report mt-3">
          <table><thead><tr><th>Paper</th><th>Question</th><th>Diagram type</th><th>Nodes</th><th>Connections</th><th>Status</th></tr></thead>
            <tbody>{VISUAL_COVERAGE_REPORT.map((entry) => <tr key={entry.paper + entry.question}>
              <td>{entry.paper}</td><td><strong>{entry.question}</strong><div className="mt-1 text-mute">{entry.questionText}</div></td>
              <td>{entry.diagramType}</td><td className="tabular-nums">{entry.nodeCount}</td><td className="tabular-nums">{entry.edgeCount}</td>
              <td>{entry.status === 'complete' ? <span className="visual-coverage-pass">Complete</span> : <span className="visual-coverage-fail">Missing</span>}</td>
            </tr>)}</tbody>
          </table>
        </div>
      </details>
    </section>

    <section className="visual-answer-controls">
      <select value={paper} onChange={(event) => changePaper(event.target.value)} aria-label="Filter by question paper">
        {VISUAL_PAPER_OPTIONS.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
      </select>
      <label className="relative block"><Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-mute"/>
        <input value={query} onChange={(event) => changeQuery(event.target.value)} placeholder="Search question number or topic…" className="pl-9" aria-label="Search questions"/>
      </label>
    </section>

    <div className="grid min-w-0 gap-4 xl:grid-cols-[minmax(250px,330px)_minmax(0,1fr)]">
      <aside className="card min-w-0 p-3">
        <div className="flex items-center justify-between px-2 py-2"><h2 className="font-bold">Question navigator</h2><span className="chip">{questions.length}</span></div>
        <div className="mt-2 max-h-[70vh] space-y-1 overflow-y-auto pr-1">
          {questions.map((item) => <button type="button" key={item.id} onClick={() => setSelectedId(item.id)}
            aria-current={current?.id === item.id ? 'true' : undefined}
            className={`w-full rounded-xl border p-3 text-left transition ${current?.id === item.id ? 'border-brand bg-brand/10' : 'border-transparent hover:bg-sunk'}`}>
            <span className="block text-[10px] font-bold uppercase tracking-wide text-mute">{paperTitle(item)} · {item.sourceQuestionId}</span>
            <span className="mt-1 block text-xs font-semibold leading-5">{item.question}</span>
          </button>)}
          {!questions.length && <p className="p-4 text-sm text-mute">No questions match this search.</p>}
        </div>
      </aside>

      {current && <article className="visual-answer-card min-w-0 p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div><p className="text-[10px] font-bold uppercase tracking-widest text-brand">{paperTitle(current)} · {current.sourceQuestionId}</p><h2 className="mt-1 text-lg font-bold leading-relaxed">{current.question}</h2></div>
          <div className="visual-zoom"><button type="button" onClick={() => setZoom((value) => Math.max(.7, +(value - .1).toFixed(1)))} aria-label="Zoom out"><ZoomOut size={15}/></button><span className="text-xs tabular-nums">{Math.round(zoom * 100)}%</span><button type="button" onClick={() => setZoom((value) => Math.min(1.5, +(value + .1).toFixed(1)))} aria-label="Zoom in"><ZoomIn size={15}/></button><button type="button" onClick={() => setZoom(1)} aria-label="Reset zoom"><Maximize2 size={15}/></button></div>
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
          <span className="chip">Visual answer · {current.visualType} · {current.diagramAudit.nodeCount} nodes / {current.diagramAudit.edgeCount} connections</span>
          <select value={layout} onChange={(event) => setLayout(event.target.value)} className="rounded-lg border border-line bg-surface px-3 py-2 text-xs" aria-label="Diagram layout">
            <option value="auto">Adaptive structure</option><option value="flow">Flowchart</option><option value="tree">Hierarchical tree</option><option value="block">Block diagram</option><option value="timeline">Step timeline</option><option value="comparison">Comparison chart</option><option value="classification">Classification</option><option value="cycle">Cycle / lifecycle</option><option value="concept">Concept map</option><option value="formula">Formula / calculation layout</option>
          </select>
        </div>
        <div className="visual-answer-canvas mt-3">
          <div className="visual-answer-canvas-inner" style={{ transform: `scale(${zoom})`, width: zoom > 1 ? `${100 / zoom}%` : '100%' }}>
            <VisualStructureRenderer item={current} type={visualType}/>
          </div>
        </div>
        <section className="mt-5">
          <h3 className="flex items-center gap-2 text-sm font-bold"><BookOpenText size={16}/> Short explanations</h3>
          <div className="mt-2 grid gap-2 sm:grid-cols-2">{current.visualSections.map((section) => <div key={section.id} className="rounded-xl border border-line bg-sunk/60 p-3">
            <h4 className="text-sm font-bold text-brand">{section.title}</h4><ul className="mt-2 space-y-2">{section.points.map((point, index) => <li key={index} className="text-xs leading-6 text-mute"><span className="mr-1 font-bold text-ink">{index + 1}.</span>{point}</li>)}</ul>
          </div>)}</div>
        </section>
        {current.visualKeywords.length > 0 && <section className="mt-4"><h3 className="mb-2 text-sm font-bold">Important keywords</h3><div className="visual-keywords">{current.visualKeywords.map((word) => <span key={word}>{word}</span>)}</div></section>}
        <section className="mt-4 rounded-xl border border-line p-3"><h3 className="text-sm font-bold">Exam-writing sequence</h3><p className="mt-1 text-xs text-mute">Use this order to reproduce the visual as a complete written answer:</p><div className="visual-exam-sequence mt-3">{current.examSequence.map((step, index) => <span key={index}>{step}</span>)}</div></section>
        {current.diagramAudit.status !== 'complete' && <p className="visual-answer-note mt-4"><strong>Audit warning:</strong> This record needs source content or additional connected diagram structure before it can be marked complete.</p>}
        {current.diagramAudit.sourcePage && <p className="mt-3 text-xs text-mute">Source: handwritten VTU Scheme &amp; Solutions outline, PDF page {current.diagramAudit.sourcePage}.</p>}
        <p className="mt-4 text-[10px] leading-5 text-mute">Structural content source: {current.visualSourceLabel}. Original answer content is displayed in its existing section elsewhere and is not edited by this visual layer.</p>
      </article>}
    </div>
  </main>;
}

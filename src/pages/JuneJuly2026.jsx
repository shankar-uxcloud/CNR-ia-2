import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, Bookmark, CheckCircle2, ChevronDown, ChevronUp, FileText, ListFilter, Printer, Search, Type, X } from 'lucide-react';
import { EXAM_ANSWERS, EXAM_META, EXAM_MODULES, EXAM_QUESTION_PAPER } from '../data/juneJuly2026';
import './JuneJuly2026.css';

const BOOKMARK_KEY = 'cnr-june-july-2026-bookmarks-v1';
const COMPLETE_KEY = 'cnr-june-july-2026-completed-v1';
const FONT_KEY = 'cnr-june-july-2026-font-v1';
const readArray = (key) => { try { const value = JSON.parse(localStorage.getItem(key) || '[]'); return Array.isArray(value) ? value : []; } catch { return []; } };
const readFont = () => { try { const n = Number(localStorage.getItem(FONT_KEY)); return n >= 15 && n <= 22 ? n : 17; } catch { return 17; } };

function AcademicDiagram({ type }) {
  const common = { fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' };
  const diagrams = {
    land: <><path d="M20 145h360M20 145l70-35 55 12 55-55 55 28 60-48 65 98" {...common}/><path d="M20 160h360M70 145v-22m28 22v-18m28 18v-14m28 14v-28m28 28v-22m28 22v-32m28 32v-25m28 25v-38" {...common}/><path d="M30 190h330M30 205h330" stroke="currentColor" opacity=".35" strokeWidth="5"/><text x="200" y="24" textAnchor="middle">Land cover and erosion control</text><text x="200" y="232" textAnchor="middle">Vegetation roots help hold soil</text></>,
    basins: <><rect x="20" y="48" width="135" height="112" rx="12" fill="currentColor" opacity=".08" stroke="currentColor"/><rect x="245" y="48" width="135" height="112" rx="12" fill="currentColor" opacity=".08" stroke="currentColor"/><text x="87" y="76" textAnchor="middle">Surplus basins</text><text x="87" y="104" textAnchor="middle">Mahanadi</text><text x="87" y="128" textAnchor="middle">Godavari</text><text x="312" y="76" textAnchor="middle">Deficit basins</text><text x="312" y="104" textAnchor="middle">Krishna · Pennar</text><text x="312" y="128" textAnchor="middle">Cauvery · Vaigai</text><path d="M160 103h78m-12-9 12 9-12 9" {...common}/><text x="200" y="84" textAnchor="middle">Proposed</text><text x="200" y="139" textAnchor="middle">transfer</text></>,
    water: <><circle cx="200" cy="113" r="88" fill="currentColor" opacity=".06" stroke="currentColor"/><path d="M112 113a88 88 0 0 1 176 0" stroke="currentColor" strokeWidth="18" fill="none"/><path d="M112 113a88 88 0 0 0 176 0" stroke="currentColor" strokeWidth="5" fill="none"/><text x="200" y="100" textAnchor="middle">97.5% saline</text><text x="200" y="128" textAnchor="middle">2.5% fresh</text><text x="200" y="230" textAnchor="middle">Freshwater is unevenly stored</text></>,
    river: <><rect x="12" y="42" width="175" height="128" rx="12" fill="currentColor" opacity=".07" stroke="currentColor"/><rect x="213" y="42" width="175" height="128" rx="12" fill="currentColor" opacity=".07" stroke="currentColor"/><text x="100" y="70" textAnchor="middle">Himalayan</text><text x="100" y="100" textAnchor="middle">Ganga · Brahmaputra</text><text x="100" y="126" textAnchor="middle">Storage and links</text><text x="300" y="70" textAnchor="middle">Peninsular</text><text x="300" y="100" textAnchor="middle">Mahanadi · Godavari</text><text x="300" y="126" textAnchor="middle">towards deficit basins</text><path d="M188 106h24" {...common}/></>,
    ingress: <><path d="M20 75q90-55 180 0t180 0" {...common}/><path d="M20 75v100h360V75" stroke="currentColor" opacity=".45" fill="currentColor" fillOpacity=".05"/><path d="M20 125q90-35 180 0t180 0" stroke="#0ea5e9" strokeWidth="3" fill="none"/><path d="M205 175V112m-8 10 8-10 8 10" stroke="#0ea5e9" strokeWidth="3" fill="none"/><text x="200" y="32" textAnchor="middle">Coastal aquifer (schematic)</text><text x="200" y="105" textAnchor="middle">Freshwater lens</text><text x="200" y="158" textAnchor="middle">Saltwater below</text></>,
    bag: <><rect x="90" y="45" width="220" height="145" rx="10" stroke="currentColor" fill="currentColor" fillOpacity=".04" strokeWidth="2"/><path d="M115 62v108m45-108v108m45-108v108m45-108v108" stroke="currentColor" strokeWidth="3"/><path d="M20 110h68m-12-8 12 8-12 8M312 110h68m-12-8 12 8-12 8" {...common}/><path d="M90 190h220l-20 35H110z" stroke="currentColor" fill="currentColor" fillOpacity=".12"/><text x="54" y="92" textAnchor="middle">Dusty gas</text><text x="200" y="32" textAnchor="middle">Fabric filter bags</text><text x="346" y="92" textAnchor="middle">Clean gas</text><text x="200" y="215" textAnchor="middle">Dust hopper</text></>,
    ozone: <><circle cx="200" cy="110" r="44" stroke="currentColor" fill="currentColor" fillOpacity=".06"/><text x="200" y="115" textAnchor="middle">Cl</text><path d="M200 56V25m-8 10 8-10 8 10M245 110h120m-10-8 10 8-10 8M155 110H35m10-8-10 8 10 8" {...common}/><text x="200" y="14" textAnchor="middle">UV breaks CFCs</text><text x="300" y="92" textAnchor="middle">Cl + O₃</text><text x="300" y="140" textAnchor="middle">ClO + O₂</text><text x="90" y="92" textAnchor="middle">ClO + O</text><text x="90" y="140" textAnchor="middle">Cl regenerated</text><text x="200" y="205" textAnchor="middle">Catalytic cycle repeats</text></>,
    ecosystem: <><rect x="16" y="48" width="145" height="112" rx="12" fill="currentColor" fillOpacity=".07" stroke="currentColor"/><rect x="239" y="48" width="145" height="112" rx="12" fill="currentColor" fillOpacity=".07" stroke="currentColor"/><text x="88" y="83" textAnchor="middle">Abiotic</text><text x="88" y="110" textAnchor="middle">Sun · water · soil</text><text x="88" y="135" textAnchor="middle">air · temperature</text><text x="311" y="83" textAnchor="middle">Biotic</text><text x="311" y="110" textAnchor="middle">Producers</text><text x="311" y="135" textAnchor="middle">Consumers · decomposers</text><path d="M162 103h75m-10-8 10 8-10 8" {...common}/><path d="M237 123h-75m10-8-10 8 10 8" {...common}/><text x="200" y="200" textAnchor="middle">Continuous interaction</text></>,
    biotic: <><text x="200" y="25" textAnchor="middle">Ecosystem components</text><rect x="22" y="50" width="170" height="150" rx="12" fill="currentColor" fillOpacity=".06" stroke="currentColor"/><rect x="208" y="50" width="170" height="150" rx="12" fill="currentColor" fillOpacity=".06" stroke="currentColor"/><text x="107" y="78" textAnchor="middle">Abiotic factors</text><text x="107" y="108" textAnchor="middle">Light · water · soil</text><text x="107" y="135" textAnchor="middle">Air · temperature</text><text x="107" y="162" textAnchor="middle">Nutrients</text><text x="293" y="78" textAnchor="middle">Biotic factors</text><text x="293" y="108" textAnchor="middle">Producers</text><text x="293" y="135" textAnchor="middle">Consumers</text><text x="293" y="162" textAnchor="middle">Decomposers</text></>,
    warming: <><path d="M30 150h340" {...common}/><circle cx="200" cy="130" r="46" stroke="currentColor" fill="currentColor" fillOpacity=".07"/><path d="M200 80V30m-8 10 8-10 8 10M160 142l-48-45m13 2-13-2 2 13M240 142l48-45m-13 2 13-2-2 13" {...common}/><text x="200" y="135" textAnchor="middle">Earth</text><text x="200" y="20" textAnchor="middle">Incoming solar energy</text><text x="200" y="200" textAnchor="middle">Greenhouse gases retain some outgoing heat</text></>,
  };
  return <figure className="jj-diagram"><svg viewBox="0 0 400 250" role="img" aria-label={type + ' academic schematic'}>{diagrams[type] || diagrams.ecosystem}</svg><figcaption>{({bag:'Working principle of a fabric baghouse filter (schematic, based on the notes description).',ingress:'Freshwater lens and saltwater interface in a coastal aquifer (schematic).',river:'Two components of the proposed National River Linking Project (schematic).'}[type] || 'Conceptual study diagram based on the supplied BCV755B notes.')}</figcaption></figure>;
}

function AnswerCard({ item, index, total, bookmarked, completed, expanded, onBookmark, onComplete, onExpand, onPrint, onNavigate }) {
  return <article id={item.id} className="jj-answer-card card" data-answer-id={item.id}>
    <div className="jj-answer-top">
      <div><div className="jj-question-kicker">{item.question} <span>·</span> Module {item.module}</div><h3>{item.title}</h3></div>
      <span className="jj-marks">10 MARKS</span>
    </div>
    <p className="jj-answer-intro">{item.intro}</p>
    {item.diagram && <AcademicDiagram type={item.diagram}/>}
    {expanded && <div className="jj-answer-body">
      {item.sections.map((group) => <section key={group.heading} className="jj-answer-section"><h4>{group.heading}</h4><ol>{group.points.map((point, i) => <li key={i}>{point}</li>)}</ol></section>)}
      <p className="jj-conclusion"><strong>Conclusion:</strong> {item.conclusion}</p>
      <p className="jj-source"><strong>Source reference:</strong> {item.source}</p>
    </div>}
    <div className="jj-answer-actions">
      <button type="button" className={bookmarked ? 'jj-action is-active' : 'jj-action'} onClick={onBookmark} aria-pressed={bookmarked}><Bookmark size={16}/> {bookmarked ? 'Bookmarked' : 'Bookmark'}</button>
      <button type="button" className={completed ? 'jj-action is-active' : 'jj-action'} onClick={onComplete} aria-pressed={completed}><CheckCircle2 size={16}/> {completed ? 'Completed' : 'Mark complete'}</button>
      <button type="button" className="jj-action" onClick={onPrint}><Printer size={16}/> Print answer</button>
      <button type="button" className="jj-action jj-expand" onClick={onExpand} aria-expanded={expanded}>{expanded ? <ChevronUp size={16}/> : <ChevronDown size={16}/>} {expanded ? 'Collapse' : 'Read full answer'}</button>
      <div className="jj-prev-next"><button type="button" onClick={() => onNavigate(index - 1)} disabled={index === 0} aria-label="Previous answer"><ArrowLeft size={17}/></button><span>{index + 1}/{total}</span><button type="button" onClick={() => onNavigate(index + 1)} disabled={index === total - 1} aria-label="Next answer"><ArrowRight size={17}/></button></div>
    </div>
  </article>;
}

export default function JuneJuly2026() {
  const [search, setSearch] = useState('');
  const [moduleFilter, setModuleFilter] = useState('all');
  const [bookmarks, setBookmarks] = useState(() => readArray(BOOKMARK_KEY));
  const [completed, setCompleted] = useState(() => readArray(COMPLETE_KEY));
  const [fontSize, setFontSize] = useState(readFont);
  const [collapsed, setCollapsed] = useState([]);
  const [printId, setPrintId] = useState(null);
  const [showPaper, setShowPaper] = useState(true);

  useEffect(() => { try { localStorage.setItem(BOOKMARK_KEY, JSON.stringify(bookmarks)); } catch {} }, [bookmarks]);
  useEffect(() => { try { localStorage.setItem(COMPLETE_KEY, JSON.stringify(completed)); } catch {} }, [completed]);
  useEffect(() => { try { localStorage.setItem(FONT_KEY, String(fontSize)); } catch {} }, [fontSize]);
  useEffect(() => { if (!printId) return undefined; const done = () => setPrintId(null); window.addEventListener('afterprint', done); window.print(); return () => window.removeEventListener('afterprint', done); }, [printId]);

  const visible = useMemo(() => EXAM_ANSWERS.filter((item) => {
    const q = search.trim().toLowerCase();
    const matches = !q || [item.question, item.title, item.intro, item.conclusion, item.source, ...item.sections.flatMap((s) => [s.heading, ...s.points])].join(' ').toLowerCase().includes(q);
    return matches && (moduleFilter === 'all' || item.module === Number(moduleFilter));
  }), [search, moduleFilter]);
  const percent = Math.round((completed.length / EXAM_ANSWERS.length) * 100);
  const toggle = (list, setter, id) => setter((old) => old.includes(id) ? old.filter((value) => value !== id) : [...old, id]);
  const navigateTo = (index) => { const item = visible[index]; if (!item) return; document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }); };
  const expandAll = () => setCollapsed(collapsed.length === visible.length ? [] : visible.map((item) => item.id));
  const isExpanded = (id) => !collapsed.includes(id);

  return <main className="jj-page mx-auto max-w-6xl px-4 py-7 sm:px-7 sm:py-10" style={{ '--jj-font-size': fontSize + 'px' }}>
    <header className="jj-hero card">
      <div className="jj-hero-kicker"><span>VTU QUESTION PAPERS</span><span>·</span><span>OFFICIAL PAPER + STUDY ANSWERS</span></div>
      <div className="jj-hero-main"><div><p className="jj-date">{EXAM_META.title}</p><h1>{EXAM_META.subject}</h1><p className="jj-code">{EXAM_META.code} <span>·</span> {EXAM_META.semester} <span>·</span> {EXAM_META.scheme} Scheme</p></div><div className="jj-hero-mark"><FileText size={30}/><strong>VTU</strong><small>EXAM PREP</small></div></div>
      <div className="jj-meta-grid"><div><span>Maximum marks</span><strong>100</strong></div><div><span>Duration</span><strong>3 Hours</strong></div><div><span>Modules</span><strong>5</strong></div><div><span>Subquestions</span><strong>20</strong></div></div>
      <p className="jj-exam-instruction"><strong>Original examination instruction:</strong> {EXAM_META.instruction}</p>
    </header>

    <section className="jj-progress card" aria-label="Preparation progress">
      <div className="jj-progress-heading"><div><span className="jj-section-kicker">YOUR PREPARATION</span><h2>Study progress</h2></div><strong>{percent}%</strong></div>
      <div className="jj-progress-track"><span style={{ width: percent + '%' }}/></div>
      <p>{completed.length} of {EXAM_ANSWERS.length} answers marked complete · {bookmarks.length} bookmarks saved on this device</p>
      <div className="jj-progress-modules">{EXAM_MODULES.map((mod) => { const ids = EXAM_ANSWERS.filter((a) => a.module === mod.id).map((a) => a.id); const done = ids.filter((id) => completed.includes(id)).length; return <div key={mod.id}><span>Module {mod.id}</span><strong>{done}/{ids.length}</strong></div>; })}</div>
    </section>

    <section className="jj-paper card">
      <button className="jj-paper-toggle" type="button" onClick={() => setShowPaper((v) => !v)} aria-expanded={showPaper}><span><FileText size={18}/> Original question paper coverage</span>{showPaper ? <ChevronUp/> : <ChevronDown/>}</button>
      {showPaper && <div className="jj-paper-content">
        <p className="jj-paper-note">All original questions and both OR alternatives are represented below. The paper’s Q9–Q10 heading is printed as “Module 3” on page 2, but the supplied full notes explicitly label the corresponding global-warming/EIA syllabus as Module 5; this page follows the notes’ Module 5 classification.</p>
        {EXAM_QUESTION_PAPER.map((group) => <div className="jj-paper-module" key={group.module}><h3>Module {group.module} · {EXAM_MODULES[group.module - 1].title}</h3><div className="jj-paper-choices"><div><strong>Q{group.number}</strong>{group.parts.map((part) => <p key={part.id}><b>{part.label})</b> {part.text} <small>10 marks</small></p>)}</div><div className="jj-or">OR</div><div><strong>Q{group.number + 1}</strong>{group.alternative.map((part) => <p key={part.id}><b>{part.label})</b> {part.text} <small>10 marks</small></p>)}</div></div></div>)}
        <p className="jj-source"><strong>Question paper source:</strong> June-July 2026.pdf, pp. 1–2.</p>
      </div>}
    </section>

    <section className="jj-tools card" aria-label="Study controls">
      <div className="jj-search"><Search size={18}/><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search question, topic, keyword or technical term…" aria-label="Search questions and answers"/>{search && <button type="button" onClick={() => setSearch('')} aria-label="Clear search"><X size={16}/></button>}</div>
      <div className="jj-tool-row"><label><ListFilter size={15}/> Module <select value={moduleFilter} onChange={(e) => setModuleFilter(e.target.value)}><option value="all">All modules</option>{EXAM_MODULES.map((m) => <option key={m.id} value={m.id}>Module {m.id}</option>)}</select></label><label><Type size={15}/> Text size <button type="button" onClick={() => setFontSize((n) => Math.max(15, n - 1))} disabled={fontSize <= 15} aria-label="Decrease text size">−</button><span>{fontSize}px</span><button type="button" onClick={() => setFontSize((n) => Math.min(22, n + 1))} disabled={fontSize >= 22} aria-label="Increase text size">+</button></label><button type="button" onClick={expandAll} className="jj-plain-tool">{collapsed.length === visible.length ? 'Expand all' : 'Collapse all'}</button><button type="button" className="jj-plain-tool" onClick={() => { setPrintId('all'); }}><Printer size={15}/> Print paper + answers</button></div>
    </section>

    <nav className="jj-module-nav" aria-label="Jump to module">{EXAM_MODULES.map((mod) => <a key={mod.id} href={'#jj-module-' + mod.id}>M{mod.id} · {mod.title}</a>)}</nav>

    {EXAM_MODULES.map((mod) => {
      const moduleAnswers = visible.filter((item) => item.module === mod.id);
      if (!moduleAnswers.length) return null;
      return <section className="jj-module-section" id={'jj-module-' + mod.id} key={mod.id}>
        <div className="jj-module-heading"><div><span>MODULE {String(mod.id).padStart(2,'0')}</span><h2>{mod.title}</h2></div><span>{moduleAnswers.length} answers shown</span></div>
        <div className="jj-answer-list">{moduleAnswers.map((item) => <AnswerCard key={item.id} item={item} index={visible.findIndex((a) => a.id === item.id)} total={visible.length} bookmarked={bookmarks.includes(item.id)} completed={completed.includes(item.id)} expanded={isExpanded(item.id)} onBookmark={() => toggle(bookmarks,setBookmarks,item.id)} onComplete={() => toggle(completed,setCompleted,item.id)} onExpand={() => toggle(collapsed,setCollapsed,item.id)} onPrint={() => setPrintId(item.id)} onNavigate={navigateTo}/>)}</div>
      </section>;
    })}
    {!visible.length && <div className="jj-empty card"><Search size={26}/><h2>No matching answers</h2><p>Try a different keyword or module.</p><button type="button" onClick={() => {setSearch('');setModuleFilter('all');}}>Clear filters</button></div>}
    <footer className="jj-footer"><p>Prepared from the supplied BCV755B Full Notes. Source page numbers refer to PDF page positions, not any printed page numbering.</p><p>Study content is stored locally for bookmarks, completion and reading size. It remains available offline once the site has been cached by the existing PWA.</p></footer>
    {printId && <span className="jj-print-state" aria-live="polite">Preparing print view…</span>}
  </main>;
}

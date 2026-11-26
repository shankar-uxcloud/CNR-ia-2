import { useMemo, useState } from 'react';
import { ArrowLeft, BookOpen, ChevronDown, ChevronUp, FileText, Printer, Search } from 'lucide-react';
import { MODEL_21CV654 } from '../data/modelQuestionPaper21cv654';
import { AnswerPresentationSwitch, StructuredSectionCard } from '../components/AnswerPresentation';
import './AnswerPresentation.css';

const MODULES = [1,2,3,4,5];

// Evidence status is taken from docs/21cv654/PHASE-2-SOURCE-MAP.md.
// "Supported" means the supplied notes directly cover the requested topic;
// "Partial" means only part of the requested detail is in the notes;
// "Gap" means the supplied notes do not directly cover the requested topic.
const SOURCE_COVERAGE = {
  '1(a)': ['partial', 'The notes introduce natural resources, but do not fully develop every classification requested.'],
  '1(b)': ['partial', 'Landform conservation is covered; a complete classification of landform types is not provided.'],
  '1(c)': ['supported', 'Soil health and ecological/economic importance are directly covered.'],
  '2(a)': ['supported', 'Soil degradation processes and their effects on crop productivity and food supply are covered.'],
  '2(b)': ['supported', 'Soil health and its physical, chemical and biological indicators are covered.'],
  '2(c)': ['supported', 'Sustainable land-use planning principles and planning approaches are covered.'],
  '3(a)': ['supported', 'Surplus and deficit basins in India and their transfer context are covered.'],
  '3(b)': ['gap', 'Conjunctive use and a directly relevant source diagram are not developed in the supplied notes.'],
  '3(c)': ['supported', 'Inter-basin transfer proposals and river-linking context are covered.'],
  '4(a)': ['supported', 'Global freshwater and saline-water distribution is covered.'],
  '4(b)': ['supported', 'Water-resource planning and sectoral allocation are covered.'],
  '4(c)': ['partial', 'Agricultural water demand and efficiency are covered; detailed irrigation-method comparisons are limited.'],
  '5(a)': ['supported', 'Respiratory, cardiovascular and other health effects of air pollution are covered.'],
  '5(b)': ['partial', 'Selected NAAQS limits are present; the complete standards table and averaging periods need verification.'],
  '5(c)': ['supported', 'AQI categories and associated health concerns are covered.'],
  '6(a)': ['partial', 'Ozone depletion mechanisms and environmental effects are covered; human-health detail is limited.'],
  '6(b)': ['gap', 'Quartz, mica, feldspar and amphibole are not directly discussed in the supplied notes.'],
  '6(c)': ['gap', 'Physical and biogeochemical weathering are not directly discussed in the supplied notes.'],
  '7(a)': ['supported', 'Biodiversity importance and ecosystem services are covered.'],
  '7(b)': ['supported', 'Ecological restoration and biodiversity conservation are covered.'],
  '7(c)': ['partial', 'Natural and anthropogenic climate drivers are covered in Module 5; keep the answer focused on climate disturbance.'],
  '8(a)': ['partial', 'Wildlife sanctuaries are described, but a verified India-wide list with details is not supplied.'],
  '8(b)': ['partial', 'Taxol is named; additional plant-derived drug examples are not sufficiently documented.'],
  '8(c)': ['partial', 'Zoos are described as ex-situ conservation facilities, but detail is brief.'],
  '9(a)': ['partial', 'EIA categories and clearance steps are covered; a complete hydropower-specific flowchart is not supplied.'],
  '9(b)': ['supported', 'Temperature, glacier/ice melt, sea-level rise and precipitation indicators are covered.'],
  '9(c)': ['partial', 'Same source limitation as Q8(c); this repeated question is retained from the original paper.'],
  '10(a)': ['supported', 'Heat illness, vector-borne disease and food/water-related health impacts are covered.'],
  '10(b)': ['partial', 'Major project sectors are listed; complete thresholds and the full EIA schedule are not supplied.'],
  '10(c)': ['partial', 'EIA purpose is covered, but a thermal-power-specific case study is not provided.']
};

const STATUS_LABEL = {
  supported: 'PDF topic supported',
  partial: 'Partially supported',
  gap: 'PDF content gap'
};
const STATUS_CLASS = {
  supported: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300',
  partial: 'border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300',
  gap: 'border-rose-500/30 bg-rose-500/10 text-rose-700 dark:text-rose-300'
};

function formatAnswer(value) { return value.split(/(\\*\\*[^*]+\\*\\*)/g).map((part,i) => part.startsWith('**') && part.endsWith('**') ? <strong key={i}>{part.slice(2,-2)}</strong> : part); }
export default function ModelQuestionPaper21CV654() {
  const [moduleFilter,setModuleFilter]=useState('all');
  const [presentationMode,setPresentationMode]=useState('original');
  const [query,setQuery]=useState('');
  const [open,setOpen]=useState({});
  const groups=useMemo(()=>MODEL_21CV654.filter(g=>moduleFilter==='all'||g.module===Number(moduleFilter)).map(g=>({...g,parts:g.parts.filter(p=>(p.code+' '+p.question+' '+p.answer).toLowerCase().includes(query.toLowerCase()))})).filter(g=>g.parts.length),[moduleFilter,query]);
  const total=MODEL_21CV654.reduce((n,g)=>n+g.parts.length,0);
  return <main className="mx-auto max-w-6xl px-4 py-7 sm:px-8 sm:py-10" data-answer-presentation={presentationMode}>
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div><p className="eyebrow">21CV654 · CONSERVATION OF NATURAL RESOURCES</p><h1 className="mt-2 text-3xl font-extrabold sm:text-4xl">Complete Model Paper Answers</h1><p className="mt-3 max-w-3xl leading-7 text-mute">All five modules · every sub-question · expanded study answers, based on the supplied BCV755B module notes.</p></div>
      <button onClick={()=>window.print()} className="inline-flex items-center gap-2 rounded-xl border border-line bg-panel px-4 py-2 text-sm font-semibold"><Printer size={16}/> Print answers</button>
    </div>
    <section className="mt-6 grid gap-3 sm:grid-cols-3">
      <div className="card p-4"><span className="text-xs text-mute">Coverage</span><strong className="mt-1 block text-2xl">{total} / {total}</strong><span className="text-xs text-mute">sub-questions included</span></div>
      <div className="card p-4"><span className="text-xs text-mute">Modules</span><strong className="mt-1 block text-2xl">5</strong><span className="text-xs text-mute">Module-wise organization</span></div>
      <div className="card p-4"><span className="text-xs text-mute">Source evidence</span><strong className="mt-1 block text-2xl">30 mapped</strong><span className="text-xs text-mute">Per-question PDF coverage labels</span></div>
    </section>
    <div className="mt-6 rounded-2xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm leading-6">
      <strong>Exam-pattern note:</strong> The supplied 21CV654 paper assigns 6–8 marks to individual sub-questions and instructs students to answer five full questions, choosing at least one from each module. The study answers are expanded for revision; they do not change the original marks or claim an unavailable scheme of evaluation.
    </div>
    <div className="mt-5 rounded-2xl border border-line bg-panel p-4 text-sm leading-6">
      <strong>Source and accuracy note:</strong> Primary references are the supplied <em>BCV755B Full Notes.pdf</em> (PDF pp. 1–57). The labels below distinguish directly supported topics from partial coverage and gaps. A partial/gap label is not a judgement that the answer is unusable; it warns where the supplied notes do not fully substantiate the requested detail. No figure numbers are invented. Q9(c) repeats Q8(c) in the original paper and is intentionally retained.
    </div>
    <div className="sticky top-2 z-10 mt-6 flex flex-col gap-3 rounded-2xl border border-line bg-panel/95 p-3 shadow-lg backdrop-blur sm:flex-row">
      <div className="relative min-w-0 flex-1"><Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-mute"/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search questions or answers..." className="w-full rounded-xl border border-line bg-sunk py-2.5 pl-9 pr-3 text-sm outline-none focus:border-brand"/></div>
      <div className="flex flex-wrap gap-2"><button onClick={()=>setModuleFilter('all')} className={'rounded-xl px-3 py-2 text-sm '+(moduleFilter==='all'?'bg-brand text-white':'bg-sunk')}>All modules</button>{MODULES.map(m=><button key={m} onClick={()=>setModuleFilter(String(m))} className={'rounded-xl px-3 py-2 text-sm '+(moduleFilter===String(m)?'bg-brand text-white':'bg-sunk')}>M{m}</button>)}</div>
    </div>
    <AnswerPresentationSwitch value={presentationMode} onChange={setPresentationMode} className="mt-4" />
    <div className="mt-7 space-y-7">
      {groups.map(g=><section key={g.module+'-'+g.number}>
        <div className="mb-3 flex items-center justify-between"><div><p className="eyebrow">MODULE {g.module}</p><h2 className="text-xl font-bold">Question {g.number} {g.number%2===0?'(OR option)':''}</h2></div><span className="text-xs text-mute">{g.parts.length} answers</span></div>
        <div className="space-y-3">{g.parts.map(p=>{const id=g.number+'-'+p.code;const expanded=open[id]!==false;const [status,note]=SOURCE_COVERAGE[p.code]||['partial','Source mapping has not yet been completed for this item.'];return <article key={id} className="overflow-hidden rounded-2xl border border-line bg-panel">
          <button onClick={()=>setOpen(v=>({...v,[id]:!expanded}))} aria-expanded={expanded} className="flex w-full items-start gap-3 p-4 text-left sm:p-5">
            <span className="grid h-10 min-w-10 place-items-center rounded-xl bg-brand/10 text-sm font-extrabold text-brand">{p.code}</span>
            <span className="min-w-0 flex-1"><span className="block text-xs font-semibold text-mute">{p.marks} MARKS IN ORIGINAL PAPER · EXPANDED STUDY ANSWER</span><span className="mt-1 block font-semibold leading-6">{p.question}</span><span className="mt-2 flex flex-wrap items-center gap-2 text-xs text-mute"><span className="inline-flex items-center gap-1"><FileText size={13}/> {p.pages}</span><span className={'rounded-full border px-2 py-1 font-semibold '+STATUS_CLASS[status]}>{STATUS_LABEL[status]}</span></span></span>
            {expanded?<ChevronUp size={18}/>:<ChevronDown size={18}/>}
          </button>
          {expanded&&<div className="border-t border-line px-4 py-5 sm:px-6">
            {presentationMode === 'original' ? <div className="answer-prose whitespace-pre-line text-[15px] leading-8">{formatAnswer(p.answer)}</div> : <div className="space-y-3">
              {p.answer.split(/\n{2,}/).map((paragraph, paragraphIndex) => {
                const heading = paragraph.match(/^\*\*([^*]+)\*\*/);
                return <StructuredSectionCard key={paragraphIndex} number={paragraphIndex + 1} title={heading?.[1] || 'Answer section ' + (paragraphIndex + 1)}>
                  <p className="answer-prose whitespace-pre-line text-[15px] leading-8">{formatAnswer(paragraph)}</p>
                </StructuredSectionCard>;
              })}
            </div>}
            <div className={'mt-5 rounded-xl border p-3 text-xs leading-5 '+STATUS_CLASS[status]}><strong>{STATUS_LABEL[status]}:</strong> {note}</div>
            <div className="mt-3 rounded-xl bg-sunk p-3 text-xs leading-5 text-mute"><BookOpen size={14} className="mr-1 inline"/> Reference: BCV755B Full Notes.pdf · {p.pages}. Page numbers refer to PDF page order (1–57), not a printed textbook page number.</div>
          </div>}
        </article>})}</div>
      </section>)}
    </div>
    <footer className="mt-10 border-t border-line pt-5 text-xs leading-6 text-mute">Prepared for VTU-style revision. Always follow the marks and instructions printed on the actual examination paper. Where the supplied notes are incomplete, consult the prescribed textbook or lecturer rather than treating unsupported detail as source-verified.</footer>
  </main>;
}

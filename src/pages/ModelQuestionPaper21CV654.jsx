import { useMemo, useState } from 'react';
import { ArrowLeft, BookOpen, ChevronDown, ChevronUp, FileText, Printer, Search } from 'lucide-react';
import { MODEL_21CV654 } from '../data/modelQuestionPaper21cv654';

const MODULES = [1,2,3,4,5];
function formatAnswer(value) { return value.split(/(\\*\\*[^*]+\\*\\*)/g).map((part,i) => part.startsWith('**') && part.endsWith('**') ? <strong key={i}>{part.slice(2,-2)}</strong> : part); }
export default function ModelQuestionPaper21CV654() {
  const [moduleFilter,setModuleFilter]=useState('all');
  const [query,setQuery]=useState('');
  const [open,setOpen]=useState({});
  const groups=useMemo(()=>MODEL_21CV654.filter(g=>moduleFilter==='all'||g.module===Number(moduleFilter)).map(g=>({...g,parts:g.parts.filter(p=>(p.code+' '+p.question+' '+p.answer).toLowerCase().includes(query.toLowerCase()))})).filter(g=>g.parts.length),[moduleFilter,query]);
  const total=MODEL_21CV654.reduce((n,g)=>n+g.parts.length,0);
  return <main className="mx-auto max-w-6xl px-4 py-7 sm:px-8 sm:py-10">
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div><p className="eyebrow">21CV654 · CONSERVATION OF NATURAL RESOURCES</p><h1 className="mt-2 text-3xl font-extrabold sm:text-4xl">Complete Model Paper Answers</h1><p className="mt-3 max-w-3xl leading-7 text-mute">All five modules · every sub-question · expanded 10-mark study answers, based on the supplied BCV755B module notes.</p></div>
      <button onClick={()=>window.print()} className="inline-flex items-center gap-2 rounded-xl border border-line bg-panel px-4 py-2 text-sm font-semibold"><Printer size={16}/> Print answers</button>
    </div>
    <section className="mt-6 grid gap-3 sm:grid-cols-3">
      <div className="card p-4"><span className="text-xs text-mute">Coverage</span><strong className="mt-1 block text-2xl">{total} / {total}</strong><span className="text-xs text-mute">sub-questions included</span></div>
      <div className="card p-4"><span className="text-xs text-mute">Modules</span><strong className="mt-1 block text-2xl">5</strong><span className="text-xs text-mute">Module-wise organization</span></div>
      <div className="card p-4"><span className="text-xs text-mute">Answer depth</span><strong className="mt-1 block text-2xl">10 marks</strong><span className="text-xs text-mute">Expanded study format</span></div>
    </section>
    <div className="mt-6 rounded-2xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm leading-6">
      <strong>Exam-pattern note:</strong> The uploaded 21CV654 paper itself assigns 6–8 marks to individual sub-questions and instructs students to answer five full questions, choosing at least one from each module. These answers are expanded to 10-mark depth as requested; they do not change the original paper's marks or claim an unavailable scheme of evaluation.
    </div>
    <div className="mt-5 rounded-2xl border border-line bg-panel p-4 text-sm leading-6">
      <strong>Source and accuracy note:</strong> Primary references are the supplied <em>BCV755B Full Notes.pdf</em> (PDF pp. 1–57). Exact page references are shown with each answer. The notes do not provide figure numbers for the relevant diagrams; no figure numbers have been invented. Questions 6(b), 6(c), and named sanctuary examples / zoo details are marked as supplementary where the supplied notes do not explain them. Q9(c) repeats Q8(c) in the original paper and is intentionally retained.
    </div>
    <div className="sticky top-2 z-10 mt-6 flex flex-col gap-3 rounded-2xl border border-line bg-panel/95 p-3 shadow-lg backdrop-blur sm:flex-row">
      <div className="relative min-w-0 flex-1"><Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-mute"/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search questions or answers..." className="w-full rounded-xl border border-line bg-sunk py-2.5 pl-9 pr-3 text-sm outline-none focus:border-brand"/></div>
      <div className="flex flex-wrap gap-2"><button onClick={()=>setModuleFilter('all')} className={'rounded-xl px-3 py-2 text-sm '+(moduleFilter==='all'?'bg-brand text-white':'bg-sunk')}>All modules</button>{MODULES.map(m=><button key={m} onClick={()=>setModuleFilter(String(m))} className={'rounded-xl px-3 py-2 text-sm '+(moduleFilter===String(m)?'bg-brand text-white':'bg-sunk')}>M{m}</button>)}</div>
    </div>
    <div className="mt-7 space-y-7">
      {groups.map(g=><section key={g.module+'-'+g.number}>
        <div className="mb-3 flex items-center justify-between"><div><p className="eyebrow">MODULE {g.module}</p><h2 className="text-xl font-bold">Question {g.number} {g.number%2===0?'(OR option)':''}</h2></div><span className="text-xs text-mute">{g.parts.length} answers</span></div>
        <div className="space-y-3">{g.parts.map(p=>{const id=g.number+'-'+p.code;const expanded=open[id]!==false;return <article key={id} className="overflow-hidden rounded-2xl border border-line bg-panel">
          <button onClick={()=>setOpen(v=>({...v,[id]:!expanded}))} aria-expanded={expanded} className="flex w-full items-start gap-3 p-4 text-left sm:p-5">
            <span className="grid h-10 min-w-10 place-items-center rounded-xl bg-brand/10 text-sm font-extrabold text-brand">{p.code}</span>
            <span className="min-w-0 flex-1"><span className="block text-xs font-semibold text-mute">{p.marks} MARKS IN ORIGINAL PAPER · EXPANDED TO 10-MARK FORMAT</span><span className="mt-1 block font-semibold leading-6">{p.question}</span><span className="mt-2 flex items-center gap-1 text-xs text-mute"><FileText size={13}/> {p.pages}</span></span>
            {expanded?<ChevronUp size={18}/>:<ChevronDown size={18}/>}
          </button>
          {expanded&&<div className="border-t border-line px-4 py-5 sm:px-6">
            <div className="answer-prose whitespace-pre-line text-[15px] leading-8">{formatAnswer(p.answer)}</div>
            <div className="mt-5 rounded-xl bg-sunk p-3 text-xs leading-5 text-mute"><BookOpen size={14} className="mr-1 inline"/> Reference: BCV755B Full Notes.pdf · {p.pages}. Page numbers refer to PDF page order (1–57), not a printed textbook page number.</div>
          </div>}
        </article>})}</div>
      </section>)}
    </div>
    <footer className="mt-10 border-t border-line pt-5 text-xs leading-6 text-mute">Prepared for VTU-style revision. Always follow the marks and instructions printed on the actual examination paper. Supplementary explanations are identified transparently and should be cross-checked with your prescribed textbook/lecturer where required.</footer>
  </main>;
}

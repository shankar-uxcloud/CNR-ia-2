import { useState } from 'react';
import { ChevronDown, ExternalLink, ChevronsUpDown } from 'lucide-react';
import { QUESTIONS } from '../data/questions';
import { diagramsOf, keyPointsOf } from '../lib/content';
import { Inline } from '../components/Blocks';
import DiagramFrame from '../components/DiagramFrame';
import { ModuleBadge } from '../components/ui';

export default function Revision() {
  const [open, setOpen] = useState({});
  const all = QUESTIONS.every((q) => open[q.id]);
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-8 sm:py-10">
      <p className="eyebrow">Exam revision mode</p>
      <h1 className="mt-1 text-3xl font-bold tracking-tight">Last-minute revision</h1>
      <p className="mt-1 text-mute">Titles, keywords, key headings and essential diagrams for every question.</p>
      <div className="mt-5 flex justify-end">
        <button className="btn-ghost !py-2" onClick={() => setOpen(all ? {} : Object.fromEntries(QUESTIONS.map((q) => [q.id, true])))}><ChevronsUpDown size={16} />{all ? 'Collapse all' : 'Expand all'}</button>
      </div>
      <div className="mt-4 space-y-3">
        {QUESTIONS.map((q) => {
          const isOpen = !!open[q.id];
          const dg = diagramsOf(q.answer), keys = keyPointsOf(q.answer);
          return (
            <section key={q.id} className="card overflow-hidden">
              <h2><button onClick={() => setOpen((o) => ({ ...o, [q.id]: !o[q.id] }))} aria-expanded={isOpen} aria-controls={`rev-${q.id}`} className="flex w-full items-center gap-3 px-5 py-4 text-left hover:bg-sunk/60">
                <span className="w-10 text-sm font-bold text-mute">{q.code}</span>
                <span className="min-w-0 flex-1"><span className="block font-semibold">{q.title}</span><span className="mt-1 block"><ModuleBadge m={q.module} /></span></span>
                <ChevronDown size={18} className={`shrink-0 transition ${isOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
              </button></h2>
              {isOpen && (
                <div id={`rev-${q.id}`} className="space-y-5 border-t border-line px-5 py-5 animate-rise">
                  <p className="text-sm text-mute">{q.question}</p>
                  <div><h3 className="eyebrow mb-2">Important keywords</h3><div className="flex flex-wrap gap-2">{q.answer.keywords.map((k) => <span key={k} className="rounded-lg bg-brand/10 px-2.5 py-1 text-xs font-semibold text-brand">{k}</span>)}</div></div>
                  <div><h3 className="eyebrow mb-2">Key headings</h3>
                    <ol className="space-y-1 text-sm">{q.answer.sections.map((s) => <li key={s.id} className="flex gap-2"><span className="text-brand">▸</span>{s.title}</li>)}</ol></div>
                  {keys.map((k, i) => <div key={i} className="rounded-xl border-l-4 border-brand bg-brand/8 px-4 py-3 text-sm"><b className="text-brand">{k.title}: </b><Inline text={k.text} /></div>)}
                  {dg.length > 0 && <div><h3 className="eyebrow mb-1">Essential diagrams</h3>{dg.map((d) => <DiagramFrame key={d.id} id={d.id} caption={d.caption} />)}</div>}
                  <a href={`#/q/${q.id}`} className="btn-ghost !py-2"><ExternalLink size={15} />Open full answer</a>
                </div>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}

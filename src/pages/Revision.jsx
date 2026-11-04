import { useMemo, useState } from 'react';
import { ChevronDown, ExternalLink, ChevronsUpDown, Search, X, SearchX } from 'lucide-react';
import { QUESTIONS } from '../data/questions';
import { diagramsOf, keyPointsOf } from '../lib/content';
import { Inline } from '../components/Blocks';
import DiagramFrame from '../components/DiagramFrame';
import { ModuleBadge } from '../components/ui';

export default function Revision() {
  const [open, setOpen] = useState({});
  const [query, setQuery] = useState('');
  const [module, setModule] = useState('all');
  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return QUESTIONS.filter((q) => {
      const inModule = module === 'all' || String(q.module) === module;
      const searchable = [q.code, q.title, q.question, ...(q.answer.keywords || []), ...(q.answer.sections || []).map((s) => s.title)]
        .join(' ').toLowerCase();
      return inModule && (!term || searchable.includes(term));
    });
  }, [query, module]);
  const all = filtered.length > 0 && filtered.every((q) => open[q.id]);
  const toggleAll = () => setOpen((current) => {
    const next = { ...current };
    filtered.forEach((q) => { next[q.id] = !all; });
    return next;
  });

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-8 sm:py-10">
      <p className="eyebrow">Exam revision mode</p>
      <h1 className="mt-1 text-3xl font-bold tracking-tight">Last-minute revision</h1>
      <p className="mt-1 text-mute">Titles, keywords, key headings and essential diagrams for every question.</p>

      <div className="mt-6 flex flex-col gap-3">
        <div className="relative">
          <Search size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-mute" aria-hidden="true" />
          <input value={query} onChange={(e) => setQuery(e.target.value)}
            placeholder="Find a revision topic — e.g. ozone, cyclone, nitrogen…"
            aria-label="Search revision questions"
            className="h-12 w-full rounded-2xl border border-line bg-panel pl-11 pr-11 text-[15px] shadow-soft outline-none transition placeholder:text-mute focus:border-brand focus:ring-2 focus:ring-brand/25" />
          {query && <button onClick={() => setQuery('')} aria-label="Clear revision search"
            className="absolute right-3 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-lg hover:bg-sunk"><X size={16} /></button>}
        </div>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter revision by module">
          {['all', '3', '4', '5'].map((m) => (
            <button key={m} type="button" onClick={() => setModule(m)} aria-pressed={module === m}
              className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition ${module === m ? 'border-brand bg-brand/12 text-brand' : 'border-line bg-panel text-mute hover:bg-sunk hover:text-ink'}`}>
              {m === 'all' ? 'All modules' : `Module ${m}`}
            </button>
          ))}
        </div>
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm text-mute" aria-live="polite">Showing {filtered.length} of {QUESTIONS.length} questions</p>
          <button className="btn-ghost !py-2" onClick={toggleAll} disabled={!filtered.length}>
            <ChevronsUpDown size={16} />{all ? 'Collapse shown' : 'Expand shown'}
          </button>
        </div>
      </div>

      <div className="mt-4 space-y-3">
        {filtered.length === 0 ? (
          <div className="card px-5 py-8 text-center">
            <SearchX size={24} className="mx-auto text-mute" />
            <h2 className="mt-2 font-semibold">No revision topics found</h2>
            <p className="mt-1 text-sm text-mute">Try another keyword or clear the module filter.</p>
            <button className="btn-ghost mt-3 !py-2" onClick={() => { setQuery(''); setModule('all'); }}>Clear filters</button>
          </div>
        ) : filtered.map((q) => {
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

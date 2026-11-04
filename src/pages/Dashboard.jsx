import { useEffect, useState } from 'react';
import { ArrowRight, Bookmark, CheckCircle2, Circle, Clock, PlayCircle, RotateCcw, Trophy } from 'lucide-react';
import { QUESTIONS, MODULES, MODULE_ORDER, byId, byModule } from '../data/questions';
import { useStudy } from '../lib/study';
import { iconFor } from '../lib/icons';
import { ProgressRing, Bar, ModuleBadge, modColor, Empty } from '../components/ui';

function MiniRow({ q }) {
  const { isDone } = useStudy();
  const Icon = iconFor(q.icon);
  return (
    <a href={`#/q/${q.id}`} className="group flex min-w-0 items-center gap-3 rounded-xl px-3 py-2.5 transition hover:bg-sunk">
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg" style={{ background: `rgb(var(--m${q.module}) / .12)`, color: modColor(q.module) }}><Icon size={17} aria-hidden="true" /></span>
      <span className="min-w-0 flex-1"><span className="block text-sm font-semibold leading-snug">{q.code} · {q.title}</span><span className="block text-xs text-mute">Module {q.module}</span></span>
      {isDone(q.id) ? <CheckCircle2 size={17} className="text-brand" aria-label="Completed" /> : <ArrowRight size={16} className="text-mute transition group-hover:translate-x-0.5" aria-hidden="true" />}
    </a>
  );
}

export default function Dashboard() {
  const { completed, bookmarks, recent, resetAll, notify } = useStudy();
  const done = Object.keys(completed).length;
  const [v, setV] = useState(0);
  useEffect(() => { const t = setTimeout(() => setV(done / 10), 80); return () => clearTimeout(t); }, [done]);

  const last = recent.map(byId).find((q) => q && !completed[q.id]);
  const next = last || QUESTIONS.find((q) => !completed[q.id]);
  const marked = QUESTIONS.filter((q) => bookmarks[q.id]);
  const recents = recent.map(byId).filter(Boolean);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-8 sm:py-10">
      <p className="eyebrow">BCV755B · Conservation of Natural Resources</p>
      <h1 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">Welcome back. Let’s keep preparing.</h1>
      <p className="mt-2 max-w-2xl text-mute">Ten source-based 10-mark answers with labelled diagrams. Mark each one complete as you revise it.</p>

      <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-5">
        <section className="card min-w-0 p-6 lg:col-span-3" aria-label="Overall progress">
          <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-center">
            <ProgressRing value={v} size={168} stroke={13}>
              <span className="text-4xl font-bold tabular-nums">{Math.round((done / 10) * 100)}%</span><span className="text-xs text-mute">overall</span>
            </ProgressRing>
            <div className="w-full flex-1">
              <div className="grid grid-cols-3 gap-3 text-center">
                {[['Total', 10], ['Completed', done], ['Remaining', 10 - done]].map(([l, n]) => (
                  <div key={l} className="rounded-xl bg-sunk px-2 py-3"><div className="text-2xl font-bold tabular-nums">{n}</div><div className="text-xs text-mute">{l}</div></div>
                ))}
              </div>
              <div className="mt-5 space-y-3.5">
                {MODULE_ORDER.slice().sort((a, b) => a - b).map((m) => {
                  const qs = byModule(m), d = qs.filter((q) => completed[q.id]).length;
                  return (
                    <div key={m}>
                      <div className="mb-1.5 flex items-center justify-between text-sm"><a href={`#/module/${m}`} className="font-medium hover:underline">Module {m} <span className="text-mute">· {MODULES[m].name}</span></a><span className="tabular-nums text-mute">{d}/{qs.length}</span></div>
                      <Bar value={d / qs.length} color={modColor(m)} />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="card relative min-w-0 overflow-hidden p-6 lg:col-span-2" aria-label="Continue learning">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-brand/10 blur-2xl" aria-hidden="true" />
          <p className="eyebrow">Continue learning</p>
          {next ? (
            <>
              <div className="mt-3"><ModuleBadge m={next.module} /></div>
              <h2 className="mt-3 text-xl font-semibold tracking-tight">{next.code} · {next.title}</h2>
              <p className="mt-1 line-clamp-3 text-sm text-mute">{next.question}</p>
              <a href={`#/q/${next.id}`} className="btn-primary mt-5"><PlayCircle size={18} />{last ? 'Continue learning' : 'Start learning'}</a>
            </>
          ) : (
            <div className="mt-3"><Trophy className="text-brand" size={30} /><h2 className="mt-2 text-xl font-semibold">All ten answers completed</h2><p className="mt-1 text-sm text-mute">Use Revision Mode for a final quick pass.</p><a href="#/revision" className="btn-primary mt-4">Open Revision Mode</a></div>
          )}
        </section>

        <section className="card min-w-0 p-4 lg:col-span-3" aria-label="Quick access">
          <h2 className="px-3 pb-2 pt-1 text-sm font-semibold">Quick access · all 10 questions</h2>
          <div className="grid grid-cols-1 gap-x-2 sm:grid-cols-2">{QUESTIONS.map((q) => <MiniRow key={q.id} q={q} />)}</div>
        </section>

        <div className="min-w-0 space-y-5 lg:col-span-2">
          <section className="card p-4" aria-label="Bookmarked questions">
            <div className="flex items-center justify-between px-3 pb-2 pt-1"><h2 className="flex items-center gap-2 text-sm font-semibold"><Bookmark size={15} />Bookmarked</h2><a href="#/bookmarks" className="text-xs font-semibold text-brand hover:underline">View all</a></div>
            {marked.length ? marked.slice(0, 4).map((q) => <MiniRow key={q.id} q={q} />) : <p className="px-3 pb-3 text-sm text-mute">No bookmarks yet. Save answers you want to revisit.</p>}
          </section>
          <section className="card p-4" aria-label="Recently studied">
            <h2 className="flex items-center gap-2 px-3 pb-2 pt-1 text-sm font-semibold"><Clock size={15} />Recently studied</h2>
            {recents.length ? recents.slice(0, 4).map((q) => <MiniRow key={q.id} q={q} />) : <p className="px-3 pb-3 text-sm text-mute">Open any answer and it will appear here.</p>}
          </section>
        </div>
      </div>

      <section className="mt-8" aria-labelledby="study-route">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
          <div>
            <p className="eyebrow">A simple revision route</p>
            <h2 id="study-route" className="mt-1 text-xl font-bold tracking-tight">Choose your next module</h2>
          </div>
          <p className="text-xs text-mute">Open a module and work through its questions in order.</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          {[3, 4, 5].map((m) => {
            const qs = QUESTIONS.filter((q) => q.module === m);
            const finished = qs.filter((q) => completed[q.id]).length;
            return (
              <a key={m} href={`#/module/${m}`} className="card group p-4 transition hover:-translate-y-0.5 hover:shadow-lift">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider" style={{ color: modColor(m) }}>Module {m}</span>
                  <span className="text-xs tabular-nums text-mute">{finished}/{qs.length} done</span>
                </div>
                <h3 className="mt-2 font-semibold">{MODULES[m].name}</h3>
                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-sunk">
                  <div className="h-full rounded-full transition-all" style={{ width: `${(finished / qs.length) * 100}%`, background: modColor(m) }} />
                </div>
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-brand">Study this module <ArrowRight size={13} className="transition group-hover:translate-x-0.5" /></span>
              </a>
            );
          })}
        </div>
      </section>

      <div className="mt-8 flex justify-end">
        <button onClick={() => { if (confirm('Reset all completed answers, bookmarks and recent history?')) { resetAll(); notify('Progress reset'); } }} className="inline-flex items-center gap-2 text-xs font-medium text-mute hover:text-ink"><RotateCcw size={13} />Reset progress</button>
      </div>
    </div>
  );
}

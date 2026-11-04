import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Bookmark, Check, CheckCircle2, ChevronDown, ChevronLeft, ChevronRight, ChevronsDownUp, ChevronsUpDown, ClipboardList, Copy,
  Eye, FileText, LayoutDashboard, Maximize2, Printer, Settings2, Clock, ListTree, Minus, Plus,
} from 'lucide-react';
import { QUESTIONS, byId, SUBJECT, MODULES } from '../data/questions';
import { answerToText, diagramsOf, readMinutes } from '../lib/content';
import { useStudy, FONT_SIZES, WIDTHS } from '../lib/study';
import { iconFor } from '../lib/icons';
import { Blocks } from '../components/Blocks';
import { IconBtn, ModuleBadge, MarksBadge, StatusChip, Empty, modColor } from '../components/ui';

function Section({ s, open, toggle }) {
  return (
    <section id={s.id} className="scroll-mt-24 border-b border-line/70 py-2 last:border-0">
      <h2 className="m-0">
        <button type="button" onClick={toggle} aria-expanded={open} aria-controls={`${s.id}-body`}
          className="sect-btn group flex w-full items-center gap-3 rounded-xl py-3 text-left text-[1.18em] font-semibold tracking-tight hover:text-brand">
          <span className="h-6 w-1 shrink-0 rounded-full bg-brand" aria-hidden="true" />
          <span className="flex-1">{s.title}</span>
          <ChevronDown size={18} className={`shrink-0 text-mute transition ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
        </button>
      </h2>
      <div id={`${s.id}-body`} hidden={!open} className="sect-body pb-3 pl-4">
        <Blocks blocks={s.blocks} />
        {(s.subsections || []).map((sub) => (
          <div key={sub.title}>
            <h3 className="mt-6 text-[1.02em] font-semibold text-ink">{sub.title}</h3>
            <Blocks blocks={sub.blocks} />
          </div>
        ))}
      </div>
    </section>
  );
}

function Toc({ items, active, onPick, className = '' }) {
  return (
    <nav aria-label="Table of contents" className={className}>
      <ol className="space-y-0.5 border-l border-line">
        {items.map((s) => (
          <li key={s.id}>
            <a href={`#${s.id}`} onClick={(e) => { e.preventDefault(); onPick(s.id); }} aria-current={active === s.id ? 'location' : undefined}
              className={`-ml-px block border-l-2 py-1.5 pl-3 pr-2 text-[13px] leading-snug transition ${active === s.id ? 'border-brand font-semibold text-brand' : 'border-transparent text-mute hover:text-ink'}`}>{s.title}</a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

export default function Answer({ id }) {
  const q = byId(id);
  const st = useStudy();
  const { isDone, isMarked, toggleDone, toggleBookmark, visit, notify, focus, setFocus, settings, setSetting, examChecks = {}, toggleExamCheck } = st;
  const sections = q?.answer.sections || [];
  const [open, setOpen] = useState(() => Object.fromEntries(sections.map((s) => [s.id, true])));
  const [practice, setPractice] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [checks, setChecks] = useState({});
  const [active, setActive] = useState(sections[0]?.id);
  const [prog, setProg] = useState(0);
  const [panel, setPanel] = useState(false);
  const articleRef = useRef(null);

  useEffect(() => { if (q) { visit(q.id); document.title = `${q.code} ${q.title} – VTU ExamPrep BCV755B`; } return () => { document.title = 'VTU ExamPrep – BCV755B Conservation of Natural Resources'; }; }, [id]); // eslint-disable-line

  // Reading progress
  useEffect(() => {
    let raf = 0;
    const on = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = articleRef.current; if (!el) return;
        const r = el.getBoundingClientRect(), total = r.height - window.innerHeight * 0.6;
        setProg(Math.min(1, Math.max(0, -r.top / Math.max(total, 1))));
      });
    };
    on(); window.addEventListener('scroll', on, { passive: true }); window.addEventListener('resize', on);
    return () => { window.removeEventListener('scroll', on); window.removeEventListener('resize', on); cancelAnimationFrame(raf); };
  }, [practice, revealed]);

  // Active section for TOC
  useEffect(() => {
    const els = sections.map((s) => document.getElementById(s.id)).filter(Boolean);
    if (!els.length || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver((es) => {
      const vis = es.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
      if (vis) setActive(vis.target.id);
    }, { rootMargin: '-90px 0px -65% 0px' });
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, [practice, revealed, id]); // eslint-disable-line

  if (!q) return <div className="mx-auto max-w-xl px-4 py-16"><Empty icon={FileText} title="Question not found" text="This question does not exist. Return to the library to choose one." action={<a className="btn-primary" href="#/questions">Browse questions</a>} /></div>;

  const idx = QUESTIONS.findIndex((x) => x.id === q.id);
  const prev = QUESTIONS[idx - 1], next = QUESTIONS[idx + 1];
  const done = isDone(q.id), marked = isMarked(q.id);
  const Icon = iconFor(q.icon);
  const allOpen = sections.every((s) => open[s.id]);
  const showAnswer = !practice || revealed;
  const nDiagrams = diagramsOf(q.answer).length;

  const pick = (sid) => {
    setOpen((o) => ({ ...o, [sid]: true }));
    setTimeout(() => document.getElementById(sid)?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 30);
  };
  const copy = async () => {
    const text = answerToText(q);
    try { await navigator.clipboard.writeText(text); notify('Answer copied to clipboard'); }
    catch {
      const ta = document.createElement('textarea'); ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy'); notify('Answer copied to clipboard'); } catch { notify('Copy failed – select the text manually', 'err'); }
      ta.remove();
    }
  };
  const print = () => { setOpen(Object.fromEntries(sections.map((s) => [s.id, true]))); setTimeout(() => window.print(), 120); };
  const setAll = (v) => setOpen(Object.fromEntries(sections.map((s) => [s.id, v])));
  const complete = () => { toggleDone(q.id); notify(done ? 'Marked as not completed' : `${q.code} marked as completed`); };

  const checklist = [...sections.map((s) => `${s.title.replace(/^\d+\.\s*/, '')}`), ...(nDiagrams ? [`Neat labelled diagram${nDiagrams > 1 ? 's' : ''} drawn (${nDiagrams})`] : [])];
  const checked = checklist.filter((_, i) => checks[i]).length;

  return (
    <>
      <div className="progress-bar fixed inset-x-0 top-0 z-[60] h-1 bg-transparent" aria-hidden="true"><div className="h-full bg-brand" style={{ width: `${prog * 100}%`, transition: 'width .1s linear' }} /></div>

      <div className="mx-auto flex max-w-[1180px] gap-10 px-4 py-6 sm:px-8 sm:py-8">
        <article ref={articleRef} className="min-w-0 flex-1" aria-labelledby="q-title">
          <nav aria-label="Breadcrumb" className="no-print mb-4 flex flex-wrap items-center gap-1.5 text-xs text-mute">
            <a href="#/dashboard" className="hover:text-ink">Dashboard</a><ChevronRight size={12} />
            <a href={`#/module/${q.module}`} className="hover:text-ink">Module {q.module}</a><ChevronRight size={12} /><span className="font-semibold text-ink">{q.code}</span>
          </nav>

          <div className="print-head mb-4 border-b border-line pb-2 text-sm"><b>{SUBJECT.code} – {SUBJECT.name}</b> · Module {q.module} · {q.code} · 10 Marks</div>

          <header>
            <div className="flex flex-wrap items-center gap-2"><ModuleBadge m={q.module} long /><MarksBadge /><StatusChip done={done} />
              <span className="chip"><Clock size={12} aria-hidden="true" />{readMinutes(q)} min read</span></div>
            <div className="mt-4 flex items-start gap-4">
              <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl" style={{ background: `rgb(var(--m${q.module}) / .12)`, color: modColor(q.module) }}><Icon size={27} aria-hidden="true" /></div>
              <div><p className="eyebrow">{q.code} · {MODULES[q.module].name}</p><h1 id="q-title" className="mt-0.5 text-2xl font-bold leading-tight tracking-tight sm:text-3xl">{q.title}</h1></div>
            </div>
            <blockquote className="mt-5 rounded-2xl border border-line bg-sunk px-5 py-4 font-read text-[17px] leading-relaxed" style={{ borderLeft: `4px solid ${modColor(q.module)}` }}>
              <span className="mb-1 block font-sans text-[11px] font-semibold uppercase tracking-wider text-mute">Question · 10 Marks</span>{q.question}
            </blockquote>

            {/* Actions */}
            <div className="no-print mt-5 flex flex-wrap items-center gap-2">
              <button onClick={complete} aria-pressed={done} className={done ? 'btn border border-brand/50 bg-brand/12 text-brand' : 'btn-primary'}>
                {done ? <CheckCircle2 size={18} /> : <Check size={18} />}{done ? 'Completed' : 'Mark as Completed'}
              </button>
              <IconBtn icon={Bookmark} label={marked ? 'Remove bookmark' : 'Bookmark this answer'} active={marked} onClick={() => { toggleBookmark(q.id); notify(marked ? 'Bookmark removed' : 'Answer bookmarked'); }} className={marked ? '[&_svg]:fill-current' : ''} />
              <span className="mx-1 hidden h-6 w-px bg-line sm:block" />
              <IconBtn icon={Copy} label="Copy answer" onClick={copy} />
              <IconBtn icon={Printer} label="Print answer" onClick={print} />
              <IconBtn icon={allOpen ? ChevronsDownUp : ChevronsUpDown} label={allOpen ? 'Collapse all sections' : 'Expand all sections'} onClick={() => setAll(!allOpen)} />
              <IconBtn icon={ClipboardList} label="Exam practice mode" active={practice} onClick={() => { setPractice((p) => !p); setRevealed(false); setChecks({}); }} />
              <IconBtn icon={Maximize2} label="Focus mode" active={focus} onClick={() => setFocus(!focus)} />
              <div className="relative">
                <IconBtn icon={Settings2} label="Reading settings" active={panel} onClick={() => setPanel((p) => !p)} />
                {panel && (
                  <div className="card absolute left-0 top-12 z-30 w-72 p-4 shadow-lift animate-rise sm:left-auto sm:right-0" role="group" aria-label="Reading settings">
                    <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-mute">Font size</div>
                    <div className="flex items-center gap-2">
                      <button className="btn-ghost !px-3 !py-2" aria-label="Decrease font size" disabled={settings.fontIdx === 0} onClick={() => setSetting('fontIdx', settings.fontIdx - 1)}><Minus size={15} /></button>
                      <div className="flex-1 text-center text-sm tabular-nums">{FONT_SIZES[settings.fontIdx]} px</div>
                      <button className="btn-ghost !px-3 !py-2" aria-label="Increase font size" disabled={settings.fontIdx === FONT_SIZES.length - 1} onClick={() => setSetting('fontIdx', settings.fontIdx + 1)}><Plus size={15} /></button>
                    </div>
                    <div className="mb-2 mt-4 text-xs font-semibold uppercase tracking-wider text-mute">Content width</div>
                    <div className="grid grid-cols-3 gap-1.5">
                      {WIDTHS.map((w, i) => <button key={w.label} onClick={() => setSetting('widthIdx', i)} aria-pressed={settings.widthIdx === i} className={`rounded-lg border px-2 py-2 text-xs font-semibold ${settings.widthIdx === i ? 'border-brand bg-brand/12 text-brand' : 'border-line hover:bg-sunk'}`}>{w.label}</button>)}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </header>


          <section className="no-print card mt-6 p-5" aria-label="VTU answer writing checklist">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div><h2 className="flex items-center gap-2 font-semibold"><ClipboardList size={17} className="text-brand" />10-mark answer writing checklist</h2><p className="mt-1 text-sm text-mute">Use these question-specific headings to check your preparation. Your ticks are saved in this browser.</p></div>
              <span className="rounded-lg bg-brand/10 px-3 py-2 text-sm font-bold tabular-nums text-brand">{sections.filter((s) => examChecks[q.id]?.[s.id]).length + (nDiagrams && examChecks[q.id]?.diagram ? 1 : 0)}/{sections.length + (nDiagrams ? 1 : 0)} covered</span>
            </div>
            <div className="mt-3 grid gap-1 sm:grid-cols-2">
              {sections.map((s) => <label key={s.id} className="flex cursor-pointer items-start gap-2 rounded-lg px-2 py-2 text-sm hover:bg-sunk"><input type="checkbox" checked={!!examChecks[q.id]?.[s.id]} onChange={() => toggleExamCheck(q.id, s.id)} className="mt-0.5 h-4 w-4 accent-[rgb(var(--c-brand))]" /><span>{s.title.replace(/^\\d+\\.\\s*/, '')}</span></label>)}
              {nDiagrams > 0 && <label className="flex cursor-pointer items-start gap-2 rounded-lg px-2 py-2 text-sm hover:bg-sunk"><input type="checkbox" checked={!!examChecks[q.id]?.diagram} onChange={() => toggleExamCheck(q.id, 'diagram')} className="mt-0.5 h-4 w-4 accent-[rgb(var(--c-brand))]" /><span>Practise drawing and labelling {nDiagrams} relevant diagram{nDiagrams > 1 ? 's' : ''}</span></label>}
            </div>
          </section>

          {/* Mobile TOC */}
          {showAnswer && (
            <details className="no-print card mt-6 xl:hidden">
              <summary className="flex cursor-pointer list-none items-center gap-2 px-4 py-3 text-sm font-semibold"><ListTree size={16} />On this page</summary>
              <Toc items={sections} active={active} onPick={pick} className="px-4 pb-3" />
            </details>
          )}

          {/* Practice mode gate */}
          {practice && !revealed && (
            <div className="card mt-8 p-8 text-center animate-rise">
              <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-brand/12 text-brand"><ClipboardList size={26} /></div>
              <h2 className="text-xl font-semibold">Exam practice mode</h2>
              <p className="mx-auto mt-2 max-w-md text-sm text-mute">The answer is hidden. Write your answer on paper first – then reveal the model answer and tick off what you covered.</p>
              <button onClick={() => setRevealed(true)} className="btn-primary mt-6"><Eye size={18} />Reveal answer</button>
            </div>
          )}

          {practice && revealed && (
            <section className="card mt-8 p-5 animate-rise" aria-label="Self-assessment checklist">
              <div className="flex items-center justify-between"><h2 className="font-semibold">Self-assessment checklist</h2><span className="text-sm tabular-nums text-mute">{checked}/{checklist.length} covered</span></div>
              <p className="mt-1 text-sm text-mute">Tick every part your own answer included.</p>
              <ul className="mt-3 grid gap-1 sm:grid-cols-2">
                {checklist.map((c, i) => (
                  <li key={i}><label className="flex cursor-pointer items-start gap-2.5 rounded-lg px-2 py-1.5 text-sm hover:bg-sunk">
                    <input type="checkbox" checked={!!checks[i]} onChange={() => setChecks((x) => ({ ...x, [i]: !x[i] }))} className="mt-0.5 h-4 w-4 accent-[rgb(var(--c-brand))]" /><span>{c}</span></label></li>
                ))}
              </ul>
            </section>
          )}

          {showAnswer && (
            <div className="reading mt-8">
              {sections.map((s) => <Section key={s.id} s={s} open={!!open[s.id]} toggle={() => setOpen((o) => ({ ...o, [s.id]: !o[s.id] }))} />)}

              <aside className="avoid-break mt-10 break-words rounded-2xl border border-line bg-sunk p-5 font-sans text-sm leading-relaxed [overflow-wrap:anywhere]">
                <h2 className="mb-2 flex items-center gap-2 text-sm font-semibold"><FileText size={15} />Source and references</h2>
                <p><b>Source document:</b> {q.answer.source.doc}</p>
                <p className="mt-1"><b>Reference in source:</b> {q.answer.source.refs.join(' · ')}</p>
                {q.answer.source.extra && <p className="mt-1"><b>Also used:</b> {q.answer.source.extra.join(' · ')}</p>}
                <p className="mt-2 text-mute">The uploaded documents do not contain page numbers or textbook references, so none are given. Blocks labelled “Additional explanation” or “Gap in the source notes” show where this answer goes beyond, or lacks, the notes. Diagrams were drawn for this site from the notes’ descriptions. This is exam preparation material and does not guarantee marks.</p>
              </aside>
            </div>
          )}

          {/* Pager */}
          <div className="no-print mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {prev ? <a href={`#/q/${prev.id}`} className="card group flex min-w-0 items-center gap-3 p-4 transition hover:-translate-y-0.5 hover:shadow-lift"><ChevronLeft className="text-mute transition group-hover:-translate-x-1" /><span className="min-w-0"><span className="eyebrow block">Previous · {prev.code}</span><span className="block truncate font-semibold">{prev.title}</span></span></a> : <span />}
            {next ? <a href={`#/q/${next.id}`} className="card group flex min-w-0 items-center justify-end gap-3 p-4 text-right transition hover:-translate-y-0.5 hover:shadow-lift"><span className="min-w-0"><span className="eyebrow block">Next · {next.code}</span><span className="block truncate font-semibold">{next.title}</span></span><ChevronRight className="text-mute transition group-hover:translate-x-1" /></a> : <span />}
          </div>
          <div className="no-print mt-4 flex justify-center"><a href="#/dashboard" className="btn-ghost"><LayoutDashboard size={16} />Back to Dashboard</a></div>
        </article>

        {showAnswer && !focus && (
          <aside className="no-print hidden w-60 shrink-0 xl:block">
            <div className="sticky top-24">
              <p className="eyebrow mb-3 flex items-center gap-2"><ListTree size={13} />On this page</p>
              <Toc items={sections} active={active} onPick={pick} />
              <div className="mt-6 text-xs text-mute">Reading progress <b className="tabular-nums text-ink">{Math.round(prog * 100)}%</b></div>
            </div>
          </aside>
        )}
      </div>
    </>
  );
}

import { Bookmark, ArrowRight, Shapes } from 'lucide-react';
import { useStudy } from '../lib/study';
import { iconFor } from '../lib/icons';
import { diagramsOf } from '../lib/content';
import { ModuleBadge, MarksBadge, StatusChip, modColor } from './ui';

export default function QuestionCard({ q, delay = 0 }) {
  const { isDone, isMarked, toggleBookmark, notify } = useStudy();
  const Icon = iconFor(q.icon);
  const done = isDone(q.id), marked = isMarked(q.id);
  const nd = diagramsOf(q.answer).length;
  return (
    <article className="card group relative flex gap-4 p-4 transition duration-300 hover:-translate-y-0.5 hover:shadow-lift sm:gap-5 sm:p-5 animate-rise" style={{ animationDelay: `${delay}ms` }}>
      <div className="flex shrink-0 flex-col items-center gap-2">
        <div className="grid h-14 w-14 place-items-center rounded-2xl" style={{ background: `rgb(var(--m${q.module}) / .12)`, color: modColor(q.module) }}><Icon size={26} aria-hidden="true" /></div>
        <span className="text-xs font-bold tracking-wider text-mute">{q.code}</span>
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2"><ModuleBadge m={q.module} /><MarksBadge /><StatusChip done={done} />
          {nd > 0 && <span className="chip"><Shapes size={12} aria-hidden="true" />{nd} diagram{nd > 1 ? 's' : ''}</span>}</div>
        <h3 className="mt-2 text-lg font-semibold tracking-tight">
          <a href={`#/q/${q.id}`} className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none">{q.title}</a>
        </h3>
        <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-mute">{q.question}</p>
        <div className="mt-3 flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand">Open Answer <ArrowRight size={15} className="transition group-hover:translate-x-1" aria-hidden="true" /></span>
        </div>
      </div>
      <button onClick={() => { toggleBookmark(q.id); notify(marked ? 'Bookmark removed' : 'Answer bookmarked'); }} aria-pressed={marked} aria-label={marked ? `Remove bookmark ${q.code}` : `Bookmark ${q.code}`}
        className={`relative z-10 h-10 w-10 shrink-0 self-start rounded-xl border grid place-items-center transition active:scale-90 ${marked ? 'border-brand/50 bg-brand/12 text-brand' : 'border-line text-mute hover:bg-sunk'}`}>
        <Bookmark size={18} fill={marked ? 'currentColor' : 'none'} aria-hidden="true" />
      </button>
    </article>
  );
}

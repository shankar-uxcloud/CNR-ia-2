import { useMemo } from 'react';
import { Search, X, SearchX, Bookmark } from 'lucide-react';
import { QUESTIONS, MODULES, MODULE_ORDER } from '../data/questions';
import { searchBlob } from '../lib/content';
import { useStudy } from '../lib/study';
import QuestionCard from '../components/QuestionCard';
import { Empty, modColor } from '../components/ui';

const BLOBS = Object.fromEntries(QUESTIONS.map((q) => [q.id, searchBlob(q)]));

export default function Library({ module, bookmarksOnly }) {
  const { query, setQuery, bookmarks } = useStudy();
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  const list = useMemo(() => QUESTIONS.filter((q) =>
    (!module || q.module === module) && (!bookmarksOnly || bookmarks[q.id]) && terms.every((t) => BLOBS[q.id].includes(t))),
  [module, bookmarksOnly, bookmarks, query]);
  const title = bookmarksOnly ? 'Bookmarked Questions' : module ? `Module ${module}` : 'All Questions';
  const sub = bookmarksOnly ? 'Answers you saved for quick revision.' : module ? MODULES[module].long : 'Ten important 10-mark questions across Modules 3, 4 and 5.';
  const chips = [{ to: '/questions', label: 'All', n: 10, on: !module && !bookmarksOnly }, ...[3, 4, 5].map((m) => ({ to: `/module/${m}`, label: `Module ${m}`, n: MODULES && QUESTIONS.filter((q) => q.module === m).length, on: module === m, m })), { to: '/bookmarks', label: 'Bookmarked', n: Object.keys(bookmarks).length, on: bookmarksOnly, icon: true }];
  const grouped = !module && !bookmarksOnly && !terms.length;
  let idx = 0;
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-8 sm:py-10">
      <p className="eyebrow">Question library</p>
      <h1 className="mt-1 text-3xl font-bold tracking-tight">{title}</h1>
      <p className="mt-1 text-mute">{sub}</p>

      <div className="mt-6 flex flex-col gap-3">
        <div className="relative">
          <Search size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-mute" aria-hidden="true" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by title or keyword – e.g. cyclone, EIA, nitrogen…" aria-label="Search questions"
            className="h-12 w-full rounded-2xl border border-line bg-panel pl-11 pr-11 text-[15px] shadow-soft outline-none transition placeholder:text-mute focus:border-brand focus:ring-2 focus:ring-brand/25" />
          {query && <button onClick={() => setQuery('')} aria-label="Clear search" className="absolute right-3 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-lg hover:bg-sunk"><X size={16} /></button>}
        </div>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by module">
          {chips.map((c) => (
            <a key={c.to} href={`#${c.to}`} aria-current={c.on ? 'true' : undefined}
              className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm font-medium transition ${c.on ? 'border-brand bg-brand/12 text-brand' : 'border-line bg-panel text-mute hover:bg-sunk hover:text-ink'}`}>
              {c.m && <span className="h-2 w-2 rounded-full" style={{ background: modColor(c.m) }} />}{c.icon && <Bookmark size={13} />}{c.label}
              <span className="rounded-md bg-sunk px-1.5 text-[11px] tabular-nums">{c.n}</span>
            </a>
          ))}
        </div>
        <p className="text-sm text-mute" aria-live="polite">Showing {list.length} of 10 questions</p>
      </div>

      <div className="mt-4 space-y-4">
        {list.length === 0 ? (
          <Empty icon={bookmarksOnly && !query ? Bookmark : SearchX} title={bookmarksOnly && !query ? 'No bookmarks yet' : 'No matching questions'}
            text={bookmarksOnly && !query ? 'Tap the bookmark icon on any question or answer to save it here.' : 'Try a different keyword, or clear the search and filters.'}
            action={<a href="#/questions" onClick={() => setQuery('')} className="btn-primary">View all questions</a>} />
        ) : grouped ? MODULE_ORDER.map((m) => (
          <section key={m} aria-label={`Module ${m}`} className="pt-3">
            <div className="mb-3 flex items-center gap-3"><span className="h-6 w-1.5 rounded-full" style={{ background: modColor(m) }} /><h2 className="text-sm font-semibold uppercase tracking-wider text-mute">Module {m} · {MODULES[m].name}</h2></div>
            <div className="space-y-4">{list.filter((q) => q.module === m).map((q) => <QuestionCard key={q.id} q={q} delay={idx++ * 40} />)}</div>
          </section>
        )) : list.map((q, i) => <QuestionCard key={q.id} q={q} delay={i * 40} />)}
      </div>
    </div>
  );
}

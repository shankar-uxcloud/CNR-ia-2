import { useMemo, useState } from 'react';
import { Search, X, SearchX, Bookmark } from 'lucide-react';
import { QUESTIONS, MODULES, MODULE_ORDER } from '../data/questions';
import { searchBlob } from '../lib/content';
import { useStudy } from '../lib/study';
import QuestionCard from '../components/QuestionCard';
import { Empty, modColor } from '../components/ui';

const BLOBS = Object.fromEntries(QUESTIONS.map((q) => [q.id, searchBlob(q)]));

export default function Library({ module, bookmarksOnly }) {
  const { query, setQuery, bookmarks, completed = {}, recent = [] } = useStudy();
  const [sort, setSort] = useState('default');
  const [status, setStatus] = useState('all');
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  const list = useMemo(() => {
    const result = QUESTIONS.filter((q) =>
      (!module || q.module === module) && (!bookmarksOnly || bookmarks[q.id]) && (status === 'all' || (status === 'completed' ? !!completed[q.id] : status === 'pending' ? !completed[q.id] : recent.includes(q.id))) && terms.every((t) => BLOBS[q.id].includes(t)));
    if (sort === 'title') result.sort((a, b) => a.title.localeCompare(b.title));
    if (sort === 'module') result.sort((a, b) => a.module - b.module || a.no - b.no);
    if (sort === 'recent') result.sort((a, b) => (bookmarks[b.id] || 0) - (bookmarks[a.id] || 0));
    if (sort === 'studied') result.sort((a, b) => (recent.indexOf(a.id) < 0 ? 999 : recent.indexOf(a.id)) - (recent.indexOf(b.id) < 0 ? 999 : recent.indexOf(b.id)));
    return result;
  }, [module, bookmarksOnly, bookmarks, completed, recent, query, sort, status]);
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
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-mute" aria-live="polite">Showing {list.length} of 10 questions</p>
          <label className="flex items-center gap-2 text-xs font-medium text-mute">Status <select value={status} onChange={e => setStatus(e.target.value)} className="h-9 rounded-lg border border-line bg-panel px-2 text-sm text-ink"><option value="all">All</option><option value="completed">Completed</option><option value="pending">Not completed</option><option value="recent">Recently studied</option></select></label>
          <label className="flex items-center gap-2 text-xs font-medium text-mute">Sort
            <select value={sort} onChange={(e) => setSort(e.target.value)} className="h-9 rounded-lg border border-line bg-panel px-2 text-sm text-ink">
              <option value="default">Question order</option><option value="title">Title A–Z</option><option value="module">Module</option><option value="studied">Recently studied</option>{bookmarksOnly && <option value="recent">Recently bookmarked</option>}
            </select>
          </label>
        </div>
      </div>

      <div className="mt-4 space-y-4">
        {list.length === 0 ? (
          <Empty icon={bookmarksOnly && !query ? Bookmark : SearchX} title={bookmarksOnly && !query ? 'No bookmarks yet' : 'No matching questions'}
            text={bookmarksOnly && !query ? 'Tap the bookmark icon on any question or answer to save it here.' : 'Try another keyword or change the status filter.'}
            action={<button onClick={() => { setQuery(''); setStatus('all'); }} className="btn-primary">Clear search and filters</button>} />
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

import { useMemo, useState } from 'react';
import {
  Bookmark, CheckCircle2, ChevronDown, ChevronUp, Search, X,
  SlidersHorizontal, BookOpenText, RotateCcw,
} from 'lucide-react';
import { FIVE_MARK_ANSWERS } from '../data/fiveMarkAnswers';
import { QUESTIONS } from '../data/questions';
import { FIVE_MARK_PAPER_BANK } from '../data/fiveMarkPaperBank';
import { Blocks } from '../components/Blocks';
import { useStudy } from '../lib/study';
import { formatFiveMarkQuestionNumber } from '../lib/fiveMarkPresentation';

const CORE_ITEMS = QUESTIONS.map((question) => {
  const source = question.answer?.source || null;
  return {
    id: question.id,
    question: question.question,
    module: question.module,
    marks: 5,
    answer: FIVE_MARK_ANSWERS[question.id] || [],
    sourceType: 'core',
    sourceLabel: 'Core syllabus question bank',
    source: source ? {
      document: source.doc || null,
      references: source.refs || [],
      additionalReferences: source.extra || [],
    } : null,
    topicTags: question.answer?.keywords || [],
    reviewStatus: 'needs-review',
    reviewReason: 'Existing core five-mark companion answer. Academic verification status remains pending.',
  };
});

const PAPER_ITEMS = FIVE_MARK_PAPER_BANK.map((item) => ({
  ...item,
  sourceType: 'paper',
  sourceLabel: item.source.category === 'supplementary-model-paper'
    ? 'Supplementary model paper'
    : 'Catalogued university question-paper collection',
}));

const FIVE_MARK_ITEMS = [...CORE_ITEMS, ...PAPER_ITEMS]
  .sort((a, b) => a.module - b.module || (a.sourceType === b.sourceType ? a.id.localeCompare(b.id) : a.sourceType === 'paper' ? -1 : 1));

const blockText = (block) => [
  block.text,
  ...(block.items || []),
  ...(block.lines || []),
  ...(block.head || []),
  ...(block.rows || []).flat(),
  block.caption,
].filter(Boolean).join(' ');

const itemSearchText = (item) => [
  item.question,
  item.sourceLabel,
  item.source?.title,
  item.source?.document,
  item.source?.file,
  item.source?.supportingFile,
  item.source?.references,
  item.source?.additionalReferences,
  item.sourceQuestionId,
  item.topicTags,
  ...(item.answer || []).flatMap((section) => [
    section.title,
    ...(section.blocks || []).map(blockText),
    ...(section.subsections || []).flatMap((subsection) => [
      subsection.title,
      ...(subsection.blocks || []).map(blockText),
    ]),
  ]),
].flat().filter(Boolean).join(' ').toLowerCase();

const REVIEW_LABELS = {
  'needs-review': 'Core draft · review pending',
  'draft-needs-pdf-review': 'Draft · PDF comparison pending',
  'draft-needs-academic-review': 'Draft · academic review pending',
  'needs-source-review': 'Partial source · review needed',
  'needs-source': 'Source gap · answer pending',
  'blocked-question-text': 'Blocked · exact wording needed',
  'not-started': 'Not started',
};

function AnswerSections({ item }) {
  return (
    <div className="five-mark-answer mt-4 border-t border-line pt-2">
      {item.answer.map((section) => (
        <section key={section.id} className="border-b border-line/70 py-3 last:border-0">
          <h3 className="five-mark-section-title mb-2 text-base font-semibold tracking-tight">{section.title}</h3>
          <Blocks blocks={section.blocks || []} />
          {(section.subsections || []).map((subsection) => (
            <div key={subsection.title} className="mt-4">
              <h4 className="five-mark-subsection-title mb-2 font-semibold">{subsection.title}</h4>
              <Blocks blocks={subsection.blocks || []} />
            </div>
          ))}
        </section>
      ))}
    </div>
  );
}

function SourceDetails({ item }) {
  if (item.sourceType === 'core') {
    return (
      <div className="mt-3 rounded-xl border border-line bg-sunk px-3 py-2.5 text-xs leading-relaxed text-mute">
        <strong className="text-ink">Core notes:</strong> {item.source?.document || 'Existing module notes'}
        {item.source?.references?.length > 0 && <> · References: {item.source.references.join('; ')}</>}
        {item.source?.additionalReferences?.length > 0 && <> · Additional: {item.source.additionalReferences.join('; ')}</>}
      </div>
    );
  }

  return (
    <div className="mt-3 rounded-xl border border-line bg-sunk px-3 py-2.5 text-xs leading-relaxed text-mute">
      <div><strong className="text-ink">Source:</strong> {item.source?.title}</div>
      <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1">
        {item.sourceQuestionId && <span>Question ID: {item.sourceQuestionId}</span>}
        {Number.isFinite(item.originalMarks) && <span>Original paper allocation: {item.originalMarks} marks</span>}
        {item.source?.supportingFile && <span>Supporting scheme/solutions resource recorded</span>}
      </div>
      {item.notesPageRefs?.length > 0 && (
        <div className="mt-1">Notes reference pages: {item.notesPageRefs.join('; ')}</div>
      )}
      {item.conceptGroup && <div className="mt-1">Related concept group: {item.conceptGroup.replace(/-/g, ' ')}</div>}
      {item.repeatGroup && <div className="mt-1 font-semibold text-ink">Repeated question wording is retained as a separate source record.</div>}
      {item.sourceVerificationStatus && <div className="mt-1">Source check: {item.sourceVerificationStatus.replace(/-/g, ' ')}</div>}
      {item.sourceSupportStatus && item.sourceSupportStatus !== 'not-audited' && (
        <div className="mt-1">Notes support: {item.sourceSupportStatus}</div>
      )}
    </div>
  );
}

function QuestionCard({ item, expanded, onToggle, isDone, isMarked, toggleDone, toggleBookmark, visit, notify }) {
  const done = isDone(item.id);
  const marked = isMarked(item.id);
  const hasAnswer = item.answer.length > 0;
  const statusLabel = REVIEW_LABELS[item.reviewStatus] || 'Review status pending';

  return (
    <article className="five-mark-answer-card card min-w-0 p-4 sm:p-5" aria-labelledby={item.id + '-question'}>
      <div className="flex flex-wrap items-center gap-2">
        <span className="chip font-semibold" data-question-number={formatFiveMarkQuestionNumber(item)}>
          Question {formatFiveMarkQuestionNumber(item)}
        </span>
        <span className="chip">Module {item.module}</span>
        <span className="chip">5 Marks</span>
        <span className="chip">{item.sourceLabel}</span>
        <span className="chip">{statusLabel}</span>
        {done && <span className="chip text-brand"><CheckCircle2 size={12} /> Completed</span>}
      </div>

      <h2 id={item.id + '-question'} className="five-mark-question-title mt-3 text-base font-semibold leading-relaxed sm:text-lg">
        {item.question}
      </h2>

      {item.topicTags?.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5" aria-label="Question topics">
          {item.topicTags.map((tag) => <span key={tag} className="rounded-full bg-sunk px-2.5 py-1 text-[11px] text-mute">{tag}</span>)}
        </div>
      )}

      <SourceDetails item={item} />

      {item.reviewReason && (
        <div className="mt-3 rounded-xl border border-line bg-panel px-3.5 py-3 text-sm leading-relaxed">
          <strong className="block text-xs font-semibold uppercase tracking-wide text-mute">Review note</strong>
          <p className="mt-1 text-ink">{item.reviewReason}</p>
        </div>
      )}

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <button type="button" onClick={() => { onToggle(); if (!expanded) visit(item.id); }}
          aria-expanded={expanded} aria-controls={item.id + '-answer'}
          className="btn-primary !px-3.5 !py-2 text-sm">
          <BookOpenText size={16} /> {expanded ? 'Hide answer' : hasAnswer ? 'View 5-mark answer' : 'View review status'}
          {expanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
        </button>
        <button type="button" onClick={() => { toggleBookmark(item.id); notify(marked ? 'Bookmark removed' : '5-mark question bookmarked'); }}
          aria-pressed={marked} className={marked ? 'btn border border-brand/40 bg-brand/10 text-brand !px-3 !py-2 text-sm' : 'btn-ghost !px-3 !py-2 text-sm'}>
          <Bookmark size={15} className={marked ? 'fill-current' : ''} /> {marked ? 'Bookmarked' : 'Bookmark'}
        </button>
        <button type="button" onClick={() => { toggleDone(item.id); notify(done ? 'Progress updated' : '5-mark question marked complete'); }}
          aria-pressed={done} className={done ? 'btn border border-brand/40 bg-brand/10 text-brand !px-3 !py-2 text-sm' : 'btn-ghost !px-3 !py-2 text-sm'}>
          <CheckCircle2 size={15} /> {done ? 'Completed' : 'Mark complete'}
        </button>
      </div>

      {expanded && (
        <div id={item.id + '-answer'} className="mt-4" aria-label={hasAnswer ? 'Five-mark answer' : 'Review status'}>
          {hasAnswer
            ? <AnswerSections item={item} />
            : <div className="rounded-xl border border-line bg-sunk p-4 text-sm text-mute">
                No answer has been authored for this source question. The review note above records what must be checked or supplied before it can be answered accurately.
              </div>}
        </div>
      )}
    </article>
  );
}

export default function FiveMarkAnswers() {
  const {
    isDone, isMarked, toggleDone, toggleBookmark, visit, notify,
  } = useStudy();
  const [query, setQuery] = useState('');
  const [moduleFilter, setModuleFilter] = useState('all');
  const [sourceFilter, setSourceFilter] = useState('all');
  const [availabilityFilter, setAvailabilityFilter] = useState('all');
  const [topicFilter, setTopicFilter] = useState('all');
  const [expanded, setExpanded] = useState(() => Object.fromEntries(
    FIVE_MARK_ITEMS.filter((item) => item.answer.length > 0).map((item) => [item.id, true]),
  ));
  const [showFilters, setShowFilters] = useState(false);

  const topics = useMemo(() => [...new Set(FIVE_MARK_ITEMS.flatMap((item) => item.topicTags || []))].sort(), []);
  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return FIVE_MARK_ITEMS.filter((item) => {
      if (moduleFilter !== 'all' && item.module !== Number(moduleFilter)) return false;
      if (sourceFilter !== 'all' && item.sourceType !== sourceFilter) return false;
      if (availabilityFilter === 'drafts' && item.answer.length === 0) return false;
      if (availabilityFilter === 'review-only' && item.answer.length > 0) return false;
      if (topicFilter !== 'all' && !(item.topicTags || []).includes(topicFilter)) return false;
      if (term && !itemSearchText(item).includes(term)) return false;
      return true;
    });
  }, [query, moduleFilter, sourceFilter, availabilityFilter, topicFilter]);

  const answeredCount = FIVE_MARK_ITEMS.filter((item) => item.answer.length > 0).length;
  const reviewOnlyCount = FIVE_MARK_ITEMS.length - answeredCount;
  const completedCount = FIVE_MARK_ITEMS.filter((item) => isDone(item.id)).length;
  const bookmarkedCount = FIVE_MARK_ITEMS.filter((item) => isMarked(item.id)).length;
  const moduleCounts = [1, 2, 3, 4, 5].map((module) => ({
    module,
    count: FIVE_MARK_ITEMS.filter((item) => item.module === module).length,
  }));
  const allExpanded = filtered.length > 0 && filtered.every((item) => expanded[item.id]);

  const clearFilters = () => {
    setQuery('');
    setModuleFilter('all');
    setSourceFilter('all');
    setAvailabilityFilter('all');
    setTopicFilter('all');
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-7 sm:px-8 sm:py-10">
      <p className="eyebrow">VTU examination preparation · BCV755B</p>
      <div className="mt-1 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">5-Mark Answers</h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-mute">
            Source-linked question bank across all five modules, with core syllabus questions kept separate from paper-derived questions.
          </p>
          <p className="mt-1 text-xs text-mute">2-Mark and 10-Mark answers remain in the existing Answers section; this page is dedicated to five-mark preparation.</p>
          <p className="mt-2 text-sm font-medium text-ink">Question numbers are shown on every card, and complete 5-mark answers are expanded by default for direct study.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="chip">80 questions</span>
          <span className="chip">{answeredCount} answer drafts</span>
          <span className="chip">{reviewOnlyCount} review-only</span>
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div className="card p-4"><p className="text-xs font-semibold uppercase tracking-wide text-mute">Available questions</p><p className="mt-1 text-2xl font-bold tabular-nums">{FIVE_MARK_ITEMS.length}</p><p className="mt-1 text-xs text-mute">10 core + 70 source-question records</p></div>
        <div className="card p-4"><p className="text-xs font-semibold uppercase tracking-wide text-mute">Answer drafts</p><p className="mt-1 text-2xl font-bold tabular-nums">{answeredCount}</p><p className="mt-1 text-xs text-mute">Drafts are not all academically verified</p></div>
        <div className="card p-4"><p className="text-xs font-semibold uppercase tracking-wide text-mute">Review-only records</p><p className="mt-1 text-2xl font-bold tabular-nums">{reviewOnlyCount}</p><p className="mt-1 text-xs text-mute">Source gaps or exact-wording blockers</p></div>
        <div className="card p-4"><p className="text-xs font-semibold uppercase tracking-wide text-mute">Your progress</p><p className="mt-1 text-2xl font-bold tabular-nums">{completedCount}/{FIVE_MARK_ITEMS.length}</p><p className="mt-1 text-xs text-mute">{bookmarkedCount} bookmarked</p></div>
      </div>

      <section className="mt-6 card p-4 sm:p-5" aria-label="Search and filter five-mark answers">
        <div className="relative">
          <Search size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-mute" aria-hidden="true" />
          <input value={query} onChange={(event) => setQuery(event.target.value)}
            placeholder="Search question, topic, answer or source…"
            aria-label="Search five-mark questions"
            className="h-12 w-full rounded-2xl border border-line bg-panel pl-11 pr-11 text-sm shadow-soft outline-none transition placeholder:text-mute focus:border-brand focus:ring-2 focus:ring-brand/25" />
          {query && <button type="button" onClick={() => setQuery('')} aria-label="Clear search" className="absolute right-3 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-lg hover:bg-sunk"><X size={16} /></button>}
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2" role="group" aria-label="Filter by module">
          <button type="button" onClick={() => setModuleFilter('all')} aria-pressed={moduleFilter === 'all'}
            className={moduleFilter === 'all' ? 'btn-primary !px-3 !py-2 text-xs' : 'btn-ghost !px-3 !py-2 text-xs'}>All modules · {FIVE_MARK_ITEMS.length}</button>
          {moduleCounts.map(({ module, count }) => (
            <button key={module} type="button" onClick={() => setModuleFilter(String(module))}
              aria-pressed={moduleFilter === String(module)}
              className={moduleFilter === String(module) ? 'btn-primary !px-3 !py-2 text-xs' : 'btn-ghost !px-3 !py-2 text-xs'}>
              Module {module} · {count}
            </button>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <button type="button" onClick={() => setShowFilters((value) => !value)} aria-expanded={showFilters}
            className="btn-ghost !px-3 !py-2 text-sm"><SlidersHorizontal size={15} /> {showFilters ? 'Hide filters' : 'More filters'}</button>
          <div className="flex flex-wrap items-center gap-2">
            <button type="button" onClick={() => setExpanded((current) => {
              const next = { ...current };
              filtered.forEach((item) => { next[item.id] = !allExpanded; });
              return next;
            })} className="btn-ghost !px-3 !py-2 text-xs">{allExpanded ? 'Collapse visible answers' : 'Expand visible answers'}</button>
            <button type="button" onClick={clearFilters} className="btn-ghost !px-3 !py-2 text-xs"><RotateCcw size={13} /> Clear filters</button>
          </div>
        </div>

        {showFilters && (
          <div className="mt-4 grid gap-3 border-t border-line pt-4 sm:grid-cols-3">
            <label className="flex flex-col gap-1.5 text-xs font-semibold text-mute">Question source
              <select value={sourceFilter} onChange={(event) => setSourceFilter(event.target.value)} className="h-10 rounded-xl border border-line bg-panel px-3 text-sm font-normal text-ink">
                <option value="all">All sources</option><option value="core">Core syllabus bank</option><option value="paper">Question-paper sources</option>
              </select>
            </label>
            <label className="flex flex-col gap-1.5 text-xs font-semibold text-mute">Answer availability
              <select value={availabilityFilter} onChange={(event) => setAvailabilityFilter(event.target.value)} className="h-10 rounded-xl border border-line bg-panel px-3 text-sm font-normal text-ink">
                <option value="all">All records</option><option value="drafts">Answer draft available</option><option value="review-only">Review-only · no answer yet</option>
              </select>
            </label>
            <label className="flex flex-col gap-1.5 text-xs font-semibold text-mute">Topic
              <select value={topicFilter} onChange={(event) => setTopicFilter(event.target.value)} className="h-10 rounded-xl border border-line bg-panel px-3 text-sm font-normal text-ink">
                <option value="all">All topics</option>{topics.map((topic) => <option key={topic} value={topic}>{topic}</option>)}
              </select>
            </label>
          </div>
        )}
      </section>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm text-mute" aria-live="polite">Showing <strong className="text-ink">{filtered.length}</strong> of {FIVE_MARK_ITEMS.length} five-mark questions</p>
        <p className="text-xs text-mute">Progress and bookmarks use your existing CNR-IA-2 browser data.</p>
      </div>

      <div className="mt-4 grid gap-4">
        {filtered.length ? filtered.map((item) => (
          <QuestionCard key={item.id} item={item} expanded={!!expanded[item.id]}
            onToggle={() => setExpanded((current) => ({ ...current, [item.id]: !current[item.id] }))}
            isDone={isDone} isMarked={isMarked} toggleDone={toggleDone} toggleBookmark={toggleBookmark} visit={visit} notify={notify} />
        )) : (
          <div className="card p-8 text-center">
            <h2 className="font-semibold">No matching five-mark questions</h2>
            <p className="mt-1 text-sm text-mute">Try another keyword or clear one of the filters.</p>
            <button type="button" onClick={clearFilters} className="btn-primary mx-auto mt-4 !px-4 !py-2 text-sm">Clear filters</button>
          </div>
        )}
      </div>
    </div>
  );
}

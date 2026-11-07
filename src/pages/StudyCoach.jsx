import { useMemo, useState } from 'react';
import { Brain, Sparkles, BookOpen, Target, MessageCircle, RotateCcw, ArrowRight, CheckCircle2 } from 'lucide-react';
import { QUESTIONS, MODULES } from '../data/questions';
import { useStudy } from '../lib/study';
import { ModuleBadge } from '../components/ui';

const words = (value) => String(value || '').toLowerCase().replace(/[^a-z0-9 ]/g, ' ').split(/\s+/).filter((w) => w.length > 3);
const unique = (items) => [...new Set(items)];
function rankQuestion(question, query) {
  const terms = unique(words(query));
  const source = words([question.title, question.question, ...(question.answer?.keywords || [])].join(' '));
  return terms.reduce((score, term) => score + (source.includes(term) ? 1 : 0), 0);
}
function sectionSummary(question) {
  return (question.answer?.sections || []).map((section) => ({
    title: section.title,
    points: (section.blocks || []).flatMap((block) => block.items || (block.text ? [block.text.replace(/\*\*/g, '')] : [])).slice(0, 3),
  }));
}

export default function StudyCoach() {
  const { saveEvaluationAttempt, notify } = useStudy();
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState('q01');
  const [response, setResponse] = useState('');
  const [showReview, setShowReview] = useState(false);
  const [mode, setMode] = useState('explain');
  const [saved, setSaved] = useState(false);

  const ranked = useMemo(() => QUESTIONS.map((q) => ({ q, score: rankQuestion(q, query) })).sort((a, b) => b.score - a.score), [query]);
  const active = QUESTIONS.find((q) => q.id === selectedId) || ranked[0]?.q || QUESTIONS[0];
  const sections = sectionSummary(active);
  const terms = active.answer?.keywords || [];
  const responseWords = unique(words(response));
  const covered = terms.filter((term) => words(term).some((word) => responseWords.includes(word)));
  const coverage = terms.length ? Math.round((covered.length / terms.length) * 100) : 0;

  const askCoach = () => {
    if (!query.trim()) { notify('Enter a topic or question first', 'err'); return; }
    const best = ranked[0]?.q || QUESTIONS[0];
    setSelectedId(best.id); setResponse(''); setShowReview(false); setSaved(false);
  };
  const saveReview = () => {
    saveEvaluationAttempt({ source: 'study-coach', questionId: active.id, question: active.title, score: covered.length, total: terms.length, coverage, response, coveredKeywords: covered });
    setSaved(true); notify('Study review saved to your progress');
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-8 sm:py-10">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div><p className="eyebrow">Personal learning intelligence · BCV755B</p><h1 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">AI Study Coach</h1><p className="mt-2 max-w-2xl text-mute">A private, offline-ready study companion grounded in your ten VTU answers. Find a topic, build a revision plan and practise recall with a transparent keyword rubric.</p></div>
        <span className="chip"><Sparkles size={14}/> Offline study mode</span>
      </div>

      <section className="card mt-6 p-5 sm:p-6">
        <div className="flex items-center gap-2"><MessageCircle size={18} className="text-brand"/><h2 className="font-semibold">What do you want to learn?</h2></div>
        <div className="mt-3 flex flex-col gap-3 sm:flex-row">
          <input value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && askCoach()} placeholder="Try: greenhouse effect, biodiversity, EIA..." className="min-h-12 min-w-0 flex-1 rounded-xl border border-line bg-panel px-4 text-sm"/>
          <button type="button" onClick={askCoach} className="btn-primary min-h-12"><Sparkles size={16}/> Build my study session</button>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">{['greenhouse effect','biodiversity conservation','ozone depletion','environmental impact assessment'].map((item) => <button key={item} type="button" onClick={() => setQuery(item)} className="chip hover:border-brand">{item}</button>)}</div>
      </section>

      <div className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
        <main className="min-w-0 space-y-5">
          <section className="card p-5 sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3"><div><p className="eyebrow">Recommended learning path</p><h2 className="mt-1 text-xl font-bold">{active.code} · {active.title}</h2></div><ModuleBadge m={active.module}/></div>
            <p className="mt-3 text-sm leading-relaxed text-mute">{active.question}</p>
            <div className="mt-4 flex flex-wrap gap-2"><button type="button" onClick={() => setMode('explain')} className={`btn ${mode === 'explain' ? 'btn-primary' : 'btn-ghost'}`}><BookOpen size={15}/> Learn the structure</button><button type="button" onClick={() => setMode('practice')} className={`btn ${mode === 'practice' ? 'btn-primary' : 'btn-ghost'}`}><Target size={15}/> Test my recall</button></div>
            {mode === 'explain' ? <div className="mt-5 space-y-3">{sections.map((section, i) => <article key={section.title} className="rounded-xl border border-line p-4"><h3 className="text-sm font-semibold">{i + 1}. {section.title}</h3>{section.points.length ? <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-mute">{section.points.map((point, j) => <li key={j}>{point.replace(/\*\*/g, '')}</li>)}</ul> : <p className="mt-2 text-sm text-mute">Review the source answer for this section.</p>}</article>)}</div> :
              <div className="mt-5"><label className="text-sm font-semibold" htmlFor="coach-response">Write what you remember without looking at the answer</label><textarea id="coach-response" value={response} onChange={(e) => {setResponse(e.target.value);setShowReview(false);setSaved(false);}} rows={7} placeholder="Explain the key concepts in your own words..." className="mt-2 w-full rounded-xl border border-line bg-panel p-3 text-sm leading-relaxed"/><div className="mt-3 flex flex-wrap items-center justify-between gap-3"><span className="text-xs text-mute">{words(response).length} words · {covered.length}/{terms.length} key terms detected</span><button type="button" onClick={() => setShowReview(true)} disabled={!response.trim()} className="btn-primary"><Target size={15}/> Review my answer</button></div>
                {showReview && <div className="mt-4 rounded-xl bg-sunk p-4"><div className="flex items-center justify-between gap-3"><strong className="text-sm">Keyword coverage</strong><strong className="text-2xl tabular-nums">{coverage}%</strong></div><div className="mt-2 h-2 overflow-hidden rounded-full bg-panel"><div className="h-full rounded-full bg-brand transition-all" style={{width: coverage + '%'}}/></div><p className="mt-3 text-xs text-mute">This is a transparent keyword checklist, not an AI-graded VTU mark or a substitute for faculty evaluation.</p><div className="mt-3 flex flex-wrap gap-2">{terms.map((term) => <span key={term} className={`chip ${covered.includes(term) ? 'border-emerald-500/40 text-emerald-600' : ''}`}>{covered.includes(term) ? <CheckCircle2 size={12}/> : null}{term}</span>)}</div><button type="button" onClick={saveReview} disabled={saved} className="btn-primary mt-4"><CheckCircle2 size={15}/>{saved ? 'Saved to progress' : 'Save review'}</button></div>}
              </div>}
          </section>
          <section className="card p-5"><h2 className="font-semibold">Your next three steps</h2><ol className="mt-3 space-y-3 text-sm text-mute"><li className="flex gap-3"><span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand/10 font-semibold text-brand">1</span>Read the section headings and explain each one aloud.</li><li className="flex gap-3"><span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand/10 font-semibold text-brand">2</span>Write a short answer from memory, including examples and diagrams where relevant.</li><li className="flex gap-3"><span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand/10 font-semibold text-brand">3</span>Revisit missing keywords, then try the timed exam simulator.</li></ol></section>
        </main>
        <aside className="card h-fit p-4"><h2 className="text-sm font-semibold">Related syllabus topics</h2><div className="mt-3 space-y-1">{ranked.slice(0,5).map(({q,score}) => <button key={q.id} type="button" onClick={() => {setSelectedId(q.id);setResponse('');setShowReview(false);}} className={`w-full rounded-xl p-3 text-left transition hover:bg-sunk ${q.id === active.id ? 'bg-sunk' : ''}`}><span className="block text-sm font-semibold">{q.code} · {q.title}</span><span className="mt-1 block text-xs text-mute">Module {q.module} · {score} topic matches</span></button>)}</div><a href="#/exam" className="btn-primary mt-4 w-full"><ArrowRight size={15}/> Start a timed exam</a><button type="button" onClick={() => {setQuery('');setSelectedId('q01');setResponse('');setShowReview(false);}} className="btn-ghost mt-2 w-full"><RotateCcw size={15}/> Reset coach</button></aside>
      </div>
      <p className="mt-5 text-xs text-mute">Accuracy note: the coach uses your supplied BCV755B answer bank in the browser. No external AI service or API key is connected, and your study text stays on this device.</p>
    </div>
  );
}

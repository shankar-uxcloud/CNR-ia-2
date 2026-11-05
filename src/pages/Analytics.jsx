import { useMemo } from 'react';
import { Activity, Award, BarChart3, BookOpenCheck, Brain, Clock3, FileText, Target, TrendingUp } from 'lucide-react';
import { QUESTIONS, MODULES, MODULE_ORDER } from '../data/questions';
import { useStudy } from '../lib/study';
import { Bar, ModuleBadge, modColor } from '../components/ui';

const pct = (n, d) => d ? Math.round((n / d) * 100) : 0;
const average = (items, pick) => items.length ? Math.round(items.reduce((sum, item) => sum + pick(item), 0) / items.length) : null;
const dateLabel = (value) => new Date(value).toLocaleDateString(undefined, { day: 'numeric', month: 'short' });

export default function Analytics() {
  const {
    completed = {}, bookmarks = {}, quizAttempts = [], evaluationAttempts = [],
    examAttempts = [], practiceAttempts = {}, plannerTasks = [], readingChecks = {},
    revisionChecks = {},
  } = useStudy();

  const doneIds = QUESTIONS.filter((q) => completed[q.id]);
  const moduleStats = MODULE_ORDER.slice().sort((a,b) => a-b).map((m) => {
    const questions = QUESTIONS.filter((q) => q.module === m);
    const done = questions.filter((q) => completed[q.id]).length;
    return { module: m, total: questions.length, done, percent: pct(done, questions.length) };
  });
  const quizStats = useMemo(() => ({
    attempts: quizAttempts.length,
    average: average(quizAttempts, (a) => a.total ? (a.score / a.total) * 100 : 0),
    best: quizAttempts.length ? Math.max(...quizAttempts.map((a) => a.total ? Math.round(a.score / a.total * 100) : 0)) : null,
    latest: quizAttempts[0] || null,
    correct: quizAttempts.reduce((n,a) => n + (a.correct || a.score || 0), 0),
    total: quizAttempts.reduce((n,a) => n + (a.total || 0), 0),
  }), [quizAttempts]);
  const evaluationAverage = average(evaluationAttempts, (a) => a.score || 0);
  const examStats = {
    attempts: examAttempts.length,
    answered: examAttempts.reduce((n,a) => n + (a.answeredCount || 0), 0),
    questions: examAttempts.reduce((n,a) => n + (a.questionCount || 0), 0),
    words: examAttempts.reduce((n,a) => n + (a.totalWords || 0), 0),
    latest: examAttempts[0] || null,
  };
  const activity = useMemo(() => {
    const days = Array.from({ length: 7 }, (_, i) => {
      const d = new Date(); d.setHours(0,0,0,0); d.setDate(d.getDate() - (6-i));
      const key = [d.getFullYear(), String(d.getMonth()+1).padStart(2,'0'), String(d.getDate()).padStart(2,'0')].join('-');
      const completedCount = Object.values(completed).filter((at) => {
        const date = new Date(at); return !Number.isNaN(date.getTime()) && [date.getFullYear(),String(date.getMonth()+1).padStart(2,'0'),String(date.getDate()).padStart(2,'0')].join('-') === key;
      }).length;
      const quizCount = quizAttempts.filter((a) => a.at && new Date(a.at).toDateString() === d.toDateString()).length;
      const evalCount = evaluationAttempts.filter((a) => a.at && new Date(a.at).toDateString() === d.toDateString()).length;
      const examCount = examAttempts.filter((a) => a.at && new Date(a.at).toDateString() === d.toDateString()).length;
      return { key, label: d.toLocaleDateString(undefined,{weekday:'short'}), total: completedCount + quizCount + evalCount + examCount, completedCount, quizCount, evalCount, examCount };
    });
    return days;
  }, [completed, quizAttempts, evaluationAttempts, examAttempts]);
  const maxActivity = Math.max(1, ...activity.map((d) => d.total));
  const tasksDone = plannerTasks.filter((t) => t.done).length;
  const readCount = QUESTIONS.filter((q) => readingChecks[q.id]).length;
  const revisionCount = QUESTIONS.filter((q) => revisionChecks[q.id]).length;
  const bookmarkedCount = Object.keys(bookmarks).length;
  const coverageRows = QUESTIONS.map((q) => {
    const attempts = evaluationAttempts.filter((a) => a.questionId === q.id);
    return { ...q, attempts: attempts.length, average: average(attempts, (a) => a.score || 0), latest: attempts[0] || null };
  }).filter((q) => q.attempts).sort((a,b) => (a.average ?? 0) - (b.average ?? 0));

  return <div className="mx-auto max-w-6xl px-4 py-8 sm:px-8 sm:py-10">
    <p className="eyebrow">Your preparation · measurable progress</p>
    <h1 className="mt-1 text-3xl font-bold tracking-tight">Progress Analytics</h1>
    <p className="mt-2 max-w-3xl text-mute">A combined view of study completion, quiz performance, written practice and exam simulations. All figures come from activity saved in this browser.</p>

    <section className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      <div className="card p-4"><div className="flex items-center justify-between text-mute"><span className="text-xs">Study completion</span><BookOpenCheck size={17}/></div><p className="mt-2 text-3xl font-bold tabular-nums">{pct(doneIds.length, QUESTIONS.length)}%</p><p className="mt-1 text-xs text-mute">{doneIds.length} of {QUESTIONS.length} questions completed</p></div>
      <div className="card p-4"><div className="flex items-center justify-between text-mute"><span className="text-xs">Average quiz score</span><Brain size={17}/></div><p className="mt-2 text-3xl font-bold tabular-nums">{quizStats.average === null ? '—' : quizStats.average + '%'}</p><p className="mt-1 text-xs text-mute">{quizStats.attempts} saved quiz attempts</p></div>
      <div className="card p-4"><div className="flex items-center justify-between text-mute"><span className="text-xs">Answer coverage</span><Target size={17}/></div><p className="mt-2 text-3xl font-bold tabular-nums">{evaluationAverage === null ? '—' : evaluationAverage + '%'}</p><p className="mt-1 text-xs text-mute">{evaluationAttempts.length} saved text-overlap evaluations</p></div>
      <div className="card p-4"><div className="flex items-center justify-between text-mute"><span className="text-xs">Exam simulations</span><FileText size={17}/></div><p className="mt-2 text-3xl font-bold tabular-nums">{examStats.attempts}</p><p className="mt-1 text-xs text-mute">{examStats.words.toLocaleString()} words written in saved exams</p></div>
    </section>

    <div className="mt-5 grid gap-5 lg:grid-cols-2">
      <section className="card p-5"><div className="flex items-center gap-2"><BarChart3 size={18} className="text-brand"/><h2 className="font-semibold">Module completion</h2></div><p className="mt-1 text-xs text-mute">Completed study questions compared with the current question bank.</p><div className="mt-5 space-y-5">{moduleStats.map((m) => <div key={m.module}><div className="mb-2 flex items-center justify-between gap-3"><div className="flex items-center gap-2"><ModuleBadge m={m.module}/><span className="text-sm font-medium">{MODULES[m.module].name}</span></div><span className="text-sm tabular-nums text-mute">{m.done}/{m.total} · {m.percent}%</span></div><Bar value={m.percent/100} color={modColor(m.module)}/></div>)}</div></section>
      <section className="card p-5"><div className="flex items-center gap-2"><Activity size={18} className="text-brand"/><h2 className="font-semibold">Last 7 days activity</h2></div><p className="mt-1 text-xs text-mute">A day counts saved completions, quizzes, evaluations and exam reports.</p><div className="mt-5 grid grid-cols-7 gap-2">{activity.map((d) => <div key={d.key} className="text-center"><div className="flex h-28 items-end justify-center rounded-lg bg-sunk px-1 pb-1"><div title={`${d.total} activities`} className="w-full max-w-8 rounded-md bg-brand transition-all" style={{height:`${Math.max(d.total ? 10 : 2, d.total/maxActivity*100)}%`}}/></div><p className="mt-2 text-xs text-mute">{d.label}</p><p className="text-xs font-semibold tabular-nums">{d.total}</p></div>)}</div><div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs text-mute"><span>Completed: {activity.reduce((n,d)=>n+d.completedCount,0)}</span><span>Quizzes: {activity.reduce((n,d)=>n+d.quizCount,0)}</span><span>Evaluations: {activity.reduce((n,d)=>n+d.evalCount,0)}</span><span>Exam reports: {activity.reduce((n,d)=>n+d.examCount,0)}</span></div></section>
    </div>

    <div className="mt-5 grid gap-5 lg:grid-cols-2">
      <section className="card p-5"><div className="flex items-center gap-2"><TrendingUp size={18} className="text-brand"/><h2 className="font-semibold">Quiz performance</h2></div>{quizStats.attempts ? <><div className="mt-4 grid grid-cols-3 gap-2"><div className="rounded-xl bg-sunk p-3"><p className="text-xs text-mute">Average</p><p className="mt-1 text-xl font-bold">{quizStats.average}%</p></div><div className="rounded-xl bg-sunk p-3"><p className="text-xs text-mute">Best</p><p className="mt-1 text-xl font-bold">{quizStats.best}%</p></div><div className="rounded-xl bg-sunk p-3"><p className="text-xs text-mute">Questions</p><p className="mt-1 text-xl font-bold">{quizStats.correct}/{quizStats.total}</p></div></div><p className="mt-3 text-xs text-mute">Latest attempt: {dateLabel(quizStats.latest.at)} · {quizStats.latest.score}/{quizStats.latest.total}</p></> : <p className="mt-4 text-sm text-mute">Complete a quiz to see performance trends here.</p>}</section>
      <section className="card p-5"><div className="flex items-center gap-2"><Clock3 size={18} className="text-brand"/><h2 className="font-semibold">Written exam practice</h2></div>{examStats.attempts ? <><div className="mt-4 grid grid-cols-3 gap-2"><div className="rounded-xl bg-sunk p-3"><p className="text-xs text-mute">Questions answered</p><p className="mt-1 text-xl font-bold">{examStats.answered}/{examStats.questions}</p></div><div className="rounded-xl bg-sunk p-3"><p className="text-xs text-mute">Total words</p><p className="mt-1 text-xl font-bold">{examStats.words.toLocaleString()}</p></div><div className="rounded-xl bg-sunk p-3"><p className="text-xs text-mute">Latest attempt</p><p className="mt-1 text-sm font-bold">{dateLabel(examStats.latest.at)}</p></div></div><p className="mt-3 text-xs text-mute">Written answers are not automatically graded.</p></> : <p className="mt-4 text-sm text-mute">Submit and save an exam simulation to track written practice.</p>}</section>
    </div>

    <section className="card mt-5 p-5"><div className="flex items-center gap-2"><Award size={18} className="text-brand"/><h2 className="font-semibold">Question coverage from evaluations</h2></div><p className="mt-1 text-xs text-mute">Questions with saved keyword/topic-overlap evaluations, sorted from lowest to highest coverage. This is not an assessment of factual accuracy or official marks.</p>{coverageRows.length ? <div className="mt-4 space-y-3">{coverageRows.map((q) => <div key={q.id} className="flex flex-wrap items-center gap-3 rounded-xl border border-line p-3"><div className="min-w-0 flex-1"><p className="text-sm font-semibold">{q.code} · {q.title}</p><p className="text-xs text-mute">{q.attempts} evaluation{q.attempts===1?'':'s'}</p></div><div className="w-full sm:w-40"><Bar value={(q.average||0)/100}/></div><span className="w-12 text-right text-sm font-bold tabular-nums">{q.average}%</span><a href={`#/q/${q.id}`} className="text-xs font-semibold text-brand hover:underline">Study</a></div>)}</div> : <p className="mt-4 text-sm text-mute">Save an answer evaluation to see which topics may need more revision.</p>}</section>

    <section className="mt-5 grid gap-3 sm:grid-cols-3">
      <a href="#/questions" className="card p-4 transition hover:-translate-y-0.5 hover:shadow-lift"><BookOpenCheck size={18} className="text-brand"/><p className="mt-2 text-sm font-semibold">Study question bank</p><p className="mt-1 text-xs text-mute">Continue completing source-based answers.</p></a>
      <a href="#/quiz" className="card p-4 transition hover:-translate-y-0.5 hover:shadow-lift"><Brain size={18} className="text-brand"/><p className="mt-2 text-sm font-semibold">Practise MCQs</p><p className="mt-1 text-xs text-mute">Test concept recall and explanations.</p></a>
      <a href="#/exam" className="card p-4 transition hover:-translate-y-0.5 hover:shadow-lift"><FileText size={18} className="text-brand"/><p className="mt-2 text-sm font-semibold">Take written exam</p><p className="mt-1 text-xs text-mute">Practise timed long-form answers.</p></a>
    </section>
  </div>;
}

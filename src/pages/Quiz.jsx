import { useEffect, useMemo, useState } from 'react';
import { Award, ChevronLeft, ChevronRight, RotateCcw, Save, Shuffle, Clock3, Flag, CheckCircle2, AlertCircle } from 'lucide-react';
import { MCQ_BANK } from '../data/mcqBank';
import { useStudy } from '../lib/study';
import { ModuleBadge } from '../components/ui';

const QUIZ_SIZE = 10;
const DURATION_SECONDS = 15 * 60;
const formatTime = (seconds) => `${Math.floor(seconds / 60).toString().padStart(2,'0')}:${(seconds % 60).toString().padStart(2,'0')}`;

export default function Quiz() {
  const { quizAttempts = [], saveQuizAttempt, notify } = useStudy();
  const [module, setModule] = useState('all');
  const [negativeMarking, setNegativeMarking] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [flagged, setFlagged] = useState({});
  const [finished, setFinished] = useState(false);
  const [started, setStarted] = useState(false);
  const [saved, setSaved] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(DURATION_SECONDS);
  const pool = useMemo(() => MCQ_BANK.filter((q) => module === 'all' || String(q.module) === module), [module]);
  const current = questions[index];
  const correct = questions.filter((q) => answers[q.id] === q.answer).length;
  const wrong = questions.filter((q) => answers[q.id] !== undefined && answers[q.id] !== q.answer).length;
  const unanswered = questions.length - correct - wrong;
  const score = Math.max(0, correct - (negativeMarking ? wrong * 0.25 : 0));
  const percentage = questions.length ? Math.round(score / questions.length * 100) : 0;

  const start = (shuffle = false) => {
    const selected = [...pool];
    if (shuffle) selected.sort(() => Math.random() - 0.5);
    setQuestions(selected.slice(0, Math.min(QUIZ_SIZE, selected.length)));
    setIndex(0); setAnswers({}); setFlagged({}); setFinished(false); setSaved(false);
    setSecondsLeft(DURATION_SECONDS); setStarted(true);
  };
  const finish = () => { setFinished(true); setStarted(false); };
  useEffect(() => {
    if (!started || finished) return undefined;
    const timer = window.setInterval(() => setSecondsLeft((value) => {
      if (value <= 1) { window.clearInterval(timer); setFinished(true); setStarted(false); return 0; }
      return value - 1;
    }), 1000);
    return () => window.clearInterval(timer);
  }, [started, finished]);

  if (!current && !finished) return <div className="mx-auto max-w-4xl px-4 py-10"><section className="card p-6"><h1 className="text-2xl font-bold">Quiz Centre</h1><p className="mt-2 text-mute">Choose a module and start a concept-based quiz.</p><button onClick={() => start(true)} className="btn-primary mt-4"><Shuffle size={16}/>Start quiz</button></section></div>;

  return <div className="mx-auto max-w-4xl px-4 py-8 sm:px-8 sm:py-10">
    <p className="eyebrow">Concept mastery · timed assessment</p><h1 className="mt-1 text-3xl font-bold tracking-tight">Quiz Centre</h1>
    <p className="mt-2 max-w-2xl text-mute">Answer concept-based MCQs from the existing BCV755B study notes. Each question has one correct answer and an explanation in the review.</p>
    <section className="card mt-6 p-5">
      <div className="grid gap-4 sm:grid-cols-[1fr_auto_auto] sm:items-end">
        <label className="text-sm font-semibold">Module<select value={module} onChange={(e) => setModule(e.target.value)} disabled={started} className="mt-2 h-11 w-full rounded-xl border border-line bg-panel px-3 font-normal"><option value="all">All modules</option><option value="3">Module 3</option><option value="4">Module 4</option><option value="5">Module 5</option></select></label>
        <label className="flex h-11 items-center gap-2 text-sm"><input type="checkbox" checked={negativeMarking} onChange={(e) => setNegativeMarking(e.target.checked)} disabled={started} className="h-4 w-4 accent-[rgb(var(--c-brand))]"/>Negative marking (−0.25)</label>
        <button onClick={() => start(true)} className="btn-primary h-11"><Shuffle size={16}/>{started ? 'Restart quiz' : 'Start shuffled quiz'}</button>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <div className="rounded-xl border border-line p-3"><p className="text-xs text-mute">Available MCQs</p><p className="mt-1 text-2xl font-bold">{pool.length}</p></div>
        <div className="rounded-xl border border-line p-3"><p className="text-xs text-mute">Saved attempts</p><p className="mt-1 text-2xl font-bold">{quizAttempts.length}</p></div>
        <div className="rounded-xl border border-line p-3"><p className="text-xs text-mute">Latest result</p><p className="mt-1 text-2xl font-bold">{quizAttempts[0] ? `${quizAttempts[0].score}/${quizAttempts[0].total}` : '—'}</p></div>
      </div>
    </section>

    {started && current && <section className="card mt-5 p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-2"><span className="chip">Question {index + 1} of {questions.length}</span><div className="flex items-center gap-3"><span className={secondsLeft <= 60 ? 'chip border-red-500/50 text-red-500' : 'chip'}><Clock3 size={14}/>{formatTime(secondsLeft)}</span><ModuleBadge m={current.module}/></div></div>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-sunk"><div className="h-full bg-brand transition-all" style={{width:`${(index + 1) / questions.length * 100}%`}}/></div>
      <h2 className="mt-6 text-xl font-bold">{current.prompt}</h2>
      <div className="mt-5 grid gap-2">{current.options.map((option, i) => <button key={option} onClick={() => setAnswers((state) => ({...state, [current.id]: i}))} aria-pressed={answers[current.id] === i} className={`rounded-xl border p-4 text-left text-sm transition ${answers[current.id] === i ? 'border-brand bg-brand/10' : 'border-line bg-panel hover:bg-sunk'}`}><span className="mr-3 inline-grid h-6 w-6 place-items-center rounded-full bg-sunk text-xs font-bold">{String.fromCharCode(65 + i)}</span>{option}</button>)}</div>
      <div className="mt-5 flex flex-wrap items-center justify-between gap-2"><button onClick={() => setFlagged((state) => ({...state, [current.id]: !state[current.id]}))} className={flagged[current.id] ? 'btn border border-amber-500/50 bg-amber-500/10 text-amber-600' : 'btn-ghost'}><Flag size={15}/>{flagged[current.id] ? 'Flagged for review' : 'Flag question'}</button><span className="text-xs text-mute">{Object.keys(answers).length} answered · {questions.length - Object.keys(answers).length} remaining</span></div>
      <div className="mt-5 flex justify-between"><button onClick={() => setIndex((i) => Math.max(0, i - 1))} disabled={index === 0} className="btn-ghost"><ChevronLeft size={16}/>Previous</button><button onClick={() => index === questions.length - 1 ? finish() : setIndex((i) => i + 1)} className="btn-primary">{index === questions.length - 1 ? 'Submit quiz' : 'Next'}<ChevronRight size={16}/></button></div>
    </section>}

    {finished && <section className="card mt-5 p-5 sm:p-6">
      <Award size={30} className="text-brand"/><h2 className="mt-2 text-2xl font-bold">Quiz completed</h2><p className="mt-1 text-mute">Score: {score.toFixed(2)}/{questions.length} · {percentage}% · {correct} correct · {wrong} incorrect · {unanswered} unanswered.</p>
      <div className="mt-4 grid gap-3 sm:grid-cols-3"><div className="rounded-xl border border-line p-3"><p className="text-xs text-mute">Correct</p><p className="text-2xl font-bold">{correct}</p></div><div className="rounded-xl border border-line p-3"><p className="text-xs text-mute">Incorrect</p><p className="text-2xl font-bold">{wrong}</p></div><div className="rounded-xl border border-line p-3"><p className="text-xs text-mute">Unanswered</p><p className="text-2xl font-bold">{unanswered}</p></div></div>
      <div className="mt-5 flex flex-wrap gap-2"><button disabled={saved} onClick={() => {saveQuizAttempt({score:Number(score.toFixed(2)),total:questions.length,module,correct,wrong,unanswered,negativeMarking});setSaved(true);notify('Quiz result saved');}} className="btn-primary"><Save size={16}/>{saved ? 'Result saved' : 'Save result'}</button><button onClick={() => start(true)} className="btn-ghost"><RotateCcw size={16}/>Retake quiz</button></div>
      <div className="mt-6 space-y-3"><h3 className="font-semibold">Answer review</h3>{questions.map((q, i) => <div key={q.id} className="rounded-xl border border-line p-4 text-sm"><div className="flex items-start gap-2"><span className={answers[q.id] === q.answer ? 'text-brand' : 'text-orange-500'}>{answers[q.id] === q.answer ? <CheckCircle2 size={17}/> : <AlertCircle size={17}/>}</span><div className="min-w-0 flex-1"><b>{i + 1}. {q.prompt}</b><p className="mt-2">Your answer: {answers[q.id] === undefined ? 'Not answered' : q.options[answers[q.id]]}</p><p className="mt-1 font-semibold text-brand">Correct answer: {q.options[q.answer]}</p><p className="mt-1 text-mute">{q.explanation}</p></div></div></div>)}</div>
    </section>}
    <p className="mt-5 text-xs text-mute">Quiz results are stored locally in this browser. Negative marking is optional and applies −0.25 for each incorrect response; unanswered questions receive no penalty.</p>
  </div>;
}

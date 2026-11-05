import { useEffect, useMemo, useState } from 'react';
import { AlarmClock, ArrowLeft, ArrowRight, CheckCircle2, Circle, ClipboardList, Flag, RotateCcw, Save, Send, ShieldAlert } from 'lucide-react';
import { QUESTIONS, MODULES } from '../data/questions';
import { useStudy } from '../lib/study';
import { ModuleBadge } from '../components/ui';

const formatTime = (seconds) => `${Math.floor(seconds / 60).toString().padStart(2, '0')}:${(seconds % 60).toString().padStart(2, '0')}`;
const wordCount = (value) => String(value || '').trim() ? String(value).trim().split(/\s+/).length : 0;

export default function ExamSimulator() {
  const { examAttempts = [], saveExamAttempt, notify } = useStudy();
  const [module, setModule] = useState('all');
  const [duration, setDuration] = useState(90);
  const [count, setCount] = useState(5);
  const [selected, setSelected] = useState(QUESTIONS.slice(0, 5).map((q) => q.id));
  const [paper, setPaper] = useState([]);
  const [answers, setAnswers] = useState({});
  const [flags, setFlags] = useState({});
  const [index, setIndex] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [phase, setPhase] = useState('setup');
  const [saved, setSaved] = useState(false);
  const pool = useMemo(() => QUESTIONS.filter((q) => module === 'all' || String(q.module) === module), [module]);
  const current = paper[index];
  const totalWords = paper.reduce((sum, q) => sum + wordCount(answers[q.id]), 0);
  const answered = paper.filter((q) => wordCount(answers[q.id]) > 0).length;
  const flagged = paper.filter((q) => flags[q.id]).length;
  const durationSeconds = duration * 60;

  useEffect(() => {
    if (phase !== 'running') return undefined;
    const timer = window.setInterval(() => setSecondsLeft((value) => {
      if (value <= 1) { window.clearInterval(timer); setSecondsLeft(0); setPhase('submitted'); return 0; }
      return value - 1;
    }), 1000);
    return () => window.clearInterval(timer);
  }, [phase]);

  const toggleQuestion = (id) => setSelected((old) => old.includes(id) ? old.filter((x) => x !== id) : [...old, id]);
  const startExam = () => {
    const chosen = QUESTIONS.filter((q) => selected.includes(q.id) && (module === 'all' || String(q.module) === module)).slice(0, count);
    if (!chosen.length) { notify('Select at least one question', 'err'); return; }
    setPaper(chosen); setAnswers({}); setFlags({}); setIndex(0); setSecondsLeft(durationSeconds); setSaved(false); setPhase('running');
  };
  const submit = () => setPhase('submitted');
  const save = () => {
    saveExamAttempt({
      module, durationMinutes: duration, elapsedSeconds: durationSeconds - secondsLeft,
      questionCount: paper.length, answeredCount: answered, flaggedCount: flagged, totalWords,
      responses: paper.map((q) => ({ questionId: q.id, title: q.title, wordCount: wordCount(answers[q.id]), answer: answers[q.id] || '' })),
      timedOut: secondsLeft === 0,
    });
    setSaved(true); notify('Exam report saved');
  };
  const reset = () => { setPhase('setup'); setPaper([]); setAnswers({}); setFlags({}); setIndex(0); setSaved(false); };

  if (phase === 'setup') return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-8 sm:py-10">
      <p className="eyebrow">Exam conditions · written-answer practice</p>
      <h1 className="mt-1 text-3xl font-bold tracking-tight">VTU Exam Simulator</h1>
      <p className="mt-2 max-w-2xl text-mute">Create a timed written-answer paper from the BCV755B questions currently available in this app. Write answers, move between questions and review your attempt when you submit.</p>
      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <div className="card p-4"><p className="text-xs text-mute">Available questions</p><p className="mt-1 text-2xl font-bold">10</p></div>
        <div className="card p-4"><p className="text-xs text-mute">Previous exam attempts</p><p className="mt-1 text-2xl font-bold">{examAttempts.length}</p></div>
        <div className="card p-4"><p className="text-xs text-mute">Question format</p><p className="mt-1 text-lg font-bold">10-mark answers</p></div>
      </div>
      <section className="card mt-5 p-5">
        <h2 className="flex items-center gap-2 font-semibold"><ClipboardList size={18} className="text-brand"/>Paper settings</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <label className="text-sm font-semibold">Module<select value={module} onChange={(e) => { setModule(e.target.value); setSelected(QUESTIONS.filter((q) => e.target.value === 'all' || String(q.module) === e.target.value).map((q) => q.id)); }} className="mt-2 h-11 w-full rounded-xl border border-line bg-panel px-3 font-normal"><option value="all">All modules</option>{[3,4,5].map((m) => <option key={m} value={m}>Module {m} · {MODULES[m].name}</option>)}</select></label>
          <label className="text-sm font-semibold">Time limit<select value={duration} onChange={(e) => setDuration(Number(e.target.value))} className="mt-2 h-11 w-full rounded-xl border border-line bg-panel px-3 font-normal"><option value={30}>30 minutes</option><option value={60}>60 minutes</option><option value={90}>90 minutes</option><option value={120}>120 minutes</option></select></label>
          <label className="text-sm font-semibold">Questions in paper<select value={count} onChange={(e) => { const next = Number(e.target.value); setCount(next); setSelected((old) => old.slice(0, next)); }} className="mt-2 h-11 w-full rounded-xl border border-line bg-panel px-3 font-normal">{[1,2,3,4,5,6,7,8,9,10].map((n) => <option key={n} value={n}>{n} question{n>1?'s':''}</option>)}</select></label>
        </div>
        <div className="mt-5 flex items-center justify-between gap-3"><h3 className="text-sm font-semibold">Choose questions</h3><span className="text-xs text-mute">{selected.filter((id) => pool.some((q) => q.id === id)).length} selected · maximum {count}</span></div>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {pool.map((q) => <label key={q.id} className="flex cursor-pointer items-start gap-3 rounded-xl border border-line p-3 text-sm hover:bg-sunk"><input type="checkbox" checked={selected.includes(q.id)} disabled={!selected.includes(q.id) && selected.filter((id) => pool.some((item) => item.id === id)).length >= count} onChange={() => toggleQuestion(q.id)} className="mt-1 h-4 w-4 accent-[rgb(var(--c-brand))] disabled:cursor-not-allowed disabled:opacity-40"/><span className="min-w-0 flex-1"><span className="flex flex-wrap items-center gap-2"><b>{q.code} · {q.title}</b><ModuleBadge m={q.module}/></span><span className="mt-1 block text-xs text-mute">{q.question}</span></span></label>)}
        </div>
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4"><p className="text-xs text-mute">The selected question count is capped at {count}. You can change the selection before starting.</p><button onClick={startExam} disabled={!selected.some((id) => pool.some((q) => q.id === id))} className="btn-primary">Start examination <ArrowRight size={16}/></button></div>
      </section>
      <div className="mt-5 flex items-start gap-3 rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm"><ShieldAlert size={18} className="mt-0.5 shrink-0 text-amber-600"/><p className="text-mute">This is a practice simulator based on the 10 questions currently present in the app, not a complete official VTU question paper. Answers are not automatically graded and no official marks are predicted.</p></div>
      {examAttempts.length > 0 && <section className="card mt-5 p-5"><h2 className="font-semibold">Recent attempts</h2><div className="mt-3 space-y-2">{examAttempts.slice(0,5).map((attempt) => <div key={attempt.id} className="flex flex-wrap items-center justify-between gap-2 rounded-lg bg-sunk p-3 text-sm"><span>{new Date(attempt.at).toLocaleString()}</span><span className="text-mute">{attempt.answeredCount}/{attempt.questionCount} answered · {attempt.totalWords} words · {attempt.durationMinutes} min limit</span></div>)}</div></section>}
    </div>
  );

  if (phase === 'running' && current) return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-8 sm:py-8">
      <div className="flex flex-wrap items-center justify-between gap-3"><div><p className="eyebrow">BCV755B · Written examination</p><h1 className="text-2xl font-bold">VTU Exam Simulator</h1></div><div className={`flex items-center gap-2 rounded-xl border px-4 py-2 font-mono text-lg font-bold tabular-nums ${secondsLeft <= 300 ? 'border-red-500/50 text-red-500' : 'border-line'}`}><AlarmClock size={18}/>{formatTime(secondsLeft)}</div></div>
      <div className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1fr)_260px]">
        <section className="card p-5 sm:p-7">
          <div className="flex flex-wrap items-center justify-between gap-2"><span className="chip">Question {index+1} of {paper.length}</span><div className="flex items-center gap-2"><ModuleBadge m={current.module}/><span className="chip">10 Marks</span></div></div>
          <h2 className="mt-5 text-xl font-bold leading-relaxed">{current.code} · {current.title}</h2><p className="mt-3 leading-relaxed text-mute">{current.question}</p>
          <label htmlFor="exam-answer" className="mt-6 block text-sm font-semibold">Write your answer</label>
          <textarea id="exam-answer" value={answers[current.id] || ''} onChange={(e) => setAnswers((old) => ({...old,[current.id]:e.target.value}))} rows={16} maxLength={20000} placeholder="Write your complete 10-mark answer here. You may use headings, numbered points and examples…" className="mt-2 w-full rounded-xl border border-line bg-sunk p-4 text-sm leading-relaxed outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"/>
          <div className="mt-2 flex flex-wrap justify-between gap-2 text-xs text-mute"><span>{wordCount(answers[current.id])} words · {String(answers[current.id] || '').length}/20,000 characters</span><span>Draft is kept while this exam page remains open</span></div>
          <div className="mt-5 flex flex-wrap items-center justify-between gap-2"><button onClick={() => setFlags((old) => ({...old,[current.id]:!old[current.id]}))} className={flags[current.id] ? 'btn border border-amber-500/40 bg-amber-500/10 text-amber-600' : 'btn-ghost'}><Flag size={16}/>{flags[current.id] ? 'Marked for review' : 'Mark for review'}</button><div className="flex gap-2"><button onClick={() => setIndex((i) => Math.max(0,i-1))} disabled={index===0} className="btn-ghost"><ArrowLeft size={16}/>Previous</button><button onClick={() => setIndex((i) => Math.min(paper.length-1,i+1))} disabled={index===paper.length-1} className="btn-primary">Next<ArrowRight size={16}/></button></div></div>
        </section>
        <aside className="card h-fit p-4"><h2 className="font-semibold">Question paper</h2><div className="mt-3 grid grid-cols-5 gap-2">{paper.map((q,i) => <button key={q.id} onClick={() => setIndex(i)} aria-label={`Go to question ${i+1}`} className={`relative grid h-10 place-items-center rounded-lg border text-sm font-semibold ${index===i?'border-brand bg-brand text-white':wordCount(answers[q.id])?'border-brand/40 bg-brand/10 text-brand':'border-line bg-panel'}`}>{i+1}{flags[q.id]&&<span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-amber-500"/>}</button>)}</div><div className="mt-4 space-y-2 text-xs text-mute"><p className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-sm bg-brand"/>Current / answered</p><p className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-sm border border-line"/>Not answered</p><p className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-amber-500"/>Flagged</p></div><div className="mt-4 border-t border-line pt-4 text-sm"><div className="flex justify-between"><span className="text-mute">Answered</span><b>{answered}/{paper.length}</b></div><div className="mt-2 flex justify-between"><span className="text-mute">Flagged</span><b>{flagged}</b></div></div><button onClick={submit} className="btn-primary mt-5 w-full justify-center"><Send size={16}/>Submit paper</button></aside>
      </div>
      <p className="mt-4 text-center text-xs text-mute">Do not close or refresh this page before submitting. The timer automatically submits when it reaches zero.</p>
    </div>
  );

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-8 sm:py-10">
      <p className="eyebrow">Attempt submitted</p><h1 className="mt-1 text-3xl font-bold">Exam report</h1><p className="mt-2 text-mute">Your written answers are ready for manual review. This report measures completion, not answer correctness.</p>
      <section className="card mt-6 p-5"><div className="grid gap-3 sm:grid-cols-4"><div className="rounded-xl bg-sunk p-3"><p className="text-xs text-mute">Answered</p><p className="mt-1 text-2xl font-bold">{answered}/{paper.length}</p></div><div className="rounded-xl bg-sunk p-3"><p className="text-xs text-mute">Unanswered</p><p className="mt-1 text-2xl font-bold">{paper.length-answered}</p></div><div className="rounded-xl bg-sunk p-3"><p className="text-xs text-mute">Words written</p><p className="mt-1 text-2xl font-bold">{totalWords}</p></div><div className="rounded-xl bg-sunk p-3"><p className="text-xs text-mute">Flagged</p><p className="mt-1 text-2xl font-bold">{flagged}</p></div></div>
        <div className="mt-5 space-y-3">{paper.map((q,i) => <div key={q.id} className="rounded-xl border border-line p-4"><div className="flex flex-wrap items-center justify-between gap-2"><b>{q.code} · {q.title}</b><span className="text-xs text-mute">{wordCount(answers[q.id])} words {flags[q.id]?'· Flagged':''}</span></div><p className="mt-2 text-sm text-mute">{q.question}</p><details className="mt-3"><summary className="cursor-pointer text-sm font-semibold text-brand">Review my written answer</summary><p className="mt-2 whitespace-pre-wrap rounded-lg bg-sunk p-3 text-sm leading-relaxed">{answers[q.id] || 'No answer submitted.'}</p></details></div>)}</div>
        <div className="mt-5 flex flex-wrap gap-2"><button onClick={save} disabled={saved} className="btn-primary"><Save size={16}/>{saved?'Report saved':'Save exam report'}</button><button onClick={reset} className="btn-ghost"><RotateCcw size={16}/>Create another paper</button></div>
      </section>
      <div className="mt-4 flex items-start gap-2 text-xs text-mute"><CheckCircle2 size={15} className="mt-0.5 shrink-0 text-brand"/>Your report and written responses are stored in this browser only after you select Save exam report. The simulator does not auto-grade long answers.</div>
    </div>
  );
}

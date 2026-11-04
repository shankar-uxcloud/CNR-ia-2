import { useMemo, useState } from 'react';
import { BookOpenCheck, CheckCircle2, Dices, Eye, RotateCcw, Save } from 'lucide-react';
import { QUESTIONS, MODULES } from '../data/questions';
import { diagramsOf } from '../lib/content';
import { useStudy } from '../lib/study';
import { ModuleBadge } from '../components/ui';

export default function Practice() {
  const { practiceAttempts = {}, savePracticeAttempt, notify } = useStudy();
  const [module, setModule] = useState('all');
  const [questionId, setQuestionId] = useState(QUESTIONS[0].id);
  const [revealed, setRevealed] = useState(false);
  const [checks, setChecks] = useState({});
  const [saved, setSaved] = useState(false);
  const available = useMemo(() => QUESTIONS.filter((q) => module === 'all' || String(q.module) === module), [module]);
  const question = available.find((q) => q.id === questionId) || available[0];
  const diagrams = question ? diagramsOf(question.answer).length : 0;
  const checklist = question ? [
    ...question.answer.sections.map((s) => s.title.replace(/^\d+\.\s*/, '')),
    ...(diagrams ? [`Draw and label the relevant diagram(s) (${diagrams})`] : []),
  ] : [];
  const score = checklist.filter((_, i) => checks[i]).length;
  const attempts = Object.values(practiceAttempts);

  const resetAttempt = (id) => { setQuestionId(id); setRevealed(false); setChecks({}); setSaved(false); };
  const chooseRandom = () => {
    const pool = available.filter((q) => q.id !== question?.id);
    const list = pool.length ? pool : available;
    if (list.length) resetAttempt(list[Math.floor(Math.random() * list.length)].id);
  };
  const selectModule = (value) => {
    setModule(value);
    const pool = QUESTIONS.filter((q) => value === 'all' || String(q.module) === value);
    if (pool.length) resetAttempt(pool[0].id);
  };

  if (!question) return null;
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-8 sm:py-10">
      <p className="eyebrow">Active recall · self-assessment</p>
      <h1 className="mt-1 text-3xl font-bold tracking-tight">Practice Centre</h1>
      <p className="mt-2 max-w-2xl text-mute">Choose a 10-mark question, write your answer on paper without looking, then reveal the outline and assess what you covered. This is self-assessment, not automatic marking.</p>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <div className="card p-4"><p className="text-xs text-mute">Questions attempted</p><p className="mt-1 text-2xl font-bold tabular-nums">{Object.keys(practiceAttempts).length}<span className="text-sm font-medium text-mute"> / 10</span></p></div>
        <div className="card p-4"><p className="text-xs text-mute">Practice sessions</p><p className="mt-1 text-2xl font-bold tabular-nums">{attempts.reduce((n, a) => n + (a.attempts || 0), 0)}</p></div>
        <div className="card p-4"><p className="text-xs text-mute">Last saved assessment</p><p className="mt-1 text-lg font-bold tabular-nums">{attempts.length ? new Date(Math.max(...attempts.map((a) => a.at))).toLocaleDateString() : 'Not yet'}</p></div>
      </div>

      <section className="card mt-6 p-5">
        <div className="grid gap-4 sm:grid-cols-[1fr_1.5fr_auto] sm:items-end">
          <label className="block text-sm font-semibold">Module
            <select value={module} onChange={(e) => selectModule(e.target.value)} className="mt-2 h-11 w-full rounded-xl border border-line bg-panel px-3 font-normal">
              <option value="all">All modules</option><option value="3">Module 3 · {MODULES[3].name}</option><option value="4">Module 4 · {MODULES[4].name}</option><option value="5">Module 5 · {MODULES[5].name}</option>
            </select>
          </label>
          <label className="block text-sm font-semibold">Question
            <select value={question.id} onChange={(e) => resetAttempt(e.target.value)} className="mt-2 h-11 w-full rounded-xl border border-line bg-panel px-3 font-normal">
              {available.map((q) => <option key={q.id} value={q.id}>{q.code} · {q.title}</option>)}
            </select>
          </label>
          <button onClick={chooseRandom} className="btn-primary h-11"><Dices size={17} />Random</button>
        </div>
        <div className="mt-5 border-t border-line pt-5">
          <div className="flex flex-wrap items-center gap-2"><ModuleBadge m={question.module} /><span className="chip">10 Marks</span><span className="chip">{checklist.length} preparation points</span></div>
          <h2 className="mt-3 text-xl font-bold">{question.code} · {question.title}</h2>
          <p className="mt-2 leading-relaxed text-mute">{question.question}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            <a href={`#/q/${question.id}`} className="btn-ghost"><BookOpenCheck size={16} />Open full answer</a>
            {!revealed && <button onClick={() => setRevealed(true)} className="btn-primary"><Eye size={16} />I have attempted — reveal outline</button>}
            {revealed && <button onClick={() => { setRevealed(false); setChecks({}); setSaved(false); }} className="btn-ghost"><RotateCcw size={16} />Try again</button>}
          </div>
        </div>
      </section>

      {revealed && <section className="card mt-5 p-5 animate-rise">
        <div className="flex flex-wrap items-center justify-between gap-2"><div><h2 className="font-semibold">Self-assessment outline</h2><p className="mt-1 text-sm text-mute">Tick only the elements you actually included in your written answer.</p></div><span className="rounded-lg bg-brand/10 px-3 py-2 text-sm font-bold tabular-nums text-brand">{score}/{checklist.length} covered</span></div>
        <div className="mt-4 space-y-2">
          {checklist.map((item, i) => <label key={i} className="flex cursor-pointer items-start gap-3 rounded-xl border border-line p-3 text-sm hover:bg-sunk"><input type="checkbox" checked={!!checks[i]} onChange={() => setChecks((s) => ({ ...s, [i]: !s[i] }))} className="mt-0.5 h-4 w-4 accent-[rgb(var(--c-brand))]" /><span>{item}</span></label>)}
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-mute">This checklist measures topic coverage only; it does not assign VTU marks.</p>
          <button disabled={saved} onClick={() => { savePracticeAttempt(question.id, score, checklist.length); setSaved(true); notify('Practice assessment saved'); }} className="btn-primary"><Save size={16} />{saved ? 'Assessment saved' : 'Save self-assessment'}</button>
        </div>
      </section>}
      <div className="mt-6 flex items-center gap-2 text-sm text-mute"><CheckCircle2 size={16} className="text-brand" />Practice history is stored locally in this browser.</div>
    </div>
  );
}
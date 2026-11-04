import { useMemo, useState } from 'react';
import { Award, ChevronLeft, ChevronRight, RotateCcw, Save, Shuffle } from 'lucide-react';
import { QUESTIONS } from '../data/questions';
import { useStudy } from '../lib/study';
import { ModuleBadge } from '../components/ui';

function makeQuestions(pool) {
  return pool.flatMap((q) => {
    const words = [...new Set((q.answer.keywords || []).map(String).filter((k) => k.trim().length > 2))];
    if (words.length < 4) return [];
    const answer = words[0];
    const options = [answer, ...words.slice(1, 4)];
    return [{ id: q.id + '-kw', sourceId: q.id, module: q.module, title: q.title, prompt: `Which of these is a listed keyword for ${q.code} · ${q.title}?`, options, answer, explanation: `“${answer}” is listed in the existing answer record's keywords for this question.` }];
  });
}

export default function Quiz() {
  const { quizAttempts = [], saveQuizAttempt, notify } = useStudy();
  const [module, setModule] = useState('all');
  const [questions, setQuestions] = useState(() => makeQuestions(QUESTIONS));
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [finished, setFinished] = useState(false);
  const [saved, setSaved] = useState(false);
  const pool = useMemo(() => QUESTIONS.filter(q => module === 'all' || String(q.module) === module), [module]);
  const bank = useMemo(() => makeQuestions(pool), [pool]);
  const current = questions[index];
  const score = questions.filter(q => answers[q.id] === q.answer).length;
  const incorrect = questions.filter(q => answers[q.id] && answers[q.id] !== q.answer);
  const start = (random = false, retry = false) => {
    let next = retry ? makeQuestions(QUESTIONS.filter(q => incorrect.some(x => x.sourceId === q.id))) : [...bank];
    if (random) next = next.sort(() => Math.random() - 0.5);
    setQuestions(next); setIndex(0); setAnswers({}); setFinished(false); setSaved(false);
  };
  if (!current && !finished) return <div className="mx-auto max-w-3xl px-4 py-10"><div className="card p-6"><h1 className="text-2xl font-bold">Quiz Centre</h1><p className="mt-2 text-mute">No quiz items are available for this selection.</p></div></div>;
  return <div className="mx-auto max-w-4xl px-4 py-8 sm:px-8 sm:py-10">
    <p className="eyebrow">Active recall · knowledge check</p><h1 className="mt-1 text-3xl font-bold tracking-tight">Quiz Centre</h1>
    <p className="mt-2 max-w-2xl text-mute">This practice quiz uses only the keywords explicitly listed in the existing answer records. These are generated study checks, not official VTU questions or automatic evaluation of 10-mark answers.</p>
    <div className="mt-6 grid gap-3 sm:grid-cols-[1fr_auto_auto] sm:items-end">
      <label className="text-sm font-semibold">Module<select value={module} onChange={e=>setModule(e.target.value)} className="mt-2 h-11 w-full rounded-xl border border-line bg-panel px-3 font-normal"><option value="all">All modules</option><option value="3">Module 3</option><option value="4">Module 4</option><option value="5">Module 5</option></select></label>
      <button onClick={()=>start(false)} className="btn-primary h-11"><RotateCcw size={16}/>Start quiz</button>
      <button onClick={()=>start(true)} className="btn-ghost h-11"><Shuffle size={16}/>Shuffle</button>
    </div>
    <div className="mt-5 grid gap-3 sm:grid-cols-3">
      <div className="card p-4"><p className="text-xs text-mute">Saved quiz attempts</p><p className="mt-1 text-2xl font-bold">{quizAttempts.length}</p></div>
      <div className="card p-4"><p className="text-xs text-mute">Latest score</p><p className="mt-1 text-2xl font-bold">{quizAttempts[0] ? quizAttempts[0].score+'/'+quizAttempts[0].total : '—'}</p></div>
      <div className="card p-4"><p className="text-xs text-mute">Questions in this quiz</p><p className="mt-1 text-2xl font-bold">{bank.length}</p></div>
    </div>
    {finished ? <section className="card mt-6 p-6"><Award size={28} className="text-brand"/><h2 className="mt-2 text-2xl font-bold">Quiz completed</h2><p className="mt-1 text-mute">Score: {score}/{questions.length} · {Math.round(score/questions.length*100)}%. This score applies only to this keyword exercise.</p>
      <div className="mt-5 flex flex-wrap gap-2"><button disabled={saved} onClick={()=>{saveQuizAttempt({score,total:questions.length,module});setSaved(true);notify('Quiz result saved');}} className="btn-primary"><Save size={16}/>{saved?'Saved':'Save result'}</button><button onClick={()=>start(false)} className="btn-ghost">Retake</button>{incorrect.length>0&&<button onClick={()=>start(false,true)} className="btn-ghost">Retry incorrect ({incorrect.length})</button>}</div>
      <div className="mt-5 space-y-2">{questions.map((q,i)=><div key={q.id} className="rounded-xl border border-line p-3 text-sm"><b>{i+1}. {q.prompt}</b><p className="mt-1 text-mute">Selected: {answers[q.id]||'No answer'} · Correct: {q.answer}</p><p className="mt-1">{q.explanation}</p></div>)}</div></section>
    : <section className="card mt-6 p-5 sm:p-6"><div className="flex items-center justify-between"><span className="chip">Question {index+1} of {questions.length}</span><ModuleBadge m={current.module}/></div><div className="mt-3 h-2 overflow-hidden rounded-full bg-sunk"><div className="h-full bg-brand" style={{width:((index+1)/questions.length*100)+'%'}}/></div>
      <h2 className="mt-6 text-xl font-bold">{current.prompt}</h2><div className="mt-5 grid gap-2">{current.options.map((op,i)=><button key={op} disabled={!!answers[current.id]} onClick={()=>setAnswers(s=>({...s,[current.id]:op}))} className={'rounded-xl border p-4 text-left text-sm '+(answers[current.id]===op?'border-brand bg-brand/10':'border-line bg-panel hover:bg-sunk')}><span className="mr-3 inline-grid h-6 w-6 place-items-center rounded-full bg-sunk text-xs font-bold">{String.fromCharCode(65+i)}</span>{op}</button>)}</div>
      {answers[current.id]&&<div className={'mt-4 rounded-xl p-4 text-sm '+(answers[current.id]===current.answer?'bg-brand/10':'bg-amber-500/10')}><b>{answers[current.id]===current.answer?'Correct':'Correct answer: '+current.answer}</b><p className="mt-1 text-mute">{current.explanation}</p></div>}
      <div className="mt-5 flex justify-between"><button onClick={()=>setIndex(i=>Math.max(0,i-1))} disabled={index===0} className="btn-ghost"><ChevronLeft size={16}/>Previous</button><button onClick={()=>index===questions.length-1?setFinished(true):setIndex(i=>i+1)} disabled={!answers[current.id]} className="btn-primary">{index===questions.length-1?'Finish':'Next'}<ChevronRight size={16}/></button></div>
    </section>}
  </div>;
}
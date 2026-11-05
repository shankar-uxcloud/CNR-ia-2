import { useMemo, useState } from 'react';
import { BookOpenCheck, CheckCircle2, Dices, Eye, RotateCcw, Save, ClipboardCheck, Sparkles, AlertCircle, Check, X } from 'lucide-react';
import { QUESTIONS, MODULES } from '../data/questions';
import { diagramsOf } from '../lib/content';
import { useStudy } from '../lib/study';
import { ModuleBadge } from '../components/ui';

const clean = (value) => String(value || '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
const blockText = (block) => [
  block.text, ...(block.items || []), ...(block.lines || []),
  ...(block.rows || []).flat().map(String), ...(block.head || []),
].filter(Boolean).join(' ');

function evaluateAnswer(question, response) {
  const answer = clean(response);
  const words = answer.split(/\s+/).filter(Boolean);
  const keywords = [...new Set((question.answer.keywords || []).filter(Boolean))];
  const matched = keywords.filter((term) => answer.includes(clean(term)));
  const missing = keywords.filter((term) => !answer.includes(clean(term)));
  const sections = question.answer.sections || [];
  const sectionResults = sections.map((section) => {
    const source = clean([section.title, ...(section.blocks || []).map(blockText)].join(' '));
    const relevant = keywords.filter((term) => source.includes(clean(term)));
    const hits = relevant.filter((term) => answer.includes(clean(term)));
    const titleWords = clean(section.title).split(' ').filter((word) => word.length > 3);
    const titleHit = titleWords.some((word) => answer.includes(word));
    return { title: section.title, covered: relevant.length ? hits.length >= Math.min(2, relevant.length) : titleHit, hits: hits.slice(0, 4) };
  });
  const keywordScore = keywords.length ? matched.length / keywords.length : 0;
  const sectionScore = sections.length ? sectionResults.filter((item) => item.covered).length / sections.length : 0;
  const score = Math.round((keywordScore * 70) + (sectionScore * 30));
  const suggestions = [];
  if (words.length < 80) suggestions.push('Your response is quite short for a 10-mark answer. Add explanations and supporting points.');
  if (missing.length) suggestions.push(`Review these important terms: ${missing.slice(0, 6).join(', ')}.`);
  if (sectionResults.some((item) => !item.covered)) suggestions.push('Check the uncovered answer sections and add the relevant explanations.');
  if (words.length >= 80 && score >= 75) suggestions.push('Good topic coverage. Now check accuracy, logical order, examples and presentation.');
  return { score, wordCount: words.length, matched, missing, sectionResults, suggestions };
}

export default function Practice() {
  const { practiceAttempts = {}, savePracticeAttempt, evaluationAttempts = [], saveEvaluationAttempt, notify } = useStudy();
  const [module, setModule] = useState('all');
  const [questionId, setQuestionId] = useState(QUESTIONS[0].id);
  const [revealed, setRevealed] = useState(false);
  const [checks, setChecks] = useState({});
  const [saved, setSaved] = useState(false);
  const [response, setResponse] = useState('');
  const [evaluation, setEvaluation] = useState(null);
  const [evaluationSaved, setEvaluationSaved] = useState(false);
  const available = useMemo(() => QUESTIONS.filter((q) => module === 'all' || String(q.module) === module), [module]);
  const question = available.find((q) => q.id === questionId) || available[0];
  const diagrams = question ? diagramsOf(question.answer).length : 0;
  const checklist = question ? [
    ...question.answer.sections.map((s) => s.title.replace(/^\d+\.\s*/, '')),
    ...(diagrams ? [`Draw and label the relevant diagram(s) (${diagrams})`] : []),
  ] : [];
  const score = checklist.filter((_, i) => checks[i]).length;
  const attempts = Object.values(practiceAttempts);
  const resetAttempt = (id) => { setQuestionId(id); setRevealed(false); setChecks({}); setSaved(false); setResponse(''); setEvaluation(null); setEvaluationSaved(false); };
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
  const runEvaluation = () => {
    if (response.trim().split(/\s+/).length < 20) { notify('Write at least 20 words before evaluating', 'err'); return; }
    setEvaluation(evaluateAnswer(question, response));
    setEvaluationSaved(false);
  };
  const saveEvaluation = () => {
    if (!evaluation) return;
    saveEvaluationAttempt({ questionId: question.id, questionTitle: question.title, score: evaluation.score, wordCount: evaluation.wordCount, matchedCount: evaluation.matched.length, keywordCount: evaluation.matched.length + evaluation.missing.length });
    setEvaluationSaved(true);
    notify('Answer evaluation saved');
  };

  if (!question) return null;
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-8 sm:py-10">
      <p className="eyebrow">Active recall · answer feedback</p>
      <h1 className="mt-1 text-3xl font-bold tracking-tight">Practice Centre</h1>
      <p className="mt-2 max-w-2xl text-mute">Write your answer below to receive instant, source-based feedback on keyword and topic coverage. This is a local checklist-style evaluator, not AI grading or an official VTU marks prediction.</p>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <div className="card p-4"><p className="text-xs text-mute">Questions attempted</p><p className="mt-1 text-2xl font-bold tabular-nums">{Object.keys(practiceAttempts).length}<span className="text-sm font-medium text-mute"> / 10</span></p></div>
        <div className="card p-4"><p className="text-xs text-mute">Practice sessions</p><p className="mt-1 text-2xl font-bold tabular-nums">{attempts.reduce((n, a) => n + (a.attempts || 0), 0)}</p></div>
        <div className="card p-4"><p className="text-xs text-mute">Evaluations saved</p><p className="mt-1 text-2xl font-bold tabular-nums">{evaluationAttempts.length}</p></div>
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
            {!revealed && <button onClick={() => setRevealed(true)} className="btn-primary"><Eye size={16} />Reveal self-assessment checklist</button>}
            {revealed && <button onClick={() => { setRevealed(false); setChecks({}); setSaved(false); }} className="btn-ghost"><RotateCcw size={16} />Reset checklist</button>}
          </div>
        </div>
      </section>

      <section className="card mt-5 p-5">
        <div className="flex items-center gap-2"><Sparkles size={19} className="text-brand" /><h2 className="font-semibold">Smart Answer Evaluation</h2></div>
        <p className="mt-1 text-sm text-mute">Paste or type the answer you wrote. The evaluator compares it with the selected question's model-answer keywords and sections.</p>
        <label className="mt-4 block text-sm font-semibold" htmlFor="written-answer">Your written answer</label>
        <textarea id="written-answer" value={response} onChange={(e) => { setResponse(e.target.value); setEvaluation(null); setEvaluationSaved(false); }} rows={10} maxLength={12000} placeholder="Write your answer here. Include definitions, key points, explanations and examples…" className="mt-2 w-full rounded-xl border border-line bg-sunk p-4 text-sm leading-relaxed outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20" />
        <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-xs text-mute"><span>{response.trim() ? response.trim().split(/\s+/).length : 0} words · 12,000 character limit</span><span>Minimum 20 words</span></div>
        <div className="mt-4 flex flex-wrap gap-2">
          <button onClick={runEvaluation} disabled={response.trim().split(/\s+/).filter(Boolean).length < 20} className="btn-primary"><ClipboardCheck size={16} />Evaluate my answer</button>
          <button onClick={() => { setResponse(''); setEvaluation(null); setEvaluationSaved(false); }} className="btn-ghost"><RotateCcw size={16} />Clear</button>
        </div>
      </section>

      {evaluation && <section className="card mt-5 p-5 animate-rise" aria-live="polite">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div><p className="eyebrow">Coverage indicator · not exam marks</p><h2 className="mt-1 text-xl font-bold">Your answer feedback</h2></div>
          <div className="rounded-xl bg-brand/10 px-4 py-3 text-center"><p className="text-2xl font-bold tabular-nums text-brand">{evaluation.score}%</p><p className="text-xs text-mute">coverage estimate</p></div>
        </div>
        <div className="mt-4 h-2 overflow-hidden rounded-full bg-sunk"><div className="h-full rounded-full bg-brand transition-all" style={{ width: `${evaluation.score}%` }} /></div>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-line p-3"><p className="text-xs text-mute">Word count</p><p className="mt-1 text-xl font-bold">{evaluation.wordCount}</p></div>
          <div className="rounded-xl border border-line p-3"><p className="text-xs text-mute">Keywords found</p><p className="mt-1 text-xl font-bold">{evaluation.matched.length}/{evaluation.matched.length + evaluation.missing.length}</p></div>
          <div className="rounded-xl border border-line p-3"><p className="text-xs text-mute">Sections covered</p><p className="mt-1 text-xl font-bold">{evaluation.sectionResults.filter((s) => s.covered).length}/{evaluation.sectionResults.length}</p></div>
        </div>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <div><h3 className="flex items-center gap-2 text-sm font-semibold"><Check size={16} className="text-brand" />Detected keywords</h3><div className="mt-2 flex flex-wrap gap-2">{evaluation.matched.length ? evaluation.matched.map((word) => <span key={word} className="chip">{word}</span>) : <p className="text-sm text-mute">No model-answer keywords detected yet.</p>}</div></div>
          <div><h3 className="flex items-center gap-2 text-sm font-semibold"><X size={16} className="text-orange-500" />Keywords to review</h3><div className="mt-2 flex flex-wrap gap-2">{evaluation.missing.length ? evaluation.missing.slice(0, 12).map((word) => <span key={word} className="chip">{word}</span>) : <p className="text-sm text-mute">All listed keywords were detected.</p>}</div></div>
        </div>
        <div className="mt-5"><h3 className="text-sm font-semibold">Topic coverage</h3><div className="mt-2 space-y-2">{evaluation.sectionResults.map((item) => <div key={item.title} className="flex items-start gap-2 text-sm"><span className={item.covered ? 'text-brand' : 'text-orange-500'}>{item.covered ? <CheckCircle2 size={16}/> : <AlertCircle size={16}/>}</span><span>{item.title}</span><span className="ml-auto text-xs text-mute">{item.covered ? 'Detected' : 'Review'}</span></div>)}</div></div>
        {evaluation.suggestions.length > 0 && <div className="mt-5 rounded-xl bg-sunk p-4"><h3 className="text-sm font-semibold">Suggestions</h3><ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-mute">{evaluation.suggestions.map((tip) => <li key={tip}>{tip}</li>)}</ul></div>}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3"><p className="text-xs text-mute">This score checks text overlap and section coverage only. It cannot judge factual correctness, handwriting, diagram quality or award VTU marks.</p><button onClick={saveEvaluation} disabled={evaluationSaved} className="btn-primary"><Save size={16}/>{evaluationSaved ? 'Evaluation saved' : 'Save evaluation'}</button></div>
      </section>}

      {revealed && <section className="card mt-5 p-5 animate-rise">
        <div className="flex flex-wrap items-center justify-between gap-2"><div><h2 className="font-semibold">Self-assessment checklist</h2><p className="mt-1 text-sm text-mute">Tick only the elements you actually included in your written answer.</p></div><span className="rounded-lg bg-brand/10 px-3 py-2 text-sm font-bold tabular-nums text-brand">{score}/{checklist.length} covered</span></div>
        <div className="mt-4 space-y-2">
          {checklist.map((item, i) => <label key={i} className="flex cursor-pointer items-start gap-3 rounded-xl border border-line p-3 text-sm hover:bg-sunk"><input type="checkbox" checked={!!checks[i]} onChange={() => setChecks((s) => ({ ...s, [i]: !s[i] }))} className="mt-0.5 h-4 w-4 accent-[rgb(var(--c-brand))]" /><span>{item}</span></label>)}
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-mute">This checklist measures topic coverage only; it does not assign VTU marks.</p>
          <button disabled={saved} onClick={() => { savePracticeAttempt(question.id, score, checklist.length); setSaved(true); notify('Practice assessment saved'); }} className="btn-primary"><Save size={16} />{saved ? 'Assessment saved' : 'Save self-assessment'}</button>
        </div>
      </section>}
      <div className="mt-6 flex items-center gap-2 text-sm text-mute"><CheckCircle2 size={16} className="text-brand" />Practice and evaluation history is stored locally in this browser.</div>
    </div>
  );
}

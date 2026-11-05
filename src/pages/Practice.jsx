import { useMemo, useState } from 'react';
import { BookOpenCheck, CheckCircle2, Dices, Eye, RotateCcw, Save, ClipboardCheck, Sparkles, AlertCircle, Check, X } from 'lucide-react';
import { QUESTIONS, MODULES } from '../data/questions';
import { diagramsOf } from '../lib/content';
import { useStudy } from '../lib/study';
import { ModuleBadge } from '../components/ui';

const clean = (value) => String(value || '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
const stem = (word) => {
  const w = clean(word);
  if (w.length > 5 && w.endsWith('ing')) return w.slice(0, -3);
  if (w.length > 4 && w.endsWith('ies')) return w.slice(0, -3) + 'y';
  if (w.length > 4 && w.endsWith('es')) return w.slice(0, -2);
  if (w.length > 3 && w.endsWith('s')) return w.slice(0, -1);
  return w;
};
const tokens = (value) => clean(value).split(/\s+/).filter((w) => w.length > 2).map(stem);
const blockText = (block) => [
  block.text, ...(block.items || []), ...(block.lines || []),
  ...(block.rows || []).flat().map(String), ...(block.head || []),
].filter(Boolean).join(' ');

const CONCEPT_GROUPS = {
  q01: [
    { name: 'Greenhouse mechanism', terms: ['sunlight', 'infrared', 'heat', 'absorbs', 're emits', 'atmosphere'], weight: 2 },
    { name: 'Major greenhouse gases', terms: ['carbon dioxide', 'methane', 'nitrous oxide', 'cfc'], weight: 2 },
    { name: 'Human drivers', terms: ['fossil fuel', 'combustion', 'deforestation', 'industry'], weight: 1 },
    { name: 'Indicators', terms: ['temperature', 'glacier', 'sea level', 'rainfall', 'ocean'], weight: 1 },
  ],
  q02: [
    { name: 'Climate and water impacts', terms: ['heatwave', 'rainfall', 'drought', 'flood', 'glacier', 'sea level'], weight: 2 },
    { name: 'Human impacts', terms: ['health', 'heat stress', 'disease', 'livelihood'], weight: 1 },
    { name: 'Agriculture and food', terms: ['crop', 'yield', 'agriculture', 'food security'], weight: 1 },
    { name: 'Ecosystem impacts', terms: ['biodiversity', 'habitat', 'coral', 'migration'], weight: 1 },
  ],
  q03: [
    { name: 'Biodiversity agreements', terms: ['convention on biological diversity', 'cbd', 'cites', 'ramsar'], weight: 2 },
    { name: 'Climate agreements', terms: ['paris agreement', 'kyoto protocol', 'unfccc'], weight: 2 },
    { name: 'International organisations', terms: ['unep', 'iucn', 'united nations'], weight: 1 },
    { name: 'Purpose and cooperation', terms: ['conservation', 'sustainable use', 'cooperation', 'emission'], weight: 1 },
  ],
  q04: [
    { name: 'EIA definition and purpose', terms: ['environmental impact assessment', 'predict', 'evaluate', 'project'], weight: 1 },
    { name: 'Early assessment and baseline', terms: ['screening', 'scoping', 'baseline', 'existing condition'], weight: 2 },
    { name: 'Impact and mitigation', terms: ['impact prediction', 'alternative', 'mitigation', 'management plan'], weight: 2 },
    { name: 'Review and follow-up', terms: ['public consultation', 'appraisal', 'clearance', 'monitoring'], weight: 2 },
  ],
  q05: [
    { name: 'Three levels of biodiversity', terms: ['genetic diversity', 'species diversity', 'ecosystem diversity'], weight: 2 },
    { name: 'Ecological value', terms: ['food chain', 'pollination', 'nutrient cycling', 'soil fertility'], weight: 1 },
    { name: 'Economic and genetic value', terms: ['medicines', 'fisheries', 'timber', 'genetic material', 'crop improvement'], weight: 1 },
    { name: 'Ethical, aesthetic and climate value', terms: ['cultural', 'aesthetic', 'recreation', 'climate regulation'], weight: 1 },
  ],
  q06: [
    { name: 'Habitat and exploitation threats', terms: ['habitat loss', 'fragmentation', 'overexploitation', 'poaching'], weight: 2 },
    { name: 'Pollution and invasive species', terms: ['pollution', 'pesticide', 'invasive species', 'native species'], weight: 1 },
    { name: 'Climate and natural disturbance', terms: ['climate change', 'flood', 'drought', 'disturbance'], weight: 1 },
    { name: 'Conservation responses', terms: ['protected area', 'restoration', 'sustainable', 'community', 'pollution control'], weight: 2 },
  ],
  q07: [
    { name: 'In-situ approach', terms: ['natural habitat', 'national park', 'wildlife sanctuary', 'biosphere reserve'], weight: 2 },
    { name: 'Ex-situ approach', terms: ['outside natural habitat', 'zoo', 'botanical garden', 'gene bank', 'cryopreservation'], weight: 2 },
    { name: 'Comparison', terms: ['on site', 'off site', 'ecosystem', 'complement'], weight: 1 },
  ],
  q08: [
    { name: 'Carbon and nitrogen cycles', terms: ['photosynthesis', 'respiration', 'nitrogen fixation', 'nitrification', 'denitrification'], weight: 2 },
    { name: 'Oxygen and phosphorus cycles', terms: ['oxygen', 'weathering', 'phosphate', 'sediment'], weight: 1 },
    { name: 'Water cycle', terms: ['evaporation', 'transpiration', 'condensation', 'precipitation', 'runoff', 'infiltration'], weight: 1 },
    { name: 'Ecological importance', terms: ['nutrient', 'soil fertility', 'productivity', 'ecological balance'], weight: 1 },
  ],
  q09: [
    { name: 'Electrostatic precipitator', terms: ['electrostatic', 'charged particles', 'collecting plates', 'hopper'], weight: 2 },
    { name: 'Baghouse filter', terms: ['fabric', 'filter bags', 'dust', 'pulse jet'], weight: 2 },
    { name: 'Cyclone separator', terms: ['centrifugal', 'tangential', 'rotating', 'outer wall'], weight: 2 },
    { name: 'Wet scrubber', terms: ['liquid', 'spray', 'absorb', 'scrubbing solution'], weight: 2 },
    { name: 'Applications / limitations', terms: ['fly ash', 'fine particles', 'wastewater', 'industrial'], weight: 1 },
  ],
  q10: [
    { name: 'Ozone depletion causes', terms: ['cfc', 'halons', 'chlorine', 'bromine', 'uv radiation'], weight: 2 },
    { name: 'Photochemical catalytic mechanism', terms: ['photodissociation', 'radical', 'catalytic', 'ozone', 'oxygen'], weight: 2 },
    { name: 'Effects', terms: ['uv b', 'skin cancer', 'cataract', 'phytoplankton', 'crop'], weight: 1 },
    { name: 'International controls', terms: ['montreal protocol', 'phase out', 'monitoring', 'alternatives'], weight: 1 },
  ],
};

function hasConcept(text, concept) {
  const sourceTokens = new Set(tokens(text));
  return concept.terms.some((term) => {
    const phrase = tokens(term);
    return phrase.length > 0 && phrase.every((part) => sourceTokens.has(part));
  });
}

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
  const groups = CONCEPT_GROUPS[question.id] || [];
  const conceptResults = groups.map((group) => ({
    name: group.name,
    covered: group.terms.some((term) => hasConcept(answer, term)),
    weight: group.weight,
  }));
  const conceptPoints = conceptResults.reduce((sum, item) => sum + (item.covered ? item.weight : 0), 0);
  const conceptTotal = conceptResults.reduce((sum, item) => sum + item.weight, 0);
  const sectionScore = sections.length ? sectionResults.filter((item) => item.covered).length / sections.length : 0;
  const keywordScore = keywords.length ? matched.length / keywords.length : 0;
  const conceptScore = conceptTotal ? conceptPoints / conceptTotal : 0;
  // Practice diagnostic only: concept-cue presence, structure and terminology overlap.
  const score = Math.round((conceptScore * 60) + (sectionScore * 25) + (keywordScore * 15));
  const suggestions = [];
  if (words.length < 80) suggestions.push('Your response is quite short for a 10-mark answer. Add explanations and supporting points.');
  if (conceptResults.some((item) => !item.covered)) suggestions.push('Strengthen the uncovered concepts below. Explain each one in your own words instead of only listing terms.');
  if (sectionResults.some((item) => !item.covered)) suggestions.push('Check the uncovered answer sections and add the relevant explanations.');
  if (missing.length) suggestions.push('Review these model-answer terms where relevant: ' + missing.slice(0, 6).join(', ') + '.');
  if (words.length >= 80 && conceptScore >= 0.8) suggestions.push('Most concept groups are represented. Recheck technical accuracy, logical order, examples and diagram labels against the model answer.');
  return { score, wordCount: words.length, matched, missing, sectionResults, conceptResults, suggestions, conceptScore: Math.round(conceptScore * 100) };
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
      <p className="mt-2 max-w-2xl text-mute">Write your answer below for a concept-group, section-coverage and terminology review against the selected source answer. It is a structured practice aid, not an AI fact-checker or official VTU evaluation.</p>

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
        <p className="mt-1 text-sm text-mute">The evaluator checks representative concept groups, model-answer sections and technical terms. It can flag missing coverage, but it does not reliably detect incorrect or contradictory claims.</p>
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
        {evaluation.conceptResults?.length > 0 && <div className="mt-5"><h3 className="text-sm font-semibold">Concept understanding checklist</h3><p className="mt-1 text-xs text-mute">A concept is marked present when one of its representative ideas appears in your answer. This does not verify whether your explanation is correct.</p><div className="mt-3 grid gap-2 sm:grid-cols-2">{evaluation.conceptResults.map((item) => <div key={item.name} className="flex items-start gap-2 rounded-xl border border-line p-3 text-sm"><span className={item.covered ? 'text-brand' : 'text-orange-500'}>{item.covered ? <CheckCircle2 size={16}/> : <AlertCircle size={16}/>}</span><span className="flex-1">{item.name}</span><span className="text-xs text-mute">{item.covered ? 'Present' : 'Add / explain'}</span></div>)}</div><p className="mt-3 text-xs text-mute">Concept-group coverage: {evaluation.conceptScore}% · This reflects selected concept-cue presence, not conceptual correctness.</p></div>}<div className="mt-5"><h3 className="text-sm font-semibold">Topic coverage</h3><div className="mt-2 space-y-2">{evaluation.sectionResults.map((item) => <div key={item.title} className="flex items-start gap-2 text-sm"><span className={item.covered ? 'text-brand' : 'text-orange-500'}>{item.covered ? <CheckCircle2 size={16}/> : <AlertCircle size={16}/>}</span><span>{item.title}</span><span className="ml-auto text-xs text-mute">{item.covered ? 'Detected' : 'Review'}</span></div>)}</div></div>
        {evaluation.suggestions.length > 0 && <div className="mt-5 rounded-xl bg-sunk p-4"><h3 className="text-sm font-semibold">Suggestions</h3><ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-mute">{evaluation.suggestions.map((tip) => <li key={tip}>{tip}</li>)}</ul></div>}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3"><p className="text-xs text-mute">This diagnostic checks representative concept cues, section coverage and terminology presence. It cannot reliably identify false or contradictory statements, judge explanation quality, handwriting or diagrams, or award/predict VTU marks.</p><button onClick={saveEvaluation} disabled={evaluationSaved} className="btn-primary"><Save size={16}/>{evaluationSaved ? 'Evaluation saved' : 'Save evaluation'}</button></div>
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

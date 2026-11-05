import { useMemo, useState } from 'react';
import { BookOpenCheck, CheckCircle2, Dices, Eye, RotateCcw, Save, ClipboardCheck, Sparkles, AlertCircle, Check, Copy, Trash2, History, ArrowUpRight, FileText } from 'lucide-react';
import { QUESTIONS, MODULES } from '../data/questions';
import { FIVE_MARK_ANSWERS } from '../data/fiveMarkAnswers';
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
const hasCue = (source, cue) => {
  const sourceTokens = new Set(tokens(source));
  const phrase = tokens(cue);
  return phrase.length > 0 && phrase.every((part) => sourceTokens.has(part));
};

function evaluateAnswer(question, response, mode) {
  const maxMarks = mode === 'five' ? 5 : 10;
  const sections = mode === 'five' ? (FIVE_MARK_ANSWERS[question.id] || []) : question.answer.sections;
  const responseClean = clean(response);
  const wordCount = response.trim().split(/\s+/).filter(Boolean).length;
  const keywordTerms = [...new Set((question.answer.keywords || []).filter(Boolean))];
  const matched = keywordTerms.filter((term) => hasCue(responseClean, term));
  const missing = keywordTerms.filter((term) => !hasCue(responseClean, term));
  const responseTokens = new Set(tokens(responseClean));
  const sectionResults = sections.map((section) => {
    const body = [section.title, ...(section.blocks || []).map(blockText)].join(' ');
    const cues = keywordTerms.filter((term) => clean(body).includes(clean(term)));
    const hits = cues.filter((term) => hasCue(responseClean, term));
    const titleHit = tokens(section.title).some((word) => responseTokens.has(word));
    return { id: section.id, title: section.title, covered: cues.length ? hits.length >= Math.min(2, cues.length) : titleHit, hits };
  });
  const conceptGroups = (CONCEPT_GROUPS[question.id] || []).map((group) => ({
    name: group.name, weight: group.weight, covered: group.terms.some((term) => hasCue(responseClean, term)),
  }));
  const conceptPoints = conceptGroups.reduce((sum, item) => sum + (item.covered ? item.weight : 0), 0);
  const conceptMax = conceptGroups.reduce((sum, item) => sum + item.weight, 0) || 1;
  const conceptRatio = conceptPoints / conceptMax;
  const sectionRatio = sections.length ? sectionResults.filter((x) => x.covered).length / sections.length : 0;
  const keywordRatio = keywordTerms.length ? matched.length / keywordTerms.length : 0;
  const referenceText = sections.flatMap((s) => [s.title, ...(s.blocks || []).map(blockText)]).join(' ');
  const expectsExamples = /example|e\.g\.|such as|for instance/i.test(referenceText);
  const examplePresent = expectsExamples && /\b(example|for example|such as|e\.g\.|bandipur|sundarbans|kaziranga|thar|western ghats|antarctica|neem|tulsi|turmeric|willow|cinchona|grass|deer|tiger)\b/i.test(response);
  const diagramCount = question.answer.sections.flatMap((s) => [...(s.blocks || []), ...(s.subsections || []).flatMap((x) => x.blocks || [])]).filter((b) => b.type === 'diagram').length;
  const diagramPresent = !diagramCount || /\b(diagram|figure|flowchart|sketch|drawn|labelled|labeled)\b/i.test(response);
  const depthTarget = maxMarks === 10 ? 180 : 85;
  const criteria = [
    { name: 'Concept coverage', ratio: conceptRatio, weight: 0.35 },
    { name: 'Technical terminology', ratio: keywordRatio, weight: 0.20 },
    { name: 'Answer structure', ratio: sectionRatio, weight: 0.20 },
    { name: 'Explanation depth', ratio: Math.min(1, wordCount / depthTarget), weight: 0.15 },
    { name: 'Relevant examples', ratio: expectsExamples ? (examplePresent ? 1 : 0) : 1, weight: 0.05 },
    { name: 'Diagram acknowledgement', ratio: diagramCount ? (diagramPresent ? 1 : 0) : 1, weight: 0.05 },
  ];
  const score = Math.max(0, Math.min(maxMarks, Math.round(criteria.reduce((sum, item) => sum + item.ratio * item.weight, 0) * maxMarks * 2) / 2));
  const strengths = [
    ...conceptGroups.filter((x) => x.covered).map((x) => 'Concept area present: ' + x.name),
    ...sectionResults.filter((x) => x.covered).slice(0, 3).map((x) => 'Section represented: ' + x.title),
  ];
  const missingConcepts = conceptGroups.filter((x) => !x.covered).map((x) => x.name);
  const suggestions = [];
  if (wordCount < depthTarget * 0.6) suggestions.push('Add fuller explanations. A list of terms alone does not demonstrate the required depth.');
  if (missingConcepts.length) suggestions.push('Add and explain these concept areas: ' + missingConcepts.join(', ') + '.');
  if (expectsExamples && !examplePresent) suggestions.push('Include a relevant example supported by the reference answer.');
  if (diagramCount && !diagramPresent) suggestions.push('Practise and label the relevant reference diagram. Text acknowledgement does not assess drawing quality.');
  if (sectionResults.some((x) => !x.covered)) suggestions.push('Use clear headings so the examiner can identify each part of the answer.');
  return {
    maxMarks, score, wordCount, matched, missing, sectionResults, conceptGroups, criteria,
    conceptCoverage: Math.round(conceptRatio * 100), strengths, missingConcepts, suggestions,
    diagramCount, diagramPresent, examplePresent, method: 'rule-based',
  };
}

const stripFormatting = (value) => String(value || '').replace(/\*\*/g, '').trim();
function buildImprovedDraft(question, mode, evaluation) {
  const sections = mode === 'five' ? (FIVE_MARK_ANSWERS[question.id] || []) : question.answer.sections;
  const lines = [question.question, ''];
  sections.forEach((section) => {
    lines.push(section.title);
    (section.blocks || []).forEach((block) => {
      if (block.text) lines.push(stripFormatting(block.text));
      if (block.items) block.items.forEach((item, i) => lines.push((i + 1) + '. ' + stripFormatting(item)));
      if (block.lines) block.lines.forEach((line) => lines.push(line));
      if (block.type === 'diagram') lines.push('Diagram to draw: ' + stripFormatting(block.caption));
      if (block.rows) block.rows.forEach((row) => lines.push(row.map(stripFormatting).join(' | ')));
    });
    (section.subsections || []).forEach((sub) => {
      lines.push(sub.title);
      (sub.blocks || []).forEach((block) => {
        if (block.text) lines.push(stripFormatting(block.text));
        if (block.items) block.items.forEach((item, i) => lines.push((i + 1) + '. ' + stripFormatting(item)));
        if (block.lines) block.lines.forEach((line) => lines.push(line));
      });
    });
    lines.push('');
  });
  lines.push('Improvement focus', evaluation.missingConcepts.length
    ? 'Revise and explain: ' + evaluation.missingConcepts.join(', ')
    : 'Review technical precision, examples and any required labelled diagram.');
  return lines.join('\n').trim();
}

export default function Practice() {
  const {
    practiceAttempts = {}, savePracticeAttempt, evaluationAttempts = [],
    saveEvaluationAttempt, clearEvaluationHistory, notify,
  } = useStudy();
  const [module, setModule] = useState('all');
  const [questionId, setQuestionId] = useState(QUESTIONS[0].id);
  const [answerMode, setAnswerMode] = useState('ten');
  const [revealed, setRevealed] = useState(false);
  const [checks, setChecks] = useState({});
  const [saved, setSaved] = useState(false);
  const [response, setResponse] = useState('');
  const [evaluation, setEvaluation] = useState(null);
  const [evaluationSaved, setEvaluationSaved] = useState(false);
  const [showHistory, setShowHistory] = useState(true);
  const [historyQuestion, setHistoryQuestion] = useState('all');
  const available = useMemo(() => QUESTIONS.filter((q) => module === 'all' || String(q.module) === module), [module]);
  const question = available.find((q) => q.id === questionId) || available[0];
  const fiveAvailable = !!FIVE_MARK_ANSWERS[question?.id]?.length;
  const diagrams = question ? diagramsOf(question.answer).length : 0;
  const referenceSections = question ? (answerMode === 'five' ? FIVE_MARK_ANSWERS[question.id] || [] : question.answer.sections || []) : [];
  const checklist = question ? [
    ...referenceSections.map((s) => s.title.replace(/^\d+\.\s*/, '')),
    ...(answerMode === 'ten' && diagrams ? ['Draw and label the relevant diagram(s) (' + diagrams + ')'] : []),
  ] : [];
  const checksCount = checklist.filter((_, i) => checks[i]).length;
  const attempts = Object.values(practiceAttempts);
  const currentHistory = evaluationAttempts.filter((a) => a.questionId === question?.id && String(a.answerMode || 'ten') === answerMode);
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
    if (!response.trim()) { notify('Write your answer before evaluating', 'err'); return; }
    if (response.trim().split(/\s+/).filter(Boolean).length < 12) { notify('Add at least 12 words so the feedback has material to review', 'err'); return; }
    setEvaluation(evaluateAnswer(question, response, answerMode));
    setEvaluationSaved(false);
  };
  const improvedDraft = evaluation ? buildImprovedDraft(question, answerMode, evaluation) : '';
  const saveEvaluation = () => {
    if (!evaluation) return;
    saveEvaluationAttempt({
      questionId: question.id, questionTitle: question.title, answerMode,
      maxMarks: evaluation.maxMarks, score: evaluation.score, wordCount: evaluation.wordCount,
      conceptCoverage: evaluation.conceptCoverage, criteria: evaluation.criteria,
      strengths: evaluation.strengths, missingConcepts: evaluation.missingConcepts,
      suggestions: evaluation.suggestions, improvedAnswer: improvedDraft,
    });
    setEvaluationSaved(true);
    notify('Evaluation saved to this browser');
  };
  const copyImproved = async () => {
    if (!improvedDraft) return;
    try { await navigator.clipboard.writeText(improvedDraft); notify('Improved reference draft copied'); }
    catch {
      const area = document.createElement('textarea'); area.value = improvedDraft;
      area.style.position = 'fixed'; area.style.opacity = '0'; document.body.appendChild(area); area.select();
      try { document.execCommand('copy'); notify('Draft copied'); } catch { notify('Copy failed – select the draft manually', 'err'); }
      area.remove();
    }
  };
  const removeCurrentHistory = () => {
    if (!currentHistory.length) return;
    if (!window.confirm('Delete all saved evaluations for this question and answer length? This cannot be undone.')) return;
    clearEvaluationHistory((a) => a.questionId === question.id && String(a.answerMode || 'ten') === answerMode);
    notify('Selected evaluation history cleared');
  };
  const retry = () => { setResponse(''); setEvaluation(null); setEvaluationSaved(false); setRevealed(false); setChecks({}); setSaved(false); };
  const previous = currentHistory[0];
  const improvement = previous && evaluation ? Number((evaluation.score - previous.score).toFixed(1)) : null;

  if (!question) return null;
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-8 sm:py-10">
      <p className="eyebrow">VTU written practice · Smart Answer Evaluation 2.0</p>
      <h1 className="mt-1 text-3xl font-bold tracking-tight">Practice Centre</h1>
      <p className="mt-2 max-w-3xl text-mute">Evaluate 5-mark and 10-mark answers against the matching reference notes. The local rubric reviews concept cues, structure, depth, examples and diagram acknowledgement. It is not AI grading or an official VTU marks prediction.</p>
      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <div className="card p-4"><p className="text-xs text-mute">Questions practised</p><p className="mt-1 text-2xl font-bold tabular-nums">{Object.keys(practiceAttempts).length} / 10</p></div>
        <div className="card p-4"><p className="text-xs text-mute">Practice sessions</p><p className="mt-1 text-2xl font-bold tabular-nums">{attempts.reduce((n, a) => n + (a.attempts || 0), 0)}</p></div>
        <div className="card p-4"><p className="text-xs text-mute">Saved evaluations</p><p className="mt-1 text-2xl font-bold tabular-nums">{evaluationAttempts.length}</p></div>
      </div>
      <section className="card mt-6 p-5">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-[1fr_1.5fr_auto] lg:items-end">
          <label className="block text-sm font-semibold">Module<select value={module} onChange={(e) => selectModule(e.target.value)} className="mt-2 h-11 w-full rounded-xl border border-line bg-panel px-3 font-normal"><option value="all">All modules</option><option value="3">Module 3 · {MODULES[3].name}</option><option value="4">Module 4 · {MODULES[4].name}</option><option value="5">Module 5 · {MODULES[5].name}</option></select></label>
          <label className="block text-sm font-semibold">Question<select value={question.id} onChange={(e) => resetAttempt(e.target.value)} className="mt-2 h-11 w-full rounded-xl border border-line bg-panel px-3 font-normal">{available.map((q) => <option key={q.id} value={q.id}>{q.code} · {q.title}</option>)}</select></label>
          <button onClick={chooseRandom} className="btn-primary h-11"><Dices size={17}/>Random question</button>
        </div>
        <div className="mt-5 border-t border-line pt-5">
          <div className="flex flex-wrap items-center gap-2"><ModuleBadge m={question.module}/><span className="chip">{answerMode === 'five' ? '5 Marks' : '10 Marks'}</span><span className="chip">{referenceSections.length} reference sections</span></div>
          <h2 className="mt-3 text-xl font-bold">{question.code} · {question.title}</h2><p className="mt-2 leading-relaxed text-mute">{question.question}</p>
          <div className="mt-4 inline-flex rounded-xl border border-line bg-sunk p-1" role="group" aria-label="Answer mark format">
            <button type="button" disabled={!fiveAvailable} onClick={() => {setAnswerMode('five');setEvaluation(null);setEvaluationSaved(false);}} aria-pressed={answerMode === 'five'} className={`rounded-lg px-4 py-2 text-sm font-semibold ${answerMode === 'five' ? 'bg-panel text-brand shadow-soft' : 'text-mute hover:text-ink'} disabled:opacity-40`}>5-mark answer</button>
            <button type="button" onClick={() => {setAnswerMode('ten');setEvaluation(null);setEvaluationSaved(false);}} aria-pressed={answerMode === 'ten'} className={`rounded-lg px-4 py-2 text-sm font-semibold ${answerMode === 'ten' ? 'bg-panel text-brand shadow-soft' : 'text-mute hover:text-ink'}`}>10-mark answer</button>
          </div>
          <p className="mt-2 text-xs text-mute">The selected answer length determines the scoring scale and matching reference notes.</p>
          <div className="mt-4 flex flex-wrap gap-2"><a href={`#/q/${question.id}`} className="btn-ghost"><BookOpenCheck size={16}/>Open full reference answer</a><button onClick={() => setRevealed((v) => !v)} className="btn-ghost"><Eye size={16}/>{revealed ? 'Hide checklist' : 'Self-assessment checklist'}</button></div>
        </div>
      </section>
      <section className="card mt-5 p-5">
        <div className="flex items-center gap-2"><Sparkles size={19} className="text-brand"/><h2 className="font-semibold">Write your answer</h2></div>
        <label className="mt-4 block text-sm font-semibold" htmlFor="written-answer">Student response · {answerMode === 'five' ? '5 marks' : '10 marks'}</label>
        <textarea id="written-answer" value={response} onChange={(e) => {setResponse(e.target.value);setEvaluation(null);setEvaluationSaved(false);}} rows={10} maxLength={20000} placeholder="Write your answer in your own words. Include explanations, examples and diagram notes where relevant…" className="mt-2 w-full rounded-xl border border-line bg-sunk p-4 text-sm leading-relaxed outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"/>
        <div className="mt-2 flex flex-wrap justify-between gap-2 text-xs text-mute"><span>{response.trim() ? response.trim().split(/\s+/).filter(Boolean).length : 0} words</span><span>{response.length.toLocaleString()} / 20,000 characters · minimum 12 words</span></div>
        <div className="mt-4 flex flex-wrap gap-2"><button onClick={runEvaluation} disabled={!response.trim() || response.trim().split(/\s+/).filter(Boolean).length < 12} className="btn-primary"><ClipboardCheck size={16}/>Evaluate answer</button><button onClick={() => {setResponse('');setEvaluation(null);setEvaluationSaved(false);}} className="btn-ghost"><RotateCcw size={16}/>Clear response</button></div>
      </section>
      {evaluation && <section className="card mt-5 p-5 animate-rise" aria-live="polite">
        <div className="flex flex-wrap items-center justify-between gap-3"><div><p className="eyebrow">Rule-based practice rubric · {evaluation.maxMarks} marks</p><h2 className="mt-1 text-xl font-bold">Evaluation results</h2><p className="mt-1 text-xs text-mute">Estimated practice score only. Not official VTU marks.</p></div><div className="rounded-2xl bg-brand/10 px-5 py-4 text-center"><p className="text-3xl font-bold tabular-nums text-brand">{evaluation.score}<span className="text-base">/{evaluation.maxMarks}</span></p><p className="text-xs text-mute">estimated score</p></div></div>
        <div className="mt-4 h-2 overflow-hidden rounded-full bg-sunk" role="progressbar" aria-label="Estimated score" aria-valuemin="0" aria-valuemax="100" aria-valuenow={evaluation.score/evaluation.maxMarks*100}><div className="h-full rounded-full bg-brand transition-all" style={{width:`${evaluation.score/evaluation.maxMarks*100}%`}}/></div>
        {improvement !== null && <p className={`mt-3 text-sm font-semibold ${improvement > 0 ? 'text-brand' : improvement < 0 ? 'text-orange-500' : 'text-mute'}`}>{improvement > 0 ? '+' : ''}{improvement} marks versus latest saved attempt.</p>}
        <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">{evaluation.criteria.map((item) => <div key={item.name} className="rounded-xl border border-line p-3"><div className="flex justify-between gap-2 text-sm"><span>{item.name}</span><b>{Math.round(item.ratio*100)}%</b></div><div className="mt-2 h-1.5 rounded-full bg-sunk"><div className="h-full rounded-full bg-brand" style={{width:`${item.ratio*100}%`}}/></div><p className="mt-1 text-xs text-mute">Weight: {Math.round(item.weight*100)}% · {Math.round(item.ratio*item.weight*evaluation.maxMarks*10)/10} marks</p></div>)}</div>
        <div className="mt-5 grid gap-5 lg:grid-cols-2"><div><h3 className="text-sm font-semibold text-brand">What you did well</h3><ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-mute">{evaluation.strengths.map((x)=><li key={x}>{x}</li>)}</ul></div><div><h3 className="text-sm font-semibold text-orange-500">What is missing</h3><ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-mute">{evaluation.missingConcepts.length ? evaluation.missingConcepts.map((x)=><li key={x}>{x}</li>) : <li>All configured concept groups have cues present.</li>}</ul></div></div>
        <div className="mt-5 rounded-xl bg-sunk p-4"><h3 className="text-sm font-semibold">Suggestions</h3><ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-mute">{evaluation.suggestions.map((x)=><li key={x}>{x}</li>)}</ul></div>
        <div className="mt-5"><h3 className="text-sm font-semibold">Reference section comparison</h3><div className="mt-2 space-y-2">{evaluation.sectionResults.map((item)=><div key={item.id} className="flex items-start gap-2 rounded-lg border border-line p-3 text-sm"><span className={item.covered?'text-brand':'text-orange-500'}>{item.covered?<CheckCircle2 size={16}/>:<AlertCircle size={16}/>}</span><span className="flex-1">{item.title}</span><span className="text-xs text-mute">{item.covered?'Cue found':'Review'}</span></div>)}</div></div>
        <div className="mt-5 rounded-2xl border border-line p-4"><div className="flex flex-wrap items-center justify-between gap-2"><h3 className="font-semibold">Improved VTU-style reference draft</h3><button onClick={copyImproved} className="btn-ghost"><Copy size={15}/>Copy draft</button></div><p className="mt-1 text-xs text-mute">This uses only the selected verified reference answer. It is not AI rewriting and adds no unsupported claims.</p><pre className="mt-3 max-h-[30rem] overflow-auto whitespace-pre-wrap rounded-xl bg-sunk p-4 font-sans text-sm leading-6">{improvedDraft}</pre></div>
        <div className="mt-5 flex flex-wrap gap-2"><button onClick={saveEvaluation} disabled={evaluationSaved} className="btn-primary"><Save size={16}/>{evaluationSaved?'Saved':'Save evaluation'}</button><button onClick={retry} className="btn-ghost"><RotateCcw size={16}/>Retry this question</button><a href={`#/q/${question.id}`} className="btn-ghost"><FileText size={16}/>Open reference answer</a></div>
        <p className="mt-4 text-xs text-mute">This rubric cannot reliably identify false statements, contradictions, nuanced technical errors or the quality of drawn diagrams. It is a transparent practice heuristic, not examiner judgement.</p>
      </section>}
      {revealed && <section className="card mt-5 p-5"><h2 className="font-semibold">Self-assessment checklist</h2><div className="mt-3 space-y-2">{checklist.map((item,i)=><label key={item} className="flex items-start gap-2 rounded-lg border border-line p-3 text-sm"><input type="checkbox" checked={!!checks[i]} onChange={()=>setChecks((s)=>({...s,[i]:!s[i]}))} className="mt-0.5 h-4 w-4"/>{item}</label>)}</div><button disabled={saved} onClick={()=>{savePracticeAttempt(question.id,checksCount,checklist.length);setSaved(true);notify('Self-assessment saved');}} className="btn-primary mt-4"><Save size={16}/>{saved?'Saved':'Save checklist'}</button></section>}
      <section className="card mt-5 p-5"><div className="flex flex-wrap items-center justify-between gap-2"><div><h2 className="font-semibold">Evaluation history</h2><p className="mt-1 text-xs text-mute">Stored locally in this browser, separated by question and answer length.</p></div><button onClick={()=>setShowHistory((v)=>!v)} className="btn-ghost"><History size={15}/>{showHistory?'Hide history':'Show history'}</button></div>
        {showHistory && <div className="mt-4"><label className="text-xs font-semibold text-mute">Filter question <select value={historyQuestion} onChange={(e)=>setHistoryQuestion(e.target.value)} className="ml-2 h-9 rounded-lg border border-line bg-panel px-2 text-sm text-ink"><option value="all">All questions</option>{QUESTIONS.map((q)=><option key={q.id} value={q.id}>{q.code} · {q.title}</option>)}</select></label>
          <div className="mt-3 space-y-2">{evaluationAttempts.filter((a)=>historyQuestion==='all'||a.questionId===historyQuestion).length ? evaluationAttempts.filter((a)=>historyQuestion==='all'||a.questionId===historyQuestion).map((a)=><div key={a.id} className="flex flex-wrap items-center gap-3 rounded-xl border border-line p-3 text-sm"><div className="min-w-0 flex-1"><p className="font-semibold">{a.questionTitle} · {a.answerMode==='five'?'5 marks':'10 marks'}</p><p className="text-xs text-mute">{a.at?new Date(a.at).toLocaleString():'Older saved attempt'} · {a.wordCount||0} words</p></div><b>{a.score}/{a.maxMarks||10}</b><button onClick={()=>{setQuestionId(a.questionId);setModule(String(QUESTIONS.find((q)=>q.id===a.questionId)?.module||'all'));setAnswerMode(a.answerMode||'ten');setResponse('');setEvaluation(null);}} className="btn-ghost"><ArrowUpRight size={14}/>Retry</button></div>) : <p className="py-4 text-sm text-mute">No evaluation attempts saved yet.</p>}</div>
          <button onClick={removeCurrentHistory} disabled={!currentHistory.length} className="btn-ghost mt-3 text-orange-600 disabled:opacity-40"><Trash2 size={15}/>Clear current question history</button>
        </div>}
      </section>
      <div className="mt-6 flex items-center gap-2 text-sm text-mute"><CheckCircle2 size={16} className="text-brand"/>Evaluation records are stored locally. Student answers are not sent to a server.</div>
    </div>
  );
}

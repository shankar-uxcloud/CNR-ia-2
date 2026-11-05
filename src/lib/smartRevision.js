import { QUESTIONS, MODULE_ORDER } from '../data/questions';
import { diagramsOf } from './content';

const clamp = (n, min, max) => Math.min(max, Math.max(min, n));
const dayKey = (value) => {
  const d = value instanceof Date ? value : new Date(value);
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
};
const addDays = (key, amount) => { const d = new Date(`${key}T12:00:00`); d.setDate(d.getDate()+amount); return dayKey(d); };
const validDate = (v) => Number.isFinite(new Date(v).getTime());

export function analyseLearning(state = {}, now = Date.now()) {
  const evaluations = Array.isArray(state.evaluationAttempts) ? state.evaluationAttempts : [];
  const quizzes = Array.isArray(state.quizAttempts) ? state.quizAttempts : [];
  const exams = Array.isArray(state.examAttempts) ? state.examAttempts : [];
  const practice = state.practiceAttempts || {};
  const completed = state.completed || {};
  const revision = state.revisionChecks || {};
  const topics = QUESTIONS.map((q) => {
    const evals = evaluations.filter((a) => a.questionId === q.id && Number.isFinite(Number(a.score)));
    const practices = practice[q.id] && Number.isFinite(Number(practice[q.id].score)) ? [practice[q.id]] : [];
    const quizWrong = quizzes.reduce((n,a) => n + ((a.wrongQuestionIds || []).includes(q.id) ? 1 : 0), 0);
    const quizSeen = quizzes.filter((a) => (a.questionIds || a.wrongQuestionIds || []).includes(q.id));
    const scoreSamples = [
      ...evals.map((a) => ({ pct: clamp(Number(a.score) / Math.max(1, Number(a.maxMarks) || (a.answerMode === 'five' ? 5 : 10)) * 100,0,100), at: a.at || 0 })),
      ...practices.map((a) => ({ pct: clamp(Number(a.score) / Math.max(1, Number(a.total) || 1) * 100,0,100), at: a.at || 0 })),
    ];
    const quizQuestionAttempts = quizSeen.length;
    const quizAccuracy = quizQuestionAttempts ? Math.round((quizQuestionAttempts - quizWrong) / quizQuestionAttempts * 100) : null;
    const scoreAverage = scoreSamples.length ? Math.round(scoreSamples.reduce((n,x)=>n+x.pct,0)/scoreSamples.length) : null;
    const evidence = scoreSamples.length + quizQuestionAttempts;
    const lastRevision = Number(revision[q.id]) || 0;
    const daysSinceRevision = lastRevision ? Math.max(0, Math.floor((now-lastRevision)/86400000)) : null;
    const lastAttempt = Math.max(0,...scoreSamples.map(x=>Number(x.at)||0));
    const daysSinceAttempt = lastAttempt ? Math.floor((now-lastAttempt)/86400000) : null;
    const done = !!completed[q.id];
    let status = 'Not enough data';
    let reason = 'No saved score or question-level quiz evidence yet. Complete a practice or evaluation to personalise this topic.';
    let score = scoreAverage;
    if (scoreAverage !== null || quizAccuracy !== null) {
      score = scoreAverage === null ? quizAccuracy : quizAccuracy === null ? scoreAverage : Math.round(scoreAverage*0.7+quizAccuracy*0.3);
      if (score < 40 || (quizWrong >= 2 && quizWrong >= quizQuestionAttempts/2)) {
        status = 'Critical revision required';
        reason = score < 40 ? `Your saved practice/evaluation average is ${scoreAverage}%.` : `You missed this topic ${quizWrong} times in saved quizzes.`;
      } else if (score < 65 || (!done && evidence >= 2)) {
        status = 'Needs improvement';
        reason = score < 65 ? `Your measured performance is ${score}% across saved attempts.` : 'Repeated quiz evidence exists, but the question is not marked complete.';
      } else if (score >= 80 && done) {
        status = 'Strong';
        reason = `Your measured performance is ${score}% and the question is marked complete.`;
      } else {
        status = 'Moderate';
        reason = done ? `Preparation is marked complete; measured performance is ${score}%.` : `Measured performance is ${score}%, but preparation is not marked complete.`;
      }
    } else if (done) {
      status = 'Moderate';
      reason = 'Marked complete, but no scored attempt exists yet; use a practice check to verify mastery.';
    }
    const due = lastRevision ? daysSinceRevision >= 1 : done;
    const reasons = [];
    if (status === 'Critical revision required') reasons.push('critical performance gap');
    else if (status === 'Needs improvement') reasons.push('below-target performance or incomplete preparation');
    if (quizWrong) reasons.push(`${quizWrong} incorrect quiz signal(s)`);
    if (!done) reasons.push('question not marked complete');
    if (due) reasons.push('revision due');
    const priority = clamp((status === 'Critical revision required' ? 55 : status === 'Needs improvement' ? 38 : status === 'Moderate' ? 20 : 5) + (quizWrong*8) + (!done?12:0) + (due?10:0) + (daysSinceRevision !== null && daysSinceRevision >= 7 ? 8:0),0,100);
    return { ...q, status, reason, score, evidence, evalCount: evals.length, fiveMarkCount: evals.filter(a=>a.answerMode==='five').length, tenMarkCount: evals.filter(a=>a.answerMode!=='five').length, quizWrong, done, daysSinceRevision, daysSinceAttempt, due, priority, priorityReasons: reasons };
  });
  const moduleStats = MODULE_ORDER.map(module => {
    const list = topics.filter(t=>t.module===module);
    const prepared = list.filter(t=>t.done).length;
    const measured = list.filter(t=>t.score!==null);
    return { module, total:list.length, prepared, percent:Math.round(prepared/list.length*100), average:measured.length?Math.round(measured.reduce((n,t)=>n+t.score,0)/measured.length):null };
  });
  const evaluationModes = { five:evaluations.filter(a=>a.answerMode==='five').length, ten:evaluations.filter(a=>a.answerMode!=='five').length };
  const completedTasks = (state.smartRevision?.tasks || []).filter(t=>t.done);
  return {
    topics: topics.sort((a,b)=>b.priority-a.priority),
    moduleStats,
    totals: { questions:QUESTIONS.length, completed:Object.keys(completed).filter(id=>QUESTIONS.some(q=>q.id===id)).length, bookmarks:Object.keys(state.bookmarks||{}).filter(id=>QUESTIONS.some(q=>q.id===id)).length, evaluations:evaluations.length, fiveMark:evaluationModes.five, tenMark:evaluationModes.ten, quizAttempts:quizzes.length, mockExams:exams.length, revisionCompleted:Object.values(revision).filter(Boolean).length, revisionTasksDone:completedTasks.length },
    hasEvidence: evaluations.length>0 || quizzes.length>0 || Object.keys(completed).length>0 || Object.keys(practice).length>0,
  };
}

export function createRevisionTasks(topics, options = {}) {
  const start = options.startDate || dayKey(new Date());
  const target = options.targetDate || addDays(start,13);
  const minutes = clamp(Number(options.dailyMinutes)||60,15,480);
  const days = Math.max(1, Math.round((new Date(`${target}T12:00:00`)-new Date(`${start}T12:00:00`))/86400000)+1);
  const ordered = [...topics].sort((a,b)=>(b.priority||0)-(a.priority||0));
  const units = [];
  ordered.forEach((q) => {
    units.push({ questionId:q.id, title:`Revise key concepts: ${q.title}`, kind:'concept', minutes:20, module:q.module });
    units.push({ questionId:q.id, title:`Practise a 5-mark answer: ${q.title}`, kind:'five-mark', minutes:15, module:q.module });
    units.push({ questionId:q.id, title:`Write a 10-mark answer: ${q.title}`, kind:'ten-mark', minutes:30, module:q.module });
    if (diagramsOf(q.answer).length) units.push({ questionId:q.id, title:`Practise diagrams: ${q.title}`, kind:'diagram', minutes:15, module:q.module });
  });
  const slots = Array.from({length:days},()=>[]);
  let dayIndex=0, usedMinutes=0;
  units.forEach((unit)=>{
    if (unit.minutes > minutes) return;
    if (usedMinutes + unit.minutes > minutes) { dayIndex += 1; usedMinutes = 0; }
    if (dayIndex >= days) return;
    slots[dayIndex].push(unit);
    usedMinutes += unit.minutes;
  });
  const tasks = [];
  slots.forEach((items,index)=>items.forEach((item,j)=>tasks.push({
    ...item, id:`smart-${start}-${item.questionId}-${item.kind}-${index}-${j}`,
    due:addDays(start,index), done:false, createdAt:Date.now(), source:'generated', reviewStage:0,
  })));
  return { tasks, settings:{ startDate:start,targetDate:target,dailyMinutes:minutes,paused:false,generatedAt:Date.now() } };
}

export function nextReviewDate(performance = 'good', stage = 0, from = dayKey(new Date())) {
  const intervals = performance === 'hard' ? [0,1,2,4,7] : performance === 'easy' ? [1,3,7,14,30] : [0,1,3,7,14];
  return addDays(from, intervals[Math.min(Math.max(0,stage),intervals.length-1)]);
}

export function getStudyStreak(tasks = [], today = dayKey(new Date())) {
  const doneDays = new Set(tasks.filter(t=>t.done && t.completedAt).map(t=>dayKey(t.completedAt)));
  let streak=0, cursor=today;
  while(doneDays.has(cursor)){streak++;cursor=addDays(cursor,-1);}
  if(!streak){cursor=addDays(today,-1);while(doneDays.has(cursor)){streak++;cursor=addDays(cursor,-1);}}
  return streak;
}

export { dayKey, addDays };

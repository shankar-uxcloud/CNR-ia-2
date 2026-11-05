import test from 'node:test';
import assert from 'node:assert/strict';
import { analyseLearning, createRevisionTasks, nextReviewDate, getStudyStreak } from '../src/lib/smartRevision.js';

test('does not invent weakness classifications without saved evidence',()=>{
  const result=analyseLearning({});
  assert.equal(result.hasEvidence,false);
  assert.ok(result.topics.every(t=>t.status==='Not enough data'));
});
test('uses saved answer scores and incorrect quiz signals to rank weakness',()=>{
  const result=analyseLearning({evaluationAttempts:[{questionId:'q01',score:2,maxMarks:10,answerMode:'ten'}],quizAttempts:[{wrongQuestionIds:['q01']},{wrongQuestionIds:['q01']} ]});
  const q=result.topics.find(t=>t.id==='q01');
  assert.equal(q.status,'Critical revision required');
  assert.ok(q.priority>result.topics.find(t=>t.id==='q02').priority);
});
test('completed topics without scored attempts are moderate rather than fabricated strong',()=>{
  const q=analyseLearning({completed:{q02:Date.now()}}).topics.find(t=>t.id==='q02');
  assert.equal(q.status,'Moderate');
  assert.equal(q.score,null);
});
test('study plan respects requested dates and produces question-linked tasks',()=>{
  const result=createRevisionTasks([{id:'q01',title:'Global Warming',module:5,priority:50,answer:{sections:[]}}],{startDate:'2026-11-05',targetDate:'2026-11-07',dailyMinutes:60});
  assert.ok(result.tasks.length>=3);
  assert.ok(result.tasks.every(t=>t.questionId==='q01'&&t.due>='2026-11-05'&&t.due<='2026-11-07'));
});
test('spaced repetition shortens intervals when recall is difficult',()=>{
  assert.equal(nextReviewDate('hard',1,'2026-11-05'),'2026-11-06');
  assert.equal(nextReviewDate('good',2,'2026-11-05'),'2026-11-08');
  assert.equal(nextReviewDate('easy',3,'2026-11-05'),'2026-11-19');
});
test('study streak counts consecutive completed task days',()=>{
  assert.equal(getStudyStreak([{done:true,completedAt:new Date('2026-11-04T12:00:00').getTime()},{done:true,completedAt:new Date('2026-11-05T12:00:00').getTime()}],'2026-11-05'),2);
});

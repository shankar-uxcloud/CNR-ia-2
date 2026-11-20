import test from 'node:test';
import assert from 'node:assert/strict';
import { MODEL_PAPERS } from '../src/data/mqps.js';
import { QUESTIONS } from '../src/data/questions.js';

test('full-syllabus paper covers every published question once',()=>{const p=MODEL_PAPERS[0];assert.equal(p.questions.length,QUESTIONS.length);assert.deepEqual(p.questions.map(q=>q.id),QUESTIONS.map(q=>q.id));assert.equal(p.totalMarks,100);});
test('module papers contain only published questions from their module',()=>{for(const p of MODEL_PAPERS.slice(1)){const n=Number(p.id.slice(-1));assert.ok(p.questions.length>0);assert.ok(p.questions.every(q=>q.module===n));}});
test('every paper is explicitly a practice set',()=>assert.ok(MODEL_PAPERS.every(p=>p.statusLabel==='Practice set')));

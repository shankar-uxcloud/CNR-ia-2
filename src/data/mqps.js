import { QUESTIONS } from './questions.js';

// Practice sets are assembled from published repository questions; they are not official VTU papers.
export const MODEL_PAPERS = [
 { id:'cnr-full-syllabus-practice-01', title:'Full-Syllabus Practice Paper 01', category:'Full syllabus', statusLabel:'Practice set', description:'A complete revision set covering all ten currently published questions across Modules 3, 4 and 5.', durationMinutes:180, totalMarks:100, questions:QUESTIONS.map(({id,code,module,question})=>({id,code,module,question})) },
 ...[3,4,5].map((module)=>({ id:`cnr-module-practice-0${module}`, title:`Module 0${module} Practice Paper`, category:'Module-wise', statusLabel:'Practice set', description:`Focused practice using all currently published Module 0${module} questions.`, durationMinutes:QUESTIONS.filter(q=>q.module===module).length*60, totalMarks:QUESTIONS.filter(q=>q.module===module).length*10, questions:QUESTIONS.filter(q=>q.module===module).map(({id,code,module,question})=>({id,code,module,question})) }))
];

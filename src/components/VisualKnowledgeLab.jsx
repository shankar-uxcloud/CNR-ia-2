import { useState } from 'react';
import { CheckCircle2, RotateCcw, Trophy } from 'lucide-react';
import { useStudy } from '../lib/study';

const QUESTIONS = [
  { topic:'Levels of biodiversity', question:'Which level describes variation in genes within the same species?', options:['Genetic diversity','Species diversity','Ecosystem diversity','Landscape diversity'], answer:0, explanation:'Genetic diversity is variation in hereditary information among individuals and populations of one species.' },
  { topic:'Conservation methods', question:'Which is an example of ex-situ conservation?', options:['National park','Wildlife sanctuary','Gene bank','Biosphere reserve'], answer:2, explanation:'A gene bank conserves seeds, tissues or other genetic material outside the organism’s natural habitat.' },
  { topic:'Nitrogen cycle', question:'Which process converts atmospheric nitrogen into biologically usable compounds?', options:['Denitrification','Nitrogen fixation','Transpiration','Sedimentation'], answer:1, explanation:'Nitrogen fixation converts atmospheric N₂ into ammonia or related usable nitrogen compounds.' },
  { topic:'Air-pollution control', question:'Which device uses centrifugal action to separate particles?', options:['Wet scrubber','Baghouse filter','Cyclone separator','Electrostatic precipitator'], answer:2, explanation:'A cyclone creates a rotating gas stream; centrifugal action drives particles toward its outer wall.' },
  { topic:'Environmental Impact Assessment', question:'Which EIA stage identifies the key environmental issues and studies to be carried out?', options:['Screening','Scoping','Monitoring','Clearance'], answer:1, explanation:'Scoping defines the important issues, study boundaries and information needed for the assessment.' },
  { topic:'Greenhouse effect', question:'What type of radiation is emitted by the warmed Earth’s surface?', options:['Visible light','Infrared radiation','Ultraviolet radiation','X-rays'], answer:1, explanation:'The Earth absorbs solar energy and emits energy mainly as long-wave infrared radiation.' },
  { topic:'Ozone depletion', question:'Which agreement phases out controlled ozone-depleting substances?', options:['Ramsar Convention','CITES','Montreal Protocol','Paris Agreement'], answer:2, explanation:'The Montreal Protocol controls and phases out ozone-depleting substances such as many CFCs.' }
];

export default function VisualKnowledgeLab() {
  const { visualStudio = {}, saveVisualQuizAttempt, completeVisualExercise } = useStudy();
  const [round, setRound] = useState(0);
  const [index, setIndex] = useState(0);
  const [choice, setChoice] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [finished, setFinished] = useState(false);
  const questions = Array.from({length:5}, (_,i) => QUESTIONS[(round+i*2)%QUESTIONS.length]);
  const current = questions[index];
  const score = answers.filter(a=>a.correct).length;
  const restart = () => { setRound(r=>r+1); setIndex(0); setChoice(null); setAnswers([]); setFinished(false); };
  const submit = () => {
    if (choice === null) return;
    const next = [...answers, { question:current.question, correct:choice===current.answer }];
    setAnswers(next);
    if (index===questions.length-1) {
      setFinished(true);
      saveVisualQuizAttempt({score:next.filter(a=>a.correct).length,total:next.length,answers:next});
      completeVisualExercise('visual-knowledge-test');
    } else { setIndex(i=>i+1); setChoice(null); }
  };
  return <section className="card mt-4 p-5">
    <div className="flex flex-wrap items-center justify-between gap-2"><div><p className="eyebrow">BCV755B · syllabus-based assessment</p><h2 className="text-xl font-bold">Visual knowledge test</h2></div><span className="chip">{finished?'Completed':`Question ${index+1} of ${questions.length}`}</span></div>
    <p className="mt-2 text-sm text-mute">Five questions drawn from the existing module topics. Feedback explains the concept immediately after you choose.</p>
    {finished ? <div className="mt-5"><div className="rounded-2xl bg-sunk p-5 text-center"><Trophy size={30} className="mx-auto text-brand"/><p className="mt-2 text-3xl font-bold">{score}/{questions.length}</p><p className="text-sm text-mute">Correct answers · attempt saved on this browser</p></div><div className="mt-4 space-y-2">{answers.map((a,i)=><div key={i} className="rounded-xl border border-line p-3"><p className="text-sm font-semibold">{i+1}. {a.question}</p><p className={a.correct?'mt-1 text-xs text-brand':'mt-1 text-xs text-mute'}>{a.correct?'Correct':'Review this concept'}</p></div>)}</div><button onClick={restart} className="btn-primary mt-4"><RotateCcw size={15}/>Try another test</button></div> : <div className="mt-5"><div className="mb-3 h-2 overflow-hidden rounded-full bg-line"><div className="h-full bg-brand transition-all" style={{width:((index+1)/questions.length*100)+'%'}}/></div><p className="text-xs text-mute">{current.topic}</p><h3 className="mt-3 text-lg font-semibold">{current.question}</h3><div className="mt-4 grid gap-2 sm:grid-cols-2">{current.options.map((option,i)=><button key={option} disabled={choice!==null} onClick={()=>setChoice(i)} className={choice===i?'rounded-xl border border-brand bg-brand/10 p-3 text-left text-sm':'rounded-xl border border-line p-3 text-left text-sm hover:bg-sunk'}>{String.fromCharCode(65+i)}. {option}</button>)}</div>{choice!==null&&<div className="mt-4 rounded-xl border border-line bg-sunk p-4"><p className="font-semibold">{choice===current.answer?'Correct!':'Not quite — review this explanation.'}</p><p className="mt-1 text-sm text-mute">{current.explanation}</p></div>}<button disabled={choice===null} onClick={submit} className="btn-primary mt-4">{index===questions.length-1?'Finish test':'Submit and continue'}<CheckCircle2 size={15}/></button></div>}
    <div className="mt-4 border-t border-line pt-3 text-xs text-mute">Previous attempts saved: {(visualStudio.quizAttempts||[]).length}</div>
  </section>;
}

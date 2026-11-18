import { ArrowRight, BookOpen, Brain, ClipboardCheck, FileText, GraduationCap, LibraryBig, Sparkles, Target, Timer, Trophy } from 'lucide-react';
import { QUESTIONS, MODULES, MODULE_ORDER, SUBJECT } from '../data/questions';
import { go } from '../lib/router';

const destinations = [
  { icon: BookOpen, title: 'Study modules', detail: 'Explore the published question bank and module-wise learning paths.', href: '/learning-hub', action: 'Explore modules', available: true },
  { icon: LibraryBig, title: 'Study materials', detail: 'A future home for verified PDFs, class notes and reference resources.', href: null, action: 'Coming soon', available: false },
  { icon: FileText, title: 'Solved PYQs', detail: 'Year-wise previous papers with carefully verified solutions.', href: null, action: 'Coming soon', available: false },
  { icon: ClipboardCheck, title: 'Model question papers', detail: 'Full-syllabus and internal-assessment practice papers.', href: null, action: 'Coming soon', available: false },
  { icon: Timer, title: 'Exam simulator', detail: 'Practise with the examination tools already available in the app.', href: '/exam', action: 'Start practice', available: true },
  { icon: Brain, title: 'Revision & analytics', detail: 'Review questions, track your activity and focus on revision.', href: '/smart-revision', action: 'Explore tools', available: true },
];

const journey = [
  ['01', 'LEARN', 'Build your foundation with organized subject content.'],
  ['02', 'UNDERSTAND', 'Connect definitions, concepts, examples and diagrams.'],
  ['03', 'REVISE', 'Return to important points and bookmarked questions.'],
  ['04', 'PRACTISE', 'Test your knowledge with focused practice.'],
  ['05', 'SOLVE', 'Work through verified previous-year papers as they are added.'],
  ['06', 'EXCEL', 'Use your learning progress to guide the next study session.'],
];

export default function NexusWelcome({ revisit = false, onEnter }) {
  const modules = [1, 2, 3, 4, 5].map((number) => {
    const ready = MODULE_ORDER.includes(number);
    const count = QUESTIONS.filter((question) => question.module === number).length;
    return { number, ready, count, title: ready ? MODULES[number]?.name : `Module 0${number}`, description: ready ? MODULES[number]?.long : 'Verified module content will appear here when added.' };
  });
  const enter = (path = '/learning-hub') => {
    try { localStorage.setItem('cnr-nexus-welcome-complete', 'true'); } catch { /* storage may be unavailable */ }
    onEnter?.();\n    go(path);
  };
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
  return <main className={revisit ? "min-h-screen overflow-hidden bg-bg text-ink" : "fixed inset-0 z-[10000] overflow-y-auto overflow-x-hidden bg-bg text-ink"}>
    <section className="relative isolate overflow-hidden border-b border-line">
      <div className="pointer-events-none absolute inset-0 opacity-70" aria-hidden="true" style={{ background: 'radial-gradient(ellipse at 78% 28%, rgb(var(--brand-rgb, 56 189 248) / .20), transparent 42%), radial-gradient(ellipse at 12% 80%, rgb(var(--brand-rgb, 56 189 248) / .10), transparent 38%)' }} />
      <header className="relative mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
        <a href="#/" className="flex items-center gap-3" aria-label="CNR-IA-2 home"><span className="grid h-11 w-11 place-items-center rounded-2xl border border-line bg-panel text-brand shadow-lift"><GraduationCap size={23}/></span><span><strong className="block tracking-wide">CNR-IA-2</strong><small className="text-[10px] font-semibold tracking-[.16em] text-mute">ULTIMATE VTU EXAMPREP 2.0</small></span></a>
        <div className="flex items-center gap-2"><button type="button" onClick={() => enter("/dashboard")} className="hidden rounded-xl px-3 py-2 text-sm text-mute hover:bg-sunk sm:inline-flex">Skip introduction</button><button type="button" onClick={() => enter('/learning-hub')} className="btn-primary inline-flex items-center gap-2">Enter Learning Hub <ArrowRight size={16}/></button></div>
      </header>
      <div className="relative mx-auto grid min-h-[610px] max-w-7xl items-center gap-12 px-5 pb-20 pt-12 sm:px-8 lg:grid-cols-[1.08fr_.92fr]">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-panel/80 px-3 py-1.5 text-xs font-semibold tracking-wide text-brand"><Sparkles size={14}/> YOUR ACADEMIC LEARNING UNIVERSE</span>
          <h1 className="mt-7 text-5xl font-black leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">Your complete learning ecosystem. <span className="text-brand">One powerful destination.</span></h1>
          <p className="mt-7 max-w-2xl text-base leading-8 text-mute sm:text-lg">A focused preparation space for {SUBJECT.name} — explore published questions, prepare exam-ready answers, practise with existing tools and follow your progress as the learning library grows.</p>
          <div className="mt-9 flex flex-wrap gap-3"><button type="button" onClick={() => enter('/learning-hub')} className="btn-primary inline-flex items-center gap-2 px-5 py-3">Start learning <ArrowRight size={17}/></button><button type="button" onClick={() => scrollTo('nexus-modules')} className="rounded-xl border border-line bg-panel px-5 py-3 text-sm font-semibold hover:bg-sunk">Explore modules</button><button type="button" onClick={() => scrollTo('nexus-features')} className="rounded-xl px-4 py-3 text-sm font-semibold text-mute hover:bg-sunk">Discover features</button></div>
          <div className="mt-12 grid max-w-xl grid-cols-3 gap-4 border-t border-line pt-6">
            <div><strong className="block text-3xl font-black tabular-nums">{QUESTIONS.length}</strong><span className="text-xs text-mute">Published questions</span></div>
            <div><strong className="block text-3xl font-black tabular-nums">{MODULE_ORDER.length}</strong><span className="text-xs text-mute">Modules with questions</span></div>
            <div><strong className="block text-3xl font-black tabular-nums">3</strong><span className="text-xs text-mute">Answer-length modes</span></div>
          </div>
        </div>
        <div className="relative mx-auto w-full max-w-xl">
          <div className="absolute inset-8 rounded-full bg-brand/15 blur-3xl" aria-hidden="true"/>
          <div className="relative aspect-square overflow-hidden rounded-[2rem] border border-line bg-panel shadow-lift">
            <div className="absolute inset-0 opacity-60" style={{ backgroundImage: 'radial-gradient(var(--line) 1px, transparent 1px)', backgroundSize: '22px 22px' }} aria-hidden="true"/>
            <div className="absolute inset-[12%] rounded-full border border-brand/30"/><div className="absolute inset-[22%] rounded-full border border-brand/20"/>
            <div className="absolute left-1/2 top-1/2 grid h-44 w-44 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-brand/40 bg-brand/10 shadow-[0_0_70px_rgb(56_189_248_/_0.18)] sm:h-56 sm:w-56"><div className="text-center"><GraduationCap className="mx-auto text-brand" size={48}/><strong className="mt-3 block text-2xl tracking-widest">CNR</strong><span className="text-xs text-mute">KNOWLEDGE PLANET</span></div></div>
            <div className="absolute left-[8%] top-[20%] rounded-xl border border-line bg-panel/90 p-3 shadow-lift backdrop-blur"><BookOpen className="text-brand" size={18}/><span className="mt-1 block text-xs font-semibold">Module learning</span></div>
            <div className="absolute bottom-[17%] right-[5%] rounded-xl border border-line bg-panel/90 p-3 shadow-lift backdrop-blur"><Target className="text-brand" size={18}/><span className="mt-1 block text-xs font-semibold">Exam readiness</span></div>
            <div className="absolute right-[8%] top-[17%] rounded-xl border border-line bg-panel/90 p-3 shadow-lift backdrop-blur"><Trophy className="text-brand" size={18}/><span className="mt-1 block text-xs font-semibold">Progress</span></div>
          </div>
        </div>
      </div>
    </section>
    <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8" id="nexus-about">
      <p className="eyebrow">ABOUT THE PLATFORM</p><h2 className="mt-2 max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl">Everything you need to prepare smarter.</h2><p className="mt-4 max-w-3xl leading-7 text-mute">CNR-IA-2 brings the currently published question bank, structured answer formats, revision tools and exam practice into one subject-focused experience. New resource collections will become available as verified content is added.</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{[['Organized preparation','A clear starting point for the subject and its published modules.'],['Exam-oriented answers','Use the existing 2-mark, 5-mark and 10-mark answer formats.'],['Study and revision','Return to questions, bookmarks and learning tools.'],['Practice tools','Use the available quiz, practice and exam simulator routes.'],['Personal progress','Review saved learning activity and analytics.'],['Growing resource library','Materials, solved PYQs and MQPs are planned additions.']].map(([title,desc]) => <article key={title} className="card p-5"><h3 className="font-bold">{title}</h3><p className="mt-2 text-sm leading-6 text-mute">{desc}</p></article>)}</div>
    </section>
    <section className="border-y border-line bg-sunk/40 py-20" id="nexus-modules"><div className="mx-auto max-w-7xl px-5 sm:px-8"><p className="eyebrow">EXPLORE THE SYLLABUS</p><h2 className="mt-2 text-3xl font-bold">Five modules. One guided path.</h2><p className="mt-3 max-w-2xl text-mute">Availability is based on the question-bank content currently published in this repository.</p><div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{modules.map((module) => <article key={module.number} className="card flex min-h-56 flex-col p-5"><div className="flex items-center justify-between"><span className="text-xs font-bold tracking-widest text-mute">MODULE 0{module.number}</span><span className={module.ready ? 'rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold text-brand' : 'rounded-full bg-sunk px-3 py-1 text-xs text-mute'}>{module.ready ? 'Questions available' : 'Awaiting verified content'}</span></div><h3 className="mt-5 text-lg font-bold">{module.title}</h3><p className="mt-2 text-sm leading-6 text-mute">{module.description}</p><div className="mt-auto flex items-center justify-between pt-5 text-xs text-mute"><span>{module.count} published questions</span>{module.ready ? <a href={`#/module/${module.number}`} className="inline-flex items-center gap-1 font-semibold text-brand">Explore <ArrowRight size={14}/></a> : <span>Not published yet</span>}</div></article>)}</div></div></section>
    <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8" id="nexus-features"><p className="eyebrow">YOUR LEARNING DESTINATIONS</p><h2 className="mt-2 text-3xl font-bold">One platform. Multiple ways to prepare.</h2><div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{destinations.map(({icon:Icon,title,detail,href,action,available}) => <article key={title} className="card flex min-h-48 flex-col p-5"><span className="grid h-11 w-11 place-items-center rounded-xl bg-brand/10 text-brand"><Icon size={21}/></span><h3 className="mt-4 font-bold">{title}</h3><p className="mt-2 text-sm leading-6 text-mute">{detail}</p><div className="mt-auto pt-5">{available ? <a href={`#${href}`} className="inline-flex items-center gap-1 text-sm font-semibold text-brand">{action} <ArrowRight size={15}/></a> : <span className="text-xs font-semibold text-mute">{action}</span>}</div></article>)}</div></section>
    <section className="border-y border-line bg-sunk/40 py-20"><div className="mx-auto max-w-7xl px-5 sm:px-8"><p className="eyebrow">THE CNR LEARNING JOURNEY</p><h2 className="mt-2 text-3xl font-bold">From first concept to confident preparation.</h2><div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{journey.map(([number,title,description]) => <div key={number} className="card p-5"><span className="text-xs font-bold text-brand">{number}</span><h3 className="mt-2 font-bold tracking-widest">{title}</h3><p className="mt-2 text-sm leading-6 text-mute">{description}</p></div>)}</div></div></section>
    <footer className="mx-auto max-w-7xl px-5 py-14 text-center sm:px-8"><h2 className="text-3xl font-black">Ready to begin your learning journey?</h2><p className="mt-3 text-mute">Start with the verified content available today. The platform will grow with additional source-backed resources.</p><button type="button" onClick={() => enter('/learning-hub')} className="btn-primary mt-7 inline-flex items-center gap-2 px-6 py-3">Enter Learning Hub <ArrowRight size={17}/></button><div className="mt-8 flex flex-wrap justify-center gap-5 text-xs text-mute"><a href="#/learning-hub">Learning Hub</a><a href="#/dashboard">Dashboard</a><button type="button" onClick={() => scrollTo('nexus-about')}>About CNR-IA-2</button></div></footer>
  </main>;
}

import { ArrowRight, BookOpenCheck, ClipboardList, Maximize2, Moon, Shapes, Brain, ChartNoAxesCombined, FileText, CalendarDays } from 'lucide-react';
import { QUESTIONS, MODULES, MODULE_ORDER, SUBJECT } from '../data/questions';
import { Logo, ThemeBtn } from '../components/Shell';
import { Greenhouse } from '../diagrams/Climate';
import { modColor } from '../components/ui';

function HeroArt() {
  return (
    <svg viewBox="0 0 1200 800" preserveAspectRatio="xMidYMax slice" className="absolute inset-0 h-full w-full" aria-hidden="true">
      <defs>
        <radialGradient id="orb" cx="50%" cy="50%" r="50%"><stop offset="0" stopColor="var(--landing-accent)" stopOpacity=".55" /><stop offset="1" stopColor="var(--landing-accent)" stopOpacity="0" /></radialGradient>
        <linearGradient id="h1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="var(--landing-surface-a)" /><stop offset="1" stopColor="var(--landing-surface-b)" /></linearGradient>
        <linearGradient id="h2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="var(--landing-surface-c)" /><stop offset="1" stopColor="var(--landing-deep)" /></linearGradient>
      </defs>
      <circle cx="900" cy="250" r="260" fill="url(#orb)" />
      <circle cx="900" cy="250" r="64" fill="var(--landing-accent)" opacity=".85" />
      <g stroke="var(--landing-accent)" strokeOpacity=".16" fill="none">{[0, 1, 2, 3, 4].map((i) => <circle key={i} cx="900" cy="250" r={110 + i * 62} />)}</g>
      <path d="M0 560 C200 470 360 520 520 470 S860 420 1200 520 V800 H0Z" fill="url(#h1)" />
      <path d="M0 640 C220 560 420 620 640 570 S1000 560 1200 620 V800 H0Z" fill="url(#h2)" />
      <path d="M0 720 C260 670 520 730 760 690 S1100 680 1200 710 V800 H0Z" fill="var(--landing-bg)" />
      <g transform="translate(720 70)"><g className="animate-floaty">
        <path d="M280 320c0-46 28-70 80-70 0 46-24 76-72 76" fill="none" stroke="var(--landing-accent)" strokeWidth="3" strokeLinecap="round" /><path d="M282 330c18-28 36-46 62-58" fill="none" stroke="var(--landing-accent)" strokeWidth="2.4" strokeLinecap="round" />
      </g></g>
      <g transform="translate(250 190)"><g className="animate-floaty" style={{ animationDelay: '-2s' }}><path d="M620 190c-14 22-26 36-26 52a26 26 0 0 0 52 0c0-16-12-30-26-52z" fill="var(--landing-cyan)" opacity=".75" /></g></g>
      <g className="animate-floaty" style={{ animationDelay: '-4s' }}><path d="M1040 400c-9 14-17 23-17 33a17 17 0 0 0 34 0c0-10-8-19-17-33z" fill="var(--landing-cyan)" opacity=".55" /></g>
      <g transform="translate(800 -70)"><g className="animate-floaty" style={{ animationDelay: '-3s' }} opacity=".7"><path d="M140 200h120M170 222h90M100 244h150" stroke="var(--landing-text)" strokeOpacity=".4" strokeWidth="10" strokeLinecap="round" /></g></g>
      <g fill="var(--landing-accent)" opacity=".5">{[[180, 520], [260, 500], [340, 530], [420, 500]].map(([x, y], i) => <path key={i} d={`M${x} ${y}l12 -34 12 34z`} />)}</g>
    </svg>
  );
}

const FEATURES = [
  [BookOpenCheck, 'Structured CNR learning', 'Explore module-wise study answers, key concepts, diagrams and revision-friendly explanations.'],
  [FileQuestion, 'Model question papers', 'Practise with clearly labelled student-created model sets; they are not presented as official VTU papers.'],
  [FileText, 'Academic Resource Vault', 'Find CNR notes and question-paper resources organised by category, with public Google Drive links.'],
  [Brain, 'AI Study Coach', 'Get guided study support as you work through concepts and prepare for assessments.'],
  [ChartNoAxesCombined, 'Progress analytics', 'Review completed work and use your study progress to decide what to revise next.'],
  [ClipboardList, 'Practice and exam tools', 'Use quizzes, practice sessions and exam simulation to check your understanding.'],
  [CalendarDays, 'Study planner and revision', 'Organise study sessions, revisit important topics and build a consistent preparation routine.'],
  [Maximize2, 'Focused reading', 'Use a cleaner reading layout, adjustable display settings and distraction-reduced study.'],
  [Moon, 'Personal workspace', 'Choose light or dark appearance and available interface modes to suit your reading comfort.'],
];

export default function Landing() {
  return (
    <div className="bg-bg">
      <section className="relative isolate flex min-h-screen flex-col overflow-hidden landing-hero text-white">
        <HeroArt />
        <div className="absolute inset-0 -z-0 landing-hero-veil" aria-hidden="true" />
        <header className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-5 sm:px-8">
          <Logo light />
          <div className="flex items-center gap-2"><a href="#/questions" className="hidden rounded-xl px-4 py-2 text-sm font-medium text-white/80 hover:bg-white/10 sm:block">Questions</a><ThemeBtn className="!border-white/20 !bg-white/10 !text-white hover:!bg-white/20" /></div>
        </header>
        <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-5 pb-24 pt-10 sm:px-8">
          <p className="animate-rise inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/8 px-3.5 py-1.5 text-xs font-semibold tracking-wider landing-accent-text"><span className="h-1.5 w-1.5 rounded-full landing-cta" />{SUBJECT.code} · VTU SYLLABUS · CONSERVATION OF NATURAL RESOURCES</p>
          <h1 className="animate-rise mt-6 max-w-3xl text-[2.6rem] font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl" style={{ animationDelay: '80ms' }}>Master Every Concept. <span className="landing-accent-text">Prepare with Confidence.</span></h1>
          <p className="animate-rise mt-6 max-w-xl text-lg leading-relaxed text-white/70" style={{ animationDelay: '160ms' }}>{SUBJECT.name} learning and exam-preparation workspace. Explore structured study answers, module-wise learning, practice tools, model question papers and an organised academic resource library in one place.</p>
          <div className="animate-rise mt-9 flex flex-wrap gap-3" style={{ animationDelay: '240ms' }}>
            <a href="#/dashboard" className="inline-flex items-center gap-2 rounded-xl landing-cta px-6 py-3.5 text-[15px] font-semibold text-[var(--landing-cta-text)] shadow-lift transition hover:brightness-110 active:scale-[.98]">Start Preparing <ArrowRight size={18} /></a>
            <a href="#/questions" className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/8 px-6 py-3.5 text-[15px] font-semibold transition hover:bg-white/15">Browse the 10 questions</a>
          </div>
          <dl className="animate-rise mt-14 grid max-w-xl grid-cols-3 gap-6 border-t border-white/15 pt-6" style={{ animationDelay: '320ms' }}>
            {[['10', 'Important questions'], ['3', 'Modules'], ['13', 'Labelled diagrams']].map(([n, l]) => <div key={l}><dt className="text-3xl font-bold tabular-nums">{n}</dt><dd className="text-xs text-white/60">{l}</dd></div>)}
          </dl>
        </div>
      </section>


      <section className="border-y border-line bg-panel/60 py-20" aria-labelledby="about-platform">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <p className="eyebrow">About this website</p>
          <h2 id="about-platform" className="mt-1 max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl">A dedicated digital learning space for CNR.</h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-mute">CNR-IA-2 brings study material, practice experiences and learning utilities together in one student-friendly platform. It is designed to make Conservation of Natural Resources easier to explore, revise and practise — from the first concept to exam preparation.</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: 'Learn', text: 'Study structured module-wise answers, concepts and labelled diagrams.', href: '#/questions', action: 'Explore questions' },
              { title: 'Practise', text: 'Build confidence with quizzes, practice sessions and model question papers.', href: '#/mqps', action: 'Open practice sets' },
              { title: 'Discover', text: 'Browse the Academic Resource Vault for notes and question-paper resources.', href: '#/resources', action: 'Browse resources' },
              { title: 'Improve', text: 'Use revision, analytics, planning and study-support tools to guide your preparation.', href: '#/learning-hub', action: 'Visit learning hub' },
            ].map((item) => (
              <article key={item.title} className="card flex flex-col p-5">
                <h3 className="text-lg font-bold">{item.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-mute">{item.text}</p>
                <a href={item.href} className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand">{item.action} <ArrowRight size={15} /></a>
              </article>
            ))}
          </div>
          <p className="mt-6 text-xs leading-relaxed text-mute">This is an independent student learning resource, not an official VTU website. Model question papers are practice material and should not be mistaken for official university papers.</p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8" aria-labelledby="dist">
        <p className="eyebrow">Module-wise distribution</p>
        <h2 id="dist" className="mt-1 max-w-2xl text-3xl font-bold tracking-tight">Ten questions, three modules.</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {MODULE_ORDER.slice().sort((a, b) => a - b).map((m) => {
            const qs = QUESTIONS.filter((q) => q.module === m);
            return (
              <a key={m} href={`#/module/${m}`} className="card group p-6 transition hover:-translate-y-1 hover:shadow-lift">
                <div className="flex items-start justify-between gap-3"><div><span className="text-xs font-bold uppercase tracking-widest" style={{ color: modColor(m) }}>MODULE {String(m).padStart(2, '0')}</span><h3 className="mt-2 text-lg font-bold tracking-tight">{MODULES[m].name}</h3></div><span className="grid h-11 min-w-11 place-items-center rounded-xl text-lg font-bold tabular-nums" style={{ color: modColor(m), background: `rgb(var(--m${m}) / .12)` }}>{qs.length}</span></div>
                <p className="mt-2 min-h-12 text-sm leading-relaxed text-mute">{MODULES[m].long}</p>
                <div className="mt-4 border-t border-line pt-3"><p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-mute">Included questions</p><ul className="space-y-2 text-sm text-mute">{qs.map((q) => <li key={q.id} className="flex items-start gap-2"><span className="shrink-0 rounded-md bg-sunk px-1.5 py-0.5 text-[11px] font-bold text-ink">{q.code}</span><span>{q.title}</span></li>)}</ul></div>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand transition group-hover:gap-3">Explore module <ArrowRight size={16} /></span>
              </a>
            );
          })}
        </div>
      </section>

      <section className="border-y border-line bg-panel/60 py-20" aria-labelledby="prev">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <p className="eyebrow">The learning experience</p>
            <h2 id="prev" className="mt-1 text-3xl font-bold tracking-tight">Answers that read like a textbook.</h2>
            <p className="mt-3 text-mute">Numbered headings, highlighted keywords, comparison tables, equations and accurate labelled diagrams you can enlarge. Where an answer goes beyond your notes, it says so.</p>
            <ul className="mt-5 space-y-2 text-sm">{['Sticky table of contents and reading progress', 'Expand / collapse every section', 'Copy or print any answer'].map((t) => <li key={t} className="flex items-center gap-2"><Shapes size={15} className="text-brand" />{t}</li>)}</ul>
          </div>
          <div className="lg:col-span-3">
            <div className="card overflow-hidden shadow-lift">
              <div className="flex items-center gap-1.5 border-b border-line bg-sunk px-4 py-2.5">{[0, 1, 2].map((i) => <span key={i} className="h-2.5 w-2.5 rounded-full bg-line" />)}<span className="ml-3 text-xs text-mute">Q01 · Global Warming</span></div>
              <div className="p-5 sm:p-6">
                <span className="chip !text-ink">Module 5 · 10 Marks</span>
                <h3 className="mt-3 text-xl font-bold tracking-tight">1. The Greenhouse Effect</h3>
                <div className="mt-3 overflow-hidden rounded-xl border border-line bg-[var(--dg-bg)]" aria-hidden="true"><div className="pointer-events-none origin-top-left"><Greenhouse /></div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8" aria-labelledby="feat">
        <p className="eyebrow">Study tools</p><h2 id="feat" className="mt-1 text-3xl font-bold tracking-tight">Everything you need to revise fast.</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map(([I, t, d]) => <div key={t} className="card p-6"><div className="mb-4 grid h-11 w-11 place-items-center rounded-xl bg-brand/12 text-brand"><I size={21} /></div><h3 className="font-semibold">{t}</h3><p className="mt-1 text-sm text-mute">{d}</p></div>)}
        </div>
        <div className="mt-12 flex flex-col items-center rounded-3xl bg-navy px-6 py-12 text-center text-white"><h2 className="text-2xl font-bold sm:text-3xl">Ready to begin?</h2><p className="mt-2 text-white/65">Open the dashboard and start with Question 1.</p><a href="#/dashboard" className="mt-6 inline-flex items-center gap-2 rounded-xl landing-cta px-6 py-3 font-semibold text-[var(--landing-cta-text)] hover:brightness-110">Start Preparing <ArrowRight size={18} /></a></div>
        <p className="mt-8 text-center text-xs text-mute">Answers are prepared from your three uploaded Module 3, 4 and 5 study documents. Exam preparation aid only – no marks are guaranteed.</p>
      </section>
    </div>
  );
}

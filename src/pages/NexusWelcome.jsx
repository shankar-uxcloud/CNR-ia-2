import { useMemo, useState } from 'react';
import './NexusWelcome.css';
import {
  ArrowRight, BookOpen, BookOpenCheck, Brain, CheckCircle2, ChevronDown,
  ClipboardCheck, Cloud, Compass, Droplets, ExternalLink, FileQuestion,
  FileText, GraduationCap, Layers3, Leaf, LibraryBig, Mountain, Search,
  ShieldCheck, Sprout, Target, Wind, Trees, Globe2, Bookmark,
} from 'lucide-react';
import { CNR_MODULES, COURSE_OBJECTIVES, COURSE_OUTCOMES, SYLLABUS_SOURCE, QUESTION_PAPER_RESOURCES, SYLLABUS_RESOURCES, getModuleCatalogStats, getModuleDiagrams, getModuleQuestions, getModuleResources } from '../data/cnrAcademic';
import { QUESTIONS } from '../data/questions';
import { DRIVE_RESOURCES } from '../data/resourceCatalog';
import { useStudy } from '../lib/study';

const ICONS = { mountain: Mountain, droplets: Droplets, wind: Wind, trees: Trees, globe: Globe2 };
const FILTERS = [
  { id: 'all', label: 'All' }, { id: 'notes', label: 'Notes' }, { id: 'pdfs', label: 'PDFs' },
  { id: 'questions', label: 'Questions' }, { id: 'diagrams', label: 'Diagrams' },
  { id: 'papers', label: 'Question papers' }, { id: 'practice', label: 'Practice' },
];

const FEATURES = [
  { icon: BookOpen, title: 'Module-wise study materials', description: 'Open the repository-catalogued PDF notes and lecture presentations for all five syllabus modules.', href: '/cnr-notes', access: 'CNR Notes Hub' },
  { icon: BookOpenCheck, title: 'Question-wise answers', description: 'Study the 10 published 10-mark answers currently in the question bank (Modules 3–5). Modules 1–2 have no published answer-bank entries yet.', href: '/questions', access: 'Question Library' },
  { icon: FileText, title: 'VTU question papers', description: 'Open the December 2025 / January 2026 and June / July 2026 papers, plus the separately labelled scheme paper.', href: '/resources', access: 'Academic Resource Vault' },
  { icon: ClipboardCheck, title: 'Model question paper', description: 'Use the catalogued model paper as additional practice; its source filename identifies it as a 21CV654 paper, not an official BCV755B VTU paper.', href: '/mqps', access: 'Model Question Papers' },
  { icon: Layers3, title: 'Visual Learning Studio', description: 'Explore existing interactive concept maps, process flows, learning cards and diagram-practice activities.', href: '/visual-studio', access: 'Visual Learning Studio' },
  { icon: Sprout, title: 'Environmental Science Lab', description: 'Explore the existing interactive environmental-science learning lab and its guided activities.', href: '/environment-lab', access: 'Environmental Science Lab' },
  { icon: Brain, title: 'Offline Study Coach', description: 'Find related published answers and practise recall with the local keyword-coverage rubric. It does not call an external AI service.', href: '/study-coach', access: 'Study Coach' },
  { icon: Target, title: 'Practice and quiz centre', description: 'Use the available practice and quiz tools with the questions currently published in the app.', href: '/practice', access: 'Practice Centre' },
  { icon: GraduationCap, title: 'VTU exam simulator', description: 'Create timed written-answer practice papers from the current 10-question bank; it is a practice tool, not a complete official paper.', href: '/exam', access: 'Exam Simulator' },
  { icon: Compass, title: 'Revision and weakness analysis', description: 'Use smart revision, progress analytics and saved practice activity to guide the next study session.', href: '/smart-revision', access: 'Smart Revision' },
  { icon: Bookmark, title: 'Bookmarks and personal progress', description: 'Save questions, track completed study items and review local activity and analytics.', href: '/analytics', access: 'Progress & Analytics' },
  { icon: Cloud, title: 'Offline-ready application shell', description: 'The PWA caches the application shell and visited same-origin resources; first-time access to a file still requires connectivity.', href: '/dashboard', access: 'Installable CNR-IA-2' },
  { icon: LibraryBig, title: 'CNR Notes Hub', description: 'Browse the module-organised repository catalogue and continue into the shared resource viewer.', href: '/cnr-notes', access: 'CNR Notes Hub' },
  { icon: ShieldCheck, title: 'Academic Resource Vault', description: 'Search module notes, presentations, question papers, model papers and syllabus references in one place.', href: '/resources', access: 'Resource Vault' },
  { icon: CheckCircle2, title: 'Study planner', description: 'Create and manage a personal study checklist inside the application.', href: '/planner', access: 'Study Planner' },
];

function fileUrl(resource) {
  if (!resource.repositoryPath) return null;
  return import.meta.env.BASE_URL + resource.repositoryPath.split('/').map(encodeURIComponent).join('/');
}
function EarthArtwork() {
  return <div className="welcome-earth-art" role="img" aria-label="Illustration of Earth, atmosphere and natural resource systems">
    <div className="welcome-earth-orbit welcome-earth-orbit-a" /><div className="welcome-earth-orbit welcome-earth-orbit-b" />
    <div className="welcome-earth-globe"><span className="welcome-earth-land welcome-land-a" /><span className="welcome-earth-land welcome-land-b" /><span className="welcome-earth-cloud" /></div>
    <span className="welcome-earth-label welcome-label-a">BIODIVERSITY</span><span className="welcome-earth-label welcome-label-b">WATER SYSTEMS</span><span className="welcome-earth-label welcome-label-c">CLIMATE</span>
  </div>;
}
function SectionHeading({ eyebrow, title, text }) {
  return <div className="max-w-3xl"><p className="eyebrow">{eyebrow}</p><h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">{title}</h2>{text && <p className="mt-3 text-sm leading-7 text-mute sm:text-base">{text}</p>}</div>;
}

export default function NexusWelcome() {
  const { completed = {} } = useStudy();
  const [selectedModule, setSelectedModule] = useState(1);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [topicsExpanded, setTopicsExpanded] = useState(true);
  const [showAllOutcomes, setShowAllOutcomes] = useState(false);

  const moduleMatches = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return CNR_MODULES;
    return CNR_MODULES.filter((module) => {
      const resources = getModuleResources(module.number);
      const questions = getModuleQuestions(module.number);
      return [module.title, module.description, module.syllabus, ...module.topics,
        ...resources.map((resource) => resource.title),
        ...questions.flatMap((question) => [question.title, question.question, ...(question.answer?.keywords || [])]),
        ...QUESTION_PAPER_RESOURCES.map((resource) => resource.title),
      ].join(' ').toLowerCase().includes(query);
    });
  }, [search]);

  const activeModule = CNR_MODULES.find((module) => module.number === selectedModule) || CNR_MODULES[0];
  const activeResources = getModuleResources(activeModule.number);
  const activeQuestions = getModuleQuestions(activeModule.number);
  const activeDiagrams = getModuleDiagrams(activeModule.number);
  const stats = getModuleCatalogStats(activeModule.number);
  const visibleTopics = activeModule.topics.filter((topic) => !search || topic.toLowerCase().includes(search.toLowerCase()));
  const paperMatches = QUESTION_PAPER_RESOURCES.filter((resource) => !search || [resource.title, resource.description, ...(resource.tags || [])].join(' ').toLowerCase().includes(search.toLowerCase()));
  const selectModule = (number) => { setSelectedModule(number); setFilter('all'); setTopicsExpanded(true); };
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });

  const filteredResources = activeResources.filter((resource) => {
    const query = search.trim().toLowerCase();
    const text = [resource.title, resource.description, resource.category, ...(resource.tags || [])].join(' ').toLowerCase();
    if (query && !text.includes(query) && !activeModule.topics.some((topic) => topic.toLowerCase().includes(query))) return false;
    if (filter === 'notes') return resource.category === 'notes';
    if (filter === 'pdfs') return resource.repositoryPath?.toLowerCase().endsWith('.pdf');
    return filter === 'all';
  });
  const filteredQuestions = activeQuestions.filter((question) => !search || [question.title, question.question, ...(question.answer?.keywords || [])].join(' ').toLowerCase().includes(search.toLowerCase()));
  const filteredDiagrams = activeDiagrams.filter((diagram) => !search || [diagram.id, diagram.caption, diagram.questionTitle].join(' ').toLowerCase().includes(search.toLowerCase()));
  const visibleResourceCategories = FILTERS.filter((item) => {
    if (item.id === 'all') return true;
    if (item.id === 'notes') return activeResources.some((resource) => resource.category === 'notes');
    if (item.id === 'pdfs') return activeResources.some((resource) => resource.repositoryPath?.toLowerCase().endsWith('.pdf'));
    if (item.id === 'questions') return activeQuestions.length > 0;
    if (item.id === 'diagrams') return activeDiagrams.length > 0;
    if (item.id === 'papers') return QUESTION_PAPER_RESOURCES.length > 0;
    return item.id === 'practice';
  });

  return <main className="welcome-academic-page min-h-screen overflow-hidden bg-bg text-ink">
    <section className="welcome-academic-hero relative isolate overflow-hidden border-b border-line">
      <div className="welcome-academic-hero-glow" aria-hidden="true" />
      <header className="relative mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-5 sm:px-8">
        <a href="#/" className="flex min-w-0 items-center gap-3" aria-label="CNR-IA-2 home">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-line bg-panel text-brand shadow-lift"><GraduationCap size={23} /></span>
          <span className="min-w-0"><strong className="block tracking-wide">CNR-IA-2</strong><small className="block text-[9px] font-semibold tracking-[.14em] text-mute">CONSERVATION AND NATURAL RESOURCES</small></span>
        </a>
        <a href="#/learning-hub" className="btn-primary inline-flex shrink-0 items-center gap-2">Learning Hub <ArrowRight size={15} /></a>
      </header>
      <div className="relative mx-auto grid max-w-7xl items-center gap-6 px-4 pb-14 pt-8 sm:px-8 lg:min-h-[590px] lg:grid-cols-[1.06fr_.94fr] lg:gap-10 lg:py-16">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-panel/80 px-3 py-1.5 text-xs font-semibold tracking-wide text-brand"><Leaf size={14} /> VTU · 2022 SCHEME · SEVENTH SEMESTER</span>
          <h1 className="mt-6 text-4xl font-black leading-[1.02] tracking-tight sm:text-5xl lg:text-6xl">WELCOME TO <span className="text-brand">CNR-IA-2</span></h1>
          <p className="mt-3 text-lg font-semibold text-mute">Your Complete Conservation and Natural Resources Learning Environment</p>
          <div className="mt-5 flex flex-wrap gap-2 text-xs font-bold"><span className="rounded-full border border-line bg-panel px-3 py-1.5">BCV755B</span><span className="rounded-full border border-line bg-panel px-3 py-1.5">VTU</span><span className="rounded-full border border-line bg-panel px-3 py-1.5">5 official modules</span></div>
          <p className="mt-6 max-w-2xl text-sm leading-8 text-mute sm:text-base">Explore the science of Conservation and Natural Resources through structured academic modules, visual explanations, repository-catalogued study materials and VTU-focused examination preparation.</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <button type="button" onClick={() => scrollTo('welcome-modules')} className="btn-primary inline-flex items-center gap-2 px-5 py-3">Explore all modules <ArrowRight size={16} /></button>
            <a href="#/learning-hub" className="inline-flex items-center gap-2 rounded-xl border border-line bg-panel px-5 py-3 text-sm font-semibold hover:bg-sunk">Start learning <BookOpen size={16} /></a>
            <a href="#/resources" className="inline-flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-mute hover:bg-sunk">Learning resources <LibraryBig size={16} /></a>
          </div>
          <div className="mt-9 grid max-w-xl grid-cols-3 gap-4 border-t border-line pt-5">
            <div><strong className="block text-2xl font-black tabular-nums">{CNR_MODULES.length}</strong><span className="text-xs text-mute">Official modules</span></div>
            <div><strong className="block text-2xl font-black tabular-nums">{QUESTIONS.length}</strong><span className="text-xs text-mute">Published answers</span></div>
            <div><strong className="block text-2xl font-black tabular-nums">{DRIVE_RESOURCES.length}</strong><span className="text-xs text-mute">Catalogued resources</span></div>
          </div>
        </div>
        <EarthArtwork />
      </div>
    </section>

    <nav className="welcome-section-nav sticky top-16 z-20 border-b border-line bg-bg/90 backdrop-blur" aria-label="Welcome page sections">
      <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 py-2 text-xs sm:px-8">
        {[['about','About CNR'],['outcomes','Learning outcomes'],['welcome-modules','Module explorer'],['welcome-resources','Resources'],['welcome-features','Platform features'],['welcome-journey','Study path']].map(([id,label]) => <button key={id} type="button" onClick={() => scrollTo(id)} className="shrink-0 rounded-lg px-3 py-2 font-semibold text-mute hover:bg-sunk hover:text-ink">{label}</button>)}
      </div>
    </nav>

    <section id="about" className="scroll-mt-28 mx-auto max-w-7xl px-4 py-14 sm:px-8">
      <SectionHeading eyebrow="01 / THE SUBJECT" title="About Conservation and Natural Resources" text="The BCV755B syllabus approaches conservation through connected land, water, air, biodiversity and climate-related study areas. It links natural-resource understanding with resource planning, pollution, ecosystem functioning and environmental assessment." />
      <div className="mt-7 grid gap-4 md:grid-cols-3">
        {[['Natural resources','Land, water, soil and air are studied as resources whose availability, quality and use need informed planning.'],['Ecological systems','Biodiversity, flora and fauna, biogeochemical cycling and ecosystem components connect living organisms with their environment.'],['Conservation decisions','Soil and water conservation, pollution control, biodiversity measures and EIA introduce practical resource-management concerns.']].map(([title,description],index) => <article key={title} className="card p-5"><span className="text-xs font-bold text-brand">0{index+1}</span><h3 className="mt-3 font-bold">{title}</h3><p className="mt-2 text-sm leading-7 text-mute">{description}</p></article>)}
      </div>
      <div className="mt-5 rounded-2xl border border-line bg-sunk/50 p-5"><p className="text-sm font-semibold">Why this subject matters</p><p className="mt-2 text-sm leading-7 text-mute">The syllabus asks students to consider resource availability and demand, land-use and soil impacts, air pollution and its effects, biodiversity and ecosystem functioning, and contemporary environmental concerns. These topics support more informed thinking about conservation and sustainable use.</p></div>
    </section>

    <section id="outcomes" className="scroll-mt-28 border-y border-line bg-sunk/35 py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <SectionHeading eyebrow="02 / WHAT YOU WILL STUDY" title="Course objectives and official outcomes" text="The objectives and course outcomes below are transcribed from the BCV755B syllabus. They are kept separate from the explanatory learning summaries used elsewhere on this page." />
        <div className="mt-7 grid gap-5 lg:grid-cols-2">
          <article className="card p-5"><div className="flex items-center gap-2"><Target size={18} className="text-brand" /><h3 className="font-bold">Course objectives</h3></div><ol className="mt-4 space-y-3">{COURSE_OBJECTIVES.map((item,index) => <li key={item} className="flex gap-3 text-sm leading-6 text-mute"><span className="font-bold text-brand">{index+1}.</span><span>{item}</span></li>)}</ol></article>
          <article className="card p-5"><div className="flex items-center gap-2"><CheckCircle2 size={18} className="text-brand" /><h3 className="font-bold">Course outcomes (official syllabus)</h3></div><ol className="mt-4 space-y-3">{COURSE_OUTCOMES.slice(0,showAllOutcomes?5:3).map((item,index) => <li key={item} className="flex gap-3 text-sm leading-6 text-mute"><span className="font-bold text-brand">CO{index+1}</span><span>{item}</span></li>)}</ol><button type="button" onClick={() => setShowAllOutcomes((value) => !value)} className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-brand">{showAllOutcomes?'Show fewer':'Show all five outcomes'}<ChevronDown size={14} className={showAllOutcomes?'rotate-180':''}/></button></article>
        </div>
      </div>
    </section>

    <section id="welcome-modules" className="scroll-mt-28 mx-auto max-w-7xl px-4 py-14 sm:px-8">
      <SectionHeading eyebrow="03 / OFFICIAL SYLLABUS · MODULE EXPLORER" title="Explore all five modules" text="The module names and topic lists follow the BCV755B syllabus. Resource and question counts are calculated from the repository catalogue and published question bank; they are not estimates of total syllabus coverage." />
      <div className="relative mt-6 max-w-2xl"><Search size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-mute"/><input value={search} onChange={(event)=>setSearch(event.target.value)} placeholder="Search modules, topics, questions and resources…" aria-label="Search modules, syllabus topics and resources" className="h-12 w-full rounded-xl border border-line bg-panel pl-10 pr-4 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"/></div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
        {moduleMatches.map((module) => {
          const Icon = ICONS[module.icon] || BookOpen;
          const stats = getModuleCatalogStats(module.number);
          const done = getModuleQuestions(module.number).filter((question) => completed[question.id]).length;
          return <button key={module.number} type="button" onClick={() => selectModule(module.number)} aria-pressed={selectedModule===module.number} className={'welcome-module-tile card flex min-h-52 flex-col p-4 text-left transition hover:-translate-y-1 ' + (selectedModule===module.number?'is-selected':'')}>
            <div className="flex items-center justify-between"><span className="grid h-10 w-10 place-items-center rounded-xl bg-brand/10 text-brand"><Icon size={20}/></span><span className="text-xs font-bold text-mute">0{module.number} / 05</span></div>
            <span className="mt-4 text-xs font-bold tracking-[.14em] text-brand">{module.eyebrow}</span>
            <strong className="mt-2 text-lg">{module.title}</strong>
            {module.secondaryHeading && <span className="text-xs text-mute">+ {module.secondaryHeading}</span>}
            <span className="mt-auto pt-4 text-xs leading-5 text-mute">{stats.topicCount} syllabus topics · {stats.resourceCount} catalogued items · {stats.questionCount} answers</span>
            {done>0 && <span className="mt-2 text-[11px] font-semibold text-brand">{done}/{stats.questionCount} published answers completed</span>}
          </button>;
        })}
        {!moduleMatches.length && <p className="rounded-xl bg-sunk p-4 text-sm text-mute">No modules or indexed content match this search.</p>}
      </div>

      <article className="welcome-module-detail card mt-5 overflow-hidden" aria-labelledby="welcome-active-module">
        <div className="welcome-module-detail-head p-5 sm:p-7">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="max-w-3xl"><p className="text-xs font-bold tracking-[.16em] text-brand">MODULE 0{activeModule.number} · {activeModule.eyebrow}</p><h3 id="welcome-active-module" className="mt-2 text-2xl font-black sm:text-3xl">{activeModule.title}{activeModule.secondaryHeading ? ' & ' + activeModule.secondaryHeading : ''}</h3><p className="mt-3 text-sm leading-7 text-mute">{activeModule.description}</p></div>
            <span className="rounded-xl border border-line bg-panel px-3 py-2 text-xs font-semibold text-mute">{stats.topicCount} syllabus topics</span>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            <a href={activeModule.number>=3?'#/module/'+activeModule.number:'#/cnr-notes/module/'+activeModule.number} className="btn-primary inline-flex items-center gap-2">Start module <ArrowRight size={15}/></a>
            <a href={'#/cnr-notes/module/'+activeModule.number} className="inline-flex items-center gap-2 rounded-xl border border-line bg-panel px-4 py-2 text-sm font-semibold hover:bg-sunk">Read notes <BookOpen size={15}/></a>
            <a href="#/resources" className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-mute hover:bg-sunk">Browse all resources <LibraryBig size={15}/></a>
          </div>
        </div>
        <div className="grid gap-0 border-t border-line lg:grid-cols-[1.05fr_.95fr]">
          <section className="p-5 sm:p-7">
            <div className="flex items-center justify-between gap-3"><div><p className="eyebrow">TOPIC BREAKDOWN</p><h4 className="mt-1 text-lg font-bold">What this module covers</h4></div><button type="button" onClick={() => setTopicsExpanded((value) => !value)} aria-expanded={topicsExpanded} className="btn-quiet">{topicsExpanded?'Collapse':'Expand'} <ChevronDown size={14} className={topicsExpanded?'rotate-180':''}/></button></div>
            {topicsExpanded && <ol className="mt-4 grid gap-2 sm:grid-cols-2">{visibleTopics.map((topic) => <li key={topic} className="flex gap-2 rounded-xl border border-line/70 bg-panel/60 p-3 text-sm leading-6"><span className="text-xs font-bold text-brand">{String(activeModule.topics.indexOf(topic)+1).padStart(2,'0')}</span><span>{topic}</span></li>)}</ol>}
            {!visibleTopics.length && <p className="mt-4 rounded-xl bg-sunk p-4 text-sm text-mute">No syllabus topics match this search.</p>}
            <div className="mt-5 rounded-xl border border-line bg-sunk/45 p-4"><p className="text-xs font-bold text-brand">OFFICIAL SYLLABUS TEXT</p><p className="mt-2 text-sm leading-7 text-mute">{activeModule.syllabus}</p></div>
          </section>
          <section className="border-t border-line p-5 sm:p-7 lg:border-l lg:border-t-0">
            <p className="eyebrow">RELATED CONTENT</p><h4 className="mt-1 text-lg font-bold">Verified items in this app</h4>
            <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Filter module resources">
              {visibleResourceCategories.map((item) => <button key={item.id} type="button" onClick={() => setFilter(item.id)} aria-pressed={filter===item.id} className={'rounded-full border px-3 py-1.5 text-xs font-semibold ' + (filter===item.id?'border-brand bg-brand/10 text-brand':'border-line text-mute hover:bg-sunk')}>{item.label}</button>)}
            </div>
            {(filter==='all'||filter==='notes'||filter==='pdfs') && <div className="mt-4 space-y-2">
              {filteredResources.map((resource) => <a key={resource.id} href={fileUrl(resource)||'#/resources'} target={resource.repositoryPath?'_blank':undefined} rel={resource.repositoryPath?'noreferrer':undefined} className="welcome-resource-row flex items-center gap-3 rounded-xl border border-line p-3 hover:border-brand/50"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand/10 text-brand"><FileText size={16}/></span><span className="min-w-0 flex-1"><strong className="block text-sm">{resource.title}</strong><small className="mt-1 block text-xs text-mute">{resource.category==='presentations'?'Presentation':'PDF'} · {resource.sourceLabel}</small></span><ExternalLink size={14} className="shrink-0 text-mute"/></a>)}
              {!filteredResources.length&&<p className="rounded-xl bg-sunk p-4 text-sm text-mute">No matching files are catalogued for this filter.</p>}
            </div>}
            {(filter==='all'||filter==='questions') && <div className="mt-4 space-y-2">
              {filteredQuestions.map((question) => <a key={question.id} href={'#/q/'+question.id} className="block rounded-xl border border-line p-3 hover:border-brand/50"><span className="text-xs font-bold text-brand">{question.code} · 10 MARKS</span><strong className="mt-1 block text-sm">{question.title}</strong><span className="mt-1 block text-xs leading-5 text-mute">{question.question}</span></a>)}
              {!filteredQuestions.length&&filter==='questions'&&<p className="rounded-xl bg-sunk p-4 text-sm text-mute">No published question-bank answers are mapped to this module yet.</p>}
            </div>}
            {(filter==='all'||filter==='diagrams') && <div className="mt-4 space-y-2">
              {filteredDiagrams.map((diagram,index) => <a key={diagram.id+'-'+diagram.questionId+'-'+index} href={'#/q/'+diagram.questionId} className="block rounded-xl border border-line p-3 hover:border-brand/50"><strong className="block text-sm">{diagram.caption || diagram.id}</strong><span className="mt-1 block text-xs text-mute">{diagram.questionCode} · {diagram.questionTitle} · open answer diagram</span></a>)}
              {!activeDiagrams.length&&filter==='diagrams'&&<p className="rounded-xl bg-sunk p-4 text-sm text-mute">No answer diagrams are currently mapped to this module in the published question bank.</p>}
            </div>}
            {filter==='papers' && <div className="mt-4 space-y-2">{paperMatches.map((resource) => <a key={resource.id} href={fileUrl(resource)} target="_blank" rel="noreferrer" className="block rounded-xl border border-line p-3 hover:border-brand/50"><strong className="block text-sm">{resource.title}</strong><span className="mt-1 block text-xs text-mute">Whole-course paper · {resource.year || 'Additional practice'}</span></a>)}</div>}
            {filter==='practice' && <div className="mt-4 grid gap-2 sm:grid-cols-2">{[['Practice questions','/practice'],['Quiz centre','/quiz'],['VTU exam simulator','/exam'],['Visual Learning Studio','/visual-studio']].map(([label,href]) => <a key={href} href={'#'+href} className="rounded-xl border border-line p-3 text-sm font-semibold hover:border-brand/50">{label} <ArrowRight size={14} className="inline text-brand"/></a>)}</div>}
            <p className="mt-4 text-[11px] leading-5 text-mute">Resource counts include repository-catalogued module files, published questions and answer diagrams. Whole-course papers are shown separately and are not assigned to an individual module. No PDF page or figure number is inferred.</p>
          </section>
        </div>
      </article>
    </section>

    <section id="welcome-resources" className="scroll-mt-28 border-y border-line bg-sunk/35 py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <SectionHeading eyebrow="04 / THE RESOURCE COLLECTION" title="Study files and examination references" text="The catalogue contains module PDFs and presentations, whole-course examination papers, a model paper and syllabus references. Open each original repository file or continue into the resource viewer." />
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{SYLLABUS_RESOURCES.map((resource) => <a key={resource.id} href={fileUrl(resource)} target="_blank" rel="noreferrer" className="card flex items-start gap-3 p-4"><FileText className="mt-1 text-brand" size={19}/><span><strong className="block text-sm">{resource.title}</strong><small className="mt-1 block text-xs leading-5 text-mute">{resource.description}</small></span></a>)}</div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">{paperMatches.map((resource) => <a key={resource.id} href={fileUrl(resource)} target="_blank" rel="noreferrer" className="card flex items-start gap-3 p-4"><FileQuestion className="mt-1 text-brand" size={19}/><span><strong className="block text-sm">{resource.title}</strong><small className="mt-1 block text-xs leading-5 text-mute">{resource.description} · {resource.year || 'Additional practice'}</small></span></a>)}</div>
        <p className="mt-3 text-xs text-mute">The model paper is listed as supplementary practice. Its original filename references 21CV654; it is not represented as an official BCV755B paper.</p>
      </div>
    </section>

    <section id="welcome-features" className="scroll-mt-28 mx-auto max-w-7xl px-4 py-14 sm:px-8">
      <SectionHeading eyebrow="05 / PLATFORM CAPABILITIES" title="What CNR-IA-2 currently offers" text="These cards describe routes and features present in the current application. Planned or unavailable capabilities are not advertised as working features." />
      <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{FEATURES.map(({icon:Icon,title,description,href,access}) => <article key={title} className="card flex min-h-48 flex-col p-5"><span className="grid h-10 w-10 place-items-center rounded-xl bg-brand/10 text-brand"><Icon size={19}/></span><h3 className="mt-4 font-bold">{title}</h3><p className="mt-2 flex-1 text-sm leading-6 text-mute">{description}</p><a href={'#'+href} className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-brand">{access}<ArrowRight size={14}/></a></article>)}</div>
    </section>

    <section id="welcome-journey" className="scroll-mt-28 border-y border-line bg-sunk/35 py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <SectionHeading eyebrow="06 / A PRACTICAL STUDY WORKFLOW" title="From syllabus to confident preparation" text="Use the official module outline as your map, then move through the materials and tools that are actually published." />
        <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{[['01','Read the syllabus','Begin with the official module topics and course outcomes.'],['02','Open module notes','Use the matching PDF notes and lecture presentation in the resource catalogue.'],['03','Study and practise','Work through published answers, diagrams, quizzes and practice tools.'],['04','Review progress','Bookmark difficult questions and revisit your saved study activity.']].map(([number,title,description])=><article key={number} className="card p-5"><span className="text-xs font-black text-brand">{number}</span><h3 className="mt-2 font-bold">{title}</h3><p className="mt-2 text-sm leading-6 text-mute">{description}</p></article>)}</div>
      </div>
    </section>

    <footer className="mx-auto max-w-7xl px-4 py-14 text-center sm:px-8">
      <p className="eyebrow">BCV755B · VTU</p><h2 className="mt-2 text-3xl font-black tracking-tight">Start with the syllabus. Learn with purpose.</h2><p className="mt-3 text-sm text-mute">Your journey towards understanding and protecting our natural environment begins here.</p>
      <div className="mt-6 flex flex-wrap justify-center gap-3"><a href="#/learning-hub" className="btn-primary inline-flex items-center gap-2 px-5 py-3">Start learning <ArrowRight size={16}/></a><a href="#/resources" className="inline-flex items-center gap-2 rounded-xl border border-line bg-panel px-5 py-3 text-sm font-semibold">Open Resource Vault <LibraryBig size={16}/></a></div>
      <div className="mt-8 border-t border-line pt-5 text-xs text-mute"><p>Academic source: <a className="font-semibold text-brand hover:underline" href={SYLLABUS_SOURCE.url} target="_blank" rel="noreferrer">{SYLLABUS_SOURCE.label} <ExternalLink size={12} className="inline"/></a></p><p className="mt-2">No PDF page or figure number is inferred where the repository content has not been page-verified.</p></div>
    </footer>
  </main>;
}

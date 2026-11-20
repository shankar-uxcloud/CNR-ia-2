import { ArrowRight, BookOpen, ClipboardList, FileText, LibraryBig, LockKeyhole, NotebookTabs } from 'lucide-react';
import { LEARNING_MODULES, LEARNING_TOOLS } from '../data/learningCatalog';

const icons = { materials: LibraryBig, pyqs: FileText, mqps: ClipboardList, practice: NotebookTabs };
function Status({ available }) {
  return <span className={available ? 'rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-600' : 'rounded-full border border-line bg-sunk px-2.5 py-1 text-xs font-semibold text-mute'}>{available ? 'Available' : 'Planned'}</span>;
}
export default function LearningHub() {
  const ready = LEARNING_MODULES.filter((item) => item.status === 'available').length;
  return <main className="mx-auto max-w-6xl px-4 py-8 sm:px-8 sm:py-10">
    <p className="eyebrow">ULTIMATE VTU EXAMPREP 2.0</p>
    <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
      <div><h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Learning Hub</h1><p className="mt-2 max-w-2xl text-mute">One organized workspace for module notes, study resources, previous papers and exam practice.</p></div>
      <div className="rounded-2xl border border-line bg-panel px-4 py-3"><p className="text-xs text-mute">Question-bank modules</p><p className="text-2xl font-bold tabular-nums">{ready} <span className="text-sm font-medium text-mute">/ 5</span></p></div>
    </div>
    <section className="mt-8" aria-labelledby="modules-heading">
      <div className="mb-4 flex items-center gap-2"><BookOpen size={19} className="text-brand"/><h2 id="modules-heading" className="text-xl font-bold">Study by module</h2></div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {LEARNING_MODULES.map((module) => <article key={module.number} className="card flex min-h-48 flex-col p-5">
          <div className="flex items-center justify-between gap-2"><span className="text-xs font-bold uppercase tracking-wider text-mute">Module {module.number}</span><Status available={module.status === 'available'}/></div>
          <h3 className="mt-4 text-lg font-bold">{module.title}</h3><p className="mt-1 text-sm text-mute">{module.subtitle}</p>
          <div className="mt-auto flex items-center justify-between pt-5"><span className="text-xs text-mute">{module.questionCount ? module.questionCount + ' question-bank items' : 'Content not yet added'}</span>
            {module.href ? <a className="inline-flex items-center gap-1 text-sm font-semibold text-brand hover:underline" href={'#' + module.href}>Open module <ArrowRight size={15}/></a> : <span className="inline-flex items-center gap-1 text-xs text-mute"><LockKeyhole size={13}/> Awaiting source notes</span>}
          </div>
        </article>)}
      </div>
    </section>
    <section className="mt-10" aria-labelledby="resources-heading">
      <div className="mb-4 flex items-center gap-2"><LibraryBig size={19} className="text-brand"/><h2 id="resources-heading" className="text-xl font-bold">Learning resources</h2></div>
      <div className="grid gap-3 sm:grid-cols-2">
        {LEARNING_TOOLS.map((tool) => { const Icon = icons[tool.id]; return <article key={tool.id} className="card flex items-start gap-4 p-5">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand/10 text-brand"><Icon size={21}/></span>
          <div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><h3 className="font-bold">{tool.title}</h3><Status available={tool.status === 'available'}/></div><p className="mt-1 text-sm text-mute">{tool.description}</p>
            {tool.href && <a href={'#' + tool.href} className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand hover:underline">{tool.id === 'mqps' ? 'Explore papers' : 'Start practising'} <ArrowRight size={15}/></a>}
            {tool.id === 'materials' && <a href="#/resources" className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand hover:underline">Open Resource Vault <ArrowRight size={15}/></a>}
          </div>
        </article>; })}
      </div>
    </section>
    <p className="mt-8 rounded-xl border border-line bg-sunk/60 p-4 text-sm text-mute">Content marked Planned is a roadmap item, not a downloadable resource yet. Verified notes and original question papers will be added as their source files are available.</p>
  </main>;
}

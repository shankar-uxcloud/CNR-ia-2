import { ArrowRight, BookOpen, FileText, Layers3, LibraryBig, Presentation } from 'lucide-react';
import { DRIVE_RESOURCES, RESOURCE_CATEGORIES } from '../data/resourceCatalog';

const MODULES = [1, 2, 3, 4, 5];

export default function CNRNotes() {
  const total = DRIVE_RESOURCES.length;
  const noteCount = DRIVE_RESOURCES.filter((item) => item.category === 'notes').length;

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-8 sm:py-10">
      <p className="eyebrow">CNR NOTES · INTEGRATED STUDY LIBRARY</p>
      <div className="mt-2 grid gap-6 lg:grid-cols-[1.4fr_.6fr] lg:items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Your CNR notes, all in one place.</h1>
          <p className="mt-3 max-w-2xl text-mute">
            Explore the five BCV755B modules, open original study files and continue into the shared
            academic library without leaving your CNR-IA-2 workspace.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="card p-4"><p className="text-xs text-mute">Published resources</p><p className="mt-1 text-2xl font-bold tabular-nums">{total}</p></div>
          <div className="card p-4"><p className="text-xs text-mute">Module notes</p><p className="mt-1 text-2xl font-bold tabular-nums">{noteCount}</p></div>
        </div>
      </div>

      <section className="mt-8" aria-labelledby="cnr-notes-modules">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div><p className="eyebrow">01 / STUDY BY MODULE</p><h2 id="cnr-notes-modules" className="mt-1 text-2xl font-bold">Choose your module</h2></div>
          <a href="#/resources" className="btn-quiet">Browse all resources <ArrowRight size={15} className="ml-1 inline" /></a>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
          {MODULES.map((module) => {
            const items = DRIVE_RESOURCES.filter((item) => Number(item.module) === module);
            const notes = items.filter((item) => item.category === 'notes').length;
            return (
              <a key={module} href={`#/cnr-notes/module/${module}`} className="card group flex min-h-44 flex-col p-5 transition hover:-translate-y-1 hover:border-brand/50">
                <span className="flex items-center justify-between">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand/10 text-brand"><BookOpen size={19} /></span>
                  <span className="text-xs font-semibold text-mute">0{module} / 05</span>
                </span>
                <span className="mt-5 text-lg font-bold">Module {module}</span>
                <span className="mt-1 text-sm text-mute">{notes} note file{notes === 1 ? '' : 's'} · {items.length} resource{items.length === 1 ? '' : 's'}</span>
                <span className="mt-auto flex items-center gap-1 pt-4 text-sm font-semibold text-brand">Explore module <ArrowRight size={15} className="transition group-hover:translate-x-1" /></span>
              </a>
            );
          })}
        </div>
      </section>

      <section className="mt-9" aria-labelledby="cnr-notes-categories">
        <p className="eyebrow">02 / THE ACADEMIC LIBRARY</p>
        <h2 id="cnr-notes-categories" className="mt-1 text-2xl font-bold">More than notes</h2>
        <p className="mt-2 max-w-2xl text-sm text-mute">The same searchable catalogue also brings together presentations, previous question papers, model papers and syllabus references.</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {RESOURCE_CATEGORIES.map((category, index) => {
            const count = DRIVE_RESOURCES.filter((item) => item.category === category.id).length;
            const Icon = [BookOpen, Presentation, FileText, Layers3, LibraryBig][index] || FileText;
            return (
              <a key={category.id} href="#/resources" className="card flex items-center gap-3 p-4 transition hover:border-brand/50">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand/10 text-brand"><Icon size={18} /></span>
                <span className="min-w-0"><span className="block text-sm font-semibold">{category.label}</span><span className="mt-1 block text-xs text-mute">{count} resource{count === 1 ? '' : 's'}</span></span>
              </a>
            );
          })}
        </div>
      </section>

      <section className="mt-9 rounded-2xl border border-line bg-sunk/60 p-5 sm:p-6">
        <div className="flex items-start gap-3">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand/10 text-brand"><LibraryBig size={20} /></span>
          <div>
            <h2 className="font-bold">One shared CNR workspace</h2>
            <p className="mt-1 text-sm text-mute">Your module notes open in the existing Academic Resource Vault, with its search, filters, saved resources, recent items and in-browser document reader. No second account or duplicate library is needed.</p>
            <a href="#/resources" className="btn-primary mt-4 inline-flex">Open Academic Resource Vault <ArrowRight size={15} className="ml-1" /></a>
          </div>
        </div>
      </section>
    </main>
  );
}

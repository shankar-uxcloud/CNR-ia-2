import { useEffect, useMemo, useState } from 'react';
import { Bookmark, BookOpen, ExternalLink, FileText, FolderOpen, Search, ShieldCheck, Star, X } from 'lucide-react';
import { DRIVE_RESOURCES, RESOURCE_CATEGORIES } from '../data/resourceCatalog';
import { getDriveFileId, getDrivePreviewUrl, getDriveOpenUrl } from '../lib/driveResources';

const BOOKMARK_KEY = 'cnr-resource-vault-bookmarks-v1';
const RECENT_KEY = 'cnr-resource-vault-recent-v1';
const readList = (key) => { try { const value = JSON.parse(localStorage.getItem(key) || '[]'); return Array.isArray(value) ? value : []; } catch { return []; } };
const writeList = (key, value) => { try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* Private browsing or storage limits: keep the page usable. */ } };

function driveLink(resource, mode = 'open') {
  const id = getDriveFileId(resource.url);
  if (!id) return resource.url;
  return mode === 'preview' ? getDrivePreviewUrl(id) : getDriveOpenUrl(id);
}

export default function ResourceVault() {
  const [search, setSearch] = useState('');
  const [moduleFilter, setModuleFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [savedOnly, setSavedOnly] = useState(false);
  const [bookmarks, setBookmarks] = useState(() => readList(BOOKMARK_KEY));
  const [recent, setRecent] = useState(() => readList(RECENT_KEY));
  const [selected, setSelected] = useState(null);

  useEffect(() => writeList(BOOKMARK_KEY, bookmarks), [bookmarks]);
  useEffect(() => writeList(RECENT_KEY, recent), [recent]);

  const resources = useMemo(() => DRIVE_RESOURCES.filter((item) => {
    const query = search.trim().toLowerCase();
    const matchesSearch = !query || [item.title, item.description, item.module, item.category, ...(item.tags || [])].join(' ').toLowerCase().includes(query);
    return matchesSearch && (moduleFilter === 'all' || String(item.module) === moduleFilter)
      && (categoryFilter === 'all' || item.category === categoryFilter)
      && (!savedOnly || bookmarks.includes(item.id));
  }), [search, moduleFilter, categoryFilter, savedOnly, bookmarks]);

  const openResource = (item, mode = 'open') => {
    const url = driveLink(item, mode);
    if (!url) return;
    const next = [item.id, ...recent.filter((id) => id !== item.id)].slice(0, 8);
    setRecent(next);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const toggleBookmark = (id) => setBookmarks((items) => items.includes(id) ? items.filter((item) => item !== id) : [...items, id]);

  return <main className="mx-auto max-w-6xl px-4 py-8 sm:px-8 sm:py-10">
    <p className="eyebrow">CNR-IA-2 · RESOURCE SYSTEM</p>
    <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
      <div><h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Academic Resource Vault</h1>
        <p className="mt-2 max-w-2xl text-mute">One searchable library for notes, PYQs, model papers and assignments — hosted on Google Drive, with no application backend.</p></div>
      <div className="rounded-2xl border border-line bg-panel px-4 py-3"><p className="text-xs text-mute">Published resources</p><p className="text-2xl font-bold tabular-nums">{DRIVE_RESOURCES.length}</p></div>
    </div>

    <section className="mt-6 grid gap-3 sm:grid-cols-3" aria-label="Vault features">
      <div className="card flex items-center gap-3 p-4"><FolderOpen className="text-brand" size={20}/><div><p className="font-semibold">Module-wise</p><p className="text-xs text-mute">M1–M5 organization</p></div></div>
      <div className="card flex items-center gap-3 p-4"><FileText className="text-brand" size={20}/><div><p className="font-semibold">Category-wise</p><p className="text-xs text-mute">Notes, PYQs, MQPs, more</p></div></div>
      <div className="card flex items-center gap-3 p-4"><ShieldCheck className="text-brand" size={20}/><div><p className="font-semibold">Public access</p><p className="text-xs text-mute">Anyone with the Drive link</p></div></div>
    </section>

    <section className="mt-7 card p-4 sm:p-5" aria-label="Resource filters">
      <div className="relative"><Search size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-mute"/><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search title, topic, module or tag…" aria-label="Search resources" className="h-11 w-full rounded-xl border border-line bg-panel pl-10 pr-10 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"/>{search && <button onClick={() => setSearch('')} aria-label="Clear search" className="absolute right-2 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-lg hover:bg-sunk"><X size={15}/></button>}</div>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <label className="text-xs font-semibold text-mute">MODULE <select value={moduleFilter} onChange={(e) => setModuleFilter(e.target.value)} className="ml-1 h-9 rounded-lg border border-line bg-panel px-2 text-sm text-ink"><option value="all">All modules</option>{[1,2,3,4,5].map((n) => <option key={n} value={String(n)}>Module {n}</option>)}</select></label>
        <label className="text-xs font-semibold text-mute">CATEGORY <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="ml-1 h-9 rounded-lg border border-line bg-panel px-2 text-sm text-ink"><option value="all">All categories</option>{RESOURCE_CATEGORIES.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}</select></label>
        <button type="button" onClick={() => setSavedOnly((value) => !value)} aria-pressed={savedOnly} className={savedOnly ? 'btn-primary' : 'btn-quiet'}><Bookmark size={14} className="mr-1 inline"/> Saved ({bookmarks.length})</button>
        <span className="ml-auto text-xs text-mute" aria-live="polite">{resources.length} resource{resources.length === 1 ? '' : 's'}</span>
      </div>
    </section>

    {resources.length ? <section className="mt-5 grid gap-3 md:grid-cols-2" aria-label="Resource results">
      {resources.map((item) => <article key={item.id} className="card flex flex-col p-5">
        <div className="flex items-start justify-between gap-3"><span className="rounded-full border border-brand/25 bg-brand/10 px-2.5 py-1 text-xs font-semibold text-brand">{RESOURCE_CATEGORIES.find((cat) => cat.id === item.category)?.label || item.category}</span>
          <button type="button" onClick={() => toggleBookmark(item.id)} aria-label={bookmarks.includes(item.id) ? 'Remove saved resource' : 'Save resource'} aria-pressed={bookmarks.includes(item.id)} className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-line hover:bg-sunk"><Bookmark size={17} fill={bookmarks.includes(item.id) ? 'currentColor' : 'none'}/></button></div>
        <h2 className="mt-3 text-lg font-bold">{item.title}</h2><p className="mt-1 text-sm text-mute">{item.description}</p>
        <div className="mt-3 flex flex-wrap gap-2 text-xs text-mute"><span className="rounded-md bg-sunk px-2 py-1">Module {item.module}</span>{item.year && <span className="rounded-md bg-sunk px-2 py-1">{item.year}</span>}{item.fileSize && <span className="rounded-md bg-sunk px-2 py-1">{item.fileSize}</span>}</div>
        <div className="mt-auto flex flex-wrap gap-2 pt-5"><button type="button" onClick={() => setSelected(item)} className="btn-primary"><BookOpen size={15} className="mr-1 inline"/> Preview details</button><button type="button" onClick={() => openResource(item)} className="btn-quiet"><ExternalLink size={15} className="mr-1 inline"/> Open Drive PDF</button></div>
      </article>)}
    </section> : <section className="card mt-5 p-8 text-center">
      <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-brand/10 text-brand"><FileText size={26}/></div>
      <h2 className="mt-4 text-xl font-bold">{DRIVE_RESOURCES.length ? 'No matching resources' : 'Your resource library is ready'}</h2>
      <p className="mx-auto mt-2 max-w-xl text-sm text-mute">{DRIVE_RESOURCES.length ? 'Try changing the search or filters.' : 'No PDF links have been published in the catalogue yet. Once public Google Drive links are added to the resource catalogue, they will appear here automatically.'}</p>
      {(search || moduleFilter !== 'all' || categoryFilter !== 'all' || savedOnly) && <button type="button" onClick={() => {setSearch('');setModuleFilter('all');setCategoryFilter('all');setSavedOnly(false);}} className="btn-quiet mt-4">Clear filters</button>}
    </section>}

    {recent.length > 0 && <p className="mt-5 text-xs text-mute">Recently opened: {recent.map((id) => DRIVE_RESOURCES.find((item) => item.id === id)?.title).filter(Boolean).join(' · ')}</p>}

    <section className="mt-8 rounded-2xl border border-line bg-sunk/60 p-5">
      <h2 className="font-bold">How PDFs are published</h2>
      <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-mute"><li>Upload each PDF to Google Drive and organize it in both a module folder and a category folder (or use a shared master folder with module/category metadata).</li><li>Set General access to <strong>Anyone with the link</strong> and role to <strong>Viewer</strong>.</li><li>Copy the share link and add its title, module, category and URL to <code>src/data/resourceCatalog.js</code>.</li><li>Commit the catalogue update; GitHub Pages rebuilds and publishes the updated vault.</li></ol>
      <p className="mt-3 text-xs text-mute">Public links can be forwarded. Viewer settings do not guarantee that a PDF cannot be copied, screenshotted or downloaded.</p>
    </section>

    {selected && <div className="fixed inset-0 z-[80] grid place-items-center bg-black/60 p-4" role="dialog" aria-modal="true" aria-labelledby="resource-dialog-title" onMouseDown={(e) => {if (e.target === e.currentTarget) setSelected(null);}}>
      <div className="w-full max-w-lg rounded-2xl border border-line bg-panel p-5 shadow-lift"><div className="flex items-start justify-between gap-3"><div><p className="eyebrow">RESOURCE DETAILS</p><h2 id="resource-dialog-title" className="mt-1 text-xl font-bold">{selected.title}</h2></div><button onClick={() => setSelected(null)} aria-label="Close details" className="grid h-9 w-9 place-items-center rounded-lg hover:bg-sunk"><X size={18}/></button></div>
        <p className="mt-3 text-sm text-mute">{selected.description}</p><div className="mt-3 text-sm">Module {selected.module} · {RESOURCE_CATEGORIES.find((cat) => cat.id === selected.category)?.label || selected.category}</div>
        <div className="mt-5 flex flex-wrap gap-2"><button onClick={() => openResource(selected, 'preview')} className="btn-primary">Preview on Google Drive</button><button onClick={() => openResource(selected)} className="btn-quiet">Open Drive</button></div>
      </div>
    </div>}
  </main>;
}

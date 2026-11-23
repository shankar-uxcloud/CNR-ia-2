import { useEffect, useMemo, useRef, useState } from 'react';
import { Bookmark, BookOpen, ExternalLink, FileText, FolderOpen, Maximize2, Search, ShieldCheck, X, Minimize2, Clock3, SlidersHorizontal, ChevronDown } from 'lucide-react';
import './ResourceVault.css';
import { DRIVE_RESOURCES, RESOURCE_CATEGORIES } from '../data/resourceCatalog';
import { getDriveFileId, getDrivePreviewUrl, getDriveOpenUrl } from '../lib/driveResources';
import { getDocumentKind, getDocumentViewerUrl } from '../lib/documentViewer';

const getRepositoryUrl = (resource) => resource.repositoryPath
  ? `${import.meta.env.BASE_URL}${resource.repositoryPath.split('/').map(encodeURIComponent).join('/')}`
  : null;

const BOOKMARK_KEY = 'cnr-resource-vault-bookmarks-v1';
const RECENT_KEY = 'cnr-resource-vault-recent-v1';
const readList = (key) => { try { const value = JSON.parse(localStorage.getItem(key) || '[]'); return Array.isArray(value) ? value : []; } catch { return []; } };
const writeList = (key, value) => { try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* Keep the library usable when storage is unavailable. */ } };

function driveLink(resource, mode = 'open') {
  const url = resource.driveUrl || resource.url;
  const id = getDriveFileId(url);
  if (!id) return url || null;
  return mode === 'preview' ? getDrivePreviewUrl(id) : getDriveOpenUrl(id);
}

export default function ResourceVault({ initialModule = 'all' } = {}) {
  const [search, setSearch] = useState('');
  const [moduleFilter, setModuleFilter] = useState(() => initialModule === 'all' ? 'all' : String(initialModule));
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [savedOnly, setSavedOnly] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [bookmarks, setBookmarks] = useState(() => readList(BOOKMARK_KEY));
  const [recent, setRecent] = useState(() => readList(RECENT_KEY));
  const [selected, setSelected] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [viewerLoaded, setViewerLoaded] = useState(false);
  const viewerRef = useRef(null);

  useEffect(() => writeList(BOOKMARK_KEY, bookmarks), [bookmarks]);
  useEffect(() => writeList(RECENT_KEY, recent), [recent]);

  useEffect(() => {
    const onFullscreenChange = () => setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener('fullscreenchange', onFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', onFullscreenChange);
  }, []);

  useEffect(() => {
    if (!selected) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previousOverflow; };
  }, [selected]);

  useEffect(() => {
    if (!selected) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && !document.fullscreenElement) setSelected(null);
      if ((event.key === 'f' || event.key === 'F') && !event.ctrlKey && !event.metaKey && !event.altKey
        && !['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) {
        event.preventDefault();
        if (!document.fullscreenElement) viewerRef.current?.requestFullscreen?.();
        else document.exitFullscreen?.();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selected]);

  const resources = useMemo(() => DRIVE_RESOURCES.filter((item) => {
    const query = search.trim().toLowerCase();
    const matchesSearch = !query || [item.title, item.description, item.module, item.category, ...(item.tags || [])].join(' ').toLowerCase().includes(query);
    return matchesSearch && (moduleFilter === 'all' || String(item.module) === moduleFilter)
      && (categoryFilter === 'all' || item.category === categoryFilter)
      && (!savedOnly || bookmarks.includes(item.id));
  }), [search, moduleFilter, categoryFilter, savedOnly, bookmarks]);

  const openResource = (item) => {
    const next = [item.id, ...recent.filter((id) => id !== item.id)].slice(0, 8);
    setRecent(next);
    setSelected(item);
    setViewerLoaded(false);
  };

  const toggleBookmark = (id) => setBookmarks((items) => items.includes(id) ? items.filter((item) => item !== id) : [...items, id]);
  const toggleFullscreen = async () => {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else await viewerRef.current?.requestFullscreen?.();
    } catch { /* Fullscreen may be blocked by browser policy; the edge-to-edge reader remains usable. */ }
  };

  const selectedKind = selected ? getDocumentKind(selected) : null;
  const selectedRepositoryUrl = selected ? getRepositoryUrl(selected) : null;
  const selectedDriveUrl = selected ? driveLink(selected, 'preview') : null;
  const viewerUrl = selected ? getDocumentViewerUrl(selected, {
    repositoryUrl: selectedRepositoryUrl ? new URL(selectedRepositoryUrl, window.location.href).href : null,
    drivePreviewUrl: selectedDriveUrl,
  }) : null;
  const originalUrl = selected ? (selectedRepositoryUrl || driveLink(selected, 'open')) : null;

  return <main className="resource-vault-page mx-auto max-w-6xl px-4 py-8 sm:px-8 sm:py-10">
    <p className="eyebrow">CNR-IA-2 · RESOURCE SYSTEM</p>
    <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
      <div><h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Academic Resource Vault</h1>
        <p className="mt-2 max-w-2xl text-mute">A searchable study library for module notes, presentations, question papers, model papers and syllabus documents. Open supported materials in the website and continue studying without leaving the vault.</p></div>
      <div className="rounded-2xl border border-line bg-panel px-4 py-3"><p className="text-xs text-mute">Published resources</p><p className="text-2xl font-bold tabular-nums">{DRIVE_RESOURCES.length}</p></div>
    </div>

    <section className="mt-6 grid gap-3 sm:grid-cols-3" aria-label="Vault features">
      <div className="card flex items-center gap-3 p-4"><FolderOpen className="text-brand" size={20}/><div><p className="font-semibold">Module-wise</p><p className="text-xs text-mute">M1–M5 organization</p></div></div>
      <div className="card flex items-center gap-3 p-4"><FileText className="text-brand" size={20}/><div><p className="font-semibold">Category-wise</p><p className="text-xs text-mute">Notes, PYQs, MQPs, more</p></div></div>
      <div className="card flex items-center gap-3 p-4"><ShieldCheck className="text-brand" size={20}/><div><p className="font-semibold">In-browser access</p><p className="text-xs text-mute">PDF, PPTX and DOCX</p></div></div>
    </section>

    <section className="resource-vault-filters mt-7 card p-4 sm:p-5" aria-label="Resource filters">
      <div className="relative"><Search size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-mute"/><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search title, topic, module or tag…" aria-label="Search resources" className="h-11 w-full rounded-xl border border-line bg-panel pl-10 pr-10 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"/>{search && <button onClick={() => setSearch('')} aria-label="Clear search" className="absolute right-2 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-lg hover:bg-sunk"><X size={15}/></button>}</div>
      <button type="button" className="rv-filter-toggle" aria-expanded={filtersOpen} onClick={() => setFiltersOpen((open) => !open)}><SlidersHorizontal size={16}/> Filters and categories <ChevronDown size={16} className={filtersOpen ? "rotate-180" : ""}/></button>
      <div className={`rv-filter-controls mt-3 flex flex-wrap items-center gap-2${filtersOpen ? " is-open" : ""}`}>
        <label className="text-xs font-semibold text-mute">MODULE <select value={moduleFilter} onChange={(e) => setModuleFilter(e.target.value)} className="ml-1 h-9 rounded-lg border border-line bg-panel px-2 text-sm text-ink"><option value="all">All modules</option>{[1,2,3,4,5].map((n) => <option key={n} value={String(n)}>Module {n}</option>)}</select></label>
        <label className="text-xs font-semibold text-mute">CATEGORY <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="ml-1 h-9 rounded-lg border border-line bg-panel px-2 text-sm text-ink"><option value="all">All categories</option>{RESOURCE_CATEGORIES.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}</select></label>
        <button type="button" onClick={() => setSavedOnly((value) => !value)} aria-pressed={savedOnly} className={savedOnly ? 'btn-primary' : 'btn-quiet'}><Bookmark size={14} className="mr-1 inline"/> Saved ({bookmarks.length})</button>
        <span className="ml-auto text-xs text-mute" aria-live="polite">{resources.length} resource{resources.length === 1 ? '' : 's'}</span>
      </div>
    </section>

    {resources.length ? <section className="mt-5 grid gap-3 md:grid-cols-2" aria-label="Resource results">
      {resources.map((item) => <article key={item.id} className="resource-vault-card card flex flex-col p-5">
        <div className="flex items-start justify-between gap-3"><span className="rounded-full border border-brand/25 bg-brand/10 px-2.5 py-1 text-xs font-semibold text-brand">{RESOURCE_CATEGORIES.find((cat) => cat.id === item.category)?.label || item.category}</span>
          <button type="button" onClick={() => toggleBookmark(item.id)} aria-label={bookmarks.includes(item.id) ? 'Remove saved resource' : 'Save resource'} aria-pressed={bookmarks.includes(item.id)} className="rv-touch-target grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-line hover:bg-sunk"><Bookmark size={17} fill={bookmarks.includes(item.id) ? 'currentColor' : 'none'}/></button></div>
        <h2 className="mt-3 text-lg font-bold">{item.title}</h2><p className="mt-1 text-sm text-mute">{item.description}</p>
        <div className="mt-3 flex flex-wrap gap-2 text-xs text-mute"><span className="rounded-md bg-sunk px-2 py-1">Module {item.module}</span>{item.year && <span className="rounded-md bg-sunk px-2 py-1">{item.year}</span>}{item.fileSize && <span className="rounded-md bg-sunk px-2 py-1">{item.fileSize}</span>}<span className="rounded-md bg-sunk px-2 py-1">{getDocumentKind(item).toUpperCase()}</span></div>
        <div className="mt-auto flex flex-wrap gap-2 pt-5">
          <button type="button" onClick={() => openResource(item)} className="btn-primary"><BookOpen size={15} className="mr-1 inline"/> Read online</button>
          {(getRepositoryUrl(item) || driveLink(item)) && <a href={getRepositoryUrl(item) || driveLink(item, 'open')} target="_blank" rel="noreferrer" className="btn-quiet"><ExternalLink size={15} className="mr-1 inline"/> Open original</a>}
        </div>
      </article>)}
    </section> : <section className="card mt-5 p-8 text-center">
      <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-brand/10 text-brand"><FileText size={26}/></div>
      <h2 className="mt-4 text-xl font-bold">{DRIVE_RESOURCES.length ? 'No matching resources' : 'Your resource library is ready'}</h2>
      <p className="mx-auto mt-2 max-w-xl text-sm text-mute">{DRIVE_RESOURCES.length ? 'Try changing the search or filters.' : 'No resources have been added to the catalogue yet. Uploaded PDFs, presentations and documents appear here once registered.'}</p>
      {(search || moduleFilter !== 'all' || categoryFilter !== 'all' || savedOnly) && <button type="button" onClick={() => {setSearch('');setModuleFilter('all');setCategoryFilter('all');setSavedOnly(false);}} className="btn-quiet mt-4">Clear filters</button>}
    </section>}

    {recent.length > 0 && <section className="mt-5 rounded-xl border border-line bg-panel p-4" aria-label="Recently opened materials">
      <h2 className="flex items-center gap-2 text-sm font-semibold"><Clock3 size={15}/> Continue studying</h2>
      <div className="mt-2 flex flex-wrap gap-2">{recent.map((id) => DRIVE_RESOURCES.find((item) => item.id === id)).filter(Boolean).map((item) => <button key={item.id} type="button" onClick={() => openResource(item)} className="rounded-lg border border-line px-3 py-2 text-left text-xs hover:bg-sunk">{item.title}</button>)}</div>
    </section>}

    <section className="mt-8 rounded-2xl border border-line bg-sunk/60 p-5">
      <h2 className="font-bold">How resources are published</h2>
      <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-mute"><li>Upload supported files (PDF, PPTX or DOCX) under <code>public/resources/</code> in the appropriate module or resource folder, or use a public Google Drive link.</li><li>Add each file's title, module, category, file type and repository path or Drive URL to <code>src/data/resourceCatalog.js</code>.</li><li>For Drive files, set General access to <strong>Anyone with the link</strong> and role to <strong>Viewer</strong>.</li><li>Commit the files and catalogue; GitHub Pages rebuilds and publishes the searchable resource library.</li></ol>
      <p className="mt-3 text-xs text-mute">PDF controls are supplied by the browser's built-in PDF viewer. PPTX and DOCX previews use Microsoft's public Office web viewer and require the file to be publicly reachable. Original public files remain accessible; online preview does not prevent copying or downloading.</p>
    </section>

    {selected && <div ref={viewerRef} className="rv-document-viewer fixed inset-0 z-[100] flex h-[100dvh] w-screen flex-col overflow-hidden bg-slate-950 text-white" role="dialog" aria-modal="true" aria-labelledby="resource-dialog-title">
      <header className="rv-viewer-header flex min-h-14 shrink-0 items-center justify-between gap-2 border-b border-white/10 bg-slate-950 px-3 py-2 sm:px-5">
        <div className="min-w-0">
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-cyan-300">CNR DIGITAL LIBRARY · {selectedKind.toUpperCase()} READER</p>
          <h2 id="resource-dialog-title" className="truncate text-sm font-semibold sm:text-base">{selected.title}</h2>
        </div>
        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <button type="button" onClick={() => toggleBookmark(selected.id)} aria-pressed={bookmarks.includes(selected.id)} aria-label={bookmarks.includes(selected.id) ? 'Remove bookmark' : 'Bookmark this resource'} title="Save resource" className="rv-touch-target grid h-11 w-11 place-items-center rounded-lg border border-white/20 hover:bg-white/10"><Bookmark size={16} fill={bookmarks.includes(selected.id) ? 'currentColor' : 'none'}/></button>
          {originalUrl && <a href={originalUrl} target="_blank" rel="noreferrer" className="rv-original-link inline-flex h-11 items-center gap-2 rounded-lg border border-white/20 px-2.5 text-xs font-medium hover:bg-white/10 sm:px-3 sm:text-sm"><ExternalLink size={15}/> <span className="hidden sm:inline">Open original</span></a>}
          <button type="button" onClick={toggleFullscreen} className="grid h-9 w-9 place-items-center rounded-lg border border-white/20 hover:bg-white/10" aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'} title={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}>{isFullscreen ? <Minimize2 size={16}/> : <Maximize2 size={16}/>}</button>
          <button type="button" onClick={() => { if (document.fullscreenElement) document.exitFullscreen?.(); setSelected(null); }} aria-label="Close document viewer" className="grid h-9 w-9 place-items-center rounded-lg border border-white/20 hover:bg-white/10"><X size={18}/></button>
        </div>
      </header>
      <div className="rv-document-stage relative flex min-h-0 flex-1 flex-col bg-slate-800">
        {!viewerLoaded && <div className="pointer-events-none absolute inset-x-0 top-3 z-10 flex justify-center"><span className="rounded-full bg-slate-900/90 px-3 py-1.5 text-xs text-slate-200 shadow">Loading document preview…</span></div>}
        {viewerUrl ? <iframe key={selected.id} title={`${selected.title} online preview`} src={viewerUrl} onLoad={() => setViewerLoaded(true)} className="rv-document-frame h-full min-h-0 w-full flex-1 border-0 bg-white" allow="fullscreen" allowFullScreen referrerPolicy="no-referrer-when-downgrade"/> : <div className="grid flex-1 place-items-center p-6 text-center text-sm text-slate-200"><div><p className="font-semibold">Preview source unavailable</p><p className="mt-2 text-slate-400">This resource has no supported public preview URL.</p></div></div>}
      </div>
      <footer className="rv-viewer-footer flex shrink-0 items-center justify-between gap-3 border-t border-white/10 bg-slate-950 px-3 py-2 text-[11px] text-slate-400 sm:px-5">
        <span>Reading view · Saved materials stay in this browser</span>
        <span className="hidden sm:inline">Press F for fullscreen · Esc to close</span>
      </footer>
    </div>}
  </main>;
}

import { useEffect, useState } from 'react';
import { LayoutDashboard, ListChecks, Bookmark, Zap, ClipboardCheck, Brain, CalendarDays, ChartNoAxesCombined, Moon, Sun, Menu, X, Search, ArrowUp, Leaf, Minimize2, FileText } from 'lucide-react';
import { useStudy } from '../lib/study';
import { go } from '../lib/router';
import { QUESTIONS, byModule, SUBJECT } from '../data/questions';
import { Bar, modColor } from './ui';

export function Logo({ light }) {
  return (
    <a href="#/" className="flex items-center gap-2.5" aria-label="VTU ExamPrep home">
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-navy text-[rgb(52_211_153)] ring-1 ring-white/10"><Leaf size={19} aria-hidden="true" /></span>
      <span className="leading-tight">
        <span className={`block text-[15px] font-bold tracking-tight ${light ? 'text-white' : ''}`}>VTU EXAMPREP</span>
        <span className={`block text-[11px] font-medium ${light ? 'text-white/60' : 'text-mute'}`}>{SUBJECT.code}</span>
      </span>
    </a>
  );
}

export function ThemeBtn({ className = '' }) {
  const { theme, toggleTheme } = useStudy();
  const Icon = theme === 'dark' ? Sun : Moon;
  return (
    <button onClick={toggleTheme} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`} title="Toggle theme"
      className={`inline-flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-panel hover:bg-sunk active:scale-95 ${className}`}><Icon size={18} /></button>
  );
}

function Nav({ path, onNavigate }) {
  const { bookmarks, completed } = useStudy();
  const nb = Object.keys(bookmarks).length, done = Object.keys(completed).length;
  const items = [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/analytics', label: 'Progress Analytics', icon: ChartNoAxesCombined },
    { to: '/questions', label: 'All Questions', icon: ListChecks, count: 10 },
    { to: '/module/3', label: 'Module 3', moduleName: 'Air and Air Pollution', dot: 3, count: 2 },
    { to: '/module/4', label: 'Module 4', moduleName: 'Biodiversity and Ecosystem', dot: 4, count: 4 },
    { to: '/module/5', label: 'Module 5', moduleName: 'Global Warming and EIA', dot: 5, count: 4 },
    { to: '/bookmarks', label: 'Bookmarks', icon: Bookmark, count: nb },
    { to: '/revision', label: 'Revision Mode', icon: Zap },
    { to: '/practice', label: 'Practice Centre', icon: ClipboardCheck },
    { to: '/quiz', label: 'Quiz Centre', icon: Brain },
    { to: '/exam', label: 'VTU Exam Simulator', icon: FileText },
    { to: '/planner', label: 'Study Planner', icon: CalendarDays },
  ];
  return (
    <nav aria-label="Primary" className="flex-1 space-y-1 overflow-y-auto px-3 py-2">
      {items.map((it) => {
        const active = path === it.to || (it.to === '/questions' && path.startsWith('/q/'));
        return (
          <a key={it.to} href={`#${it.to}`} onClick={onNavigate} aria-current={path === it.to ? 'page' : undefined}
            className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${path === it.to ? 'bg-brand/12 text-brand' : 'text-mute hover:bg-sunk hover:text-ink'}`}>
            {it.icon ? <it.icon size={18} aria-hidden="true" /> : <span className="grid h-[18px] w-[18px] place-items-center"><span className="h-2.5 w-2.5 rounded-full" style={{ background: modColor(it.dot) }} /></span>}
            <span className="min-w-0 flex-1">{it.moduleName ? <><span className="block">{it.label}</span><span className="mt-0.5 block truncate text-[11px] font-normal text-mute">{it.moduleName}</span></> : it.label}</span>
            {it.count !== undefined && <span className="rounded-md bg-sunk px-1.5 py-0.5 text-[11px] tabular-nums text-mute">{it.count}</span>}
          </a>
        );
      })}
      <div className="mt-5 rounded-xl border border-line p-3">
        <div className="mb-2 flex items-center justify-between text-xs"><span className="font-semibold">Progress</span><span className="tabular-nums text-mute">{done}/10</span></div>
        <Bar value={done / 10} />
      </div>
    </nav>
  );
}

export default function Shell({ path, children }) {
  const { focus, setFocus, query, setQuery } = useStudy();
  const [open, setOpen] = useState(false);
  const [top, setTop] = useState(false);
  const isAnswer = path.startsWith('/q/');
  const hide = focus && isAnswer;

  useEffect(() => { setOpen(false); window.scrollTo(0, 0); }, [path]);
  useEffect(() => { if (!isAnswer) setFocus(false); }, [isAnswer, setFocus]);
  useEffect(() => {
    const s = () => setTop(window.scrollY > 700);
    window.addEventListener('scroll', s, { passive: true });
    return () => window.removeEventListener('scroll', s);
  }, []);
  useEffect(() => {
    if (!open) return;
    const k = (e) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', k);
    return () => document.removeEventListener('keydown', k);
  }, [open]);

  const onSearch = (v) => { setQuery(v); if (!/^\/(questions|module)/.test(path)) go('/questions'); };

  return (
    <div className="min-h-screen">
      <a href="#main" onClick={(e) => { e.preventDefault(); document.getElementById('main')?.focus(); }} className="sr-only z-[200] rounded-lg bg-brand px-4 py-2 font-semibold text-white focus:not-sr-only focus:fixed focus:left-3 focus:top-3">Skip to content</a>

      {!hide && (
        <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-line bg-panel lg:flex">
          <div className="px-5 py-5"><Logo /></div>
          <Nav path={path} />
          <div className="flex items-center justify-between border-t border-line px-4 py-3"><span className="text-xs text-mute">Theme</span><ThemeBtn /></div>
        </aside>
      )}

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden no-print" role="dialog" aria-modal="true" aria-label="Navigation menu">
          <div className="absolute inset-0 bg-black/60" onClick={() => setOpen(false)} />
          <div className="absolute inset-y-0 left-0 flex w-72 max-w-[85vw] flex-col bg-panel shadow-lift animate-rise">
            <div className="flex items-center justify-between px-5 py-4"><Logo /><button aria-label="Close menu" onClick={() => setOpen(false)} className="grid h-9 w-9 place-items-center rounded-lg hover:bg-sunk"><X size={18} /></button></div>
            <Nav path={path} onNavigate={() => setOpen(false)} />
          </div>
        </div>
      )}

      {!hide && (
        <header className="topbar sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-line bg-bg/85 px-4 backdrop-blur lg:ml-64 lg:px-8">
          <button className="grid h-10 w-10 place-items-center rounded-xl border border-line bg-panel lg:hidden" aria-label="Open menu" onClick={() => setOpen(true)}><Menu size={18} /></button>
          <div className="lg:hidden"><Logo /></div>
          <div className="relative ml-auto hidden w-full max-w-md md:block">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-mute" aria-hidden="true" />
            <input value={query} onChange={(e) => onSearch(e.target.value)} placeholder="Search questions or keywords…" aria-label="Search questions"
              className="h-10 w-full rounded-xl border border-line bg-panel pl-10 pr-3 text-sm outline-none transition placeholder:text-mute focus:border-brand focus:ring-2 focus:ring-brand/25" />
          </div>
          <div className="ml-auto flex items-center gap-2 md:ml-0 lg:hidden"><ThemeBtn /></div>
          <a href="#/" className="btn-ghost hidden !py-2 lg:inline-flex">Welcome page</a>
        </header>
      )}

      <main id="main" tabIndex={-1} className={`outline-none ${hide ? '' : 'lg:ml-64'}`}>
        <div key={path} className="page-enter">{children}</div>
      </main>

      {hide && (
        <button onClick={() => setFocus(false)} className="no-print fixed right-4 top-4 z-40 inline-flex items-center gap-2 rounded-full border border-line bg-panel px-4 py-2 text-sm font-semibold shadow-lift hover:bg-sunk"><Minimize2 size={16} />Exit focus mode</button>
      )}
      {top && (
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Scroll to top" className="fab fixed bottom-5 right-5 z-40 grid h-11 w-11 place-items-center rounded-full bg-brand text-white shadow-lift transition hover:brightness-110 active:scale-95 [[data-theme=dark]_&]:text-[#04130d]"><ArrowUp size={18} /></button>
      )}
      <Toasts />
    </div>
  );
}

export function Toasts() {
  const { toasts } = useStudy();
  return (
    <div className="no-print pointer-events-none fixed bottom-5 left-1/2 z-[120] flex -translate-x-1/2 flex-col items-center gap-2" role="status" aria-live="polite">
      {toasts.map((t) => <div key={t.id} className="animate-rise rounded-xl bg-navy px-4 py-2.5 text-sm font-medium text-white shadow-lift ring-1 ring-white/10">{t.msg}</div>)}
    </div>
  );
}

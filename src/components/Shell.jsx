import { useEffect, useState } from 'react';
import { LayoutDashboard, ListChecks, Bookmark, Zap, ClipboardCheck, Brain, CalendarDays, ChartNoAxesCombined, Network, BookOpenText, Orbit, Moon, Sun, Menu, X, Search, ArrowUp, Minimize2, FileText, Sparkles, Database } from 'lucide-react';
import { useStudy } from '../lib/study';
import { go } from '../lib/router';
import { QUESTIONS, byModule, SUBJECT } from '../data/questions';
import { Bar, modColor } from './ui';

export function Logo({ light }) {
  return (
    <a href="#/" className="flex items-center gap-2.5" aria-label="VTU ExamPrep home">
      <svg viewBox="0 0 48 48" className="h-10 w-10 shrink-0 drop-shadow-[0_0_10px_rgba(34,211,238,.22)]" role="img" aria-label="CNR ExamPrep emblem">
        <defs>
          <linearGradient id="cnr-book" x1="5" y1="8" x2="42" y2="42" gradientUnits="userSpaceOnUse">
            <stop stopColor="#22d3ee" /><stop offset=".55" stopColor="#38bdf8" /><stop offset="1" stopColor="#4ade80" />
          </linearGradient>
          <linearGradient id="cnr-orbit" x1="5" y1="4" x2="43" y2="44" gradientUnits="userSpaceOnUse">
            <stop stopColor="#a78bfa" /><stop offset=".52" stopColor="#22d3ee" /><stop offset="1" stopColor="#4ade80" />
          </linearGradient>
        </defs>
        <rect x="1" y="1" width="46" height="46" rx="14" fill="#071326" stroke="url(#cnr-orbit)" strokeOpacity=".65" />
        <path d="M7 14.5c6-2.1 11.3-.8 17 3.1v19c-5.7-3.8-11-5.1-17-3.1v-19Z" fill="#0e2940" stroke="url(#cnr-book)" strokeWidth="1.8" strokeLinejoin="round"/>
        <path d="M41 14.5c-6-2.1-11.3-.8-17 3.1v19c5.7-3.8 11-5.1 17-3.1v-19Z" fill="#102c3c" stroke="url(#cnr-book)" strokeWidth="1.8" strokeLinejoin="round"/>
        <path d="M24 17.8v18.8" stroke="#d8f7ff" strokeOpacity=".9" strokeWidth="1.4"/>
        <path d="M11 20.5c3.1-.5 6.2.1 9 1.8M11 25c3.1-.5 6.2.1 9 1.8M28 22.3c2.8-1.7 5.9-2.3 9-1.8M28 26.8c2.8-1.7 5.9-2.3 9-1.8" fill="none" stroke="#b8edff" strokeOpacity=".75" strokeWidth="1.2" strokeLinecap="round"/>
        <path d="m16.5 11 7.5-4 7.5 4-7.5 4-7.5-4Z" fill="#a78bfa" stroke="#d8c7ff" strokeWidth="1.1" strokeLinejoin="round"/>
        <path d="M31.5 12.5v5.2" stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="31.5" cy="18.5" r="1.6" fill="#fbbf24"/>
        <circle cx="24" cy="17.8" r="1.7" fill="#22d3ee" stroke="#071326" strokeWidth=".7"/>
      </svg>
      <span className="leading-tight">
        <span className={`block text-[15px] font-extrabold tracking-[.055em] ${light ? 'text-white' : ''}`}>VTU <span className="bg-gradient-to-r from-cyan-500 via-sky-500 to-emerald-500 bg-clip-text text-transparent">EXAMPREP</span></span>
        <span className={`block text-[10px] font-semibold tracking-[.12em] uppercase ${light ? 'text-white/60' : 'text-mute'}`}>CNR · {SUBJECT.code}</span>
      </span>
    </a>
  );
}

const CYBER_THEMES = [
  { value: 'ultra-cyber', label: 'Ultra Cyber', colors: ['#00f5ff', '#ff3cac'] },
  { value: 'arctic', label: 'Arctic Neon', colors: ['#7de8ff', '#4d9dff'] },
  { value: 'purple', label: 'Purple Cyber', colors: ['#c084fc', '#f472d0'] },
  { value: 'eco', label: 'Eco Neon', colors: ['#4ade80', '#2dd4bf'] },
];

function ThemePicker({ className = '' }) {
  const { cyberTheme, setSetting } = useStudy();
  return (
    <div className={`theme-picker ${className}`} role="group" aria-label="Neon colour themes">
      {CYBER_THEMES.map((item) => (
        <button key={item.value} type="button" onClick={() => setSetting('cyberTheme', item.value)}
          aria-label={`Use ${item.label} theme`} aria-pressed={cyberTheme === item.value}
          className="theme-picker-btn" title={item.label}>
          <span className="theme-picker-swatch" style={{ background: `linear-gradient(135deg, ${item.colors[0]}, ${item.colors[1]})` }} aria-hidden="true" />
          <span className="theme-picker-label">{item.label}</span>
          <span className="theme-picker-check" aria-hidden="true">✓</span>
        </button>
      ))}
    </div>
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
    { to: '/visual-studio', label: 'Visual Learning Studio', icon: Network },
    { to: '/environment-lab', label: '3D Science Lab', icon: Orbit },
    { to: '/smart-revision', label: 'Weakness & Revision', icon: Brain },
    { to: '/additional-notes', label: 'Additional Source Notes', icon: BookOpenText },
    { to: '/questions', label: 'All Questions', icon: ListChecks, count: 10 },
    { to: '/module/3', label: 'Module 3', moduleName: 'Air and Air Pollution', dot: 3, count: 2 },
    { to: '/module/4', label: 'Module 4', moduleName: 'Biodiversity and Ecosystem', dot: 4, count: 4 },
    { to: '/module/5', label: 'Module 5', moduleName: 'Global Warming and EIA', dot: 5, count: 4 },
    { to: '/bookmarks', label: 'Bookmarks', icon: Bookmark, count: nb },
    { to: '/revision', label: 'Revision Mode', icon: Zap },
    { to: '/practice', label: 'Practice Centre', icon: ClipboardCheck },
    { to: '/quiz', label: 'Quiz Centre', icon: Brain },
    { to: '/exam', label: 'VTU Exam Simulator', icon: FileText },
    { to: '/study-coach', label: 'AI Study Coach', icon: Sparkles },
    { to: '/data-backup', label: 'Backup & Restore', icon: Database },
    { to: '/planner', label: 'Study Planner', icon: CalendarDays },
  ];
  return (
    <nav aria-label="Primary" className="flex-1 space-y-1 overflow-y-auto px-3 py-2">
      {items.map((it) => {
        const active = path === it.to || (it.to === '/questions' && path.startsWith('/q/'));
        return (
          <a key={it.to} href={`#${it.to}`} onClick={onNavigate} aria-current={active ? 'page' : undefined}
            className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${active ? 'bg-brand/12 text-brand' : 'text-mute hover:bg-sunk hover:text-ink'}`}>
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
  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches || !window.matchMedia?.('(hover: hover) and (pointer: fine)').matches) return;
    let frame = 0, latest = null;
    const move = (event) => { if (event.pointerType !== 'mouse') return; latest = event; if (frame) return; frame = requestAnimationFrame(() => { frame = 0; const card = latest?.target?.closest?.('.card'); if (!card) return; const rect = card.getBoundingClientRect(); card.style.setProperty('--card-x', `${latest.clientX - rect.left}px`); card.style.setProperty('--card-y', `${latest.clientY - rect.top}px`); document.documentElement.style.setProperty('--cursor-x', `${Math.round(latest.clientX / window.innerWidth * 100)}%`); document.documentElement.style.setProperty('--cursor-y', `${Math.round(latest.clientY / window.innerHeight * 100)}%`); card.dataset.energy = 'active'; }); };
    const leave = (event) => { const card = event.target?.closest?.('.card'); if (card && !card.contains(event.relatedTarget)) card.dataset.energy = 'idle'; };
    document.addEventListener('pointermove', move, { passive: true }); document.addEventListener('pointerout', leave, { passive: true });
    return () => { document.removeEventListener('pointermove', move); document.removeEventListener('pointerout', leave); if (frame) cancelAnimationFrame(frame); };
  }, []);
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
          <div className="border-t border-line px-4 py-3"><div className="mb-2 flex items-center justify-between"><span className="text-xs text-mute">Appearance</span><ThemeBtn /></div><ThemePicker className="w-full" /></div>
        </aside>
      )}

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden no-print" role="dialog" aria-modal="true" aria-label="Navigation menu">
          <div className="absolute inset-0 bg-black/60" onClick={() => setOpen(false)} />
          <div className="absolute inset-y-0 left-0 flex w-72 max-w-[85vw] flex-col bg-panel shadow-lift animate-rise">
            <div className="flex items-center justify-between px-5 py-4"><Logo /><button aria-label="Close menu" onClick={() => setOpen(false)} className="grid h-9 w-9 place-items-center rounded-lg hover:bg-sunk"><X size={18} /></button></div>
            <Nav path={path} onNavigate={() => setOpen(false)} />
            <div className="border-t border-line px-4 py-3"><div className="mb-2 flex items-center justify-between"><span className="text-xs text-mute">Appearance</span><ThemeBtn /></div><ThemePicker className="w-full" /></div>
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
          <ThemePicker className="hidden sm:grid sm:grid-cols-4" />
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

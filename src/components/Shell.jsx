import { useEffect, useRef, useState } from 'react';
import { LayoutDashboard, ListChecks, Bookmark, Zap, ClipboardCheck, Brain, CalendarDays, ChartNoAxesCombined, Network, BookOpenText, Orbit, Moon, Sun, Menu, X, Search, ArrowUp, Minimize2, FileText, Sparkles, Database, Layers3, Palette, ChevronDown, Check } from 'lucide-react';
import { useStudy } from '../lib/study';
import { go } from '../lib/router';
import { QUESTIONS, byModule, SUBJECT } from '../data/questions';
import { Bar, modColor } from './ui';

export function Logo({ light }) {
  return (
    <a href="#/" className="flex items-center gap-2.5" aria-label="CNR-IA-2 home">
      <svg viewBox="0 0 64 64" className="h-11 w-11 shrink-0 drop-shadow-[0_0_14px_rgba(34,211,238,.28)]" role="img" aria-label="CNR monogram">
        <defs>
          <linearGradient id="cnr-brand-ring" x1="5" y1="5" x2="59" y2="59" gradientUnits="userSpaceOnUse"><stop stopColor="#22d3ee"/><stop offset=".52" stopColor="#818cf8"/><stop offset="1" stopColor="#4ade80"/></linearGradient>
          <linearGradient id="cnr-brand-text" x1="12" y1="18" x2="53" y2="49" gradientUnits="userSpaceOnUse"><stop stopColor="#67e8f9"/><stop offset=".55" stopColor="#a5b4fc"/><stop offset="1" stopColor="#86efac"/></linearGradient>
        </defs>
        <rect x="2" y="2" width="60" height="60" rx="19" fill="#071326" stroke="url(#cnr-brand-ring)" strokeWidth="1.8"/>
        <circle cx="32" cy="32" r="22" fill="none" stroke="url(#cnr-brand-ring)" strokeOpacity=".28" strokeWidth="1"/>
        <ellipse cx="32" cy="32" rx="26" ry="10" transform="rotate(-32 32 32)" fill="none" stroke="url(#cnr-brand-ring)" strokeWidth="1.5" strokeOpacity=".85"/>
        <circle cx="51.5" cy="20.5" r="3" fill="#67e8f9"/>
        <text x="32" y="38" textAnchor="middle" fontSize="17" fontWeight="900" letterSpacing="-1.1" fill="url(#cnr-brand-text)">CNR</text>
        <path d="M17 46h30" stroke="url(#cnr-brand-ring)" strokeWidth="1.5" strokeLinecap="round" opacity=".8"/>
      </svg>
      <span className="leading-tight">
        <span className={`block text-[15px] font-extrabold tracking-[.055em] ${light ? 'text-white' : ''}`}><span className="bg-gradient-to-r from-cyan-500 via-sky-500 to-emerald-500 bg-clip-text text-transparent">CNR-IA-2</span></span>
        <span className={`block text-[10px] font-semibold tracking-[.12em] uppercase ${light ? 'text-white/60' : 'text-mute'}`}>CONSERVATION · {SUBJECT.code}</span>
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

const UI_MODES = [
  { value: 'standard', label: 'Standard', description: 'Clean and focused', icon: Layers3 },
  { value: 'glass', label: 'Glass', description: 'Layered translucent surfaces', icon: Layers3 },
  { value: 'nebula', label: 'Nebula OS', description: 'Cosmic spatial interface', icon: Orbit },
  { value: 'holographic', label: 'Holographic OS', description: 'Holographic learning workspace', icon: Sparkles },
];

export function ThemeBtn({ className = '' }) {
  const { theme, toggleTheme } = useStudy();
  const Icon = theme === 'dark' ? Sun : Moon;
  return (
    <button type="button" onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} appearance`}
      className={`appearance-scheme-toggle ${className}`}>
      <Icon size={16} aria-hidden="true" />
      <span>Switch to {theme === 'dark' ? 'light' : 'dark'} mode</span>
    </button>
  );
}

function AppearanceDropdown({ className = '' }) {
  const { settings, cyberTheme, setSetting } = useStudy();
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef(null);
  const triggerRef = useRef(null);
  const activeMode = UI_MODES.find((mode) => mode.value === settings.uiMode) || UI_MODES[0];
  const activePalette = CYBER_THEMES.find((item) => item.value === cyberTheme) || CYBER_THEMES[0];

  useEffect(() => {
    if (!isOpen) return undefined;
    const onPointerDown = (event) => {
      if (!rootRef.current?.contains(event.target)) setIsOpen(false);
    };
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen]);

  const closeAfterSelection = () => {
    setIsOpen(false);
    triggerRef.current?.focus();
  };

  return (
    <div className={`appearance-dropdown ${className}`} ref={rootRef}>
      <button ref={triggerRef} type="button" className="appearance-dropdown-trigger"
        aria-label={`Appearance settings. Current interface: ${activeMode.label}. Current palette: ${activePalette.label}`}
        aria-haspopup="dialog" aria-expanded={isOpen} aria-controls="appearance-dropdown-panel"
        onClick={() => setIsOpen((value) => !value)}>
        <Palette size={17} aria-hidden="true" />
        <span className="appearance-trigger-copy"><span>Appearance</span><small>{activeMode.label} · {activePalette.label}</small></span>
        <ChevronDown size={16} aria-hidden="true" className={isOpen ? 'appearance-chevron is-open' : 'appearance-chevron'} />
      </button>

      {isOpen && (
        <section id="appearance-dropdown-panel" className="appearance-dropdown-panel"
          role="dialog" aria-label="Appearance settings">
          <div className="appearance-panel-heading">
            <div><span className="appearance-panel-kicker">PERSONALIZE WORKSPACE</span><h2>Appearance</h2></div>
            <span className="appearance-live-indicator"><span /> Live</span>
          </div>

          <section className="appearance-section" aria-labelledby="appearance-mode-heading">
            <div className="appearance-section-heading"><h3 id="appearance-mode-heading">Interface mode</h3><span>01 / 02</span></div>
            <div className="appearance-mode-grid">
              {UI_MODES.map(({ value, label, description, icon: Icon }) => (
                <button key={value} type="button" className="appearance-mode-card"
                  aria-pressed={settings.uiMode === value}
                  onClick={() => { setSetting('uiMode', value); closeAfterSelection(); }}>
                  <span className="appearance-mode-icon"><Icon size={17} aria-hidden="true" /></span>
                  <span className="appearance-choice-copy"><strong>{label}</strong><small>{description}</small></span>
                  <span className="appearance-choice-check" aria-hidden="true">{settings.uiMode === value && <Check size={14} />}</span>
                </button>
              ))}
            </div>
          </section>

          <section className="appearance-section" aria-labelledby="appearance-palette-heading">
            <div className="appearance-section-heading"><h3 id="appearance-palette-heading">Neon colour palette</h3><span>02 / 02</span></div>
            <div className="appearance-palette-grid" role="group" aria-label="Neon colour themes">
              {CYBER_THEMES.map((item) => (
                <button key={item.value} type="button" className="appearance-palette-option"
                  aria-pressed={cyberTheme === item.value}
                  onClick={() => { setSetting('cyberTheme', item.value); closeAfterSelection(); }}>
                  <span className="appearance-palette-swatch theme-picker-swatch" style={{ background: `linear-gradient(135deg, ${item.colors[0]}, ${item.colors[1]})` }} aria-hidden="true" />
                  <span>{item.label}</span>
                  <span className="appearance-choice-check theme-picker-check" aria-hidden="true">{cyberTheme === item.value && <Check size={14} />}</span>
                </button>
              ))}
            </div>
          </section>

          <div className="appearance-panel-footer">
            <span>Changes apply instantly and are saved automatically.</span>
            <ThemeBtn />
          </div>
        </section>
      )}
    </div>
  );
}

function Nav({ path, onNavigate }) {
  const { bookmarks, completed } = useStudy();
  const nb = Object.keys(bookmarks).length, done = Object.keys(completed).length;
  const items = [
    { to: '/ecoweb', label: 'EcoWeb Architect', icon: Network },
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/learning-hub', label: 'Learning Hub', icon: BookOpenText },
    { to: '/cnr-notes', label: 'CNR Notes Hub', icon: BookOpenText },
    { to: '/resources', label: 'Academic Resource Vault', icon: FileText },
    { to: '/mqps', label: 'Model Question Papers', icon: FileText },
    { to: '/dec-jan-2026', label: 'Dec/Jan 2026 Question Paper', icon: FileText },
    { to: '/question-papers/june-july-2026', label: 'June/July 2026 Question Paper', icon: FileText },
    { to: '/welcome', label: 'Welcome & Platform Tour', icon: Sparkles },
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
        const active = path === it.to || (it.to === '/cnr-notes' && path.startsWith('/cnr-notes/')) || (it.to === '/questions' && path.startsWith('/q/'));
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
  const menuButtonRef = useRef(null);
  const drawerRef = useRef(null);
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
    if (!open) return undefined;

    const previousOverflow = document.body.style.overflow;
    const previousFocus = document.activeElement;
    document.body.style.overflow = 'hidden';

    const getFocusable = () => Array.from(
      drawerRef.current?.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      ) || [],
    ).filter((element) => element.getAttribute('aria-hidden') !== 'true' && !element.hasAttribute('data-drawer-backdrop'));

    getFocusable()[0]?.focus();

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setOpen(false);
        return;
      }
      if (event.key !== 'Tab') return;

      const focusable = getFocusable();
      if (!focusable.length) {
        event.preventDefault();
        drawerRef.current?.focus();
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && (document.activeElement === first || !drawerRef.current?.contains(document.activeElement))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) previousFocus.focus();
    };
  }, [open]);

  const onSearch = (v) => { setQuery(v); if (!/^\/(questions|module)/.test(path)) go('/questions'); };

  return (
    <div className="min-h-screen">
      <a href="#main" onClick={(e) => { e.preventDefault(); document.getElementById('main')?.focus(); }} className="sr-only z-[200] rounded-lg bg-brand px-4 py-2 font-semibold text-white focus:not-sr-only focus:fixed focus:left-3 focus:top-3">Skip to content</a>

      {!hide && (
        <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-line bg-panel lg:flex">
          <div className="px-5 py-5"><Logo /></div>
          <Nav path={path} />
        </aside>
      )}

      {open && (
        <div id="mobile-navigation-dialog" className="mobile-navigation-dialog fixed inset-0 z-50 lg:hidden no-print" role="dialog" aria-modal="true" aria-label="Navigation menu">
          <button type="button" aria-label="Close navigation menu" data-drawer-backdrop tabIndex={-1} className="absolute inset-0 h-full w-full cursor-default bg-black/60" onClick={() => setOpen(false)} />
          <div ref={drawerRef} tabIndex={-1} className="mobile-navigation-drawer absolute inset-y-0 left-0 flex w-72 max-w-[85vw] flex-col overflow-y-auto bg-panel shadow-lift animate-rise">
            <div className="flex items-center justify-between px-5 py-4"><Logo /><button aria-label="Close menu" onClick={() => setOpen(false)} className="grid h-9 w-9 place-items-center rounded-lg hover:bg-sunk"><X size={18} /></button></div>
            <Nav path={path} onNavigate={() => setOpen(false)} />
          </div>
        </div>
      )}

      {!hide && (
        <header className="topbar sticky top-0 z-20 flex h-16 min-w-0 items-center gap-2 border-b border-line bg-bg/85 px-3 backdrop-blur sm:gap-3 sm:px-4 lg:ml-64 lg:px-6 2xl:px-8">
          <button ref={menuButtonRef} className="grid h-10 w-10 place-items-center rounded-xl border border-line bg-panel lg:hidden" aria-label="Open menu" aria-expanded={open} aria-controls="mobile-navigation-dialog" onClick={() => setOpen(true)}><Menu size={18} /></button>
          <div className="lg:hidden"><Logo /></div>
          <div className="relative ml-auto hidden w-full max-w-lg xl:block">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-mute" aria-hidden="true" />
            <input value={query} onChange={(e) => onSearch(e.target.value)} placeholder="Search questions or keywords…" aria-label="Search questions"
              className="h-10 w-full rounded-xl border border-line bg-panel pl-10 pr-3 text-sm outline-none transition placeholder:text-mute focus:border-brand focus:ring-2 focus:ring-brand/25" />
          </div>
          <AppearanceDropdown className="ml-auto" />
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

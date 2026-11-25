import { useEffect, useRef, useState } from 'react';
import { LayoutDashboard, ListChecks, Bookmark, Zap, ClipboardCheck, Brain, CalendarDays, ChartNoAxesCombined, Network, BookOpenText, Orbit, Moon, Sun, Menu, X, Search, ArrowUp, Minimize2, FileText, Sparkles, Database, Layers3, Palette, ChevronDown, Check, Wind, Leaf, Globe2, FolderOpen } from 'lucide-react';
import { useStudy } from '../lib/study';
import { go } from '../lib/router';
import { QUESTIONS, SUBJECT } from '../data/questions';
import { FIVE_MARK_TOTAL_COUNT } from '../data/fiveMarkCounts';
import { DRIVE_RESOURCES } from '../data/resourceCatalog';

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
        <span className={`block max-w-[190px] truncate text-[11px] font-medium ${light ? 'text-white/65' : 'text-mute'}`}>Conservation & Natural Resources</span>
        <span className={`mt-1 block text-[9px] font-semibold tracking-[.1em] ${light ? 'text-white/55' : 'text-mute'}`}>{SUBJECT.code} · VTU</span>
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

const NAV_GROUPS = [
  { id: 'overview', title: 'Overview', icon: LayoutDashboard, defaultOpen: true, items: [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/learning-hub', label: 'Learning Hub', icon: BookOpenText },
    { to: '/analytics', label: 'Progress & Analytics', icon: ChartNoAxesCombined },
  ]},
  { id: 'study', title: 'Study Material', icon: BookOpenText, defaultOpen: true, items: [
    { to: '/cnr-notes/all', label: 'All Modules', icon: Layers3, count: DRIVE_RESOURCES.filter((item) => item.category === 'notes').length },
    { to: '/cnr-notes/module/1', label: 'Module 1', icon: BookOpenText, shortLabel: 'Module 1', moduleId: 1, count: DRIVE_RESOURCES.filter((item) => item.category === 'notes' && Number(item.module) === 1).length },
    { to: '/cnr-notes/module/2', label: 'Module 2', icon: BookOpenText, shortLabel: 'Module 2', moduleId: 2, count: DRIVE_RESOURCES.filter((item) => item.category === 'notes' && Number(item.module) === 2).length },
    { to: '/cnr-notes/module/3', label: 'Module 3', icon: Wind, shortLabel: 'Module 3', moduleId: 3, count: DRIVE_RESOURCES.filter((item) => item.category === 'notes' && Number(item.module) === 3).length },
    { to: '/cnr-notes/module/4', label: 'Module 4', icon: Leaf, shortLabel: 'Module 4', moduleId: 4, count: DRIVE_RESOURCES.filter((item) => item.category === 'notes' && Number(item.module) === 4).length },
    { to: '/cnr-notes/module/5', label: 'Module 5', icon: Globe2, shortLabel: 'Module 5', moduleId: 5, count: DRIVE_RESOURCES.filter((item) => item.category === 'notes' && Number(item.module) === 5).length },
    { to: '/questions', label: 'All Questions', icon: ListChecks, count: QUESTIONS.length },
    { to: '/bookmarks', label: 'Bookmarks', icon: Bookmark, countFrom: 'bookmarks' },
    { to: '/revision', label: 'Revision Mode', icon: Zap },
  ]},
  { id: 'exam', title: 'Exam Preparation', icon: ClipboardCheck, defaultOpen: true, items: [
    { to: '/practice', label: 'Practice Centre', icon: ClipboardCheck },
    { to: '/five-mark-answers', label: '5-Mark Answers', icon: BookOpenText, count: FIVE_MARK_TOTAL_COUNT },
    { to: '/quiz', label: 'Quiz Centre', icon: Brain },
    { to: '/exam', label: 'VTU Exam Simulator', icon: FileText },
    { to: '/answers', label: 'Answers', icon: BookOpenText },
    { to: '/mqps', label: 'Solved Question Papers', icon: FolderOpen, children: [
      { to: '/dec-jan-2026', label: 'Dec/Jan 2026 Question Paper', shortLabel: 'Dec/Jan 2026' },
      { to: '/question-papers/june-july-2026', label: 'June/July 2026 Question Paper', shortLabel: 'June/July 2026' },
      { to: '/model-paper-21cv654', label: '21CV654 Complete Model Answers', shortLabel: '21CV654 Solved' },
    ]},
  ]},
  { id: 'tools', title: 'Learning Tools', icon: Sparkles, defaultOpen: false, items: [
    { to: '/study-coach', label: 'AI Study Coach', icon: Brain },
    { to: '/visual-studio', label: 'Visual Learning Studio', icon: Network },
    { to: '/environment-lab', label: '3D Science Lab', icon: Orbit },
    { to: '/smart-revision', label: 'Weakness & Revision', icon: Zap },
    { to: '/planner', label: 'Study Planner', icon: CalendarDays },
    { to: '/ecoweb', label: 'EcoWeb Architect', icon: Globe2 },
  ]},
  { id: 'resources', title: 'Resources', icon: FolderOpen, defaultOpen: false, items: [
    { to: '/cnr-notes', label: 'CNR Notes Hub', icon: BookOpenText },
    { to: '/resources', label: 'Academic Resource Vault', icon: FileText },
    { to: '/additional-notes', label: 'Additional Source Notes', icon: BookOpenText },
    { to: '/welcome', label: 'Welcome & Platform Tour', icon: Sparkles },
  ]},
  { id: 'system', title: 'System', icon: Database, defaultOpen: false, items: [
    { to: '/data-backup', label: 'Backup & Restore', icon: Database },
  ]},
];

function Nav({ path, onNavigate, collapsed = false, instance = 'desktop' }) {
  const { bookmarks, completed } = useStudy();
  const [expanded, setExpanded] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('cnr-sidebar-groups-v2') || 'null');
      return { ...Object.fromEntries(NAV_GROUPS.map((group) => [group.id, group.defaultOpen])), ...(saved && typeof saved === 'object' ? saved : {}) };
    } catch { return Object.fromEntries(NAV_GROUPS.map((group) => [group.id, group.defaultOpen])); }
  });
  const [papersExpanded, setPapersExpanded] = useState(() => {
    try { return localStorage.getItem('cnr-sidebar-papers-expanded-v2') !== 'false'; } catch { return true; }
  });
  const [navSearch, setNavSearch] = useState('');
  const navSearchRef = useRef(null);
  const questionRoute = path.match(/^\/q\/([^/]+)$/);
  const answeredQuestion = questionRoute && QUESTIONS.find((question) => question.id === questionRoute[1]);
  const canonicalPath = path === '/materials' || path.startsWith('/materials/') ? '/resources' : path;
  const activePath = answeredQuestion ? '/module/' + answeredQuestion.module : canonicalPath;
  const bookmarkCount = Object.keys(bookmarks || {}).length;
  const totalQuestions = QUESTIONS.length;
  const completedQuestions = QUESTIONS.filter((question) => Boolean(completed?.[question.id])).length;
  const progress = totalQuestions ? completedQuestions / totalQuestions : 0;
  const isActive = (item) => activePath === item.to || (item.to === '/cnr-notes' && activePath.startsWith('/cnr-notes/'));
  const groupIsActive = (group) => group.items.some((item) => isActive(item) || item.children?.some(isActive));
  const moduleProgressLabel = (moduleId, progressState) => {
    const moduleQuestions = QUESTIONS.filter((question) => question.module === moduleId);
    const done = moduleQuestions.filter((question) => Boolean(progressState?.[question.id])).length;
    return `Module ${moduleId}: ${done} of ${moduleQuestions.length} completed`;
  };
  const moduleProgressWidth = (moduleId, progressState) => {
    const moduleQuestions = QUESTIONS.filter((question) => question.module === moduleId);
    const done = moduleQuestions.filter((question) => Boolean(progressState?.[question.id])).length;
    return (moduleQuestions.length ? done / moduleQuestions.length * 100 : 0) + '%';
  };

  useEffect(() => {
    const onShortcut = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        navSearchRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onShortcut);
    return () => document.removeEventListener('keydown', onShortcut);
  }, []);
  useEffect(() => { try { localStorage.setItem('cnr-sidebar-groups-v2', JSON.stringify(expanded)); } catch { /* optional navigation preference */ } }, [expanded]);
  useEffect(() => { try { localStorage.setItem('cnr-sidebar-papers-expanded-v2', String(papersExpanded)); } catch { /* optional navigation preference */ } }, [papersExpanded]);

  useEffect(() => {
    setExpanded((current) => {
      const next = { ...current };
      NAV_GROUPS.forEach((group) => { if (groupIsActive(group)) next[group.id] = true; });
      return next;
    });
    if (activePath === '/dec-jan-2026' || activePath === '/question-papers/june-july-2026') setPapersExpanded(true);
  }, [activePath]);

  const normalizedSearch = navSearch.trim().toLowerCase();
  const matchesItem = (item) => !normalizedSearch || item.label.toLowerCase().includes(normalizedSearch) || item.shortLabel?.toLowerCase().includes(normalizedSearch) || item.children?.some(matchesItem);
  const renderLink = (item, nested = false) => {
    const active = isActive(item);
    const Icon = item.icon;
    const count = item.countFrom === 'bookmarks' ? bookmarkCount : item.count;
    const hasCount = Number.isFinite(count) && (item.countFrom !== 'bookmarks' || count > 0);
    if (item.children) return (
      <div key={item.to} className="sidebar-parent-item">
        <div className="sidebar-parent-row">
          <a href={'#' + item.to} onClick={onNavigate} aria-current={active ? 'page' : undefined}
            aria-label={item.label} title={collapsed ? item.label : undefined}
            className={'sidebar-link sidebar-parent-link ' + (active ? 'is-active' : '')}>
            <Icon size={17} aria-hidden="true" /><span className="sidebar-link-label">{item.label}</span>
          </a>
          <button type="button" className="sidebar-nested-toggle" aria-label={(papersExpanded ? 'Collapse ' : 'Expand ') + item.label}
            aria-expanded={papersExpanded} aria-controls={instance + '-papers-subnav'} title={collapsed ? 'Toggle question papers' : undefined}
            onClick={() => setPapersExpanded((value) => !value)}>
            <ChevronDown size={14} aria-hidden="true" className={papersExpanded ? 'is-rotated' : ''} />
          </button>
        </div>
        <div id={instance + '-papers-subnav'} className={'sidebar-subnav-panel ' + (papersExpanded ? 'is-open' : '')}
          aria-hidden={!papersExpanded} inert={!papersExpanded ? '' : undefined}>
          <div className="sidebar-subnav-inner">{item.children.filter(matchesItem).map((child) => renderLink(child, true))}</div>
        </div>
      </div>
    );
    return (
      <a key={item.to} href={'#' + item.to} onClick={onNavigate} aria-current={active ? 'page' : undefined}
        aria-label={item.label} title={collapsed ? item.label : undefined}
        className={'sidebar-link ' + (nested ? 'sidebar-link-nested ' : '') + (active ? 'is-active' : '')}>
        {Icon ? <Icon size={17} aria-hidden="true" /> : <span className="sidebar-link-dot" aria-hidden="true" />}
        <span className="sidebar-link-label">{item.shortLabel || item.label}</span>
        {item.moduleId && <span className="sidebar-module-progress" aria-label={moduleProgressLabel(item.moduleId, completed)} title={moduleProgressLabel(item.moduleId, completed)}>
          <span style={{ width: moduleProgressWidth(item.moduleId, completed) }} />
        </span>}
        {hasCount && <span className="sidebar-badge">{count}</span>}
      </a>
    );
  };

  return (
    <nav aria-label="Primary navigation" className="sidebar-nav-scroll flex flex-1 flex-col px-3 pb-3">
      {!collapsed && <div className="sidebar-command-search">
        <Search size={15} aria-hidden="true" />
        <input ref={navSearchRef} value={navSearch} onChange={(event) => setNavSearch(event.target.value)} placeholder="Find a destination…" aria-label="Search sidebar navigation" />
        {navSearch && <button type="button" onClick={() => setNavSearch('')} aria-label="Clear navigation search"><X size={13} /></button>}
        <kbd>Ctrl K</kbd>
      </div>}
      <div className="space-y-3 py-2">
        {NAV_GROUPS.filter((group) => group.items.some(matchesItem)).map((group) => {
          const GroupIcon = group.icon;
          const isExpanded = Boolean(expanded[group.id]) || Boolean(normalizedSearch);
          const panelId = instance + '-group-' + group.id;
          return (
            <section key={group.id} className="sidebar-group">
              <button type="button" className="sidebar-group-toggle" aria-expanded={isExpanded}
                aria-controls={panelId} aria-label={(isExpanded ? 'Collapse ' : 'Expand ') + group.title}
                title={collapsed ? group.title : undefined}
                onClick={() => setExpanded((current) => ({ ...current, [group.id]: !current[group.id] }))}>
                <GroupIcon size={15} aria-hidden="true" />
                <span className="sidebar-group-label">{group.title}</span>
                <ChevronDown size={14} aria-hidden="true" className={'sidebar-group-chevron ' + (isExpanded ? 'is-rotated' : '')} />
              </button>
              <div id={panelId} className={'sidebar-group-panel ' + (isExpanded ? 'is-open' : '')}
                aria-hidden={!isExpanded} inert={!isExpanded ? '' : undefined}>
                <div className="sidebar-group-inner"><div className="space-y-1 pt-1">{group.items.filter(matchesItem).map((item) => renderLink(item))}</div></div>
              </div>
            </section>
          );
        })}
      </div>
      <a href="#/analytics" onClick={onNavigate} className="sidebar-progress-card block rounded-xl p-3"
        aria-label={'Open Progress & Analytics. ' + completedQuestions + ' of ' + totalQuestions + ' questions completed'}
        title={collapsed ? completedQuestions + '/' + totalQuestions + ' questions completed' : undefined}>
        <div className="sidebar-progress-heading">
          <span className="sidebar-progress-copy"><strong>Learning progress</strong><small>{completedQuestions} / {totalQuestions} questions</small></span>
          <span className="sidebar-progress-ring" aria-hidden="true">
            <svg viewBox="0 0 40 40"><circle className="progress-ring-track" cx="20" cy="20" r="16" /><circle className="progress-ring-value" cx="20" cy="20" r="16" style={{ strokeDasharray: 100.53, strokeDashoffset: 100.53 * (1 - progress) }} /></svg>
            <b>{Math.round(progress * 100)}%</b>
          </span>
        </div>
        <div className="sidebar-progress-track" role="progressbar" aria-label="Questions completed"
          aria-valuemin={0} aria-valuemax={totalQuestions} aria-valuenow={completedQuestions} aria-valuetext={completedQuestions + ' of ' + totalQuestions + ' questions completed'}>
          <span style={{ width: (progress * 100) + '%' }} />
        </div>
        <span className="sidebar-progress-caption sidebar-progress-copy">{progress >= 1 ? 'Every question completed — excellent work.' : progress >= .5 ? 'Great momentum. Keep it going.' : progress > 0 ? 'A strong start. One question at a time.' : 'Your learning journey starts here.'}</span>
      </a>
    </nav>
  );
}

export default function Shell({ path, children }) {
  const { focus, setFocus, query, setQuery } = useStudy();
  const [open, setOpen] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(() => { try { return localStorage.getItem('cnr-sidebar-visible-v1') !== 'false'; } catch { return true; } });
  const [collapsed, setCollapsed] = useState(() => { try { return localStorage.getItem('cnr-sidebar-collapsed-v1') === 'true'; } catch { return false; } });
  const [top, setTop] = useState(false);
  const menuButtonRef = useRef(null);
  const drawerRef = useRef(null);
  const isAnswer = path.startsWith('/q/');
  const hide = focus && isAnswer;

  useEffect(() => { setOpen(false); window.scrollTo(0, 0); }, [path]);
  useEffect(() => { try { localStorage.setItem('cnr-sidebar-collapsed-v1', String(collapsed)); } catch { /* optional preference */ } }, [collapsed]);
  useEffect(() => { try { localStorage.setItem('cnr-sidebar-visible-v1', String(sidebarVisible)); } catch { /* optional preference */ } }, [sidebarVisible]);
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

  const cycleSidebarMode = () => {
    if (!sidebarVisible) {
      setSidebarVisible(true);
      return;
    }
    if (!collapsed) {
      setCollapsed(true);
      return;
    }
    setCollapsed(false);
    setSidebarVisible(false);
  };
  const sidebarControlLabel = !sidebarVisible ? 'Show sidebar' : collapsed ? 'Hide sidebar' : 'Compact sidebar';
  const onSearch = (v) => { setQuery(v); if (!/^\/(questions|module)/.test(path)) go('/questions'); };

  return (
    <div className="min-h-screen">
      <a href="#main" onClick={(e) => { e.preventDefault(); document.getElementById('main')?.focus(); }} className="sr-only z-[200] rounded-lg bg-brand px-4 py-2 font-semibold text-white focus:not-sr-only focus:fixed focus:left-3 focus:top-3">Skip to content</a>

      {!hide && sidebarVisible && (
        <aside id="desktop-sidebar" aria-label="Desktop sidebar" className={'sidebar-shell fixed inset-y-0 left-0 z-30 hidden flex-col border-r lg:flex ' + (collapsed ? 'sidebar-collapsed w-[4.75rem]' : 'w-[17rem]')}>
          <div className="sidebar-brand-row flex items-center justify-between gap-2 px-3 py-4">
            <a href="#/" className="sidebar-brand-mark" aria-label="CNR-IA-2 home" title="CNR-IA-2">
              <span>C</span><Leaf size={13} aria-hidden="true" />
            </a>
            <div className="sidebar-brand-copy min-w-0"><Logo /></div>

          </div>
          <Nav path={path} collapsed={collapsed} instance="desktop" />
        </aside>
      )}

      {open && (
        <div id="mobile-navigation-dialog" className="mobile-navigation-dialog fixed inset-0 z-50 lg:hidden no-print" role="dialog" aria-modal="true" aria-label="Navigation menu">
          <button type="button" aria-label="Close navigation menu" data-drawer-backdrop tabIndex={-1} className="absolute inset-0 h-full w-full cursor-default bg-black/60" onClick={() => setOpen(false)} />
          <div ref={drawerRef} tabIndex={-1} className="mobile-navigation-drawer absolute inset-y-0 left-0 flex w-[17rem] max-w-[85vw] flex-col overflow-y-auto bg-panel shadow-lift animate-rise">
            <div className="sidebar-brand-row flex items-center justify-between gap-2 px-3 py-4"><Logo /><button aria-label="Close menu" onClick={() => setOpen(false)} className="grid h-9 w-9 place-items-center rounded-lg hover:bg-sunk"><X size={18} /></button></div>
            <Nav path={path} onNavigate={() => setOpen(false)} instance="mobile" />
          </div>
        </div>
      )}

      {!hide && (
        <header className={'topbar sticky top-0 z-20 flex h-16 min-w-0 items-center gap-2 border-b border-line bg-bg/85 px-3 backdrop-blur sm:gap-3 sm:px-4 lg:px-6 2xl:px-8 ' + (sidebarVisible ? (collapsed ? 'lg:ml-[4.75rem]' : 'lg:ml-[17rem]') : 'lg:ml-0')}>
          <button
            type="button"
            className="sidebar-visibility-toggle hidden h-10 w-10 shrink-0 place-items-center rounded-xl border border-line bg-panel lg:grid"
            aria-label={sidebarControlLabel}
            aria-expanded={sidebarVisible}
            aria-controls="desktop-sidebar"
            aria-describedby="sidebar-control-hint"
            title={sidebarControlLabel}
            onClick={cycleSidebarMode}
          >
            {sidebarVisible && !collapsed ? <Minimize2 size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
          </button>
          <span id="sidebar-control-hint" className="sr-only">Repeated activation cycles between compact, hidden, and expanded navigation.</span>
          <button
            ref={menuButtonRef}
            type="button"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-line bg-panel lg:hidden"
            aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={open}
            aria-controls="mobile-navigation-dialog"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
          </button>
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

      <main id="main" tabIndex={-1} className={'outline-none ' + (hide || !sidebarVisible ? '' : collapsed ? 'lg:ml-[4.75rem]' : 'lg:ml-[17rem]')}>
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

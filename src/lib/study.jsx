import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

const KEY = 'vtu-examprep-v1';
export const FONT_SIZES = [16, 17, 18, 20, 22];
export const WIDTHS = [{ label: 'Narrow', px: 640 }, { label: 'Medium', px: 760 }, { label: 'Wide', px: 920 }];
const DEFAULTS = { completed: {}, bookmarks: {}, recent: [], examChecks: {}, practiceAttempts: {}, settings: { theme: null, fontIdx: 2, widthIdx: 1 } };

function load() {
  try {
    const s = JSON.parse(localStorage.getItem(KEY) || 'null');
    if (!s) return DEFAULTS;
    return { ...DEFAULTS, ...s, examChecks: s.examChecks || {}, practiceAttempts: s.practiceAttempts || {}, settings: { ...DEFAULTS.settings, ...(s.settings || {}) } };
  } catch { return DEFAULTS; }
}
const preferredTheme = () => (window.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
const Ctx = createContext(null);
export const useStudy = () => useContext(Ctx);

export function StudyProvider({ children }) {
  const [state, setState] = useState(load);
  const [focus, setFocus] = useState(false);
  const [query, setQuery] = useState('');
  const [toasts, setToasts] = useState([]);
  const theme = state.settings.theme || preferredTheme();

  useEffect(() => { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch { /* storage unavailable */ } }, [state]);
  useEffect(() => { document.documentElement.setAttribute('data-theme', theme); }, [theme]);
  useEffect(() => {
    const r = document.documentElement.style;
    r.setProperty('--read-size', FONT_SIZES[state.settings.fontIdx] + 'px');
    r.setProperty('--read-width', WIDTHS[state.settings.widthIdx].px + 'px');
  }, [state.settings.fontIdx, state.settings.widthIdx]);

  const notify = useCallback((msg, kind = 'ok') => {
    const id = Math.random().toString(36).slice(2);
    setToasts((t) => [...t, { id, msg, kind }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 2600);
  }, []);

  const api = useMemo(() => ({
    ...state, theme, focus, setFocus, query, setQuery, toasts, notify,
    isDone: (id) => !!state.completed[id],
    isMarked: (id) => !!state.bookmarks[id],
    toggleDone: (id) => setState((s) => {
      const completed = { ...s.completed };
      if (completed[id]) delete completed[id]; else completed[id] = Date.now();
      return { ...s, completed };
    }),
    toggleBookmark: (id) => setState((s) => {
      const bookmarks = { ...s.bookmarks };
      if (bookmarks[id]) delete bookmarks[id]; else bookmarks[id] = Date.now();
      return { ...s, bookmarks };
    }),
    visit: (id) => setState((s) => ({ ...s, recent: [id, ...s.recent.filter((x) => x !== id)].slice(0, 6) })),
    toggleExamCheck: (id, key) => setState((s) => {
      const current = s.examChecks[id] || {};
      return { ...s, examChecks: { ...s.examChecks, [id]: { ...current, [key]: !current[key] } } };
    }),
    savePracticeAttempt: (id, score, total) => setState((s) => {
      const previous = s.practiceAttempts[id];
      return { ...s, practiceAttempts: { ...s.practiceAttempts, [id]: { at: Date.now(), score, total, attempts: (previous?.attempts || 0) + 1 } } };
    }),
    setSetting: (k, v) => setState((s) => ({ ...s, settings: { ...s.settings, [k]: v } })),
    toggleTheme: () => setState((s) => ({ ...s, settings: { ...s.settings, theme: theme === 'dark' ? 'light' : 'dark' } })),
    resetAll: () => setState((s) => ({ ...DEFAULTS, settings: s.settings })),
  }), [state, theme, focus, query, toasts, notify]);

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>;
}
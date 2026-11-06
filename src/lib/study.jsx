import { createContext, useCallback, useContext, useEffect, useLayoutEffect, useMemo, useState } from 'react';

const KEY = 'vtu-examprep-v1';
export const FONT_SIZES = [16, 17, 18, 20, 22];
export const WIDTHS = [{ label: 'Narrow', px: 640 }, { label: 'Medium', px: 760 }, { label: 'Wide', px: 920 }];
const DEFAULTS = { completed: {}, bookmarks: {}, recent: [], examChecks: {}, practiceAttempts: {}, evaluationAttempts: [], revisionChecks: {}, readingChecks: {}, quizAttempts: [], examAttempts: [], plannerTasks: [], visualStudio: { viewed: {}, completedMaps: {}, exercises: {}, favorites: {}, revision: {}, quizAttempts: [] }, visualLab: { explored: {}, completed: {}, scenarioAttempts: [] }, smartRevision: { tasks: [], settings: null, reviews: {} }, settings: { theme: 'dark', cyberTheme: 'ultra-cyber', fontIdx: 2, widthIdx: 1 } };

function load() {
  try {
    const s = JSON.parse(localStorage.getItem(KEY) || 'null');
    if (!s) return DEFAULTS;
    return {
      ...DEFAULTS, ...s,
      examChecks: s.examChecks || {}, practiceAttempts: s.practiceAttempts || {}, evaluationAttempts: Array.isArray(s.evaluationAttempts) ? s.evaluationAttempts : [],
      revisionChecks: s.revisionChecks || {}, readingChecks: s.readingChecks || {}, quizAttempts: Array.isArray(s.quizAttempts) ? s.quizAttempts : [],
      examAttempts: Array.isArray(s.examAttempts) ? s.examAttempts : [],
      plannerTasks: Array.isArray(s.plannerTasks) ? s.plannerTasks : [],
      visualStudio: { ...DEFAULTS.visualStudio, ...(s.visualStudio || {}), viewed: s.visualStudio?.viewed || {}, completedMaps: s.visualStudio?.completedMaps || {}, exercises: s.visualStudio?.exercises || {}, favorites: s.visualStudio?.favorites || {}, revision: s.visualStudio?.revision || {}, quizAttempts: Array.isArray(s.visualStudio?.quizAttempts) ? s.visualStudio.quizAttempts : [] },
      visualLab: { ...DEFAULTS.visualLab, ...(s.visualLab || {}), explored: s.visualLab?.explored || {}, completed: s.visualLab?.completed || {}, scenarioAttempts: Array.isArray(s.visualLab?.scenarioAttempts) ? s.visualLab.scenarioAttempts : [] },
      smartRevision: { ...DEFAULTS.smartRevision, ...(s.smartRevision || {}), tasks: Array.isArray(s.smartRevision?.tasks) ? s.smartRevision.tasks : [], reviews: s.smartRevision?.reviews || {} },
      settings: { ...DEFAULTS.settings, ...(s.settings || {}) },
    };
  } catch { return DEFAULTS; }
}
const Ctx = createContext(null);
export const useStudy = () => useContext(Ctx);

export function StudyProvider({ children }) {
  const [state, setState] = useState(load);
  const [focus, setFocus] = useState(false);
  const [query, setQuery] = useState('');
  const [toasts, setToasts] = useState([]);
  const theme = state.settings.theme || 'dark';
  const cyberTheme = state.settings.cyberTheme || 'ultra-cyber';

  useEffect(() => { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch { /* storage unavailable */ } }, [state]);
  useLayoutEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    root.setAttribute('data-neon-theme', cyberTheme);
    root.setAttribute('data-visual-theme', theme === 'dark' ? 'neon' : 'light');
    const themeColor = document.querySelector('meta[name="theme-color"]');
    if (themeColor) themeColor.setAttribute('content', theme === 'dark' ? '#050816' : '#f7f8f6');
  }, [theme, cyberTheme]);
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
    ...state, theme, cyberTheme, focus, setFocus, query, setQuery, toasts, notify,
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
    toggleRevision: (id) => setState((s) => ({ ...s, revisionChecks: { ...s.revisionChecks, [id]: s.revisionChecks[id] ? 0 : Date.now() } })),
    toggleReading: (id) => setState((s) => ({ ...s, readingChecks: { ...s.readingChecks, [id]: s.readingChecks[id] ? 0 : Date.now() } })),
    savePracticeAttempt: (id, score, total) => setState((s) => {
      const previous = s.practiceAttempts[id];
      return { ...s, practiceAttempts: { ...s.practiceAttempts, [id]: { at: Date.now(), score, total, attempts: (previous?.attempts || 0) + 1 } } };
    }),
    saveEvaluationAttempt: (attempt) => setState((s) => ({ ...s, evaluationAttempts: [{ ...attempt, id: `evaluation-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, at: Date.now() }, ...(s.evaluationAttempts || [])].slice(0, 100) })),
    clearEvaluationHistory: (predicate) => setState((s) => ({ ...s, evaluationAttempts: (s.evaluationAttempts || []).filter((attempt) => !predicate(attempt)) })),
    saveQuizAttempt: (attempt) => setState((s) => ({ ...s, quizAttempts: [{ ...attempt, id: `quiz-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, at: Date.now() }, ...s.quizAttempts].slice(0, 100) })),
    saveExamAttempt: (attempt) => setState((s) => ({ ...s, examAttempts: [{ ...attempt, id: `exam-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, at: Date.now() }, ...(s.examAttempts || [])].slice(0, 100) })),
    addPlannerTask: (task) => setState((s) => ({ ...s, plannerTasks: [{ ...task, id: `task-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, createdAt: Date.now(), done: false }, ...s.plannerTasks] })),
    togglePlannerTask: (id) => setState((s) => ({ ...s, plannerTasks: s.plannerTasks.map((t) => t.id === id ? { ...t, done: !t.done, updatedAt: Date.now() } : t) })),
    deletePlannerTask: (id) => setState((s) => ({ ...s, plannerTasks: s.plannerTasks.filter((t) => t.id !== id) })),
    markVisualViewed: (id) => setState((s) => ({ ...s, visualStudio: { ...s.visualStudio, viewed: { ...s.visualStudio.viewed, [id]: s.visualStudio.viewed[id] || Date.now() } } })),
    completeVisualMap: (id) => setState((s) => ({ ...s, visualStudio: { ...s.visualStudio, completedMaps: { ...s.visualStudio.completedMaps, [id]: Date.now() } } })),
    completeVisualExercise: (id) => setState((s) => ({ ...s, visualStudio: { ...s.visualStudio, exercises: { ...s.visualStudio.exercises, [id]: Date.now() } } })),
    toggleVisualFavorite: (id) => setState((s) => { const favorites = { ...s.visualStudio.favorites }; if (favorites[id]) delete favorites[id]; else favorites[id] = Date.now(); return { ...s, visualStudio: { ...s.visualStudio, favorites } }; }),
    toggleVisualRevision: (id, checked) => setState((s) => ({ ...s, visualStudio: { ...s.visualStudio, revision: { ...(s.visualStudio.revision || {}), [id]: checked ? Date.now() : 0 } } })),
    saveVisualQuizAttempt: (attempt) => setState((s) => ({ ...s, visualStudio: { ...s.visualStudio, quizAttempts: [{ ...attempt, at: Date.now() }, ...(s.visualStudio.quizAttempts || [])].slice(0, 50) } })),
    markLabExplored: (id) => setState((s) => ({ ...s, visualLab: { ...s.visualLab, explored: { ...s.visualLab.explored, [id]: s.visualLab.explored[id] || Date.now() } } })),
    completeLabLesson: (id) => setState((s) => ({ ...s, visualLab: { ...s.visualLab, completed: { ...s.visualLab.completed, [id]: Date.now() } } })),
    saveLabScenario: (attempt) => setState((s) => ({ ...s, visualLab: { ...s.visualLab, scenarioAttempts: [{ ...attempt, id: `lab-scenario-${Date.now()}`, at: Date.now() }, ...(s.visualLab.scenarioAttempts || [])].slice(0, 100) } })),
    setSmartRevision: (smartRevision) => setState((s) => ({ ...s, smartRevision: { ...DEFAULTS.smartRevision, ...(smartRevision || {}), tasks: Array.isArray(smartRevision?.tasks) ? smartRevision.tasks : [], reviews: smartRevision?.reviews || {} } })),
    setSetting: (k, v) => setState((s) => ({ ...s, settings: { ...s.settings, [k]: v } })),
    toggleTheme: () => setState((s) => ({ ...s, settings: { ...s.settings, theme: theme === 'dark' ? 'light' : 'dark' } })),
    resetAll: () => setState((s) => ({ ...DEFAULTS, settings: s.settings })),
  }), [state, theme, focus, query, toasts, notify]);

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>;
}
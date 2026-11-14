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
      settings: (() => {
        const settings = { ...DEFAULTS.settings, ...(s.settings || {}) };
        settings.theme = ['dark', 'light'].includes(settings.theme) ? settings.theme : DEFAULTS.settings.theme;
        settings.cyberTheme = ['ultra-cyber', 'arctic', 'purple', 'eco'].includes(settings.cyberTheme) ? settings.cyberTheme : DEFAULTS.settings.cyberTheme;
        settings.fontIdx = Number.isInteger(settings.fontIdx) && settings.fontIdx >= 0 && settings.fontIdx < FONT_SIZES.length ? settings.fontIdx : DEFAULTS.settings.fontIdx;
        settings.widthIdx = Number.isInteger(settings.widthIdx) && settings.widthIdx >= 0 && settings.widthIdx < WIDTHS.length ? settings.widthIdx : DEFAULTS.settings.widthIdx;
        return settings;
      })(),
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
    if (themeColor) {
      // Keep the browser chrome aligned with the actual selected palette and mode.
      const pageColor = getComputedStyle(root).getPropertyValue('--bg-primary').trim();
      themeColor.setAttribute('content', pageColor || (theme === 'dark' ? '#050816' : '#f7f8f6'));
    }
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
    exportBackup: () => JSON.stringify({ app: 'vtu-examprep', version: 1, exportedAt: new Date().toISOString(), data: state }, null, 2),
    importBackup: (raw) => {
      try {
        const backup = JSON.parse(raw);
        if (backup?.app !== 'vtu-examprep' || backup?.version !== 1 || !backup.data || typeof backup.data !== 'object' || Array.isArray(backup.data)) {
          notify('This is not a supported VTU ExamPrep backup', 'err');
          return false;
        }
        const data = backup.data;
        const record = (value) => value && typeof value === 'object' && !Array.isArray(value) ? value : {};
        const visualStudio = record(data.visualStudio);
        const visualLab = record(data.visualLab);
        const smartRevision = record(data.smartRevision);
        const incomingSettings = record(data.settings);
        const restoredSettings = { ...DEFAULTS.settings, ...incomingSettings };
        restoredSettings.theme = ['dark', 'light'].includes(restoredSettings.theme) ? restoredSettings.theme : DEFAULTS.settings.theme;
        restoredSettings.cyberTheme = ['ultra-cyber', 'arctic', 'purple', 'eco'].includes(restoredSettings.cyberTheme) ? restoredSettings.cyberTheme : DEFAULTS.settings.cyberTheme;
        restoredSettings.fontIdx = Number.isInteger(restoredSettings.fontIdx) && restoredSettings.fontIdx >= 0 && restoredSettings.fontIdx < FONT_SIZES.length ? restoredSettings.fontIdx : DEFAULTS.settings.fontIdx;
        restoredSettings.widthIdx = Number.isInteger(restoredSettings.widthIdx) && restoredSettings.widthIdx >= 0 && restoredSettings.widthIdx < WIDTHS.length ? restoredSettings.widthIdx : DEFAULTS.settings.widthIdx;
        const restored = {
          ...DEFAULTS, ...data,
          completed: record(data.completed), bookmarks: record(data.bookmarks),
          recent: Array.isArray(data.recent) ? data.recent.filter((id) => typeof id === 'string') : [],
          examChecks: record(data.examChecks), practiceAttempts: record(data.practiceAttempts),
          evaluationAttempts: Array.isArray(data.evaluationAttempts) ? data.evaluationAttempts : [],
          revisionChecks: record(data.revisionChecks), readingChecks: record(data.readingChecks),
          quizAttempts: Array.isArray(data.quizAttempts) ? data.quizAttempts : [],
          examAttempts: Array.isArray(data.examAttempts) ? data.examAttempts : [],
          plannerTasks: Array.isArray(data.plannerTasks) ? data.plannerTasks : [],
          visualStudio: {
            ...DEFAULTS.visualStudio, ...visualStudio,
            viewed: record(visualStudio.viewed), completedMaps: record(visualStudio.completedMaps),
            exercises: record(visualStudio.exercises), favorites: record(visualStudio.favorites),
            revision: record(visualStudio.revision),
            quizAttempts: Array.isArray(visualStudio.quizAttempts) ? visualStudio.quizAttempts : [],
          },
          visualLab: {
            ...DEFAULTS.visualLab, ...visualLab,
            explored: record(visualLab.explored), completed: record(visualLab.completed),
            scenarioAttempts: Array.isArray(visualLab.scenarioAttempts) ? visualLab.scenarioAttempts : [],
          },
          smartRevision: {
            ...DEFAULTS.smartRevision, ...smartRevision,
            tasks: Array.isArray(smartRevision.tasks) ? smartRevision.tasks : [],
            reviews: record(smartRevision.reviews),
          },
          settings: restoredSettings,
        };
        setState(restored);
        notify('Backup restored successfully');
        return true;
      } catch {
        notify('Could not read this backup file', 'err');
        return false;
      }
    },
    setSetting: (k, v) => {
      // Keep the root palette selector in sync in the same click that changes
      // the selected neon theme; the layout effect below remains the source of
      // truth for persisted settings and full appearance synchronization.
      if (k === 'cyberTheme' && ['ultra-cyber', 'arctic', 'purple', 'eco'].includes(v)) {
        document.documentElement.setAttribute('data-neon-theme', v);
      }
      setState((s) => ({ ...s, settings: { ...s.settings, [k]: v } }));
    },
    toggleTheme: () => setState((s) => ({ ...s, settings: { ...s.settings, theme: s.settings.theme === 'dark' ? 'light' : 'dark' } })),
    resetAll: () => setState((s) => ({ ...DEFAULTS, settings: s.settings })),
  }), [state, theme, focus, query, toasts, notify]);

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>;
}
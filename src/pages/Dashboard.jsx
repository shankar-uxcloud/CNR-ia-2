import { useEffect, useState } from 'react';
import { ArrowRight, Bookmark, CheckCircle2, Circle, Clock, PlayCircle, RotateCcw, Trophy, Brain, CalendarDays, Zap } from 'lucide-react';
import { QUESTIONS, MODULES, MODULE_ORDER, byId, byModule } from '../data/questions';
import { useStudy } from '../lib/study';
import { iconFor } from '../lib/icons';
import { ProgressRing, Bar, ModuleBadge, modColor, Empty } from '../components/ui';

function MiniRow({ q }) {
  const { isDone } = useStudy();
  const Icon = iconFor(q.icon);
  return (
    <a href={`#/q/${q.id}`} className="group flex min-w-0 items-center gap-3 rounded-xl px-3 py-2.5 transition hover:bg-sunk">
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg" style={{ background: `rgb(var(--m${q.module}) / .12)`, color: modColor(q.module) }}><Icon size={17} aria-hidden="true" /></span>
      <span className="min-w-0 flex-1"><span className="block text-sm font-semibold leading-snug">{q.code} · {q.title}</span><span className="block text-xs text-mute">Module {q.module}</span></span>
      {isDone(q.id) ? <CheckCircle2 size={17} className="text-brand" aria-label="Completed" /> : <ArrowRight size={16} className="text-mute transition group-hover:translate-x-0.5" aria-hidden="true" />}
    </a>
  );
}

export default function Dashboard() {
  const { completed, bookmarks, recent, practiceAttempts = {}, examChecks = {}, revisionChecks = {}, readingChecks = {}, quizAttempts = [], plannerTasks = [], togglePlannerTask, resetAll, notify } = useStudy();
  const done = Object.keys(completed).length;
  const [v, setV] = useState(0);
  useEffect(() => { const t = setTimeout(() => setV(done / 10), 80); return () => clearTimeout(t); }, [done]);

  const last = recent.map(byId).find((q) => q && !completed[q.id]);
  const next = last || QUESTIONS.find((q) => !completed[q.id]);
  const marked = QUESTIONS.filter((q) => bookmarks[q.id]);
  const recents = recent.map(byId).filter(Boolean);
  const attempted = Object.keys(practiceAttempts).length;
  const practiceSessions = Object.values(practiceAttempts).reduce((n, a) => n + (a.attempts || 0), 0);
  const checklistDone = Object.values(examChecks).reduce((n, checks) => n + Object.values(checks).filter(Boolean).length, 0);
  const avgQuiz = quizAttempts.length ? Math.round(quizAttempts.reduce((n, a) => n + (a.total ? a.score / a.total : 0), 0) / quizAttempts.length * 100) : null;
  const weakIds = [...new Set(quizAttempts.flatMap(a => a.wrongQuestionIds || []))];
  const weakQuestions = QUESTIONS.filter(q => weakIds.includes(q.id));
  const todayDate = new Date();
  const todayKey = [todayDate.getFullYear(), String(todayDate.getMonth() + 1).padStart(2, '0'), String(todayDate.getDate()).padStart(2, '0')].join('-');
  const dueTasks = plannerTasks.filter((task) => !task.done && task.due && task.due <= todayKey)
    .sort((a, b) => a.due.localeCompare(b.due));
  const focusQuestions = weakQuestions.filter((q) => !completed[q.id]).slice(0, 2);
  const dailyFocusQuestion = focusQuestions[0] || next;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-8 sm:py-10">
      <p className="eyebrow">BCV755B · Conservation of Natural Resources</p>
      <h1 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">Welcome back. Let’s keep preparing.</h1>
      <p className="mt-2 max-w-2xl text-mute">Ten source-based 10-mark answers with labelled diagrams. Mark each one complete as you revise it.</p>

      <section className="cyber-hud mt-6 grid grid-cols-2 gap-2 sm:grid-cols-4" aria-label="Study command centre summary">
        {[
          ['Answers mastered', `${done}/10`, 'progress'],
          ['Saved bookmarks', String(marked.length), 'saved'],
          ['Quiz attempts', String(quizAttempts.length), 'practice'],
          ['Pending tasks', String(plannerTasks.filter((task) => !task.done).length), 'planner'],
        ].map(([label, value, key]) => (
          <div className="cyber-hud-cell" key={key}>
            <span className="cyber-hud-label">{label}</span>
            <strong className="cyber-hud-value">{value}</strong>
            <span className="cyber-hud-signal" aria-hidden="true" />
          </div>
        ))}
      </section>

      <section className="card mt-5 overflow-hidden" aria-labelledby="daily-focus-title">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-5 py-4">
          <div>
            <p className="eyebrow">Your next best actions</p>
            <h2 id="daily-focus-title" className="mt-1 text-lg font-bold">Today’s focus</h2>
          </div>
          <a href="#/planner" className="text-xs font-semibold text-brand hover:underline">Open planner →</a>
        </div>
        <div className="grid gap-4 p-5 md:grid-cols-2">
          <div>
            <div className="mb-2 flex items-center justify-between gap-2">
              <h3 className="text-sm font-semibold">Tasks due</h3>
              <span className="rounded-full bg-sunk px-2.5 py-1 text-xs tabular-nums text-mute">{dueTasks.length} pending</span>
            </div>
            {dueTasks.length ? <div className="space-y-2">
              {dueTasks.slice(0, 3).map((task) => (
                <div key={task.id} className="flex items-start gap-2 rounded-xl bg-sunk px-3 py-2.5">
                  <button type="button" onClick={() => togglePlannerTask(task.id)} aria-label={`Complete ${task.title}`} className="mt-0.5 shrink-0 text-brand"><Circle size={17}/></button>
                  <span className="min-w-0 flex-1 text-sm font-medium">{task.title}<span className="mt-0.5 block text-xs text-mute">{task.due < todayKey ? 'Overdue' : 'Due today'}</span></span>
                </div>
              ))}
            </div> : <div className="rounded-xl bg-sunk px-3 py-3">
              <p className="text-sm font-medium">No overdue or due-today tasks</p>
              <p className="mt-1 text-xs text-mute">You’re clear for today. Add a small revision goal when you’re ready.</p>
            </div>}
          </div>
          <div>
            <h3 className="mb-2 text-sm font-semibold">Recommended revision</h3>
            {dailyFocusQuestion ? <a href={`#/q/${dailyFocusQuestion.id}`} className="group block rounded-xl border border-line p-3 transition hover:border-brand">
              <span className="flex items-center justify-between gap-2"><ModuleBadge m={dailyFocusQuestion.module}/><ArrowRight size={15} className="text-mute transition group-hover:translate-x-0.5"/></span>
              <span className="mt-2 block text-sm font-semibold">{dailyFocusQuestion.code} · {dailyFocusQuestion.title}</span>
              <span className="mt-1 block text-xs text-mute">{focusQuestions.length ? 'Suggested from topics missed in your saved quizzes.' : 'Your next incomplete answer in the study sequence.'}</span>
            </a> : <p className="rounded-xl bg-sunk p-3 text-sm text-mute">All study answers are complete. Use Revision Mode for a final review.</p>}
            <a href="#/quiz" className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-brand hover:underline">Test your recall <ArrowRight size={13}/></a>
          </div>
        </div>
      </section>

      <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-5">
        <section className="card min-w-0 p-6 lg:col-span-3" aria-label="Overall progress">
          <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-center">
            <ProgressRing value={v} size={168} stroke={13}>
              <span className="text-4xl font-bold tabular-nums">{Math.round((done / 10) * 100)}%</span><span className="text-xs text-mute">overall</span>
            </ProgressRing>
            <div className="w-full flex-1">
              <div className="grid grid-cols-3 gap-3 text-center">
                {[['Total', 10], ['Completed', done], ['Remaining', 10 - done]].map(([l, n]) => (
                  <div key={l} className="rounded-xl bg-sunk px-2 py-3"><div className="text-2xl font-bold tabular-nums">{n}</div><div className="text-xs text-mute">{l}</div></div>
                ))}
              </div>
              <div className="mt-5 space-y-3.5">
                {MODULE_ORDER.slice().sort((a, b) => a - b).map((m) => {
                  const qs = byModule(m), d = qs.filter((q) => completed[q.id]).length;
                  return (
                    <div key={m}>
                      <div className="mb-1.5 flex items-center justify-between text-sm"><a href={`#/module/${m}`} className="font-medium hover:underline">Module {m} <span className="text-mute">· {MODULES[m].name}</span></a><span className="tabular-nums text-mute">{d}/{qs.length}</span></div>
                      <Bar value={d / qs.length} color={modColor(m)} />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="card relative min-w-0 overflow-hidden p-6 lg:col-span-2" aria-label="Continue learning">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-brand/10 blur-2xl" aria-hidden="true" />
          <p className="eyebrow">Continue learning</p>
          {next ? (
            <>
              <div className="mt-3"><ModuleBadge m={next.module} /></div>
              <h2 className="mt-3 text-xl font-semibold tracking-tight">{next.code} · {next.title}</h2>
              <p className="mt-1 line-clamp-3 text-sm text-mute">{next.question}</p>
              <a href={`#/q/${next.id}`} className="btn-primary mt-5"><PlayCircle size={18} />{last ? 'Continue learning' : 'Start learning'}</a>
            </>
          ) : (
            <div className="mt-3"><Trophy className="text-brand" size={30} /><h2 className="mt-2 text-xl font-semibold">All ten answers completed</h2><p className="mt-1 text-sm text-mute">Use Revision Mode for a final quick pass.</p><a href="#/revision" className="btn-primary mt-4">Open Revision Mode</a></div>
          )}
        </section>

        <section className="card min-w-0 p-4 lg:col-span-3" aria-label="Quick access">
          <h2 className="px-3 pb-2 pt-1 text-sm font-semibold">Quick access · all 10 questions</h2>
          <div className="grid grid-cols-1 gap-x-2 sm:grid-cols-2">{QUESTIONS.map((q) => <MiniRow key={q.id} q={q} />)}</div>
        </section>

        <div className="min-w-0 space-y-5 lg:col-span-2">
          <section className="card p-4" aria-label="Bookmarked questions">
            <div className="flex items-center justify-between px-3 pb-2 pt-1"><h2 className="flex items-center gap-2 text-sm font-semibold"><Bookmark size={15} />Bookmarked</h2><a href="#/bookmarks" className="text-xs font-semibold text-brand hover:underline">View all</a></div>
            {marked.length ? marked.slice(0, 4).map((q) => <MiniRow key={q.id} q={q} />) : <p className="px-3 pb-3 text-sm text-mute">No bookmarks yet. Save answers you want to revisit.</p>}
          </section>
          <section className="card p-4" aria-label="Recently studied">
            <h2 className="flex items-center gap-2 px-3 pb-2 pt-1 text-sm font-semibold"><Clock size={15} />Recently studied</h2>
            {recents.length ? recents.slice(0, 4).map((q) => <MiniRow key={q.id} q={q} />) : <p className="px-3 pb-3 text-sm text-mute">Open any answer and it will appear here.</p>}
          </section>
        </div>
      </div>


      <section className="mt-6 grid gap-3 sm:grid-cols-3" aria-label="Additional preparation activity">
        <a href="#/practice" className="card p-4 transition hover:-translate-y-0.5 hover:shadow-lift"><p className="text-xs text-mute">Questions practised</p><p className="mt-1 text-2xl font-bold tabular-nums">{attempted}<span className="text-sm font-medium text-mute"> / 10</span></p><span className="mt-2 block text-xs font-semibold text-brand">Open Practice Centre →</span></a>
        <a href="#/practice" className="card p-4 transition hover:-translate-y-0.5 hover:shadow-lift"><p className="text-xs text-mute">Practice sessions</p><p className="mt-1 text-2xl font-bold tabular-nums">{practiceSessions}</p><span className="mt-2 block text-xs text-mute">Saved self-assessments</span></a>
        <div className="card p-4"><p className="text-xs text-mute">Writing checklist points</p><p className="mt-1 text-2xl font-bold tabular-nums">{checklistDone}</p><span className="mt-2 block text-xs text-mute">Ticks saved across questions</span></div>
      </section>

      <section className="mt-6 grid gap-3 sm:grid-cols-3" aria-label="Reading and quiz analytics">
        <div className="card p-4"><p className="text-xs text-mute">Answers marked as read</p><p className="mt-1 text-2xl font-bold tabular-nums">{Object.values(readingChecks).filter(Boolean).length}/10</p><span className="mt-2 block text-xs text-mute">Reading completion ticks</span></div>
        <div className="card p-4"><p className="text-xs text-mute">Average quiz score</p><p className="mt-1 text-2xl font-bold tabular-nums">{avgQuiz === null ? '—' : avgQuiz + '%'}</p><span className="mt-2 block text-xs text-mute">Across saved attempts</span></div>
        <div className="card p-4"><p className="text-xs text-mute">Questions missed in quizzes</p><p className="mt-1 text-2xl font-bold tabular-nums">{weakQuestions.length}</p><span className="mt-2 block text-xs text-mute">Unique topics to revisit</span></div>
      </section>
      {weakQuestions.length > 0 && <section className="card mt-4 p-5" aria-label="Quiz revision suggestions"><h2 className="font-semibold">Topics to revisit from quiz attempts</h2><p className="mt-1 text-sm text-mute">Based only on questions missed in your saved quiz attempts.</p><div className="mt-3 flex flex-wrap gap-2">{weakQuestions.map(q => <a key={q.id} href={`#/q/${q.id}`} className="chip hover:border-brand hover:text-brand">{q.code} · {q.title}</a>)}</div></section>}

      <section className="mt-6 grid gap-3 sm:grid-cols-3" aria-label="New study tools">
        <a href="#/revision" className="card p-4 transition hover:-translate-y-0.5 hover:shadow-lift"><Zap size={18} className="text-brand"/><p className="mt-2 text-xs text-mute">Revision completed</p><p className="mt-1 text-2xl font-bold tabular-nums">{Object.values(revisionChecks).filter(Boolean).length}/10</p><span className="mt-2 block text-xs font-semibold text-brand">Open Revision Mode →</span></a>
        <a href="#/quiz" className="card p-4 transition hover:-translate-y-0.5 hover:shadow-lift"><Brain size={18} className="text-brand"/><p className="mt-2 text-xs text-mute">Quiz attempts</p><p className="mt-1 text-2xl font-bold tabular-nums">{quizAttempts.length}</p><span className="mt-2 block text-xs font-semibold text-brand">Take a quiz →</span></a>
        <a href="#/planner" className="card p-4 transition hover:-translate-y-0.5 hover:shadow-lift"><CalendarDays size={18} className="text-brand"/><p className="mt-2 text-xs text-mute">Pending study tasks</p><p className="mt-1 text-2xl font-bold tabular-nums">{plannerTasks.filter(t=>!t.done).length}</p><span className="mt-2 block text-xs font-semibold text-brand">Open study planner →</span></a>
      </section>

      <section className="mt-6 grid gap-3 sm:grid-cols-3" aria-label="Next-generation learning tools"><a href="#/study-coach" className="card group p-5 transition hover:-translate-y-1 hover:shadow-lift"><Brain size={20} className="text-brand"/><p className="mt-2 font-semibold">AI Study Coach</p><p className="mt-1 text-sm text-mute">Build a topic-focused session and practise recall with source-grounded feedback.</p><span className="mt-3 block text-xs font-semibold text-brand">Open Study Coach →</span></a><a href="#/exam" className="card group p-5 transition hover:-translate-y-1 hover:shadow-lift"><Trophy size={20} className="text-brand"/><p className="mt-2 font-semibold">Smart Exam Simulator</p><p className="mt-1 text-sm text-mute">Timed papers, question flags, saved attempts and keyword coverage reports.</p><span className="mt-3 block text-xs font-semibold text-brand">Start an exam →</span></a><a href="#/analytics" className="card group p-5 transition hover:-translate-y-1 hover:shadow-lift"><Zap size={20} className="text-brand"/><p className="mt-2 font-semibold">Performance Insights</p><p className="mt-1 text-sm text-mute">Review quiz performance, study history and topics that need another pass.</p><span className="mt-3 block text-xs font-semibold text-brand">View analytics →</span></a></section>

      <section className="mt-6 grid gap-3 sm:grid-cols-3" aria-label="Immersive learning lab">
        <a href="#/environment-lab" className="card group flex items-center gap-4 p-5 transition hover:-translate-y-0.5 hover:shadow-lift sm:col-span-3">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-brand/10 text-brand"><span className="text-2xl" aria-hidden="true">◎</span></span>
          <span className="min-w-0 flex-1"><span className="block font-semibold">Explore the 3D Environmental Science Lab</span><span className="mt-1 block text-sm text-mute">Interactive Earth, forest, water-cycle, renewable-energy and biodiversity models.</span></span>
          <span className="text-sm font-semibold text-brand">Open lab →</span>
        </a>
      </section>

      <section className="mt-8" aria-labelledby="study-route">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
          <div>
            <p className="eyebrow">A simple revision route</p>
            <h2 id="study-route" className="mt-1 text-xl font-bold tracking-tight">Choose your next module</h2>
          </div>
          <p className="text-xs text-mute">Open a module and work through its questions in order.</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          {[3, 4, 5].map((m) => {
            const qs = QUESTIONS.filter((q) => q.module === m);
            const finished = qs.filter((q) => completed[q.id]).length;
            return (
              <a key={m} href={`#/module/${m}`} className="card group p-4 transition hover:-translate-y-0.5 hover:shadow-lift">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider" style={{ color: modColor(m) }}>Module {m}</span>
                  <span className="text-xs tabular-nums text-mute">{finished}/{qs.length} done</span>
                </div>
                <h3 className="mt-2 font-semibold">{MODULES[m].name}</h3>
                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-sunk">
                  <div className="h-full rounded-full transition-all" style={{ width: `${(finished / qs.length) * 100}%`, background: modColor(m) }} />
                </div>
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-brand">Study this module <ArrowRight size={13} className="transition group-hover:translate-x-0.5" /></span>
              </a>
            );
          })}
        </div>
      </section>

      <div className="mt-8 flex justify-end">
        <button onClick={() => { if (confirm('Reset all completed answers, bookmarks and recent history?')) { resetAll(); notify('Progress reset'); } }} className="inline-flex items-center gap-2 text-xs font-medium text-mute hover:text-ink"><RotateCcw size={13} />Reset progress</button>
      </div>
    </div>
  );
}

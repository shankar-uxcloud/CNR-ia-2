import { Component, useCallback, useEffect, useRef, useState } from 'react';
import { Activity, BookOpen, Database, Layers3, Leaf, ShieldCheck } from 'lucide-react';
import './CinematicIntro.css';

export const STARTUP_MIN_DURATION_MS = 9500;
export const STARTUP_TICK_MS = 95;
const COMPLETION_HOLD_MS = 400;
const EXIT_TRANSITION_MS = 480;

const SYSTEM_MODULES = [
  { label: 'Academic resources', Icon: BookOpen },
  { label: 'Question papers', Icon: Database },
  { label: 'Answer systems', Icon: Layers3 },
  { label: 'Study environment', Icon: ShieldCheck },
];

export function getStartupStatus(progress) {
  if (progress >= 100) return 'System Ready – Welcome to CNR-IA-2';
  if (progress >= 89) return 'Finalizing Learning Environment';
  if (progress >= 76) return 'Initializing Study Tools';
  if (progress >= 61) return 'Preparing Structural Diagrams';
  if (progress >= 46) return 'Synchronizing Answer Database';
  if (progress >= 31) return 'Preparing VTU Question Papers';
  if (progress >= 16) return 'Loading Academic Resources';
  return 'Initializing ExamPrep Environment';
}

class StartupErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { failed: false };
  }

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error) {
    this.props.onError(error);
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}

function StartupReadinessSignal({ onReady }) {
  useEffect(() => {
    onReady();
  }, [onReady]);
  return null;
}

function KnowledgePlanet() {
  return (
    <div className="ci-planet-stage" aria-hidden="true">
      <div className="ci-planet-aura" />
      <div className="ci-orbit ci-orbit--outer"><span /><i /></div>
      <div className="ci-orbit ci-orbit--inner"><span /><i /></div>
      <div className="ci-planet">
        <svg className="ci-planet-art" viewBox="0 0 420 420" role="presentation" focusable="false">
          <defs>
            <radialGradient id="ci-ocean" cx="30%" cy="24%" r="78%">
              <stop offset="0" stopColor="#8de8dc" />
              <stop offset=".32" stopColor="#287f91" />
              <stop offset=".72" stopColor="#17466d" />
              <stop offset="1" stopColor="#07172f" />
            </radialGradient>
            <linearGradient id="ci-land" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#b7e6a0" />
              <stop offset=".55" stopColor="#4d9c78" />
              <stop offset="1" stopColor="#245b59" />
            </linearGradient>
            <linearGradient id="ci-atmosphere" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="var(--cyber-accent, #46d9e8)" stopOpacity=".62" />
              <stop offset="1" stopColor="var(--cyber-secondary, #9c7cff)" stopOpacity=".06" />
            </linearGradient>
            <clipPath id="ci-planet-clip"><circle cx="210" cy="210" r="166" /></clipPath>
            <filter id="ci-planet-glow"><feGaussianBlur stdDeviation="12" /></filter>
          </defs>
          <circle cx="210" cy="210" r="179" fill="none" stroke="url(#ci-atmosphere)" strokeWidth="2" opacity=".8" />
          <circle cx="210" cy="210" r="168" fill="url(#ci-ocean)" />
          <g clipPath="url(#ci-planet-clip)">
            <path d="M77 113 112 83l45 7 16 26-20 23-3 31-28 20-9 35-31-9-20-38 7-31-15-17Z" fill="url(#ci-land)" opacity=".94" />
            <path d="m154 215 34-18 27 17 13 36-14 35-9 46-27 37-19-30 4-38-22-33 13-52Z" fill="url(#ci-land)" opacity=".88" />
            <path d="m236 91 36-18 50 17 26 31-17 24-34 1-20 25-37-5-21-29-26-4-9-22 28-20Z" fill="url(#ci-land)" opacity=".9" />
            <path d="m270 214 40-22 42 12 21 34-22 34-38 4-19 31-31-19-11-38 18-36Z" fill="url(#ci-land)" opacity=".9" />
            <path d="M48 180c75-39 148-48 236-22 43 13 83 12 123-2M46 246c83-32 166-34 246-9 39 12 73 14 111 5M75 302c75-22 147-20 216 0" fill="none" stroke="#b9f4ed" strokeOpacity=".18" strokeWidth="2" />
            <path d="M153 42c-39 75-54 154-39 236 9 48 29 91 57 128M256 43c-26 67-35 140-25 218 6 48 20 88 42 122" fill="none" stroke="#c9f7f3" strokeOpacity=".15" strokeWidth="2" />
            <path d="M49 190c40-67 104-117 183-138 61-16 119-9 167 19" fill="none" stroke="#d8fffa" strokeOpacity=".24" strokeWidth="13" filter="url(#ci-planet-glow)" />
          </g>
          <circle cx="210" cy="210" r="166" fill="none" stroke="#d7fff5" strokeOpacity=".38" strokeWidth="1.5" />
          <path d="M92 119c35-44 79-69 130-76" fill="none" stroke="#effffb" strokeOpacity=".65" strokeWidth="3" strokeLinecap="round" />
        </svg>
      </div>
      <div className="ci-network" />
      <span className="ci-orbit-label ci-orbit-label--one">KNOWLEDGE / 01</span>
      <span className="ci-orbit-label ci-orbit-label--two">VTU • BCV755B</span>
      <span className="ci-orbit-label ci-orbit-label--three">LEARNING SYSTEM ONLINE</span>
      <div className="ci-planet-caption"><span>PLANETARY KNOWLEDGE CORE</span><strong>Explore. Understand. Conserve.</strong></div>
    </div>
  );
}

export default function StartupExperience({ children }) {
  const [visible, setVisible] = useState(true);
  const [appReady, setAppReady] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [progress, setProgress] = useState(1);
  const [error, setError] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(
    () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false,
  );
  const appReadyRef = useRef(false);
  const errorRef = useRef(false);
  const progressRef = useRef(1);

  useEffect(() => {
    const media = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    if (!media) return undefined;
    const update = () => setReducedMotion(media.matches);
    media.addEventListener?.('change', update);
    return () => media.removeEventListener?.('change', update);
  }, []);

  useEffect(() => {
    appReadyRef.current = appReady;
  }, [appReady]);

  useEffect(() => {
    errorRef.current = error;
  }, [error]);

  // One interval advances exactly one integer per tick. It deliberately stops at
  // 99 until both the real React subtree commit and the 9.5s presentation minimum
  // have completed. A delayed browser tick can slow the sequence, never skip it.
  useEffect(() => {
    const startedAt = performance.now();
    const timer = window.setInterval(() => {
      if (errorRef.current) return;
      const current = progressRef.current;
      if (current < 99) {
        const next = current + 1;
        progressRef.current = next;
        setProgress(next);
        return;
      }
      if (appReadyRef.current && performance.now() - startedAt >= STARTUP_MIN_DURATION_MS) {
        progressRef.current = 100;
        setProgress(100);
        setCompleted(true);
        window.clearInterval(timer);
      }
    }, STARTUP_TICK_MS);

    return () => window.clearInterval(timer);
  }, [attempt]);

  useEffect(() => {
    if (!completed || !visible) return undefined;
    const timer = window.setTimeout(() => setLeaving(true), COMPLETION_HOLD_MS);
    return () => window.clearTimeout(timer);
  }, [completed, visible]);

  useEffect(() => {
    if (!leaving) return undefined;
    const timer = window.setTimeout(() => setVisible(false), reducedMotion ? 0 : EXIT_TRANSITION_MS);
    return () => window.clearTimeout(timer);
  }, [leaving, reducedMotion]);

  const markAppReady = useCallback(() => {
    if (!errorRef.current) setAppReady(true);
  }, []);

  const handleInitializationError = useCallback(() => {
    errorRef.current = true;
    appReadyRef.current = false;
    setError(true);
    setAppReady(false);
    setCompleted(false);
    setVisible(true);
    setLeaving(false);
    const safeProgress = Math.min(progressRef.current, 99);
    progressRef.current = safeProgress;
    setProgress(safeProgress);
  }, []);

  const retryInitialization = () => {
    errorRef.current = false;
    appReadyRef.current = false;
    progressRef.current = 1;
    setError(false);
    setAppReady(false);
    setCompleted(false);
    setLeaving(false);
    setVisible(true);
    setProgress(1);
    setAttempt((current) => current + 1);
  };

  const status = error
    ? 'Initialization failed'
    : getStartupStatus(progress);
  const statusDetail = error
    ? 'The learning workspace could not finish starting. Retry to mount the application again.'
    : completed
      ? 'Application interface committed successfully'
      : appReady
        ? 'Application mounted; completing the minimum startup presentation'
        : 'Preparing the application interface…';

  return (
    <>
      <StartupErrorBoundary key={attempt} onError={handleInitializationError}>
        {children}
        <StartupReadinessSignal onReady={markAppReady} />
      </StartupErrorBoundary>

      {visible && (
        <section
          className={'cinematic-intro' + (leaving ? ' is-leaving' : '') + (reducedMotion ? ' is-reduced-motion' : '') + (completed ? ' is-complete' : '')}
          role="region"
          aria-label="CNR-IA-2 system initialization"
          aria-busy={!completed && !error}
        >
          <div className="cinematic-intro-atmosphere" aria-hidden="true" />
          <header className="cinematic-intro-header">
            <a className="cinematic-intro-brand" href="#/" aria-label="CNR-IA-2 home">
              <span className="cinematic-intro-brand-mark"><Leaf size={19} /></span>
              <span><strong>CNR-IA-2</strong><small>CONSERVATION & NATURAL RESOURCES</small></span>
            </a>
            <div className="cinematic-intro-course"><span className="ci-live-dot" /> VTU EXAMPREP ENGINE <i /> 21CV654</div>
          </header>

          <main className="cinematic-intro-main">
            <div className="cinematic-intro-copy">
              <span className="cinematic-intro-kicker"><span className="ci-kicker-line" /> INITIALIZING EXAMPREP</span>
              <h1>Your learning universe is <em>coming online.</em></h1>
              <p className="cinematic-intro-subtitle">A focused command environment for your VTU Conservation of Natural Resources journey.</p>

              <div className={'ci-system-state' + (completed ? ' is-ready' : '')} aria-live="polite">
                <div className="ci-state-icon"><Activity size={17} /></div>
                <div className="ci-state-copy">
                  <span>{error ? 'INITIALIZATION ERROR' : completed ? 'ENVIRONMENT STATUS' : 'INITIALIZATION STATUS'}</span>
                  <strong>{status}</strong>
                  <small>{statusDetail}</small>
                </div>
                <span className={'ci-state-indicator' + (completed ? ' is-ready' : '')} />
              </div>

              {error ? (
                <div className="ci-error-panel" role="alert">
                  <strong>We couldn’t start ExamPrep.</strong>
                  <p>Your study data has not been changed. Retry the startup process to recover the learning workspace.</p>
                  <button type="button" className="ci-retry-button" onClick={retryInitialization}>Retry initialization</button>
                </div>
              ) : (
                <div className="cinematic-progress-panel">
                  <div className="cinematic-progress-heading">
                    <span>Workspace initialization</span>
                    <strong className="cinematic-percentage" aria-live="off">{String(progress).padStart(2, '0')}<span>%</span></strong>
                  </div>
                  <div
                    className="cinematic-progress-track"
                    role="progressbar"
                    aria-label="Application initialization progress"
                    aria-valuemin={1}
                    aria-valuemax={100}
                    aria-valuenow={progress}
                    aria-valuetext={progress + '% — ' + status}
                  >
                    <span className="cinematic-progress-fill" style={{ width: progress + '%' }} />
                  </div>
                  <div className="ci-progress-meta">
                    <span>{completed ? 'SYSTEM READY' : appReady ? 'APP READY · FINISHING PRESENTATION' : 'INITIALIZING CORE SYSTEMS'}</span>
                    <span>{String(progress).padStart(2, '0')}% {completed ? '· COMPLETE' : '· IN PROGRESS'}</span>
                  </div>
                </div>
              )}

              <div className="ci-module-grid" aria-label="Learning systems">
                {SYSTEM_MODULES.map(({ label, Icon }) => (
                  <div className="ci-module-chip" key={label}>
                    <Icon size={15} /><span>{label}</span><i className={completed ? 'is-ready' : ''} />
                  </div>
                ))}
              </div>
            </div>

            <div className="ci-visual-column">
              <KnowledgePlanet />
              <div className="ci-telemetry-row">
                <div><span>CORE</span><strong>{completed ? 'ONLINE' : error ? 'RECOVERY' : 'STARTING'}</strong></div>
                <div><span>DATABASE</span><strong>{completed ? 'AVAILABLE' : error ? 'RETRY' : 'CONNECTING'}</strong></div>
                <div><span>INTERFACE</span><strong>{completed ? 'READY' : error ? 'BLOCKED' : 'MOUNTING'}</strong></div>
              </div>
            </div>
          </main>

          <footer className="cinematic-intro-footer">
            <span>LAND <i /> WATER <i /> AIR <i /> BIODIVERSITY <i /> CLIMATE</span>
            <span>BUILT FOR VTU LEARNING <b>·</b> CNR-IA-2</span>
          </footer>
        </section>
      )}
    </>
  );
}

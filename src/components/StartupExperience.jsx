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

function StructuralFramework() {
  const gridLines = Array.from({ length: 9 }, (_, index) => index * 90);
  const nodes = [
    [108, 132], [250, 132], [392, 132], [534, 132],
    [108, 278], [250, 278], [392, 278], [534, 278],
    [108, 424], [250, 424], [392, 424], [534, 424],
  ];
  const connections = [
    [0, 1], [1, 2], [2, 3], [4, 5], [5, 6], [6, 7],
    [8, 9], [9, 10], [10, 11], [0, 4], [1, 5], [2, 6],
    [3, 7], [4, 8], [5, 9], [6, 10], [7, 11], [0, 5],
    [1, 4], [2, 7], [3, 6], [4, 9], [5, 8], [6, 11], [7, 10],
  ];
  return (
    <div className="ci-structure-stage" aria-hidden="true">
      <div className="ci-blueprint-grid" />
      <div className="ci-blueprint-glow" />
      <div className="ci-structure-topline"><span>STRUCTURAL ANALYSIS / 01</span><span>FRAME MODEL · LIVE</span></div>
      <svg className="ci-structure-art" viewBox="0 0 640 540" role="presentation" focusable="false">
        <defs>
          <linearGradient id="ci-frame-metal" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="var(--cyber-accent)" stopOpacity=".98" />
            <stop offset="1" stopColor="var(--cyber-secondary)" stopOpacity=".7" />
          </linearGradient>
          <linearGradient id="ci-slab-glass" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="var(--cyber-accent)" stopOpacity=".18" />
            <stop offset="1" stopColor="var(--cyber-secondary)" stopOpacity=".04" />
          </linearGradient>
          <filter id="ci-frame-glow"><feGaussianBlur stdDeviation="5" /></filter>
        </defs>
        <g className="ci-structure-guides" fill="none" stroke="var(--cyber-accent)" strokeWidth="1">
          {gridLines.map((x) => <path key={'v' + x} d={`M${x - 40} 58 V482`} />)}
          {[110, 210, 310, 410].map((y) => <path key={'h' + y} d={`M40 ${y} H600`} />)}
        </g>
        <g className="ci-structure-shadow" fill="none" stroke="var(--cyber-accent)" strokeWidth="12" opacity=".12" filter="url(#ci-frame-glow)">
          <path d="M112 430V154L320 72 528 154V430M112 154H528M112 292H528M112 430H528M250 99V430M390 99V430M112 154L250 292 390 154 528 292M112 292L250 430 390 292 528 430" />
        </g>
        <g className="ci-structure-frame" fill="none" stroke="url(#ci-frame-metal)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M112 430V154L320 72 528 154V430" />
          <path d="M112 154H528M112 292H528M112 430H528" />
          <path d="M250 99V430M390 99V430" />
          <path d="M112 154L250 292 390 154 528 292" />
          <path d="M112 292L250 430 390 292 528 430" />
          <path d="M250 99L320 72 390 99" />
          <path d="M112 154L250 99 390 99 528 154" strokeWidth="2" opacity=".72" />
        </g>
        <g className="ci-structure-slabs" fill="url(#ci-slab-glass)" stroke="var(--cyber-accent)" strokeOpacity=".55" strokeWidth="1.5">
          <path d="M112 154L320 72 528 154 320 236Z" />
          <path d="M112 292L320 374 528 292 320 210Z" opacity=".42" />
          <path d="M112 430L320 512 528 430 320 348Z" opacity=".58" />
        </g>
        <g className="ci-structure-dimensions" fill="none" stroke="var(--cyber-secondary)" strokeWidth="1.2" strokeDasharray="4 6" opacity=".8">
          <path d="M74 154V430M566 154V430M112 462H528M320 48V512" />
          <path d="M67 154H84M67 430H84M558 154H575M558 430H575M112 455V469M528 455V469" />
        </g>
        <g className="ci-structure-nodes">
          {nodes.map(([x, y], index) => <circle key={index} cx={x} cy={y} r="5" />)}
        </g>
        <g className="ci-structure-pulses">
          <circle cx="250" cy="292" r="12" />
          <circle cx="390" cy="292" r="12" />
          <circle cx="320" cy="72" r="9" />
        </g>
        <g className="ci-structure-labels" fill="var(--text-secondary)" fontSize="10" fontFamily="monospace" letterSpacing="1.5">
          <text x="38" y="145">GRID A</text><text x="535" y="145">GRID B</text>
          <text x="38" y="444">BASE / 00</text><text x="456" y="492">ELEVATION +03</text>
        </g>
      </svg>
      <svg className="ci-network-links" viewBox="0 0 640 540" preserveAspectRatio="none" focusable="false">
        {connections.map(([from, to], index) => {
          const [x1, y1] = nodes[from];
          const [x2, y2] = nodes[to];
          return <line key={index} x1={x1} y1={y1} x2={x2} y2={y2} style={{ '--link-delay': (index % 7) * -0.42 + 's' }} />;
        })}
      </svg>
      <div className="ci-structure-callout ci-structure-callout--left"><span>LOAD PATH</span><strong>CONNECTED</strong></div>
      <div className="ci-structure-callout ci-structure-callout--right"><span>FRAME NODES</span><strong>12 ACTIVE</strong></div>
      <div className="ci-structure-caption"><span>ENGINEERING BLUEPRINT / CNR-IA-2</span><strong>Building the learning framework.</strong></div>
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
                    <strong className="cinematic-percentage" aria-live="off"><span className="ci-counter-value" key={progress}>{String(progress).padStart(2, '0')}</span><span>%</span></strong>
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

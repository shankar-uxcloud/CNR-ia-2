import { useEffect, useState } from 'react';
import { GraduationCap, Leaf, Sparkles } from 'lucide-react';
import './StartupExperience.css';

const getStage = (value) => {
  if (value <= 15) return 'Initializing your study space';
  if (value <= 30) return 'Setting up your learning environment';
  if (value <= 45) return 'Getting your VTU modules ready';
  if (value <= 60) return 'Preparing your question library';
  if (value <= 75) return 'Getting visual learning ready';
  if (value <= 90) return 'Organizing your revision workspace';
  if (value < 100) return 'Almost there';
  return 'Your study space is ready';
};

/**
 * A short, sequential welcome reveal shown after the React application mounts.
 * The percentage is a presentation sequence, not a measurement of downloaded
 * assets. The application remains mounted beneath the overlay throughout.
 */
export default function StartupExperience({ children }) {
  const [ready, setReady] = useState(false);
  const [progress, setProgress] = useState(1);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const prepare = async () => {
      try {
        if (document.fonts?.ready) await document.fonts.ready;
      } catch {
        // Font readiness is non-critical; never block the application.
      }
      if (!cancelled) setReady(true);
    };
    prepare();
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    if (!ready || progress >= 100) return undefined;
    const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const timer = window.setInterval(() => {
      setProgress((current) => Math.min(100, current + 1));
    }, reducedMotion ? 12 : 20);
    return () => window.clearInterval(timer);
  }, [ready, progress]);

  useEffect(() => {
    if (progress !== 100) return undefined;
    const timer = window.setTimeout(() => setDismissed(true), 520);
    return () => window.clearTimeout(timer);
  }, [progress]);

  return (
    <>
      {children}
      {!dismissed && (
        <div
          className={`startup-screen ${progress === 100 ? 'startup-screen--leaving' : ''}`}
          role="status"
          aria-live="polite"
          aria-label={`CNR ExamPrep startup sequence, ${progress} percent`}
        >
          <div className="startup-ambient startup-ambient--one" aria-hidden="true" />
          <div className="startup-ambient startup-ambient--two" aria-hidden="true" />
          <div className="startup-grid" aria-hidden="true" />

          <main className="startup-layout">
            <section className="startup-intro">
              <div className="startup-brand">
                <span className="startup-brand-icon"><GraduationCap size={22} strokeWidth={1.8} /></span>
                <span className="startup-brand-name">CNR<span>EXAMPREP</span></span>
              </div>

              <div className="startup-eyebrow"><span /> VTU · BCV755B</div>
              <h1>Learn with clarity.<br /><em>Prepare with confidence.</em></h1>
              <p className="startup-description">
                Your Conservation of Natural Resources learning space is getting ready.
              </p>

              <div className="startup-subject">
                <span className="startup-subject-icon"><Leaf size={17} /></span>
                <span>
                  <strong>Conservation of Natural Resources</strong>
                  <small>Visvesvaraya Technological University</small>
                </span>
              </div>

              <div className="startup-footer-note"><Sparkles size={14} /> A smarter way to prepare for your exams</div>
            </section>

            <section className="startup-progress-panel" aria-label="Startup progress">
              <div className="startup-panel-top">
                <span className="startup-live-dot" />
                <span>WORKSPACE INITIALIZATION</span>
                <span className="startup-version">CNR / 01</span>
              </div>

              <div className="startup-meter" style={{ '--startup-progress': `${progress}%` }}>
                <svg className="startup-ring" viewBox="0 0 220 220" aria-hidden="true">
                  <defs>
                    <linearGradient id="startup-ring-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#00E5FF" />
                      <stop offset="55%" stopColor="#438BFF" />
                      <stop offset="100%" stopColor="#54F5A6" />
                    </linearGradient>
                  </defs>
                  <circle className="startup-ring-track" cx="110" cy="110" r="96" />
                  <circle className="startup-ring-progress" cx="110" cy="110" r="96" pathLength="100" />
                </svg>
                <div className="startup-number">
                  <strong>{progress}</strong><span>%</span>
                </div>
                <div className="startup-meter-caption">READYING YOUR SPACE</div>
              </div>

              <div className="startup-progress-meta">
                <span>{getStage(progress)}</span>
                <strong>{String(progress).padStart(2, '0')}<small> / 100</small></strong>
              </div>
              <div
                className="startup-progress-track"
                role="progressbar"
                aria-valuemin="1"
                aria-valuemax="100"
                aria-valuenow={progress}
                aria-label="Startup sequence"
              >
                <span style={{ width: `${progress}%` }} />
              </div>

              <div className="startup-panel-bottom">
                <span><i /> {progress === 100 ? 'READY TO BEGIN' : 'PLEASE WAIT A MOMENT'}</span>
                <span>LEARN · PRACTISE · EXCEL</span>
              </div>
            </section>
          </main>
          <div className="startup-bottom-line" aria-hidden="true"><span /></div>
        </div>
      )}
    </>
  );
}

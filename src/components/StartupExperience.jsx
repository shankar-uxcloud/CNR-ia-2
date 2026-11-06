import { useEffect, useState } from 'react';
import './StartupExperience.css';

const getStage = (value) => {
  if (value <= 15) return 'Initializing CNR ExamPrep...';
  if (value <= 30) return 'Preparing your learning environment...';
  if (value <= 45) return 'Loading VTU study modules...';
  if (value <= 60) return 'Preparing question banks...';
  if (value <= 75) return 'Warming up your visual learning workspace...';
  if (value <= 90) return 'Preparing your study workspace...';
  if (value < 100) return 'Finalizing your workspace...';
  return "Ready! Let's Learn.";
};

/**
 * The React tree is mounted before this overlay begins its short, sequential
 * reveal. We wait for the browser's font readiness as a real startup signal.
 * The counter is explicitly a presentation sequence, not a fabricated
 * percentage of network assets downloaded.
 */
export default function StartupExperience({ children }) {
  const [ready, setReady] = useState(false);
  const [progress, setProgress] = useState(1);

  useEffect(() => {
    let cancelled = false;
    const start = async () => {
      try {
        if (document.fonts?.ready) await document.fonts.ready;
      } catch {
        // Font loading failure must never block access to the app.
      }
      if (cancelled) return;
      setReady(true);
    };
    start();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!ready || progress >= 100) return undefined;
    const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const interval = reducedMotion ? 20 : 22;
    const timer = window.setInterval(() => {
      setProgress((current) => Math.min(100, current + 1));
    }, interval);
    return () => window.clearInterval(timer);
  }, [ready, progress]);

  const [dismissed, setDismissed] = useState(false);
  useEffect(() => {
    if (progress !== 100) return undefined;
    const timer = window.setTimeout(() => setDismissed(true), 420);
    return () => window.clearTimeout(timer);
  }, [progress]);

  return (
    <>
      {children}
      {!dismissed && (
        <div className={`startup-screen ${progress === 100 ? 'startup-screen--leaving' : ''}`} role="status" aria-live="polite" aria-label={`Starting CNR ExamPrep, ${progress} percent`}>
          <div className="startup-stars" aria-hidden="true"><i /><i /><i /><i /><i /><i /><i /><i /></div>
          <div className="startup-orbit startup-orbit--outer" aria-hidden="true" />
          <div className="startup-orbit startup-orbit--inner" aria-hidden="true" />
          <div className="startup-content">
            <div className="startup-brand"><span className="startup-brand-mark">CNR</span><span>EXAMPREP</span></div>
            <div className="startup-kicker">BCV755B · CONSERVATION OF NATURAL RESOURCES</div>
            <div className="startup-meter" style={{ '--startup-progress': `${progress}%` }}>
              <svg className="startup-ring" viewBox="0 0 240 240" aria-hidden="true">
                <circle className="startup-ring-track" cx="120" cy="120" r="104" />
                <circle className="startup-ring-value" cx="120" cy="120" r="104" pathLength="100" />
              </svg>
              <div className="startup-number" key={progress}><span>{progress}</span><small>%</small></div>
            </div>
            <div className="startup-progress-track" role="progressbar" aria-valuemin="1" aria-valuemax="100" aria-valuenow={progress} aria-label="Startup sequence">
              <span style={{ width: `${progress}%` }} />
            </div>
            <div className="startup-status">{getStage(progress)}</div>
            <div className="startup-footnote">{progress === 100 ? 'Your learning workspace is ready' : 'Preparing your learning workspace'}</div>
          </div>
        </div>
      )}
    </>
  );
}

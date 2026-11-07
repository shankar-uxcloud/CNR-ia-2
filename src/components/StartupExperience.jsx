import { useEffect, useState } from 'react';
import { Leaf } from 'lucide-react';
import './StartupExperience.css';

/**
 * A short, lightweight welcome transition. This is a visual startup sequence,
 * not a measurement of network or download progress.
 */
export default function StartupExperience({ children }) {
  const [ready, setReady] = useState(false);
  const [progress, setProgress] = useState(0);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    Promise.resolve(document.fonts?.ready)
      .catch(() => undefined)
      .finally(() => {
        if (!cancelled) setReady(true);
      });
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    if (!ready || progress >= 100) return undefined;
    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      setProgress(100);
      return undefined;
    }
    const started = Date.now();
    const duration = 1150;
    const timer = window.setInterval(() => {
      const next = Math.min(100, Math.round(((Date.now() - started) / duration) * 100));
      setProgress(next);
      if (next >= 100) window.clearInterval(timer);
    }, 20);
    return () => window.clearInterval(timer);
  }, [ready, progress >= 100]);

  useEffect(() => {
    if (progress < 100) return undefined;
    const timer = window.setTimeout(() => setDismissed(true), 180);
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
          aria-label={`CNR ExamPrep is starting, ${progress} percent`}
        >
          <div className="startup-content">
            <div className="startup-logo" aria-hidden="true">
              <Leaf size={34} strokeWidth={1.7} />
            </div>
            <p className="startup-eyebrow">CONSERVATION OF NATURAL RESOURCES</p>
            <h1>CNR <span>ExamPrep</span></h1>
            <p className="startup-subtitle">Your study space is getting ready</p>
            <div className="startup-progress" role="progressbar" aria-label="Startup progress" aria-valuemin="0" aria-valuemax="100" aria-valuenow={progress}>
              <span style={{ width: `${progress}%` }} />
            </div>
            <div className="startup-progress-meta">
              <span>{progress === 100 ? 'Ready to learn' : 'Preparing your workspace'}</span>
              <strong>{progress}%</strong>
            </div>
          </div>
          <span className="startup-bottom-note">LEARN · PRACTISE · EXCEL</span>
        </div>
      )}
    </>
  );
}

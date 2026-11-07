import { useEffect, useState } from 'react';
import { Leaf } from 'lucide-react';
import './StartupExperience.css';

/** Full-viewport branded welcome transition; progress is visual, not network progress. */
export default function StartupExperience({ children }) {
  const [ready, setReady] = useState(false);
  const [progress, setProgress] = useState(0);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    Promise.resolve(document.fonts?.ready).catch(() => undefined).finally(() => {
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
    const duration = 1350;
    const timer = window.setInterval(() => {
      const next = Math.min(100, Math.round(((Date.now() - started) / duration) * 100));
      setProgress(next);
      if (next >= 100) window.clearInterval(timer);
    }, 24);
    return () => window.clearInterval(timer);
  }, [ready, progress >= 100]);

  useEffect(() => {
    if (progress < 100) return undefined;
    const timer = window.setTimeout(() => setDismissed(true), 260);
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
          <div className="startup-ambient startup-ambient--one" aria-hidden="true" />
          <div className="startup-ambient startup-ambient--two" aria-hidden="true" />
          <div className="startup-grain" aria-hidden="true" />
          <main className="startup-stage">
            <div className="startup-brand">
              <div className="startup-logo" aria-hidden="true">
                <Leaf size={43} strokeWidth={1.45} />
              </div>
              <p className="startup-eyebrow">CONSERVATION OF NATURAL RESOURCES</p>
              <h1>CNR <span>ExamPrep</span></h1>
              <p className="startup-subtitle">A smarter way to prepare. A greener way to think.</p>
            </div>
            <div className="startup-loader">
              <div className="startup-progress-heading">
                <span>{progress === 100 ? 'Your workspace is ready' : 'Preparing your workspace'}</span>
                <strong>{String(progress).padStart(2, '0')}<small>%</small></strong>
              </div>
              <div className="startup-progress" role="progressbar" aria-label="Startup progress" aria-valuemin="0" aria-valuemax="100" aria-valuenow={progress}>
                <span style={{ width: `${progress}%` }} />
              </div>
              <div className="startup-progress-foot">
                <span className="startup-live-dot" />
                <span>LEARN <i>·</i> PRACTISE <i>·</i> EXCEL</span>
                <span>VTU · BCV755B</span>
              </div>
            </div>
          </main>
          <span className="startup-corner startup-corner--tl" aria-hidden="true" />
          <span className="startup-corner startup-corner--br" aria-hidden="true" />
        </div>
      )}
    </>
  );
}

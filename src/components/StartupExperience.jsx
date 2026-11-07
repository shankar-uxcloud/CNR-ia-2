import { useEffect, useState } from 'react';
import { Leaf } from 'lucide-react';
import './StartupExperience.css';

const messages = [
  'Initializing your learning space...',
  'Preparing your study dashboard...',
  'Organizing your study resources...',
  'Getting your exam experience ready...',
];

export default function StartupExperience({ children }) {
  const [ready, setReady] = useState(false);
  const [progress, setProgress] = useState(8);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let loadHandler;
    const pageLoaded = document.readyState === 'complete'
      ? Promise.resolve()
      : new Promise(resolve => {
          loadHandler = resolve;
          window.addEventListener('load', loadHandler, { once: true });
        });
    Promise.all([pageLoaded, document.fonts?.ready || Promise.resolve()])
      .catch(() => undefined)
      .then(() => { if (!cancelled) setReady(true); });
    return () => {
      cancelled = true;
      if (loadHandler) window.removeEventListener('load', loadHandler);
    };
  }, []);

  useEffect(() => {
    if (ready) {
      setProgress(100);
      return undefined;
    }
    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const timer = window.setInterval(() => {
      setProgress(current => {
        if (current >= 92) return current;
        return Math.min(92, current + (reduceMotion ? 8 : 2));
      });
    }, reduceMotion ? 100 : 180);
    return () => window.clearInterval(timer);
  }, [ready]);

  useEffect(() => {
    if (!ready) return undefined;
    const timer = window.setTimeout(() => setDismissed(true), 380);
    return () => window.clearTimeout(timer);
  }, [ready]);

  const message = ready
    ? 'Your learning space is ready!'
    : messages[Math.min(messages.length - 1, Math.floor(progress / 25))];

  return (
    <>
      {children}
      {!dismissed && (
        <div className={`startup-screen ${ready ? 'startup-screen--leaving' : ''}`}
          role="status" aria-live="polite" aria-label={`CNR ExamPrep starting: ${progress}%`}>
          <div className="startup-aurora startup-aurora--a" aria-hidden="true" />
          <div className="startup-aurora startup-aurora--b" aria-hidden="true" />
          <div className="startup-orbit startup-orbit--one" aria-hidden="true" />
          <div className="startup-orbit startup-orbit--two" aria-hidden="true" />
          <div className="startup-particles" aria-hidden="true">
            {Array.from({ length: 14 }, (_, i) => <span key={i} style={{ '--i': i }} />)}
          </div>
          <div className="startup-grain" aria-hidden="true" />
          <main className="startup-stage">
            <div className="startup-logo-wrap">
              <div className="startup-logo-halo" />
              <div className="startup-logo"><Leaf size={48} strokeWidth={1.45} /></div>
            </div>
            <p className="startup-eyebrow">CONSERVATION OF NATURAL RESOURCES</p>
            <h1 className="startup-title">CNR <span>ExamPrep</span></h1>
            <p className="startup-subtitle">A Smarter Way to Prepare. A Greener Way to Think.</p>
            <div className="startup-loader">
              <div className="startup-progress-heading">
                <span>{message}</span>
                <strong>{String(progress).padStart(2, '0')}<small>%</small></strong>
              </div>
              <div className="startup-progress" role="progressbar" aria-label="Application startup progress"
                aria-valuemin="0" aria-valuemax="100" aria-valuenow={progress}>
                <span style={{ width: `${progress}%` }} />
              </div>
              <div className="startup-progress-foot">
                <span className="startup-live-dot" />
                <span>LEARN <i>·</i> PRACTISE <i>·</i> EXCEL</span>
                <span>VTU <i>·</i> BCV755B</span>
              </div>
            </div>
          </main>
          <span className="startup-frame startup-frame--tl" aria-hidden="true" />
          <span className="startup-frame startup-frame--br" aria-hidden="true" />
          <span className="startup-version">CNR EXAMPREP <i>•</i> LEARNING PLATFORM</span>
        </div>
      )}
    </>
  );
}

import { useEffect, useState } from 'react';
import { Leaf } from 'lucide-react';
import './StartupExperience.css';

const messages = [
  'Awakening your learning environment...',
  'Initializing CNR ExamPrep...',
  'Preparing your study dashboard...',
  'Organizing examination resources...',
  'Connecting learning modules...',
  'Finalizing your experience...',
];

const MIN_INTRO_MS = 2200;
const MAX_READY_WAIT_MS = 8000;

export default function StartupExperience({ children }) {
  const [ready, setReady] = useState(false);
  const [progress, setProgress] = useState(4);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let loadHandler;
    const startedAt = Date.now();

    const pageLoaded = document.readyState === 'complete'
      ? Promise.resolve()
      : new Promise(resolve => {
          loadHandler = resolve;
          window.addEventListener('load', loadHandler, { once: true });
        });
    const fontsReady = document.fonts?.ready || Promise.resolve();
    const safetyTimeout = new Promise(resolve => window.setTimeout(resolve, MAX_READY_WAIT_MS));

    Promise.race([
      Promise.all([pageLoaded, fontsReady]).catch(() => undefined),
      safetyTimeout,
    ]).then(() => {
      const remainingIntro = Math.max(0, MIN_INTRO_MS - (Date.now() - startedAt));
      window.setTimeout(() => {
        if (!cancelled) setReady(true);
      }, remainingIntro);
    });

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
      setProgress(current => Math.min(94, current + (reduceMotion ? 8 : 1.8)));
    }, reduceMotion ? 100 : 90);
    return () => window.clearInterval(timer);
  }, [ready]);

  useEffect(() => {
    if (!ready) return undefined;
    const timer = window.setTimeout(() => setDismissed(true), 520);
    return () => window.clearTimeout(timer);
  }, [ready]);

  const message = ready
    ? 'Your learning environment is ready!'
    : messages[Math.min(messages.length - 1, Math.floor(progress / 16))];

  return (
    <>
      {children}
      {!dismissed && (
        <div className={`startup-screen ${ready ? 'startup-screen--leaving' : ''}`}
          role="status" aria-live="polite" aria-label={`CNR ExamPrep starting: ${Math.round(progress)}%`}>
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
              <div className="startup-logo-ring" />
              <div className="startup-logo"><Leaf size={50} strokeWidth={1.35} /></div>
            </div>
            <p className="startup-eyebrow">CONSERVATION OF NATURAL RESOURCES</p>
            <h1 className="startup-title">CNR <span>ExamPrep</span></h1>
            <p className="startup-subtitle">A Smarter Way to Prepare. A Greener Way to Think.</p>
            <div className="startup-loader">
              <div className="startup-progress-heading">
                <span>{message}</span>
                <strong>{String(Math.round(progress)).padStart(2, '0')}<small>%</small></strong>
              </div>
              <div className="startup-progress" role="progressbar" aria-label="Application startup progress"
                aria-valuemin="0" aria-valuemax="100" aria-valuenow={Math.round(progress)}>
                <span style={{ width: `${progress}%` }} />
              </div>
              <div className="startup-progress-foot">
                <span className="startup-live-dot" />
                <span>LEARN <i>·</i> PRACTISE <i>·</i> EXCEL</span>
                <span>VTU <i>·</i> BCV755B</span>
              </div>
            </div>
          </main>
          <div className="startup-hud startup-hud--top" aria-hidden="true">
            <span> CNR / SYSTEM STARTUP</span><span>ENVIRONMENTAL LEARNING PLATFORM</span>
          </div>
          <span className="startup-frame startup-frame--tl" aria-hidden="true" />
          <span className="startup-frame startup-frame--br" aria-hidden="true" />
          <span className="startup-version">CNR EXAMPREP <i>•</i> LEARNING PLATFORM</span>
        </div>
      )}
    </>
  );
}

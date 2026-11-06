import { useEffect, useState } from 'react';
import { GraduationCap, Leaf, Sparkles } from 'lucide-react';
import './StartupExperience.css';

function getStage(value) {
  if (value <= 15) return 'Establishing your study space';
  if (value <= 30) return 'Preparing your learning space';
  if (value <= 45) return 'Organizing the study workspace';
  if (value <= 60) return 'Setting up your practice space';
  if (value <= 75) return 'Preparing visual learning tools';
  if (value <= 90) return 'Arranging your revision workspace';
  if (value < 100) return 'Finishing the startup sequence';
  return 'Your learning space is ready';
}

function HolographicEarth() {
  return (
    <svg className="startup-earth" viewBox="0 0 360 360" role="img" aria-label="Decorative holographic Earth illustration">
      <defs>
        <radialGradient id="startup-earth-fill" cx="35%" cy="28%" r="72%">
          <stop offset="0%" stopColor="currentColor" stopOpacity=".16" />
          <stop offset="70%" stopColor="currentColor" stopOpacity=".035" />
          <stop offset="100%" stopColor="currentColor" stopOpacity=".005" />
        </radialGradient>
        <clipPath id="startup-earth-clip"><circle cx="180" cy="180" r="119" /></clipPath>
      </defs>
      <circle cx="180" cy="180" r="133" fill="none" stroke="currentColor" strokeOpacity=".16" strokeWidth=".8" />
      <circle cx="180" cy="180" r="119" fill="url(#startup-earth-fill)" stroke="currentColor" strokeOpacity=".52" strokeWidth="1.1" />
      <g clipPath="url(#startup-earth-clip)" fill="none" stroke="currentColor" strokeOpacity=".27" strokeWidth=".8">
        <ellipse cx="180" cy="180" rx="48" ry="119" />
        <ellipse cx="180" cy="180" rx="91" ry="119" />
        <ellipse cx="180" cy="180" rx="119" ry="37" />
        <ellipse cx="180" cy="180" rx="119" ry="78" />
        <path d="M55 180h250M67 132h226M67 228h226" />
        <path d="M111 89c18 24 19 47 7 66-10 16-10 35 1 51 11 17 11 37-4 65M211 65c-14 25-13 47 3 65 16 18 18 37 5 55-13 19-13 40 1 65" />
      </g>
      <g fill="currentColor" opacity=".8">
        <circle cx="105" cy="119" r="2.2" /><circle cx="246" cy="139" r="2" />
        <circle cx="218" cy="250" r="2.3" /><circle cx="133" cy="222" r="1.8" />
      </g>
      <g fill="none" stroke="currentColor" strokeOpacity=".4">
        <path d="M44 180h24m224 0h24M180 44v24m0 224v24" />
        <circle cx="180" cy="180" r="151" strokeDasharray="2 8" />
      </g>
    </svg>
  );
}

/**
 * Lightweight sequential welcome reveal. The percentage is an intentional
 * startup animation, not a claim about network/download progress. The app is
 * mounted underneath; font readiness is the only awaited browser prerequisite.
 */
export default function StartupExperience({ children }) {
  const [ready, setReady] = useState(false);
  const [progress, setProgress] = useState(1);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    Promise.resolve(document.fonts?.ready)
      .catch(() => undefined)
      .finally(() => { if (!cancelled) setReady(true); });
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    if (!ready || progress >= 100) return undefined;
    const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    let timer;
    timer = window.setInterval(() => {
      setProgress((current) => {
        if (current >= 100) {
          window.clearInterval(timer);
          return current;
        }
        const next = Math.min(100, current + 1);
        if (next === 100) window.clearInterval(timer);
        return next;
      });
    }, reducedMotion ? 7 : 18);
    return () => window.clearInterval(timer);
  }, [ready]);

  useEffect(() => {
    if (progress !== 100) return undefined;
    const timer = window.setTimeout(() => setDismissed(true), 620);
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
          <div className="startup-backdrop-grid" aria-hidden="true" />
          <div className="startup-glow startup-glow--cyan" aria-hidden="true" />
          <div className="startup-glow startup-glow--violet" aria-hidden="true" />
          <div className="startup-grain" aria-hidden="true" />

          <div className="startup-shell">
            <header className="startup-header">
              <div className="startup-brand">
                <span className="startup-brand-mark"><GraduationCap size={19} strokeWidth={1.7} /><i /></span>
                <span className="startup-brand-copy">
                  <strong>CNR <b>EXAMPREP</b></strong>
                  <small>VTU EXAMINATION PREPARATION</small>
                </span>
              </div>
              <div className="startup-course-code"><span /> BCV755B <i>·</i> CONSERVATION OF NATURAL RESOURCES</div>
            </header>

            <main className="startup-hero">
              <div className="startup-earth-wrap" aria-hidden="true">
                <HolographicEarth />
              </div>
              <div className="startup-orbit startup-orbit--one" aria-hidden="true"><span /></div>
              <div className="startup-orbit startup-orbit--two" aria-hidden="true"><span /></div>

              <div className="startup-counter" style={{ "--startup-progress": progress }} aria-label={`${progress} percent`}>
                <svg className="startup-progress-ring" viewBox="0 0 300 300" aria-hidden="true">
                  <defs>
                    <linearGradient id="startup-progress-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#57e8ff" />
                      <stop offset="55%" stopColor="#6e9dff" />
                      <stop offset="100%" stopColor="#8ce8c1" />
                    </linearGradient>
                  </defs>
                  <circle className="startup-ring-base" cx="150" cy="150" r="137" />
                  <circle className="startup-ring-tick" cx="150" cy="150" r="125" />
                  <circle className="startup-ring-value" cx="150" cy="150" r="137" pathLength="100" />
                </svg>
                <div className="startup-counter-value">
                  <strong>{String(progress).padStart(2, '0')}</strong><span>%</span>
                </div>
                <div className="startup-counter-label">{progress === 100 ? 'SYSTEM READY' : 'STARTUP SEQUENCE'}</div>
              </div>

              <div className="startup-hero-caption">
                <span className="startup-caption-rule" />
                <span>LEARN <i>·</i> PRACTISE <i>·</i> EXCEL</span>
                <span className="startup-caption-rule" />
              </div>
            </main>

            <footer className="startup-footer">
              <div className="startup-status">
                <div className="startup-status-heading">
                  <span className="startup-status-indicator"><i /></span>
                  <span>{progress === 100 ? 'READY TO BEGIN' : 'PREPARING YOUR LEARNING SPACE'}</span>
                  <strong>{progress}%</strong>
                </div>
                <div className="startup-progress-track" role="progressbar" aria-valuemin="1" aria-valuemax="100" aria-valuenow={progress} aria-label="Startup sequence">
                  <span style={{ width: `${progress}%` }} />
                </div>
                <div className="startup-status-bottom">
                  <span key={getStage(progress)}>{getStage(progress)}</span>
                  <span>{String(progress).padStart(3, '0')} <i>/</i> 100</span>
                </div>
              </div>
              <div className="startup-footer-brand"><Leaf size={14} /><span>CONSERVE KNOWLEDGE. SHAPE TOMORROW.</span><Sparkles size={13} /></div>
            </footer>
          </div>
          <div className="startup-edge-progress" style={{ transform: `scaleX(${progress / 100})` }} aria-hidden="true" />
        </div>
      )}
    </>
  );
}

import { useEffect, useState } from 'react';
import { ArrowRight, Leaf, SkipForward } from 'lucide-react';
import { CNR_MODULES } from '../data/cnrAcademic';
import './CinematicIntro.css';

const SEEN_KEY = 'cnr-cinematic-intro-seen-v1';
const messages = [
  'Explore the science of natural resources.',
  'Understand ecosystems and biodiversity.',
  'Study environmental challenges.',
  'Learn conservation strategies.',
  'Prepare confidently for VTU examinations.',
];

function EarthVisual() {
  return <div className="cinematic-earth-stage" aria-hidden="true">
    <span className="cinematic-orbit cinematic-orbit--one" />
    <span className="cinematic-orbit cinematic-orbit--two" />
    <span className="cinematic-orbit cinematic-orbit--three" />
    <div className="cinematic-earth">
      <svg viewBox="0 0 320 320" role="presentation">
        <defs>
          <radialGradient id="cnr-ocean" cx="34%" cy="28%" r="76%"><stop offset="0" stopColor="#65c9df"/><stop offset=".52" stopColor="#176e8c"/><stop offset="1" stopColor="#071b3a"/></radialGradient>
          <linearGradient id="cnr-land" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#b9ed9d"/><stop offset="1" stopColor="#318a60"/></linearGradient>
          <clipPath id="cnr-earth-clip"><circle cx="160" cy="160" r="132"/></clipPath>
        </defs>
        <circle cx="160" cy="160" r="132" fill="url(#cnr-ocean)" />
        <g clipPath="url(#cnr-earth-clip)" className="cinematic-earth-land">
          <path d="m56 83 35-26 37 10 21 24-12 25-28 7-14 25-35-9-22-28z M120 143l27 8 22 29-12 38-18 43-20-20-8-38-18-24 9-28z M183 77l36-18 38 12 21 26-12 24-31 1-16 24-25-14-14-26z M203 171l33-15 35 20 14 36-25 28-17 35-25-12-12-37-21-24z M42 169l23-13 18 13-7 23-27 7z" fill="url(#cnr-land)" />
        </g>
        <circle cx="160" cy="160" r="132" fill="none" stroke="#a8e7ff" strokeOpacity=".8" strokeWidth="2" />
        <path d="M28 160h264M160 28v264" stroke="#c9f3ff" strokeOpacity=".15" strokeDasharray="4 9" />
      </svg>
    </div>
    <span className="cinematic-star cinematic-star--one" /><span className="cinematic-star cinematic-star--two" /><span className="cinematic-star cinematic-star--three" />
  </div>;
}

export default function StartupExperience({ children }) {
  const [visible, setVisible] = useState(() => {
    try { return localStorage.getItem(SEEN_KEY) !== 'true'; } catch { return true; }
  });
  const [appReady, setAppReady] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [stage, setStage] = useState('identity');
  const [moduleIndex, setModuleIndex] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(() => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false);
  const activeModule = CNR_MODULES[moduleIndex];

  useEffect(() => {
    const media = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    if (!media) return undefined;
    const update = () => setReducedMotion(media.matches);
    media.addEventListener?.('change', update);
    return () => media.removeEventListener?.('change', update);
  }, []);

  useEffect(() => {
    if (!visible) return undefined;
    let cancelled = false;
    let onLoad;
    const loadEvent = document.readyState === 'complete'
      ? Promise.resolve()
      : new Promise((resolve) => {
          onLoad = resolve;
          window.addEventListener('load', onLoad, { once: true });
        });
    const fontsReady = document.fonts?.ready || Promise.resolve();
    Promise.all([loadEvent, fontsReady]).catch(() => undefined).then(() => {
      if (!cancelled) setAppReady(true);
    });
    return () => {
      cancelled = true;
      if (onLoad) window.removeEventListener('load', onLoad);
    };
  }, [visible]);

  useEffect(() => {
    if (!visible || !appReady || reducedMotion) return undefined;
    const stageTimer = window.setTimeout(() => setStage('modules'), 500);
    const enterTimer = window.setTimeout(() => setStage('enter'), 3400);
    const leaveTimer = window.setTimeout(() => setLeaving(true), 4800);
    return () => {
      window.clearTimeout(stageTimer);
      window.clearTimeout(enterTimer);
      window.clearTimeout(leaveTimer);
    };
  }, [visible, appReady, reducedMotion]);

  useEffect(() => {
    if (!visible || stage !== 'modules' || reducedMotion) return undefined;
    const timer = window.setInterval(() => setModuleIndex((index) => (index + 1) % CNR_MODULES.length), 600);
    return () => window.clearInterval(timer);
  }, [visible, stage, reducedMotion]);

  useEffect(() => {
    if (!visible || stage !== 'enter' || reducedMotion) return undefined;
    const timer = window.setInterval(() => setMessageIndex((index) => (index + 1) % messages.length), 780);
    return () => window.clearInterval(timer);
  }, [visible, stage, reducedMotion]);

  useEffect(() => {
    if (!visible || !appReady || !reducedMotion) return undefined;
    const timer = window.setTimeout(() => setLeaving(true), 250);
    return () => window.clearTimeout(timer);
  }, [visible, appReady, reducedMotion]);

  useEffect(() => {
    if (!leaving) return undefined;
    try { localStorage.setItem(SEEN_KEY, 'true'); } catch { /* intro remains dismissible without storage */ }
    const timer = window.setTimeout(() => setVisible(false), reducedMotion ? 0 : 480);
    return () => window.clearTimeout(timer);
  }, [leaving, reducedMotion]);

  const skip = () => {
    try { localStorage.setItem(SEEN_KEY, 'true'); } catch { /* storage may be unavailable */ }
    setLeaving(true);
  };

  return <>
    {children}
    {visible && <section className={'cinematic-intro' + (leaving ? ' is-leaving' : '') + (reducedMotion ? ' is-reduced-motion' : '')}
      role="status" aria-live="polite" aria-label="CNR-IA-2 introduction">
      <div className="cinematic-intro-stars" aria-hidden="true" />
      <header className="cinematic-intro-header">
        <a className="cinematic-intro-brand" href="#/" aria-label="CNR-IA-2 home">
          <span><Leaf size={20} /></span>
          <span><strong>CNR-IA-2</strong><small>CONSERVATION AND NATURAL RESOURCES</small></span>
        </a>
        <div className="cinematic-intro-course">BCV755B <i /> VTU</div>
        <button type="button" className="cinematic-intro-skip" onClick={skip}><SkipForward size={15} /> Skip intro</button>
      </header>
      <main className="cinematic-intro-main">
        <div className="cinematic-intro-copy">
          <span className="cinematic-intro-kicker">EARTH OBSERVATION · ENVIRONMENTAL SCIENCE · LEARNING</span>
          <h1>{stage === 'enter' ? 'Your journey begins here.' : 'A planet worth understanding.'}</h1>
          <p>{stage === 'enter' ? 'Your journey towards understanding and protecting our natural environment begins here.' : 'A complete academic introduction to Conservation and Natural Resources.'}</p>
          <div className="cinematic-intro-status" role="status" aria-live="polite"><span className={appReady ? 'is-ready' : ''} />{appReady ? 'Application shell and typography are ready' : 'Preparing the application shell and typography…'}</div>
          {stage === 'modules' && activeModule && <article className="cinematic-module-reveal" key={activeModule.number}>
            <span>MODULE 0{activeModule.number} · OFFICIAL SYLLABUS</span>
            <h2>{activeModule.title}{activeModule.secondaryHeading ? ' & ' + activeModule.secondaryHeading : ''}</h2>
            <p>{activeModule.description}</p>
          </article>}
          {stage === 'enter' && <div className="cinematic-learning-message" aria-live="polite">{messages[messageIndex]}</div>}
          <a href="#/learning-hub" className="cinematic-enter-link" onClick={skip}>Enter CNR-IA-2 <ArrowRight size={16} /></a>
        </div>
        <EarthVisual />
      </main>
      <footer className="cinematic-intro-footer"><span>ONE PLANET · FIVE MODULES · ONE LEARNING JOURNEY</span><span>{appReady ? 'READY TO EXPLORE' : 'WAITING FOR BROWSER READY EVENT'}</span></footer>
    </section>}
  </>;
}

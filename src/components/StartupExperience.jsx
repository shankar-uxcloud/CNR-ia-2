import { useEffect, useMemo, useState } from 'react';
import { Leaf } from 'lucide-react';
import './StartupExperience.css';

const scenes = [
  { title: 'Forest Awakening', caption: 'Protect Our Forests', detail: 'Healthy forests sustain life, climate and communities.' },
  { title: 'A Greener Tomorrow', caption: 'Every Tree Makes a Difference', detail: 'Grow green cover and protect the biodiversity around us.' },
  { title: 'Water Is Life', caption: 'Every Drop Matters', detail: 'Conserve rivers, harvest rainwater and use water wisely.' },
  { title: 'Clean Energy Future', caption: 'Powering a Sustainable Future', detail: 'Renewable energy helps build a cleaner world.' },
  { title: 'Living Soil', caption: 'Care for the Earth Beneath Us', detail: 'Protect soil through sustainable farming and healthy land.' },
  { title: 'Wildlife & Biodiversity', caption: 'Preserve Our Biodiversity', detail: 'Every species has a role in a balanced ecosystem.' },
  { title: 'One Planet, One Promise', caption: 'Conserve Today. Sustain Tomorrow.', detail: 'Small actions together create a thriving planet.' },
  { title: 'Ready to Make a Difference?', caption: 'Your Learning Environment Is Ready!', detail: 'Explore, learn and become a guardian of natural resources.' },
];

const sceneFor = value => value === 100 ? 7 : value >= 90 ? 6 : value >= 75 ? 5 : value >= 60 ? 4 : value >= 45 ? 3 : value >= 30 ? 2 : value >= 15 ? 1 : 0;

function Landscape({ scene }) {
  const isWater = scene === 2;
  const isEnergy = scene === 3;
  const isSoil = scene === 4;
  const isWild = scene === 5;
  const isEarth = scene >= 6;
  return (
    <svg className="startup-landscape" viewBox="0 0 1000 520" role="img" aria-label={scenes[scene].detail} preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop stopColor={isEarth ? '#123d32' : '#153f32'}/><stop offset="1" stopColor={isWater ? '#70bfa4' : '#a4d69a'}/></linearGradient>
        <linearGradient id="ground" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#3d9b62"/><stop offset="1" stopColor="#123d2b"/></linearGradient>
        <linearGradient id="river" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#b8f0e3"/><stop offset="1" stopColor="#2c9caa"/></linearGradient>
        <radialGradient id="sun"><stop stopColor="#fff8c7"/><stop offset="1" stopColor="#f4d77a" stopOpacity="0"/></radialGradient>
      </defs>
      <rect width="1000" height="520" fill="url(#sky)"/>
      <circle cx="780" cy="105" r="105" fill="url(#sun)"/><circle cx="780" cy="105" r="37" fill="#f6e8a4" opacity=".9"/>
      <path d="M0 310 Q170 175 330 300 T660 265 T1000 285 V520 H0Z" fill="#347e54"/>
      <path d="M0 370 Q180 260 390 360 T760 330 T1000 355 V520 H0Z" fill="url(#ground)"/>
      {isWater && <><path d="M480 250 Q540 315 460 360 Q390 420 510 520 H850 Q690 410 740 355 Q790 290 680 245Z" fill="url(#river)" opacity=".96"/><path d="M0 420 Q170 370 300 425 T520 420" fill="none" stroke="#b9eee0" strokeWidth="7" opacity=".55"/><path d="M630 175 Q650 245 615 280" stroke="#d8fff0" strokeWidth="16" strokeLinecap="round" opacity=".7"/></>}
      {isEnergy && <g stroke="#e6f5df" strokeWidth="7" strokeLinecap="round"><path d="M250 190V390 M250 190L207 150 M250 190L300 150 M250 190L250 130"/><circle cx="250" cy="190" r="10" fill="#e6f5df"/><path d="M710 220V390 M710 220L670 180 M710 220L750 180 M710 220L710 155"/><circle cx="710" cy="220" r="10" fill="#e6f5df"/><path d="M370 390L420 325L510 390Z" fill="#204f55" stroke="#a7d8ca"/><path d="M390 382L435 342L480 382" fill="none" stroke="#7cc5c2" strokeWidth="5"/></g>}
      {isSoil && <g fill="none" strokeLinecap="round"><path d="M0 385 Q220 315 440 385 T1000 375" stroke="#9b613c" strokeWidth="36"/><path d="M0 430 Q250 355 480 430 T1000 415" stroke="#c18a4f" strokeWidth="26"/><path d="M120 370v-90m0 30l-28 -25m28 10l25 -30m180 115v-110m0 35l-30 -28m30 12l30 -34m180 115v-100m0 30l-28 -24" stroke="#b5e18c" strokeWidth="9"/><g fill="#e4d28b" stroke="none"><ellipse cx="120" cy="265" rx="12" ry="30"/><ellipse cx="300" cy="255" rx="12" ry="30"/><ellipse cx="480" cy="275" rx="12" ry="30"/></g></g>}
      {(scene === 0 || scene === 1 || isWild || isEarth) && Array.from({length: isEarth ? 9 : 12}, (_, i) => {
        const x = 55 + i * (isEarth ? 112 : 82);
        const h = 100 + ((i * 37) % 95);
        return <g key={i} className="startup-tree" transform={`translate(${x} ${355 - h * .45})`}><path d={`M0 0V${h}`} stroke="#684c34" strokeWidth="13"/><circle cx="0" cy={-h * .25} r={h * .38} fill={i % 2 ? '#4b9e61' : '#76b96c'}/><circle cx="-18" cy={-h * .1} r={h * .25} fill="#8acb78"/><circle cx="18" cy={-h * .1} r={h * .24} fill="#398a55"/></g>;
      })}
      {isWild && <g transform="translate(680 315)" fill="#183d2b"><path d="M0 30q-35-28-55-10l-20-25 5 40q25 25 70 15l35 25 10-12-25-28 20-28-9-5-25 20z"/><path d="M-35 10l-12-35 20 23m10 0l15-32-2 38" fill="none" stroke="#183d2b" strokeWidth="9" strokeLinecap="round"/></g>}
      {isEarth && <g transform="translate(500 250)"><circle r="118" fill="#2b8f83" stroke="#c5f1d0" strokeWidth="5"/><path d="M-80 -45l45-38 48 12 20 37-35 22-10 43-50-5-28-35z M20 25l48-20 30 28-30 45-35-8z" fill="#9bd47c"/><path d="M-160 95q-80 20-105 95m425-190q75 20 105 95" fill="none" stroke="#b5efc6" strokeWidth="7" strokeLinecap="round"/><path d="M-40 8q-10-55 35-80 30-18 53 4-24 5-20 32-8 27-34 32-15 3-34 12z" fill="#d2f0a4"/></g>}
      <path d="M0 475 Q250 445 500 475 T1000 465" fill="none" stroke="#c6e8a2" strokeWidth="3" opacity=".45"/>
    </svg>
  );
}

export default function StartupExperience({ children }) {
  const [progress, setProgress] = useState(1);
  const [appReady, setAppReady] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const sceneIndex = useMemo(() => sceneFor(progress), [progress]);
  const scene = scenes[sceneIndex];
  const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;

  useEffect(() => {
    let cancelled = false;
    let loadHandler;
    const loaded = document.readyState === 'complete'
      ? Promise.resolve()
      : new Promise(resolve => {
          loadHandler = resolve;
          window.addEventListener('load', loadHandler, { once: true });
        });
    const fonts = document.fonts?.ready || Promise.resolve();
    Promise.all([loaded, fonts]).catch(() => undefined).then(() => {
      if (!cancelled) setAppReady(true);
    });
    return () => {
      cancelled = true;
      if (loadHandler) window.removeEventListener('load', loadHandler);
    };
  }, []);

  useEffect(() => {
    if (progress >= 99) return undefined;
    // One cancellable step per render keeps the counter sequential in Strict Mode.
    const timer = window.setTimeout(() => {
      setProgress(value => Math.min(99, value + 1));
    }, 125);
    return () => window.clearTimeout(timer);
  }, [progress]);

  useEffect(() => {
    if (progress !== 99 || !appReady) return undefined;
    const frame = window.setTimeout(() => setProgress(100), 80);
    return () => window.clearTimeout(frame);
  }, [progress, appReady]);

  useEffect(() => {
    if (progress !== 100) return undefined;
    const timer = window.setTimeout(() => setLeaving(true), 2000);
    return () => window.clearTimeout(timer);
  }, [progress]);

  useEffect(() => {
    if (!leaving) return undefined;
    const timer = window.setTimeout(() => setDismissed(true), 650);
    return () => window.clearTimeout(timer);
  }, [leaving]);

  return (
    <>
      {children}
      {!dismissed && (
        <div style={{'--startup-depth-blur': `${1.4 + (progress % 16) / 12}px`}} className={`startup-screen ${leaving ? 'startup-screen--leaving' : ''} ${prefersReducedMotion ? 'startup-screen--reduced-motion' : ''}`}
          role="status" aria-live="polite" aria-label={`CNR ExamPrep startup ${progress}%`}>
          <div className="startup-atmosphere" aria-hidden="true"><span/><span/><span/></div>
          <header className="startup-brand"><span className="startup-brand-mark"><Leaf size={22}/></span><span><strong>CNR <i>ExamPrep</i></strong><small>CONSERVATION OF NATURAL RESOURCES</small></span><b>BCV755B</b></header>
          <main className="startup-content">
            <div className={`startup-scene ${sceneIndex >= 6 ? 'startup-scene--earth' : ''}`} key={sceneIndex}>
              <div className="startup-scene-glow"/><div className="startup-scene-depth" aria-hidden="true"/><div className="startup-scene-hud" aria-hidden="true"><span className="startup-hud-corner startup-hud-corner--tl"/><span className="startup-hud-corner startup-hud-corner--tr"/><span className="startup-hud-corner startup-hud-corner--bl"/><span className="startup-hud-corner startup-hud-corner--br"/><span className="startup-hud-scan"/><span className="startup-hud-orbit"/></div>
              <Landscape scene={sceneIndex}/>
              <div className="startup-scene-shade"/>
              <div className="startup-scene-copy"><span className="startup-scene-kicker">NATURE • KNOWLEDGE • SUSTAINABILITY</span><h1>{scene.title}</h1><p>{scene.detail}</p></div>
            </div>
            <div className="startup-caption" key={`caption-${sceneIndex}`}><span>{scene.caption}</span><span className="startup-caption-line"/></div>
            <div className="startup-progress-panel">
              <div className="startup-progress-top"><span>{progress === 100 ? 'Your Learning Environment Is Ready!' : 'Preparing your learning environment...'}</span><strong>{progress}<small>%</small></strong></div>
              <div className="startup-progress-track" role="progressbar" aria-label="Startup sequence" aria-valuemin="0" aria-valuemax="100" aria-valuenow={progress}><span style={{width:`${progress}%`}}/></div>
              <div className="startup-progress-bottom"><span><i/> CNR LEARNING EXPERIENCE</span><span>{String(progress).padStart(2,'0')} / 100</span></div>
            </div>
          </main>
          <footer className="startup-footer"><span>LEARN TO CONSERVE</span><span>ONE PLANET. ONE FUTURE.</span></footer>
        </div>
      )}
    </>
  );
}

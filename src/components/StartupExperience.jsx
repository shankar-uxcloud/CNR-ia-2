import { useEffect, useState } from 'react';
import { Leaf, SkipForward } from 'lucide-react';
import './CinematicIntro.css';

const SCENES = [
  {
    id: 'forest',
    title: 'Forest conservation',
    message: 'Healthy forests protect soil, water, wildlife and the climate.',
    quote: 'Protecting nature begins with understanding it.',
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1800&q=82',
    alt: 'Sunlight filtering through a dense green forest',
  },
  {
    id: 'water',
    title: 'Rivers & freshwater ecosystems',
    message: 'Rivers, lakes and wetlands sustain communities and living systems.',
    quote: 'Every drop of water matters.',
    image: 'https://images.unsplash.com/photo-1437482078695-73f5ca6c96e2?auto=format&fit=crop&w=1800&q=82',
    alt: 'A flowing freshwater river surrounded by a natural landscape',
  },
  {
    id: 'biodiversity',
    title: 'Wildlife & biodiversity',
    message: 'Biodiversity keeps ecosystems resilient, balanced and alive.',
    quote: 'Biodiversity keeps ecosystems alive.',
    image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=1800&q=82',
    alt: 'Wild deer in a natural forest habitat',
  },
  {
    id: 'mountains',
    title: 'Mountains & watersheds',
    message: 'Mountain landscapes shape watersheds, rivers and local climates.',
    quote: 'Conserve resources. Sustain the future.',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1800&q=82',
    alt: 'Mountain peaks and a broad natural watershed landscape',
  },
  {
    id: 'earth',
    title: 'One planet, shared future',
    message: 'Environmental protection and sustainable development connect us all.',
    quote: 'Sustainable development protects tomorrow.',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1800&q=82',
    alt: 'Planet Earth viewed from space',
  },
];

function LandscapeIllustration({ scene }) {
  return <div className="cinematic-landscape-fallback" aria-hidden="true">
    <svg className="cinematic-landscape" data-scene={scene.id} viewBox="0 0 900 560" role="presentation" focusable="false">
      <defs>
        <linearGradient id="cnr-sky" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#8fc9d1"/><stop offset=".48" stopColor="#d8d9b4"/><stop offset="1" stopColor="#f1c58c"/></linearGradient>
        <linearGradient id="cnr-mountain" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#718f83"/><stop offset="1" stopColor="#294e49"/></linearGradient>
        <linearGradient id="cnr-forest" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#5c9565"/><stop offset="1" stopColor="#173e35"/></linearGradient>
        <linearGradient id="cnr-water" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#a5d9d1"/><stop offset=".55" stopColor="#3c9e9c"/><stop offset="1" stopColor="#1d626a"/></linearGradient>
        <linearGradient id="cnr-soil" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#9b7654"/><stop offset="1" stopColor="#4c392d"/></linearGradient>
        <radialGradient id="cnr-sun"><stop stopColor="#fff7c7"/><stop offset=".68" stopColor="#f5d58b"/><stop offset="1" stopColor="#f5d58b" stopOpacity="0"/></radialGradient>
        <filter id="cnr-soft-glow"><feGaussianBlur stdDeviation="18"/></filter>
        <filter id="cnr-haze"><feGaussianBlur stdDeviation="7"/></filter>
      </defs>

      <rect width="900" height="560" fill="url(#cnr-sky)"/>
      <circle className="landscape-sun-glow" cx="690" cy="140" r="125" fill="url(#cnr-sun)" filter="url(#cnr-soft-glow)"/>
      <circle className="landscape-sun" cx="690" cy="140" r="48" fill="#fff0b5"/>
      <g className="landscape-clouds" fill="#fff9e9" opacity=".76">
        <path d="M90 132c8-24 42-32 60-12 18-28 61-18 65 14 29 0 38 34 8 42H111c-38-2-43-29-21-44Z"/>
        <path d="M400 86c12-23 42-24 57-7 18-20 53-10 56 14 25 2 33 28 9 36H414c-27-2-31-28-14-43Z"/>
        <path d="M760 220c8-16 30-18 41-5 15-17 42-9 44 13 21 1 24 23 5 29h-82c-25-2-25-26-8-37Z"/>
      </g>
      <g className="landscape-mountains">
        <path d="M0 330 135 178l82 92 108-151 154 211 105-126 165 145 85-87 66 80v130H0Z" fill="#8ca69a" opacity=".72"/>
        <path d="m0 367 155-139 87 77 108-115 140 161 119-118 129 103 94-67 68 73v112H0Z" fill="url(#cnr-mountain)"/>
        <path d="m245 305 105-115 45 53-36-20-19 31-24-13-28 37Z M580 289l88-81 42 45-37-17-20 23-25-11Z" fill="#d6ded0" opacity=".72"/>
      </g>
      <path className="landscape-haze" d="M0 345c140-32 225 12 345-3s228-42 330-13 155 16 225-4v110H0Z" fill="#e8dfc4" opacity=".45" filter="url(#cnr-haze)"/>
      <path className="landscape-hills" d="M0 365c123-64 225-38 322 4 112-76 228-58 337-3 92-46 165-31 241 7v187H0Z" fill="#6c9a69"/>
      <path className="landscape-ground" d="M0 420c140-38 234-5 339 15 126-42 224-31 324 4 88-24 162-7 237 20v101H0Z" fill="#315d42"/>
      <path className="landscape-soil" d="M0 492c178-25 265 18 390 0 158-24 273 9 510-3v71H0Z" fill="url(#cnr-soil)"/>

      <g className="landscape-river">
        <path d="M518 314c-38 58-5 84-72 123s-62 72-5 123h237c-48-53-39-82-96-119s-45-80-7-127Z" fill="url(#cnr-water)"/>
        <path d="M558 328c-28 49-5 76-59 111s-48 66-6 105" fill="none" stroke="#d5f0dd" strokeWidth="5" strokeOpacity=".55"/>
        <path d="M604 367c-24 36-8 56 26 79" fill="none" stroke="#d5f0dd" strokeWidth="3" strokeOpacity=".42"/>
      </g>

      <g className="landscape-forest">
        <g className="tree tree-back">
          <path d="M94 435 116 257l22 178Z" fill="#684b37"/><path d="M74 310c-24-46 2-87 36-80 2-51 73-56 84-7 43 13 37 73 7 91-4 46-89 54-127-4Z" fill="#39764d"/>
        </g>
        <g className="tree tree-mid">
          <path d="m210 451 25-197 25 197Z" fill="#624832"/><path d="M178 327c-20-45 10-81 47-76 4-51 74-49 83-2 43 17 28 78-5 88-13 53-103 45-125-10Z" fill="#4e8955"/>
        </g>
        <g className="tree tree-front">
          <path d="m760 466 28-221 28 221Z" fill="#5b422e"/><path d="M724 330c-23-48 8-88 51-82 6-56 83-55 93-2 39 15 31 79-7 93-10 52-108 51-137-9Z" fill="#2c6846"/>
        </g>
        <g className="tree tree-front tree-small">
          <path d="m830 471 17-132 17 132Z" fill="#63472f"/><path d="M805 382c-14-30 5-55 30-51 5-33 49-34 56 0 26 9 19 48-5 56-8 32-67 30-81-5Z" fill="#478253"/>
        </g>
      </g>

      <g className="landscape-plants" fill="#91b96d">
        <path d="M35 490q-14-32-5-51 21 21 17 47 13-35 31-40-1 31-26 49 34-17 48-6-25 22-62 17Z"/>
        <path d="M664 493q-12-30-2-49 18 20 15 44 13-32 29-36 0 29-23 46 31-16 43-5-22 20-57 15Z"/>
        <path d="M290 493q-10-24-1-40 15 17 12 37 10-26 24-29 0 24-19 38 26-13 36-4-18 16-48 12Z"/>
      </g>

      <g className="landscape-wildlife">
        <path d="M390 391c-14-19-36-17-44-3-6 10 0 23 12 27l20 2 8 18 9-3-4-20 17-9 13 13 7-5-10-23c-6-12-20-15-28-7Z" fill="#c4a77b"/>
        <path d="m371 391-10-26-5-20 7-2 11 30 6-31 7 1-4 34M400 391l9-25 1-20 7 1-1 28 10-21 7 4-13 34" fill="none" stroke="#c4a77b" strokeWidth="5" strokeLinecap="round"/>
        <path d="M360 415v27m33-26 4 26" stroke="#594b3a" strokeWidth="4" strokeLinecap="round"/>
        <path className="landscape-birds" d="M280 174q12-13 24 0 12-13 24 0m90-48q10-11 20 0 10-11 20 0m90 64q9-10 18 0 9-10 18 0" fill="none" stroke="#304d45" strokeWidth="4" strokeLinecap="round"/>
        <g className="landscape-butterfly" transform="translate(560 250)">
          <path d="M0 0c-28-34-45-5-19 17 7 6 14 2 19-6 5 8 12 12 19 6C45-5 28-34 0 0Z" fill="#e4a36e"/>
          <path d="M0-2v27" stroke="#584b39" strokeWidth="3"/>
        </g>
      </g>

      <g className="landscape-air">
        <path d="M102 360V282h34v78m-29-78v-39h24v39" fill="#7b8175"/>
        <path className="landscape-smoke" d="M119 240c-22-20 10-29-3-48-9-13 6-24 16-31" fill="none" stroke="#777e79" strokeWidth="15" strokeLinecap="round" opacity=".72"/>
        <path d="M151 394h91l-12-27h-59Z" fill="#9a7957"/>
        <path d="M169 367v-24h32v24m10 0v-17h24v17" fill="#d6d0b9"/>
        <circle cx="177" cy="397" r="9" fill="#273b39"/><circle cx="221" cy="397" r="9" fill="#273b39"/>
        <path className="landscape-airflow" d="M30 210c55-25 85 25 139 0m-120 26c40-16 65 15 105 0m-3-51c37-16 61 12 97-1" fill="none" stroke="#edf6e9" strokeWidth="4" strokeLinecap="round" opacity=".8"/>
      </g>

      <g className="landscape-climate">
        <path d="M0 85Q450-20 900 85" fill="none" stroke="#f7dfad" strokeWidth="15" strokeOpacity=".34"/>
        <path d="M0 112Q450 6 900 112" fill="none" stroke="#fff0c5" strokeWidth="3" strokeOpacity=".65"/>
        <path d="M790 80v48m-16-16h32" stroke="#fff0c5" strokeWidth="3" strokeLinecap="round" opacity=".8"/>
        <circle cx="790" cy="104" r="30" fill="none" stroke="#fff0c5" strokeWidth="2" strokeDasharray="3 7"/>
      </g>

      <g className="landscape-finale">
        <path d="M0 470c115-38 212-20 320 10 113-37 225-35 338 0 83-20 161-5 242 22v58H0Z" fill="#214c3b" opacity=".62"/>
        <path d="M60 476q18-22 36 0m620 3q18-22 36 0m-360-6q15-19 30 0" fill="none" stroke="#d0e6af" strokeWidth="3" strokeLinecap="round"/>
      </g>
    </svg>
  </div>;
}

export default function StartupExperience({ children }) {
  const [visible, setVisible] = useState(true);
  const [appReady, setAppReady] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [sceneIndex, setSceneIndex] = useState(0);
  const [failedSceneId, setFailedSceneId] = useState(null);
  const [reducedMotion, setReducedMotion] = useState(
    () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false,
  );

  const scene = SCENES[sceneIndex];
  const imageFailed = failedSceneId === scene.id;

  useEffect(() => {
    const media = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    if (!media) return undefined;
    const update = () => setReducedMotion(media.matches);
    media.addEventListener?.('change', update);
    return () => media.removeEventListener?.('change', update);
  }, []);

  // The application tree is mounted underneath the intro. Its first committed
  // render is the readiness signal; no fabricated percentage or fixed wait is used.
  useEffect(() => {
    setAppReady(true);
  }, []);

  // Rotate scenes only while the real application initialization is still in progress.
  // If initialization finishes quickly, the intro exits promptly rather than delaying use.
  useEffect(() => {
    if (!visible || appReady || reducedMotion) return undefined;
    const timer = window.setInterval(() => {
      setSceneIndex((current) => (current + 1) % SCENES.length);
    }, 3600);
    return () => window.clearInterval(timer);
  }, [visible, appReady, reducedMotion]);

  useEffect(() => {
    if (appReady && visible) setLeaving(true);
  }, [appReady, visible]);

  useEffect(() => {
    if (!leaving) return undefined;
    const timer = window.setTimeout(() => setVisible(false), reducedMotion ? 0 : 520);
    return () => window.clearTimeout(timer);
  }, [leaving, reducedMotion]);

  const skip = () => setLeaving(true);

  return <>
    {children}
    {visible && <section
      className={'cinematic-intro' + (leaving ? ' is-leaving' : '') + (reducedMotion ? ' is-reduced-motion' : '')}
      role="region"
      aria-label="CNR-IA-2 environmental loading experience"
      aria-busy={!appReady}
    >
      <div className="cinematic-intro-atmosphere" aria-hidden="true" />
      <header className="cinematic-intro-header">
        <a className="cinematic-intro-brand" href="#/" aria-label="CNR-IA-2 home">
          <span className="cinematic-intro-brand-mark"><Leaf size={19} /></span>
          <span><strong>CNR-IA-2</strong><small>CONSERVATION AND NATURAL RESOURCES</small></span>
        </a>
        <div className="cinematic-intro-course">21CV654 / BCV755B <i /> VTU</div>
        <button type="button" className="cinematic-intro-skip" onClick={skip}>
          <SkipForward size={15} /> Skip intro
        </button>
      </header>

      <main className="cinematic-intro-main">
        <div className="cinematic-intro-copy">
          <span className="cinematic-intro-kicker">A CINEMATIC JOURNEY THROUGH NATURE</span>
          <h1>Conservation starts with knowledge.</h1>
          <p className="cinematic-intro-subtitle">Enter your environmental learning workspace for Conservation & Natural Resources.</p>

          <div className="cinematic-scene-copy" key={scene.id}>
            <span className="cinematic-scene-eyebrow">EXPLORE · {String(sceneIndex + 1).padStart(2, '0')} / 05</span>
            <h2>{scene.title}</h2>
            <p>{scene.message}</p>
          </div>

          <div className="cinematic-progress-panel">
            <div className="cinematic-progress-heading">
              <span>Preparing your learning environment</span>
              <span className="cinematic-loading-indicator" aria-hidden="true"><i /><i /><i /></span>
            </div>
            <div className="cinematic-progress-track cinematic-progress-track--indeterminate" role="progressbar" aria-label="Application initialization" aria-valuetext={appReady ? 'Application ready' : 'Initializing application'}>
              <span className="cinematic-progress-fill" />
            </div>
            <p className="cinematic-progress-status" aria-live="polite">
              {appReady ? 'Your CNR learning environment is ready.' : 'Loading study materials, modules and learning tools…'}
            </p>
            <p className="cinematic-progress-note">Live application initialization · no simulated percentage</p>
          </div>

          <p className="cinematic-environment-quote">“{scene.quote}”</p>
        </div>

        <div className={'cinematic-landscape-wrap' + (imageFailed ? ' is-image-fallback' : '')}>
          <LandscapeIllustration scene={{ ...scene, id: "complete" }} />
          <img
            key={scene.id}
            className="cinematic-photo"
            src={scene.image}
            alt={scene.alt}
            loading={sceneIndex === 0 ? 'eager' : 'lazy'}
            fetchPriority={sceneIndex === 0 ? 'high' : 'auto'}
            decoding="async"
            onError={() => setFailedSceneId(scene.id)}
          />
          <div className="cinematic-photo-shade" aria-hidden="true" />
          <div className="cinematic-photo-caption">
            <span>FIELD NOTES · CNR-IA-2</span>
            <strong>{scene.title}</strong>
          </div>
        </div>
      </main>

      <footer className="cinematic-intro-footer">
        <span>LAND · WATER · AIR · BIODIVERSITY · CLIMATE</span>
        <span>ONE PLANET · ONE LEARNING JOURNEY</span>
      </footer>
    </section>}
  </>;
}

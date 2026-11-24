import { useState } from 'react';

const MODULE_VISUALS = {
  3: {
    title: 'Air quality & pollution control',
    description: 'Industrial emissions, atmospheric pollution and the technologies used to clean the air.',
    image: 'https://images.unsplash.com/photo-1516937941344-00b4e0337588?auto=format&fit=crop&w=1600&q=85',
    alt: 'Industrial energy facility with tall structures and emissions infrastructure',
    tag: 'ATMOSPHERE · AIR QUALITY',
  },
  4: {
    title: 'Biodiversity & living ecosystems',
    description: 'Explore rich forest habitats, species diversity and the conservation of natural ecosystems.',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1600&q=85',
    alt: 'Sunlight filtering through a dense green forest ecosystem',
    tag: 'BIODIVERSITY · CONSERVATION',
  },
  5: {
    title: 'Climate change & environmental assessment',
    description: 'Understand a changing climate, global environmental action and responsible project assessment.',
    image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1600&q=85',
    alt: 'Mountain landscape under a dramatic layer of clouds',
    tag: 'CLIMATE · GLOBAL ACTION',
  },
};

export default function ModulePhoto({ module, compact = false, className = '' }) {
  const visual = MODULE_VISUALS[module];
  const [failed, setFailed] = useState(false);
  if (!visual) return null;

  return (
    <figure className={`module-photo relative isolate overflow-hidden rounded-2xl ${compact ? 'module-photo-compact' : 'module-photo-feature'} ${className}`}>
      {!failed ? (
        <img
          src={visual.image}
          alt={visual.alt}
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          onError={() => setFailed(true)}
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 module-photo-fallback" aria-hidden="true" />
      )}
      <div className="module-photo-shade absolute inset-0" aria-hidden="true" />
      <figcaption className="relative z-10 flex h-full flex-col justify-end p-4 text-white sm:p-5">
        <span className="mb-2 w-fit rounded-full border border-white/30 bg-black/25 px-2.5 py-1 text-[10px] font-bold tracking-[.16em] backdrop-blur-sm">{visual.tag}</span>
        <span className="max-w-2xl text-lg font-bold leading-tight drop-shadow sm:text-xl">{visual.title}</span>
        {!compact && <span className="mt-1 max-w-2xl text-sm leading-relaxed text-white/90 drop-shadow">{visual.description}</span>}
      </figcaption>
    </figure>
  );
}

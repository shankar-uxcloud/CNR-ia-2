import React from 'react';

export const MODULE_PHOTOGRAPHY = {
  1: {
    title: 'Land & soil',
    alt: 'Aerial photograph of cultivated green and freshly ploughed brown farmland, showing contrasting land use and soil surfaces',
    src: 'https://images.unsplash.com/photo-1741981400675-56b71e7a2a18?auto=format&fit=crop&w=1400&q=82',
    credit: 'Bernd Dittrich',
    creditUrl: 'https://unsplash.com/photos/a-field-of-green-and-brown-soil-DzSWMHAOvAw',
    focus: '50% 54%',
  },
  2: {
    title: 'Water resources',
    alt: 'Aerial photograph of a winding river flowing between mountain slopes and green vegetation',
    src: 'https://images.unsplash.com/photo-1721297014365-5f8e043e87a5?auto=format&fit=crop&w=1400&q=82',
    credit: 'Tomáš Malík',
    creditUrl: 'https://unsplash.com/photos/an-aerial-view-of-a-river-and-mountains-9XgRwllBo4o',
    focus: '50% 50%',
  },
  3: {
    title: 'Air quality',
    alt: 'Industrial city skyline with factory chimneys releasing smoke into a grey polluted atmosphere',
    src: 'https://images.unsplash.com/photo-1657650505323-b9397cedd97a?auto=format&fit=crop&w=1400&q=82',
    credit: 'Chris LeBoutillier',
    creditUrl: 'https://unsplash.com/@chrisleboutillier',
    focus: '50% 45%',
  },
  4: {
    title: 'Biodiversity & ecosystems',
    alt: 'Dense tropical rainforest canopy with tall trees and rich green vegetation',
    src: 'https://images.unsplash.com/photo-1718360421602-77bd3a3b4da2?auto=format&fit=crop&w=1400&q=82',
    credit: 'Maximus Beaumont',
    creditUrl: 'https://unsplash.com/photos/a-lush-green-forest-filled-with-lots-of-trees-GlNSjGRugTE',
    focus: '50% 54%',
  },
  5: {
    title: 'Global warming',
    alt: 'Retreating glacier with a meltwater pool and exposed rocky terrain, illustrating climate change impacts',
    src: 'https://images.unsplash.com/photo-1765212496685-d2d9123f88a3?auto=format&fit=crop&w=1400&q=82',
    credit: 'Maximilian Brand',
    creditUrl: 'https://unsplash.com/photos/melting-glacier-with-a-pool-of-water-xmegz6z1w6I',
    focus: '50% 50%',
  },
};

export function ModulePhotography({ moduleNumber, variant = 'tile' }) {
  const photo = MODULE_PHOTOGRAPHY[moduleNumber];
  if (!photo) return null;

  return (
    <figure className={`cnr-module-photo cnr-module-photo--${variant}`} aria-label={photo.title}>
      <img
        src={photo.src}
        alt={photo.alt}
        loading="lazy"
        decoding="async"
        referrerPolicy="no-referrer"
        style={{ objectPosition: photo.focus }}
        onError={(event) => {
          event.currentTarget.dataset.failed = 'true';
          event.currentTarget.removeAttribute('src');
        }}
      />
      <span className="cnr-module-photo-shade" aria-hidden="true" />
      <figcaption>
        <strong>{photo.title}</strong>
        {variant === 'hero' ? <a href={photo.creditUrl} target="_blank" rel="noreferrer">Photo: {photo.credit} · Unsplash</a> : <small>Photo: {photo.credit} · Unsplash</small>}
      </figcaption>
    </figure>
  );
}

export default ModulePhotography;

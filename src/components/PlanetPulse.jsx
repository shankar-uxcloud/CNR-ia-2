import { useState } from 'react';
import { ArrowUpRight, Droplets, Trees, Wind, Bird, Orbit, Sparkles } from 'lucide-react';
import './PlanetPulse.css';

const missions = [
  { id: 'forest', name: 'Forest systems', eyebrow: 'BIODIVERSITY', detail: 'Explore forest ecosystems, food webs and the value of protecting native habitats.', action: 'Explore the environment lab', href: '#/environment-lab', Icon: Trees, color: 'forest' },
  { id: 'water', name: 'Water security', eyebrow: 'WATER CONSERVATION', detail: 'Understand watersheds, groundwater, rainwater harvesting and responsible water use.', action: 'Open visual studio', href: '#/visual-studio', Icon: Droplets, color: 'water' },
  { id: 'energy', name: 'Clean energy', eyebrow: 'RENEWABLE RESOURCES', detail: 'Connect renewable energy choices with resource conservation and sustainable development.', action: 'Explore learning tools', href: '#/visual-studio', Icon: Wind, color: 'energy' },
  { id: 'wildlife', name: 'Living networks', eyebrow: 'WILDLIFE & HABITATS', detail: 'Discover biodiversity, habitat relationships and why ecological balance matters.', action: 'Explore the environment lab', href: '#/environment-lab', Icon: Bird, color: 'wildlife' },
];

function HolographicEarth() {
  return (
    <div className="planet-pulse-visual" aria-label="Illustration of Earth surrounded by environmental data orbits">
      <div className="planet-pulse-halo" />
      <div className="planet-pulse-orbit orbit-one"><i /></div>
      <div className="planet-pulse-orbit orbit-two"><i /></div>
      <div className="planet-pulse-orbit orbit-three"><i /></div>
      <svg className="planet-pulse-earth" viewBox="0 0 300 300" role="img" aria-labelledby="planet-title">
        <title id="planet-title">A glowing green and blue holographic Earth</title>
        <defs>
          <radialGradient id="planetOcean" cx="35%" cy="28%" r="75%"><stop offset="0" stopColor="#69e7c0"/><stop offset=".48" stopColor="#087e78"/><stop offset="1" stopColor="#062c3d"/></radialGradient>
          <linearGradient id="planetLand" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#d5ff9a"/><stop offset="1" stopColor="#36b978"/></linearGradient>
          <clipPath id="planetClip"><circle cx="150" cy="150" r="104"/></clipPath>
          <filter id="planetGlow"><feGaussianBlur stdDeviation="8" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        </defs>
        <circle cx="150" cy="150" r="116" fill="#3ce6bd" opacity=".10" filter="url(#planetGlow)"/>
        <circle cx="150" cy="150" r="104" fill="url(#planetOcean)" stroke="#8bffe0" strokeOpacity=".85" strokeWidth="1.5"/>
        <g clipPath="url(#planetClip)" fill="url(#planetLand)" stroke="#c8ffbb" strokeOpacity=".3" strokeWidth="1">
          <path d="M82 65 103 55 124 62 134 78 125 92 108 94 101 111 84 107 73 91 61 88 67 73Z"/>
          <path d="m126 112 19 8 12 23-8 22-8 27-13 20-10-19-1-25-12-19 4-20Z"/>
          <path d="m164 67 23-11 27 8 14 17-9 16-22 2-9 17-17-8-8-20Z"/>
          <path d="m190 120 24-7 21 15 4 25-15 17-12 28-20-8-8-25-15-18Z"/>
          <path d="m53 139 15-8 13 8-4 14-18 5Z"/>
          <path d="m101 37 17-8 12 5-5 12-17 3Z"/>
          <path d="m224 204 18-8 13 12-8 15-19-3Z"/>
        </g>
        <circle cx="150" cy="150" r="104" fill="none" stroke="#a2ffe3" strokeOpacity=".42" strokeDasharray="2 7"/>
        <path d="M53 150h194M150 46v208" stroke="#a5ffe4" strokeOpacity=".13" strokeDasharray="3 7"/>
      </svg>
      <span className="planet-pulse-coordinate coordinate-top">14° 35′ N · 76° 56′ E</span>
      <span className="planet-pulse-coordinate coordinate-bottom">EARTH SYSTEMS / BCV755B</span>
      <span className="planet-pulse-signal"><i /> PLANETARY LEARNING NETWORK</span>
    </div>
  );
}

export default function PlanetPulse() {
  const [active, setActive] = useState('forest');
  const mission = missions.find((item) => item.id === active) || missions[0];
  const Icon = mission.Icon;
  return (
    <section className="planet-pulse card mt-6 overflow-hidden" aria-labelledby="planet-pulse-title">
      <div className="planet-pulse-grid">
        <div className="planet-pulse-copy">
          <div className="flex flex-wrap items-center gap-2">
            <span className="planet-pulse-kicker"><Orbit size={13}/> CNR PLANET PULSE</span>
            <span className="planet-pulse-live"><i/> INTERACTIVE EXPLORER</span>
          </div>
          <h2 id="planet-pulse-title">One planet.<br/><span>Many systems to protect.</span></h2>
          <p className="planet-pulse-intro">Explore the connected systems behind Conservation of Natural Resources. Choose a mission to discover a learning path.</p>
          <div className="planet-pulse-missions" role="group" aria-label="Choose an environmental learning mission">
            {missions.map(({ id, name, Icon: MissionIcon }) => (
              <button key={id} type="button" className={`planet-pulse-mission ${active === id ? 'is-active' : ''}`} onClick={() => setActive(id)} aria-pressed={active === id}>
                <MissionIcon size={16}/><span>{name}</span><ArrowUpRight size={13} className="mission-arrow"/>
              </button>
            ))}
          </div>
          <div className={`planet-pulse-detail tone-${mission.color}`} aria-live="polite">
            <div className="planet-pulse-detail-icon"><Icon size={18}/></div>
            <div className="min-w-0 flex-1"><p>{mission.eyebrow}</p><h3>{mission.name}</h3><span>{mission.detail}</span></div>
            <a href={mission.href} aria-label={mission.action}>{mission.action}<ArrowUpRight size={14}/></a>
          </div>
        </div>
        <div className="planet-pulse-art"><HolographicEarth/><div className="planet-pulse-art-note"><Sparkles size={14}/> Explore the connections. Understand the planet.</div></div>
      </div>
    </section>
  );
}

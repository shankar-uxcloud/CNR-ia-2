import { useMemo, useState } from 'react';
import { Activity, ArrowDown, ArrowRight, Check, CircleDot, Leaf, Network, RotateCcw, ShieldAlert, Sparkles, Trees, Waves, Wind } from 'lucide-react';

const HABITATS = [
  {
    id: 'forest', name: 'Western Ghats rainforest', region: 'TROPICAL FOREST', Icon: Trees,
    intro: 'A layered forest where pollinators, seed dispersers and apex predators keep the system in balance.',
    species: [
      { id: 'fig', name: 'Fig tree', role: 'Producer', level: 0, note: 'Fruits feed many forest animals.' },
      { id: 'bee', name: 'Native bee', role: 'Pollinator', level: 1, note: 'Pollinates flowering plants.' },
      { id: 'deer', name: 'Barking deer', role: 'Herbivore', level: 1, note: 'Browses leaves, shoots and fruit.' },
      { id: 'hornbill', name: 'Great hornbill', role: 'Seed disperser', level: 2, note: 'Carries large seeds across the forest.' },
      { id: 'leopard', name: 'Leopard', role: 'Apex predator', level: 3, note: 'Helps regulate herbivore populations.' },
    ],
    links: [['fig', 'bee'], ['fig', 'deer'], ['fig', 'hornbill'], ['deer', 'leopard']],
    keystone: 'hornbill', keystoneName: 'Great hornbill',
    cascade: 'Fewer large seeds travel across the forest. Some tree populations become isolated, reducing future habitat and food for other species.',
    insight: 'Seed dispersers are ecosystem engineers: they help forests regenerate beyond the parent tree.'
  },
  {
    id: 'wetland', name: 'Freshwater wetland', region: 'AQUATIC ECOSYSTEM', Icon: Waves,
    intro: 'A living water network linking aquatic plants, insects, fish and wetland birds.',
    species: [
      { id: 'reed', name: 'Reed plants', role: 'Producer', level: 0, note: 'Provide food, oxygen and shelter.' },
      { id: 'algae', name: 'Algae', role: 'Producer', level: 0, note: 'Forms the base of many aquatic food chains.' },
      { id: 'snail', name: 'Freshwater snail', role: 'Primary consumer', level: 1, note: 'Grazes on algae and plant material.' },
      { id: 'fish', name: 'Small fish', role: 'Secondary consumer', level: 2, note: 'Feeds on aquatic invertebrates.' },
      { id: 'heron', name: 'Grey heron', role: 'Top predator', level: 3, note: 'Feeds on fish and other small animals.' },
    ],
    links: [['algae', 'snail'], ['reed', 'snail'], ['snail', 'fish'], ['fish', 'heron']],
    keystone: 'reed', keystoneName: 'Reed plants',
    cascade: 'Wetland edges lose shelter and nesting habitat. Sediment filtering weakens, water becomes more turbid and young fish lose refuge.',
    insight: 'Wetland vegetation is infrastructure: it filters water, stabilises banks and creates nursery habitat.'
  },
  {
    id: 'grassland', name: 'Deccan grassland', region: 'GRASSLAND BIOME', Icon: Wind,
    intro: 'Open grassland dynamics depend on native grasses, grazers, insects and predators.',
    species: [
      { id: 'grass', name: 'Native grasses', role: 'Producer', level: 0, note: 'Capture solar energy and bind soil.' },
      { id: 'locust', name: 'Grasshopper', role: 'Primary consumer', level: 1, note: 'Feeds on grass and transfers energy.' },
      { id: 'mouse', name: 'Field mouse', role: 'Primary consumer', level: 1, note: 'Eats seeds and provides prey.' },
      { id: 'snake', name: 'Rat snake', role: 'Secondary consumer', level: 2, note: 'Controls rodent populations.' },
      { id: 'eagle', name: 'Steppe eagle', role: 'Top predator', level: 3, note: 'Hunts small mammals and reptiles.' },
    ],
    links: [['grass', 'locust'], ['grass', 'mouse'], ['mouse', 'snake'], ['snake', 'eagle']],
    keystone: 'grass', keystoneName: 'Native grasses',
    cascade: 'Soil cover collapses, erosion increases and grazing pressure concentrates on remaining plants. The entire food web loses its energy foundation.',
    insight: 'Native grass cover protects soil carbon, slows runoff and supports specialist wildlife.'
  }
];

const ROLE_COLORS = ['text-emerald-400 border-emerald-400/30 bg-emerald-400/10', 'text-sky-400 border-sky-400/30 bg-sky-400/10', 'text-amber-400 border-amber-400/30 bg-amber-400/10', 'text-fuchsia-400 border-fuchsia-400/30 bg-fuchsia-400/10'];

export default function EcoWebArchitect() {
  const [habitatId, setHabitatId] = useState('forest');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [built, setBuilt] = useState([]);
  const [feedback, setFeedback] = useState('');
  const [disturbed, setDisturbed] = useState(false);
  const habitat = HABITATS.find((item) => item.id === habitatId) || HABITATS[0];
  const speciesById = useMemo(() => Object.fromEntries(habitat.species.map((item) => [item.id, item])), [habitat]);
  const complete = habitat.links.every(([a, b]) => built.some(([x, y]) => x === a && y === b));
  const score = Math.round((built.length / habitat.links.length) * 100);

  const reset = (nextId = habitatId) => {
    setHabitatId(nextId); setBuilt([]); setFrom(''); setTo(''); setFeedback(''); setDisturbed(false);
  };
  const addLink = () => {
    if (!from || !to || from === to) { setFeedback('Choose two different species to create a relationship.'); return; }
    if (built.some(([a, b]) => a === from && b === to)) { setFeedback('That connection is already in your food web.'); return; }
    if (!habitat.links.some(([a, b]) => a === from && b === to)) { setFeedback('Not quite. Check who gets energy from whom, then try again.'); return; }
    setBuilt((items) => [...items, [from, to]]);
    setFeedback('Correct connection — energy flows to the consumer.');
    setFrom(''); setTo('');
  };

  return (
    <div className="mx-auto w-full max-w-[1440px] px-4 py-6 sm:px-6 sm:py-9 lg:px-8">
      <div className="relative overflow-hidden rounded-[28px] border border-emerald-400/20 bg-[#071b1b] p-5 text-white shadow-[0_20px_70px_rgba(2,20,18,.28)] sm:p-8">
        <div className="pointer-events-none absolute -right-16 -top-24 h-72 w-72 rounded-full bg-emerald-400/10 blur-3xl" />
        <div className="relative grid gap-7 lg:grid-cols-[1.2fr_.8fr] lg:items-center">
          <div>
            <p className="flex items-center gap-2 text-[11px] font-bold tracking-[.2em] text-emerald-300"><Sparkles size={14}/> CNR FIELD INTELLIGENCE · INTERACTIVE ECOLOGY</p>
            <h1 className="mt-3 max-w-2xl text-3xl font-black tracking-tight sm:text-5xl">EcoWeb <span className="text-emerald-300">Architect</span></h1>
            <p className="mt-3 max-w-xl text-sm leading-6 text-emerald-50/70 sm:text-base">Build a living food web. Trace the flow of energy. Then remove one critical species and watch the ripple effects move through the ecosystem.</p>
            <div className="mt-5 flex flex-wrap gap-2"><span className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs">01 · CONNECT</span><span className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs">02 · VERIFY</span><span className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs">03 · TEST A CASCADE</span></div>
          </div>
          <div className="relative mx-auto grid h-44 w-44 place-items-center rounded-full border border-emerald-300/25 bg-[radial-gradient(circle,rgba(52,211,153,.2),rgba(5,46,39,.1)_58%,transparent_60%)] sm:h-52 sm:w-52">
            <div className="absolute inset-3 rounded-full border border-dashed border-emerald-200/30 animate-[spin_28s_linear_infinite]" />
            <div className="absolute inset-8 rounded-full border border-emerald-200/20" />
            <Network size={58} strokeWidth={1.1} className="text-emerald-200"/>
            <span className="absolute -bottom-2 rounded-full border border-emerald-300/30 bg-[#0b2924] px-3 py-1 text-[10px] font-bold tracking-widest text-emerald-200">LIVING SYSTEM</span>
          </div>
        </div>
      </div>

      <section className="mt-7" aria-labelledby="habitat-heading">
        <div className="flex flex-wrap items-end justify-between gap-3"><div><p className="eyebrow">Choose your ecosystem</p><h2 id="habitat-heading" className="mt-1 text-xl font-bold">Select a field site</h2></div><span className="chip">3 ecosystems · 3 challenges</span></div>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {HABITATS.map(({ id, name, region, Icon }) => <button key={id} type="button" onClick={() => reset(id)} aria-pressed={habitatId === id} className={`card p-4 text-left transition hover:-translate-y-0.5 ${habitatId === id ? 'border-emerald-400/60 ring-2 ring-emerald-400/15' : ''}`}><span className="flex items-center justify-between"><Icon size={21} className="text-emerald-500"/><span className="text-[10px] font-bold tracking-widest text-mute">{region}</span></span><span className="mt-3 block font-bold">{name}</span><span className="mt-1 block text-xs text-mute">{id === 'forest' ? 'Seed dispersal & forest regeneration' : id === 'wetland' ? 'Water quality & habitat structure' : 'Soil stability & energy transfer'}</span></button>)}
        </div>
        <p className="mt-3 text-sm text-mute">{habitat.intro}</p>
      </section>

      <div className="mt-6 grid gap-5 xl:grid-cols-[1.1fr_.9fr]">
        <section className="card p-4 sm:p-6" aria-labelledby="build-heading">
          <div className="flex flex-wrap items-center justify-between gap-3"><div><p className="eyebrow">Phase 01 / 03</p><h2 id="build-heading" className="mt-1 text-xl font-bold">Construct the food web</h2></div><span className="rounded-full bg-sunk px-3 py-1 text-xs font-semibold tabular-nums">{built.length}/{habitat.links.length} links</span></div>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-sunk"><div className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-cyan-400 transition-all" style={{ width: `${score}%` }}/></div>
          <p className="mt-2 text-xs text-mute">Connect a food source to the organism that consumes it. The arrow represents energy flow.</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_auto_1fr] sm:items-end">
            <label className="text-xs font-semibold text-mute">ENERGY SOURCE<select value={from} onChange={(e) => setFrom(e.target.value)} className="mt-1.5 h-11 w-full rounded-xl border border-line bg-panel px-3 text-sm text-ink"><option value="">Choose species…</option>{habitat.species.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}</select></label>
            <ArrowRight className="hidden text-emerald-500 sm:block sm:mb-3"/>
            <label className="text-xs font-semibold text-mute">CONSUMER<select value={to} onChange={(e) => setTo(e.target.value)} className="mt-1.5 h-11 w-full rounded-xl border border-line bg-panel px-3 text-sm text-ink"><option value="">Choose species…</option>{habitat.species.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}</select></label>
          </div>
          <button type="button" onClick={addLink} disabled={complete} className="btn-primary mt-3 w-full sm:w-auto"><Network size={16}/> Add connection</button>
          {feedback && <p className="mt-3 rounded-xl bg-sunk p-3 text-sm" role="status" aria-live="polite">{feedback}</p>}
          <div className="mt-5 space-y-2">
            {habitat.species.map((s) => <div key={s.id} className="flex items-center gap-3 rounded-xl border border-line bg-panel/60 p-3"><span className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg border ${ROLE_COLORS[Math.min(s.level, 3)]}`}><Leaf size={17}/></span><span className="min-w-0 flex-1"><span className="block text-sm font-bold">{s.name}</span><span className="block text-xs text-mute">{s.role} · {s.note}</span></span><span className="text-xs text-emerald-500">{built.filter(([a,b]) => b === s.id).length} in</span></div>)}
          </div>
          <div className="mt-4 rounded-xl border border-line p-3"><p className="text-xs font-bold uppercase tracking-wider text-mute">Your verified energy pathways</p>{built.length ? <div className="mt-2 flex flex-wrap gap-2">{built.map(([a,b]) => <span key={a+b} className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-1.5 text-xs text-emerald-600">{speciesById[a].name}<ArrowRight size={12}/>{speciesById[b].name}<Check size={12}/></span>)}</div> : <p className="mt-2 text-sm text-mute">No links yet. Start with a producer and its consumer.</p>}</div>
        </section>

        <section className="space-y-4">
          <div className="card p-5 sm:p-6">
            <p className="eyebrow">Phase 02 / 03</p><h2 className="mt-1 text-xl font-bold">Ecosystem integrity</h2>
            <div className="mt-4 grid grid-cols-2 gap-3"><div className="rounded-xl bg-sunk p-4"><p className="text-xs text-mute">Web accuracy</p><p className="mt-1 text-3xl font-black tabular-nums">{score}%</p></div><div className="rounded-xl bg-sunk p-4"><p className="text-xs text-mute">Verified links</p><p className="mt-1 text-3xl font-black tabular-nums">{built.length}<span className="text-base text-mute">/{habitat.links.length}</span></p></div></div>
            <div className="mt-4 flex items-center gap-2 text-sm">{complete ? <><Check className="text-emerald-500"/> Food web complete — disturbance test unlocked.</> : <><CircleDot className="text-mute"/> Complete all pathways to unlock the cascade test.</>}</div>
            <button type="button" disabled={!complete} onClick={() => setDisturbed(true)} className="btn-primary mt-4 w-full disabled:opacity-40"><ShieldAlert size={16}/> Simulate species loss</button>
            {disturbed && <div className="mt-4 rounded-2xl border border-amber-500/30 bg-amber-500/5 p-4"><p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-600"><Activity size={15}/> Disturbance detected</p><h3 className="mt-2 text-lg font-bold">{habitat.keystoneName} removed</h3><p className="mt-2 text-sm leading-6 text-mute">{habitat.cascade}</p><p className="mt-3 border-t border-amber-500/20 pt-3 text-sm font-medium">{habitat.insight}</p></div>}
          </div>
          <div className="card p-5"><p className="eyebrow">Field note</p><h3 className="mt-1 font-bold">Why food webs matter</h3><p className="mt-2 text-sm leading-6 text-mute">A food chain shows one pathway. A food web shows connected pathways, so a disturbance can affect organisms far beyond the species directly involved. Real ecosystems are more complex than this learning model.</p><div className="mt-3 flex items-start gap-2 rounded-xl bg-sunk p-3 text-xs leading-5 text-mute"><Sparkles size={15} className="mt-0.5 shrink-0 text-emerald-500"/> <span>Learning model: simplified relationships for concept practice, not a predictive ecological forecast.</span></div></div>
        </section>
      </div>
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3"><p className="text-xs text-mute">Your challenge progress is held in this session. Switch habitats to start a fresh ecosystem.</p><button type="button" onClick={() => reset()} className="btn-ghost"><RotateCcw size={15}/> Reset field site</button></div>
    </div>
  );
}

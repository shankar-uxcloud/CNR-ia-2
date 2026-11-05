import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Activity, Atom, ChevronLeft, ChevronRight, CircleHelp, Droplets, Expand, Eye, EyeOff, Focus, Gauge, Leaf, Maximize2, Pause, Play, RotateCcw, Sun, Trees, Wind, X, ZoomIn, ZoomOut } from 'lucide-react';
import { useStudy } from '../lib/study';

const LESSONS = [
  { id: 'earth', title: 'Earth resource explorer', icon: GlobeIcon, subtitle: 'A rotatable conceptual globe with resource-system markers.', concepts: ['Forest resources', 'Water resources', 'Mineral resources', 'Energy resources', 'Biodiversity'], explanation: 'Earth’s natural resources are interconnected. Forests support habitats and carbon storage; freshwater sustains people and ecosystems; minerals provide materials; energy resources support human activity; and biodiversity underpins ecosystem function. Markers in this teaching globe are illustrative locations, not a measured resource inventory.' },
  { id: 'forest', title: 'Forest ecosystem', icon: Trees, subtitle: 'Explore vegetation structure, habitats and soil layers.', concepts: ['Canopy and understory', 'Forest floor', 'Soil and organic matter', 'Habitat connections', 'Conservation choices'], explanation: 'A forest ecosystem includes plants, animals, microorganisms, soil, water and climate. Vegetation layers create habitats, while litter decomposition returns nutrients to the soil. Deforestation can fragment habitats, expose soil and reduce ecosystem services. Restoration and conservation support recovery, but outcomes depend on local ecology and long-term management.' },
  { id: 'water', title: 'Water cycle simulator', icon: Droplets, subtitle: 'Follow water through atmosphere, land and groundwater.', concepts: ['Evaporation', 'Condensation', 'Precipitation', 'Infiltration', 'Runoff and groundwater'], explanation: 'Solar energy drives evaporation from water and land, while plants release water vapour through transpiration. Rising moist air cools and water vapour condenses into cloud droplets or ice crystals. Precipitation returns water to Earth. Some infiltrates soil and may recharge groundwater; some flows over land as runoff into streams and oceans. This is a conceptual process model, not a forecast.' },
  { id: 'energy', title: 'Renewable energy lab', icon: Wind, subtitle: 'Inspect solar, wind, hydro and biomass energy conversion.', concepts: ['Solar photovoltaic conversion', 'Wind turbine rotation', 'Hydroelectric generation', 'Biomass energy', 'Energy transformation'], explanation: 'Solar photovoltaic cells convert light directly into electrical energy. Wind turns turbine blades and a generator converts mechanical rotation into electricity. Hydropower uses moving or falling water to drive a turbine-generator. Biomass stores chemical energy in organic matter and can provide heat, fuels or biogas when managed sustainably.' },
  { id: 'biodiversity', title: 'Biodiversity web', icon: Atom, subtitle: 'Explore feeding relationships and ecosystem roles.', concepts: ['Producers', 'Primary consumers', 'Secondary consumers', 'Decomposers', 'Food-web connections'], explanation: 'Producers capture energy, usually through photosynthesis. Consumers obtain energy by feeding on organisms. Decomposers such as fungi and bacteria break down dead organic matter and help recycle nutrients. A food web links many food chains; changes to one population can affect other connected populations. The displayed web is a simplified teaching example.' },
  { id: 'scenarios', title: 'Environmental scenarios', icon: Activity, subtitle: 'Change illustrative pressures and inspect conceptual responses.', concepts: ['Forest cover pressure', 'Groundwater extraction', 'Habitat connectivity', 'Renewable energy share'], explanation: 'Scenario controls are qualitative learning aids. They show conceptual direction of change, not calibrated forecasts, measured outcomes or causal estimates. Real environmental responses depend on location, time, climate, governance, technology and many interacting variables.' },
];

function GlobeIcon(props) { return <span aria-hidden="true" className={props.className}>◎</span>; }

const RESOURCE_MARKERS = [
  { id: 'forest-resource', label: 'Forest ecosystems', detail: 'Forests provide habitat, timber and non-timber products, carbon storage and watershed functions.', lat: 12, lon: 25, color: '#39ff88' },
  { id: 'freshwater', label: 'Freshwater systems', detail: 'Rivers, lakes, wetlands and groundwater support communities and ecological processes.', lat: 32, lon: 105, color: '#32c9ff' },
  { id: 'mineral', label: 'Mineral resources', detail: 'Minerals are geological materials used in infrastructure and technology; extraction requires environmental safeguards.', lat: -18, lon: 138, color: '#ffbd59' },
  { id: 'renewable', label: 'Renewable energy', detail: 'Solar, wind and hydropower use naturally replenished energy flows, with impacts that depend on siting and design.', lat: 38, lon: -105, color: '#bd83ff' },
  { id: 'biodiversity-resource', label: 'Biodiversity', detail: 'Species, genetic and ecosystem diversity contribute to resilience and ecosystem services.', lat: -8, lon: -62, color: '#ff71c8' },
];

const CONCEPT_IDS = {
  earth: ['forest-resource','freshwater','mineral','renewable','biodiversity-resource'],
  forest: ['canopy','understory','forestfloor','soil','habitat'],
  water: ['evaporation','condensation','precipitation','infiltration','runoff'],
  energy: ['solar','wind','hydro','biomass'],
  biodiversity: ['producer','herbivore','predator','decomposer','soil'],
  scenarios: ['canopy','groundwater','habitat','renewables'],
};
const HOTSPOT_INFO = {
  'forest-resource': 'Forest resources: biological products and ecosystem services such as habitat, soil protection and carbon storage.',
  freshwater: 'Water resources: surface water and groundwater are renewed and stored through the hydrological cycle.',
  mineral: 'Mineral resources: finite geological materials; responsible extraction considers land, water and waste impacts.',
  renewable: 'Energy resources: solar, wind and flowing water are renewable energy flows when appropriately managed.',
  'biodiversity-resource': 'Biodiversity: variation among living organisms at genetic, species and ecosystem levels.',
  understory: 'Understory: shrubs and young trees form a vegetation layer beneath the canopy and provide cover and food for wildlife.',
  groundwater: 'Groundwater pressure: sustained extraction can lower water tables and reduce water available to wells, springs and connected ecosystems; the outcome depends on local recharge and use.',
  habitat: 'Habitat connectivity: connected habitats can help organisms move, disperse and maintain gene flow; fragmentation can isolate populations.',
  renewables: 'Renewable energy adoption: a shift toward renewable energy can reduce dependence on fossil fuels, while siting and life-cycle impacts still require assessment.',
  canopy: 'Canopy: the upper tree layer intercepts light and rainfall and provides habitat for many organisms.',
  understory: 'Understory: shrubs and young trees create additional habitat and influence forest regeneration.',
  soil: 'Soil: mineral particles, organic matter, water, air and organisms form a living system that supports plants.',
  forestfloor: 'Forest floor: litter and dead organic matter are decomposed, returning nutrients to the soil.',
  evaporation: 'Evaporation: solar energy changes liquid water into water vapour. Transpiration by plants also adds vapour.',
  condensation: 'Condensation: moist air cools and water vapour forms tiny liquid droplets or ice crystals in clouds.',
  precipitation: 'Precipitation: water returns from clouds as rain, snow, sleet or hail.',
  infiltration: 'Infiltration: water enters the soil surface and may percolate downward to recharge groundwater.',
  runoff: 'Runoff: water flows over the land surface toward streams, lakes and oceans.',
  solar: 'Solar PV: semiconductor cells convert incident light into electrical energy.',
  wind: 'Wind power: moving air turns rotor blades; a drivetrain and generator convert rotation into electricity.',
  hydro: 'Hydropower: moving water drives a turbine connected to an electrical generator.',
  biomass: 'Biomass: organic material stores chemical energy that can be converted to heat, fuels or biogas.',
  producer: 'Producer: plants and algae convert light energy into chemical energy, forming the base of many food webs.',
  herbivore: 'Primary consumer: an herbivore obtains energy by eating producers.',
  predator: 'Secondary consumer: a predator obtains energy by eating other consumers.',
  decomposer: 'Decomposer: fungi and bacteria break down dead organic matter and release nutrients for reuse.',
};

const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
const projectFactory = (w, h, yaw, pitch, zoom) => (x, y, z) => {
  const cy = Math.cos(yaw), sy = Math.sin(yaw), cx = Math.cos(pitch), sx = Math.sin(pitch);
  const rx = x * cy + z * sy, rz = -x * sy + z * cy;
  const ry = y * cx - rz * sx, depth = y * sx + rz * cx;
  const perspective = 720 / (720 + depth);
  return { x: w / 2 + rx * perspective * zoom, y: h / 2 + ry * perspective * zoom, depth };
};
const line = (ctx, a, b, color, width = 2, dash = []) => {
  ctx.beginPath(); ctx.setLineDash(dash); ctx.strokeStyle = color; ctx.lineWidth = width;
  ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); ctx.setLineDash([]);
};
const polygon = (ctx, points, fill, stroke = 'rgba(150,210,230,.5)') => {
  ctx.beginPath(); points.forEach((p, i) => i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y)); ctx.closePath();
  ctx.fillStyle = fill; ctx.fill(); ctx.strokeStyle = stroke; ctx.lineWidth = 1.2; ctx.stroke();
};
const label = (ctx, p, text, color = '#e8fbff') => {
  ctx.font = '600 11px Inter, system-ui, sans-serif'; ctx.textAlign = 'center';
  const width = ctx.measureText(text).width + 14;
  ctx.fillStyle = 'rgba(5,13,28,.82)'; ctx.strokeStyle = 'rgba(0,229,255,.4)';
  ctx.beginPath(); ctx.roundRect(p.x - width / 2, p.y - 25, width, 19, 7); ctx.fill(); ctx.stroke();
  ctx.fillStyle = color; ctx.fillText(text, p.x, p.y - 12);
};
const spherePoint = (lat, lon, r) => {
  const a = lat * Math.PI / 180, b = lon * Math.PI / 180;
  return [r * Math.cos(a) * Math.sin(b), r * Math.sin(a), r * Math.cos(a) * Math.cos(b)];
};
const glowDot = (ctx, p, color, radius = 5) => {
  ctx.save(); ctx.shadowColor = color; ctx.shadowBlur = 16; ctx.fillStyle = color;
  ctx.beginPath(); ctx.arc(p.x, p.y, radius, 0, Math.PI * 2); ctx.fill(); ctx.restore();
};

function drawEarth(ctx, project, w, h, labels, hotspots) {
  const r = 158, center = project(0, 0, 0);
  const grad = ctx.createRadialGradient(center.x - 55, center.y - 65, 10, center.x, center.y, 180);
  grad.addColorStop(0, '#267da0'); grad.addColorStop(.58, '#105276'); grad.addColorStop(1, '#071a35');
  ctx.save(); ctx.shadowColor = '#00dfff'; ctx.shadowBlur = 28;
  ctx.beginPath(); ctx.arc(center.x, center.y, r, 0, Math.PI * 2); ctx.fillStyle = grad; ctx.fill();
  ctx.strokeStyle = 'rgba(0,229,255,.7)'; ctx.lineWidth = 1.5; ctx.stroke(); ctx.restore();
  // Latitude and longitude graticule, clipped to the visible globe.
  ctx.save(); ctx.beginPath(); ctx.arc(center.x, center.y, r - 1, 0, Math.PI * 2); ctx.clip();
  for (let lat = -60; lat <= 60; lat += 30) {
    let prev = null;
    for (let lon = -180; lon <= 180; lon += 4) {
      const p3 = spherePoint(lat, lon, r), p = project(...p3);
      if (p3[2] > -5) { if (prev) line(ctx, prev, p, 'rgba(112,218,238,.23)', .7); prev = p; } else prev = null;
    }
  }
  for (let lon = -150; lon <= 180; lon += 30) {
    let prev = null;
    for (let lat = -88; lat <= 88; lat += 3) {
      const p3 = spherePoint(lat, lon, r), p = project(...p3);
      if (p3[2] > -5) { if (prev) line(ctx, prev, p, 'rgba(112,218,238,.23)', .7); prev = p; } else prev = null;
    }
  }
  // Simplified continent silhouettes: schematic outlines, not geographic boundary data.
  const landShapes = [
    [[68,-140],[58,-110],[48,-92],[28,-80],[10,-78],[8,-58],[28,-48],[48,-60],[62,-82],[72,-110]],
    [[12,-78],[-5,-75],[-25,-68],[-55,-70],[-42,-52],[-15,-38],[5,-48]],
    [[70,-10],[58,12],[42,30],[34,48],[8,42],[-5,18],[8,-8],[35,-20],[55,-15]],
    [[55,38],[60,80],[50,115],[35,135],[10,120],[5,88],[25,60],[40,40]],
    [[-12,112],[-22,132],[-38,148],[-28,155],[-12,140]],
  ];
  landShapes.forEach(shape => {
    ctx.beginPath(); let started = false;
    shape.forEach(([lat, lon]) => { const p3 = spherePoint(lat, lon, r + 1), p = project(...p3); if (p3[2] > 0) { if (!started) { ctx.moveTo(p.x, p.y); started = true; } else ctx.lineTo(p.x, p.y); } });
    if (started) { ctx.closePath(); ctx.fillStyle = 'rgba(63,169,119,.72)'; ctx.fill(); ctx.strokeStyle = 'rgba(128,255,190,.35)'; ctx.stroke(); }
  });
  ctx.restore();
  RESOURCE_MARKERS.forEach(item => {
    const p3 = spherePoint(item.lat, item.lon, r + 3), p = project(...p3);
    if (p3[2] > 0) {
      glowDot(ctx, p, item.color, 5);
      if (labels) label(ctx, { x: p.x, y: p.y + 14 }, item.label);
      hotspots.push({ ...item, x: p.x, y: p.y, radius: 16 });
    }
  });
  ctx.fillStyle = 'rgba(0,229,255,.7)'; ctx.font = '11px Inter, sans-serif'; ctx.textAlign = 'center';
  ctx.fillText('SCHEMATIC RESOURCE GLOBE · NOT A MEASURED MAP', w / 2, h - 20);
}

function drawTree(ctx, project, x, z, scale, type = 0) {
  const base = project(x, -72, z), top = project(x, -72 - 100 * scale, z);
  const left = project(x - 30 * scale, -72 - 52 * scale, z), right = project(x + 30 * scale, -72 - 52 * scale, z);
  const midL = project(x - 24 * scale, -72 - 78 * scale, z), midR = project(x + 24 * scale, -72 - 78 * scale, z);
  const trunkL = project(x - 6 * scale, -72, z), trunkR = project(x + 6 * scale, -72, z);
  polygon(ctx, [trunkL, trunkR, project(x + 5 * scale, -72 - 48 * scale, z), project(x - 5 * scale, -72 - 48 * scale, z)], '#8c6041', '#c28a58');
  polygon(ctx, [left, right, top], type % 2 ? '#238e68' : '#2ba878', 'rgba(100,255,190,.55)');
  polygon(ctx, [midL, midR, project(x, -72 - 88 * scale, z)], type % 2 ? '#32b985' : '#39c88a', 'rgba(130,255,190,.55)');
}
function drawForest(ctx, project, w, h, labels, hotspots, scenario) {
  const cover = scenario.forest / 100;
  polygon(ctx, [project(-260, -72, -180), project(260, -72, -180), project(260, -72, 180), project(-260, -72, 180)], '#173f37', '#39ff88');
  // Soil section in front of the forest floor.
  polygon(ctx, [project(-255, -73, 175), project(255, -73, 175), project(255, -145, 175), project(-255, -145, 175)], '#67452f', '#bd8b5d');
  polygon(ctx, [project(-255, -100, 176), project(255, -100, 176), project(255, -145, 176), project(-255, -145, 176)], '#4d392d', '#a77a55');
  for (let i = 0; i < 8; i++) {
    const x = -210 + i * 60, z = -110 + (i % 3) * 75;
    if ((i / 8) < cover) drawTree(ctx, project, x, z, .75 + (i % 3) * .12, i);
  }
  // Sparse seedlings in restoration mode.
  if (cover > .55) for (let i = 0; i < 5; i++) drawTree(ctx, project, -180 + i * 85, 125, .35, i);
  const soil = project(0, -120, 180), canopy = project(0, 45, -80), floor = project(150, -68, 110);
  if (labels) { label(ctx, canopy, 'Canopy'); label(ctx, floor, 'Forest floor'); label(ctx, soil, 'Soil layers'); }
  hotspots.push({ id: 'canopy', label: 'Canopy', x: canopy.x, y: canopy.y, radius: 28 });
  hotspots.push({ id: 'forestfloor', label: 'Forest floor', x: floor.x, y: floor.y, radius: 26 });
  hotspots.push({ id: 'soil', label: 'Soil layers', x: soil.x, y: soil.y, radius: 28 });
  ctx.fillStyle = '#d9fff0'; ctx.font = '12px Inter, sans-serif'; ctx.textAlign = 'left';
  ctx.fillText('Tree density is illustrative; slider changes the teaching scenario only.', 18, h - 18);
}
function drawWater(ctx, project, w, h, labels, hotspots, step, playing, tick) {
  const land = [project(-270, 30, -120), project(-110, -40, -120), project(30, 20, -120), project(150, -10, -120), project(270, 40, -120), project(270, -95, -120), project(-270, -95, -120)];
  polygon(ctx, land, '#244c42', '#52b9a0');
  polygon(ctx, [project(-270, -96, -120), project(270, -96, -120), project(270, -125, 170), project(-270, -125, 170)], '#15517a', '#32c9ff');
  // mountain and cloud forms
  polygon(ctx, [project(-180, 25, -120), project(-110, 145, -120), project(-40, 15, -120)], '#577a83', '#9ac7d4');
  const cloud = project(75, 135, -70);
  ctx.fillStyle = '#d8f6ff'; [-25,-5,18].forEach((dx,i)=>{ctx.beginPath();ctx.arc(cloud.x+dx,cloud.y+(i===1?-10:0),18,0,Math.PI*2);ctx.fill();});
  const sun = project(-210, 175, -100); glowDot(ctx, sun, '#ffca68', 18);
  const points = [
    { id:'evaporation', label:'Evaporation', p:project(170, 10 + Math.sin(tick/500)*5, 80), target:project(145, 105, 35) },
    { id:'condensation', label:'Condensation', p:project(75, 145, -70), target:project(0, 180, -80) },
    { id:'precipitation', label:'Precipitation', p:project(75, 80, -70), target:project(60, 5, -65) },
    { id:'infiltration', label:'Infiltration', p:project(-30, -75, 100), target:project(-30, -120, 100) },
    { id:'runoff', label:'Surface runoff', p:project(-100, -5, -80), target:project(5, -25, -70) },
  ];
  points.forEach((item,i)=>{
    const active = i === step;
    line(ctx,item.p,item.target,active?'#39ff88':'#32c9ff',active?3.5:2,[6,5]);
    glowDot(ctx,item.p,active?'#39ff88':'#32c9ff',active?7:5);
    if(labels) label(ctx,item.p,item.label,active?'#baffd5':'#e8fbff');
    hotspots.push({id:item.id,label:item.label,x:item.p.x,y:item.p.y,radius:22});
  });
  // moving water droplets when the simulation is playing
  if (playing) { const p=project(170, 5 + (tick % 1500) / 1500 * 70, 80); glowDot(ctx,p,'#32c9ff',4); }
  const gw=project(170,-108,150); if(labels) label(ctx,gw,'Groundwater');
  hotspots.push({id:'infiltration',label:'Groundwater',x:gw.x,y:gw.y,radius:22});
  ctx.fillStyle='#d9f8ff';ctx.font='11px Inter,sans-serif';ctx.textAlign='center';ctx.fillText('Water pathways are conceptual, not to scale.',w/2,h-18);
}
function drawEnergy(ctx, project, w, h, labels, hotspots, tick, playing) {
  polygon(ctx,[project(-260,-78,-150),project(260,-78,-150),project(260,-78,160),project(-260,-78,160)],'#173e38','#39ff88');
  // solar panel
  const panel=[project(-210,5,-40),project(-90,5,-40),project(-90,70,45),project(-210,70,45)];
  polygon(ctx,panel,'#123f67','#32c9ff');
  for(let i=1;i<5;i++){const t=i/5;line(ctx,project(-210+120*t,5,-40),project(-210+120*t,70,45),'rgba(110,225,255,.7)',1);}
  for(let i=1;i<3;i++){const t=i/3;line(ctx,project(-210,5+65*t,-40+85*t),project(-90,5+65*t,-40+85*t),'rgba(110,225,255,.7)',1);}
  const sun=project(-185,160,-70);glowDot(ctx,sun,'#ffca68',17);
  // turbine mast and rotor
  const hub=project(70,105,-20), base=project(70,-75,-20);
  line(ctx,hub,base,'#d5e9ef',6); glowDot(ctx,hub,'#eafaff',7);
  const angle=(playing?tick/700:0)+.25;
  for(let i=0;i<3;i++){const a=angle+i*Math.PI*2/3;const end=project(70+Math.cos(a)*78,105+Math.sin(a)*78,-20);line(ctx,hub,end,'#a8e8f6',7);}
  // dam and water channel
  polygon(ctx,[project(140,30,90),project(245,30,90),project(245,-75,90),project(140,-75,90)],'#718c9d','#b5e9f7');
  polygon(ctx,[project(140,30,91),project(245,30,91),project(245,5,91),project(140,5,91)],'#147bb0','#32c9ff');
  const biomass=project(-10,-70,140);glowDot(ctx,biomass,'#39ff88',8);
  if(labels){label(ctx,project(-150,78,15),'Solar PV');label(ctx,hub,'Wind turbine');label(ctx,project(195,-15,100),'Hydropower');label(ctx,biomass,'Biomass');}
  hotspots.push({id:'solar',label:'Solar PV',x:project(-150,40,5).x,y:project(-150,40,5).y,radius:40});
  hotspots.push({id:'wind',label:'Wind turbine',x:hub.x,y:hub.y,radius:35});
  hotspots.push({id:'hydro',label:'Hydropower',x:project(195,-15,100).x,y:project(195,-15,100).y,radius:38});
  hotspots.push({id:'biomass',label:'Biomass',x:biomass.x,y:biomass.y,radius:25});
  ctx.fillStyle='#d9f8ff';ctx.font='11px Inter,sans-serif';ctx.textAlign='center';ctx.fillText('Energy models are schematic; no output or efficiency values are simulated.',w/2,h-18);
}
function drawBiodiversity(ctx, project, w, h, labels, hotspots, scenario) {
  const nodes=[
    {id:'producer',name:'Producers',p:[-165,70,0],color:'#39ff88'},
    {id:'herbivore',name:'Herbivores',p:[0,120,0],color:'#ffbd59'},
    {id:'predator',name:'Predators',p:[165,60,0],color:'#bd83ff'},
    {id:'decomposer',name:'Decomposers',p:[0,-105,30],color:'#32c9ff'},
    {id:'soil',name:'Nutrients',p:[-150,-100,-70],color:'#ff9f70'},
  ];
  const links=[[0,1],[1,2],[0,3],[1,3],[2,3],[3,4],[4,0],[0,2]];
  links.forEach(([a,b])=>line(ctx,project(...nodes[a].p),project(...nodes[b].p),'rgba(0,229,255,.48)',2,[5,5]));
  nodes.forEach(n=>{
    const p=project(...n.p);glowDot(ctx,p,n.color,scenario.habitat<40&&n.id!=='decomposer'?5:10);
    if(labels)label(ctx,{x:p.x,y:p.y+17},n.name);
    hotspots.push({id:n.id==='soil'?'soil':n.id,label:n.name,x:p.x,y:p.y,radius:28});
  });
  ctx.fillStyle='#d9f8ff';ctx.font='11px Inter,sans-serif';ctx.textAlign='center';ctx.fillText('Arrows indicate simplified feeding and nutrient relationships.',w/2,h-18);
}
function drawScene(ctx,w,h,lesson,view,labels,scenario,step,tick,playing) {
  const hotspots=[];
  ctx.clearRect(0,0,w,h);
  const bg=ctx.createLinearGradient(0,0,w,h);bg.addColorStop(0,'#071629');bg.addColorStop(1,'#0c2134');ctx.fillStyle=bg;ctx.fillRect(0,0,w,h);
  ctx.save();
  // Ambient radial illumination.
  const light=ctx.createRadialGradient(w*.5,h*.38,10,w*.5,h*.38,Math.max(w,h)*.7);light.addColorStop(0,'rgba(0,229,255,.11)');light.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=light;ctx.fillRect(0,0,w,h);
  const project=projectFactory(w,h,view.yaw+(playing?Math.sin(tick/1800)*.025:0),view.pitch,view.zoom);
  if(lesson==='earth')drawEarth(ctx,project,w,h,labels,hotspots);
  if(lesson==='forest')drawForest(ctx,project,w,h,labels,hotspots,scenario);
  if(lesson==='water')drawWater(ctx,project,w,h,labels,hotspots,step,playing,tick);
  if(lesson==='energy')drawEnergy(ctx,project,w,h,labels,hotspots,tick,playing);
  if(lesson==='biodiversity')drawBiodiversity(ctx,project,w,h,labels,hotspots,scenario);
  if(lesson==='scenarios'){
    drawForest(ctx,project,w,h,labels,hotspots,scenario);
    const rows=[['Forest cover',scenario.forest,'#39ff88'],['Groundwater pressure',scenario.groundwater,'#32c9ff'],['Habitat connectivity',scenario.habitat,'#bd83ff'],['Renewable energy share',scenario.renewables,'#ffbd59']];
    const bx=w*.58,by=42,bw=Math.min(190,w*.32);
    ctx.fillStyle='rgba(4,13,28,.78)';ctx.strokeStyle='rgba(0,229,255,.35)';ctx.beginPath();ctx.roundRect(bx-12,by-18,bw+24,rows.length*38+22,12);ctx.fill();ctx.stroke();
    rows.forEach(([name,value,color],i)=>{const y=by+i*38;ctx.font='10px Inter,sans-serif';ctx.textAlign='left';ctx.fillStyle='#e8fbff';ctx.fillText(name,bx,y);ctx.fillStyle='rgba(255,255,255,.16)';ctx.fillRect(bx,y+7,bw,5);ctx.fillStyle=color;ctx.fillRect(bx,y+7,bw*value/100,5);ctx.textAlign='right';ctx.fillStyle=color;ctx.fillText(value+'%',bx+bw,y);});
    ctx.fillStyle='#e8fbff';ctx.font='11px Inter,sans-serif';ctx.textAlign='center';ctx.fillText('Conceptual scenario indicators · not measured outcomes',w/2,h-18);
  }
  ctx.restore();
  return hotspots;
}

export default function EnvironmentalScienceLab() {
  const { visualLab = {}, markLabExplored, completeLabLesson, saveLabScenario, notify } = useStudy();
  const [active,setActive]=useState('earth');
  const [view,setView]=useState({yaw:-.25,pitch:-.12,zoom:1});
  const [labels,setLabels]=useState(true);
  const [playing,setPlaying]=useState(false);
  const [step,setStep]=useState(0);
  const [selected,setSelected]=useState(null);
  const [scenario,setScenario]=useState({forest:72,groundwater:55,habitat:78,renewables:42});
  const [attempts,setAttempts]=useState(0);
  const canvasRef=useRef(null),frameRef=useRef(null),hotspotsRef=useRef([]),dragRef=useRef(null),tickRef=useRef(0),stageRef=useRef(null);
  const lesson=LESSONS.find(x=>x.id===active)||LESSONS[0];
  const explored=visualLab.explored||{},completed=visualLab.completed||{};
  const selectedInfo=selected ? HOTSPOT_INFO[selected.id] || selected.detail : null;
  const resetCamera=useCallback(()=>setView({yaw:-.25,pitch:-.12,zoom:1}),[]);
  useEffect(()=>{markLabExplored?.(active);setSelected(null);setStep(0);setPlaying(false);},[active]);
  useEffect(()=>{
    const canvas=canvasRef.current;if(!canvas)return;
    const ctx=canvas.getContext('2d');if(!ctx)return;
    let width=0,height=0,raf=0,alive=true;
    const render=()=>{
      if(!alive)return;
      const rect=canvas.getBoundingClientRect(),dpr=Math.min(window.devicePixelRatio||1,1.75);
      const nw=Math.max(1,Math.floor(rect.width*dpr)),nh=Math.max(1,Math.floor(rect.height*dpr));
      if(canvas.width!==nw||canvas.height!==nh){canvas.width=nw;canvas.height=nh;}
      width=rect.width;height=rect.height;ctx.setTransform(dpr,0,0,dpr,0,0);
      tickRef.current=playing?performance.now():tickRef.current;
      hotspotsRef.current=drawScene(ctx,width,height,active,view,labels,scenario,step,tickRef.current,playing);
      if(playing)raf=requestAnimationFrame(render);
    };
    render();
    const observer=new ResizeObserver(()=>render());observer.observe(canvas);
    return()=>{alive=false;cancelAnimationFrame(raf);observer.disconnect();};
  },[active,view,labels,scenario,step,playing]);
  useEffect(()=>{const onKey=e=>{if(e.key==='Escape'&&document.fullscreenElement)document.exitFullscreen?.();};document.addEventListener('keydown',onKey);return()=>document.removeEventListener('keydown',onKey);},[]);
  const chooseHotspot=(e)=>{
    const rect=canvasRef.current.getBoundingClientRect(),x=e.clientX-rect.left,y=e.clientY-rect.top;
    const found=hotspotsRef.current.map(h=>({...h,d:Math.hypot(h.x-x,h.y-y)})).filter(h=>h.d<h.radius+8).sort((a,b)=>a.d-b.d)[0];
    if(found){setSelected(found);markLabExplored?.(active);}
  };
  const changeLesson=id=>{setActive(id);setView({yaw:-.25,pitch:-.12,zoom:1});};
  const updateScenario=(key,value)=>setScenario(s=>({...s,[key]:value}));
  const finishLesson=()=>{completeLabLesson?.(active);notify?.('3D lesson marked complete');};
  const runScenario=()=>{saveLabScenario?.({scenario:{...scenario},lesson:active,attempt:attempts+1});setAttempts(a=>a+1);notify?.('Scenario attempt saved');};
  const toggleFullscreen=async()=>{try{if(!document.fullscreenElement)await stageRef.current?.requestFullscreen?.();else await document.exitFullscreen?.();}catch{notify?.('Fullscreen is unavailable in this browser','warn');}};
  const completedCount=Object.keys(completed).filter(k=>completed[k]).length;
  const exploredCount=Object.keys(explored).filter(k=>explored[k]).length;
  const Icon=lesson.icon;
  const isScenario=active==='scenarios';
  const waterSteps=['Evaporation','Condensation','Precipitation','Infiltration','Surface runoff'];
  return <div className="mx-auto max-w-7xl px-4 py-7 sm:px-7 lg:px-8">
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div><p className="eyebrow">BCV755B · IMMERSIVE ENVIRONMENTAL SCIENCE</p><h1 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">3D Environmental Science Lab</h1><p className="mt-2 max-w-2xl text-sm text-mute">Explore scientific systems as interactive spatial models. Drag to orbit, scroll or use controls to zoom, and select highlighted components for explanations.</p></div>
      <div className="flex gap-2"><span className="chip"><Focus size={14}/> {exploredCount}/6 explored</span><span className="chip"><Activity size={14}/> {completedCount}/6 completed</span></div>
    </div>
    <div className="grid gap-5 xl:grid-cols-[250px_minmax(0,1fr)]">
      <aside className="card h-fit p-3">
        <p className="px-2 pb-2 pt-1 text-xs font-semibold uppercase tracking-wider text-mute">Laboratory modules</p>
        <div className="grid grid-cols-2 gap-2 xl:grid-cols-1">{LESSONS.map(item=>{const I=item.icon;return <button key={item.id} onClick={()=>changeLesson(item.id)} aria-pressed={active===item.id} className={`flex items-center gap-2 rounded-xl border px-3 py-3 text-left text-sm transition ${active===item.id?'border-brand/50 bg-brand/10 text-brand shadow-[0_0_18px_rgba(0,229,255,.09)]':'border-line bg-panel hover:bg-sunk'}`}><I size={17}/><span className="min-w-0 flex-1 leading-tight">{item.title}</span>{completed[item.id]&&<span className="text-brand" aria-label="Completed">✓</span>}</button>})}</div>
        <div className="mt-4 rounded-xl border border-line bg-sunk/70 p-3"><p className="text-xs font-semibold">Learning record</p><p className="mt-1 text-2xl font-bold tabular-nums">{exploredCount}<span className="ml-1 text-xs font-medium text-mute">lessons explored</span></p><p className="mt-1 text-xs text-mute">{completedCount} lessons completed · {visualLab.scenarioAttempts?.length||0} saved scenarios</p></div>
      </aside>
      <section className="min-w-0 space-y-4">
        <div className="card overflow-hidden p-3 sm:p-4">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2"><div><div className="flex items-center gap-2"><span className="grid h-9 w-9 place-items-center rounded-xl bg-brand/10 text-brand"><Icon size={19}/></span><div><h2 className="font-semibold">{lesson.title}</h2><p className="text-xs text-mute">{lesson.subtitle}</p></div></div></div><span className="chip">Interactive 3D canvas</span></div>
          <div ref={stageRef} className="relative overflow-hidden rounded-2xl border border-cyan-400/20 bg-[#071629]">
            <canvas ref={canvasRef} onClick={chooseHotspot} onPointerDown={e=>{if(e.button!==0)return;dragRef.current={x:e.clientX,y:e.clientY};e.currentTarget.setPointerCapture(e.pointerId);}} onPointerMove={e=>{if(!dragRef.current)return;const dx=e.clientX-dragRef.current.x,dy=e.clientY-dragRef.current.y;dragRef.current={x:e.clientX,y:e.clientY};setView(v=>({...v,yaw:v.yaw+dx*.006,pitch:clamp(v.pitch+dy*.005,-1.1,1.1)}));}} onPointerUp={e=>{dragRef.current=null;if(e.currentTarget.hasPointerCapture(e.pointerId))e.currentTarget.releasePointerCapture(e.pointerId);}} onPointerCancel={e=>{dragRef.current=null;if(e.currentTarget.hasPointerCapture(e.pointerId))e.currentTarget.releasePointerCapture(e.pointerId);}} onWheel={e=>setView(v=>({...v,zoom:clamp(v.zoom*(e.deltaY<0?1.08:.92),.65,1.8)}))} role="application" tabIndex={0} aria-label={lesson.title+' interactive 3D scientific model. Drag to rotate; use arrow keys to orbit and plus or minus to zoom.'} onKeyDown={e=>{if(e.key==='ArrowLeft')setView(v=>({...v,yaw:v.yaw-.12}));else if(e.key==='ArrowRight')setView(v=>({...v,yaw:v.yaw+.12}));else if(e.key==='ArrowUp')setView(v=>({...v,pitch:clamp(v.pitch-.1,-1.1,1.1)}));else if(e.key==='ArrowDown')setView(v=>({...v,pitch:clamp(v.pitch+.1,-1.1,1.1)}));else if(e.key==='+'||e.key==='=')setView(v=>({...v,zoom:clamp(v.zoom*1.12,.65,1.8)}));else if(e.key==='-')setView(v=>({...v,zoom:clamp(v.zoom*.88,.65,1.8)}));}} className="block h-[340px] w-full touch-none sm:h-[440px] lg:h-[500px]" />
            <div className="absolute left-3 top-3 flex flex-wrap gap-1.5"><span className="rounded-lg border border-cyan-300/20 bg-slate-950/75 px-2 py-1 text-[10px] font-semibold tracking-wider text-cyan-100">ENVIRONMENTAL SYSTEMS LAB</span>{playing&&<span className="rounded-lg bg-emerald-400/15 px-2 py-1 text-[10px] font-semibold text-emerald-200">SIMULATION RUNNING</span>}</div>
            <div className="absolute bottom-3 left-3 right-3 flex flex-wrap items-center justify-between gap-2"><span className="rounded-lg bg-slate-950/75 px-2 py-1 text-[10px] text-slate-200">Drag to orbit · Scroll to zoom · Tap markers</span><div className="flex gap-1.5"><button className="lab-control" onClick={()=>setView(v=>({...v,yaw:v.yaw-.16}))} aria-label="Rotate left">‹</button><button className="lab-control" onClick={()=>setView(v=>({...v,yaw:v.yaw+.16}))} aria-label="Rotate right">›</button><button className="lab-control" onClick={()=>setView(v=>({...v,zoom:clamp(v.zoom*.85,.65,1.8)}))} aria-label="Zoom out"><ZoomOut size={16}/></button><button className="lab-control" onClick={()=>setView(v=>({...v,zoom:clamp(v.zoom*1.15,.65,1.8)}))} aria-label="Zoom in"><ZoomIn size={16}/></button><button className="lab-control" onClick={resetCamera} aria-label="Reset camera"><RotateCcw size={16}/></button><button className="lab-control" onClick={()=>setLabels(v=>!v)} aria-pressed={labels} aria-label={labels?'Hide labels':'Show labels'}>{labels?<Eye size={16}/>:<EyeOff size={16}/>}</button><button className="lab-control" onClick={toggleFullscreen} aria-label="Toggle fullscreen"><Maximize2 size={16}/></button></div></div>
          </div>
          <div className="mt-3 flex flex-wrap items-center justify-between gap-2"><div className="flex gap-2"><button className="btn-primary" onClick={()=>setPlaying(v=>!v)}>{playing?<Pause size={16}/>:<Play size={16}/>} {playing?'Pause':'Play'} model</button><button className="btn-ghost" onClick={()=>{setPlaying(false);setStep(0);resetCamera();}}><RotateCcw size={16}/> Reset</button></div><button className="btn-ghost" onClick={finishLesson}>Mark lesson complete <ChevronRight size={16}/></button></div>
        </div>
        {active==='water'&&<div className="card p-4"><div className="flex flex-wrap items-center justify-between gap-2"><h3 className="font-semibold">Water-cycle learning sequence</h3><span className="chip">Stage {step+1} of 5</span></div><div className="mt-3 flex flex-wrap gap-2">{waterSteps.map((name,i)=><button key={name} onClick={()=>setStep(i)} aria-pressed={step===i} className={`rounded-xl border px-3 py-2 text-xs font-semibold ${step===i?'border-brand bg-brand/10 text-brand':'border-line bg-panel text-mute hover:bg-sunk'}`}>{i+1}. {name}</button>)}</div><div className="mt-3 flex items-center justify-between gap-2"><p className="text-sm text-mute">{lesson.concepts[step]}</p><div className="flex gap-2"><button className="btn-ghost !px-3" onClick={()=>setStep(s=>Math.max(0,s-1))}><ChevronLeft size={16}/>Previous</button><button className="btn-ghost !px-3" onClick={()=>setStep(s=>(s+1)%5)}>Next<ChevronRight size={16}/></button></div></div></div>}
        {isScenario&&<div className="card p-4"><div className="flex flex-wrap items-center justify-between gap-2"><div><h3 className="font-semibold">Scenario parameter controls</h3><p className="mt-1 text-xs text-mute">Qualitative, illustrative controls — not measured predictions.</p></div><button className="btn-primary" onClick={runScenario}>Save scenario attempt</button></div><div className="mt-4 grid gap-4 sm:grid-cols-2">{[['forest','Forest cover illustration'],['groundwater','Groundwater extraction pressure'],['habitat','Habitat connectivity'],['renewables','Renewable energy adoption']].map(([key,name])=><label key={key} className="block"><span className="flex justify-between text-sm font-medium"><span>{name}</span><span className="tabular-nums text-brand">{scenario[key]}%</span></span><input className="mt-2 w-full accent-cyan-400" type="range" min="0" max="100" value={scenario[key]} onChange={e=>updateScenario(key,Number(e.target.value))}/></label>)}</div><p className="mt-3 text-xs text-mute">Changing these controls changes only the conceptual scene and saves your chosen settings as a practice attempt; it does not calculate real-world ecological forecasts.</p></div>}
        <div className="grid gap-4 lg:grid-cols-[1.05fr_.95fr]">
          <article className="card p-5"><p className="eyebrow">SELECTED SYSTEM</p><h3 className="mt-1 text-lg font-semibold">{selected?.label||lesson.title}</h3><p className="mt-2 text-sm leading-6 text-mute">{selectedInfo||lesson.explanation}</p>{selected&&<button className="mt-3 text-xs font-semibold text-brand hover:underline" onClick={()=>setSelected(null)}>Clear selection</button>}<div className="mt-4 flex flex-wrap gap-2">{lesson.concepts.map((concept,i)=>{const id=CONCEPT_IDS[active]?.[i];return <button key={concept} type="button" className={"chip hover:border-brand hover:text-brand "+(selected?.id===id?'border-brand text-brand':'')} aria-pressed={selected?.id===id} onClick={()=>setSelected({id,label:concept})}>{i+1}. {concept}</button>;})}</div></article>
          <article className="card p-5"><p className="eyebrow">LEARNING OBJECTIVES</p><h3 className="mt-1 text-lg font-semibold">What to understand</h3><ul className="mt-3 space-y-2 text-sm text-mute">{lesson.concepts.map((c,i)=><li key={c} className="flex gap-2"><span className="mt-0.5 text-brand">✦</span><span>{c}</span></li>)}</ul><div className="mt-4 rounded-xl border border-brand/20 bg-brand/5 p-3 text-xs leading-5 text-mute"><CircleHelp size={14} className="mb-1 text-brand"/>Educational models are simplified. They do not represent measured geographic distributions, calibrated physical models or numerical environmental forecasts.</div></article>
        </div>
      </section>
    </div>
  </div>;
}

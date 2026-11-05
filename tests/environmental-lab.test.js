import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const read = (p) => fs.readFileSync(new URL('../' + p, import.meta.url), 'utf8');
const lab = read('src/components/EnvironmentalScienceLab.jsx');
const app = read('src/App.jsx');
const shell = read('src/components/Shell.jsx');
const dashboard = read('src/pages/Dashboard.jsx');
const store = read('src/lib/study.jsx');

test('environmental science lab is lazy-routed and linked from navigation and dashboard', () => {
  assert.match(app, /lazy\(\(\) => import\('\.\/components\/EnvironmentalScienceLab'\)\)/);
  assert.match(app, /path === '\/environment-lab'/);
  assert.match(shell, /to: '\/environment-lab'.*3D Science Lab/);
  assert.match(dashboard, /Explore the 3D Environmental Science Lab/);
});

test('lab includes all six syllabus-aligned learning environments', () => {
  for (const id of ['earth','forest','water','energy','biodiversity','scenarios']) {
    assert.ok(lab.includes("id: '" + id + "'") || lab.includes("id:'" + id + "'"));
    assert.ok(lab.includes("lesson==='" + id + "'") || id === 'scenarios' && lab.includes("lesson==='scenarios'"));
  }
  for (const concept of ['Evaporation','Condensation','Precipitation','Infiltration','Surface runoff','Producers','Decomposers','Hydropower','Biomass']) {
    assert.ok(lab.includes(concept), 'missing concept: ' + concept);
  }
});

test('3D canvas interaction exposes orbit, zoom, reset, selection and fullscreen controls', () => {
  for (const term of ['projectFactory','spherePoint','setPointerCapture','setView','chooseHotspot','requestFullscreen','Rotate left','Rotate right','Zoom in','Zoom out','Reset camera','Toggle fullscreen']) {
    assert.ok(lab.includes(term), 'missing interaction: ' + term);
  }
  assert.match(lab, /canvasRef/);
  assert.match(lab, /hotspotsRef/);
  assert.match(lab, /CONCEPT_IDS/);
  assert.match(lab, /aria-pressed=\{selected\?\.id===id\}/);
});

test('simulation and scenario controls are explicitly qualitative rather than predictive', () => {
  assert.match(lab, /setPlaying/);
  assert.match(lab, /waterSteps/);
  assert.match(lab, /groundwater/);
  assert.match(lab, /habitat/);
  assert.match(lab, /not measured predictions|not measured outcomes|not a measured map/);
});

test('lesson exploration, completion and scenario attempts persist in existing study storage', () => {
  assert.match(store, /const KEY = 'vtu-examprep-v1'/);
  assert.match(store, /visualLab: \{ explored: \{\}, completed: \{\}, scenarioAttempts: \[\] \}/);
  assert.match(store, /markLabExplored/);
  assert.match(store, /completeLabLesson/);
  assert.match(store, /saveLabScenario/);
  assert.match(lab, /markLabExplored/);
  assert.match(lab, /completeLabLesson/);
  assert.match(lab, /saveLabScenario/);
});

test('lab uses a lazy 2D canvas projection renderer and does not add a WebGL dependency', () => {
  const pkg = JSON.parse(read('package.json'));
  assert.ok(!pkg.dependencies.three);
  assert.match(lab, /getContext\('2d'\)/);
  assert.match(lab, /ResizeObserver/);
  assert.match(lab, /cancelAnimationFrame/);
});

import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const read = (path) => fs.readFileSync(new URL('../' + path, import.meta.url), 'utf8');

test('BCV755B academic catalogue includes all five official syllabus modules', () => {
  const source = read('src/data/cnrAcademic.js');
  for (const title of ['Land','Water','Air','Biodiversity','Global warming']) assert.ok(source.includes("title: '" + title + "'"), 'missing official module title: ' + title);
  assert.match(source, /COURSE_OBJECTIVES/);
  assert.match(source, /COURSE_OUTCOMES/);
  assert.match(source, /SYLLABUS_SOURCE/);
  assert.match(source, /vtu\.ac\.in\/pdf\/2022_3to8\/4civsyll\.pdf/);
});

test('module resources, question-bank answers and diagrams are derived from repository data', () => {
  const source = read('src/data/cnrAcademic.js');
  assert.match(source, /DRIVE_RESOURCES\.filter/);
  assert.match(source, /QUESTIONS\.filter/);
  assert.match(source, /collectDiagrams/);
  assert.match(source, /getModuleCatalogStats/);
});

test('welcome page distinguishes official outcomes and supplementary resource status', () => {
  const source = read('src/pages/NexusWelcome.jsx');
  assert.match(source, /Course outcomes \(official syllabus\)/);
  assert.match(source, /not an official BCV755B VTU paper/);
  assert.match(source, /does not call an external AI service/);
  assert.match(source, /Whole-course paper/);
  assert.match(source, /No PDF page or figure number is inferred/);
});

test('module explorer exposes searchable topics, filters and working existing destinations', () => {
  const source = read('src/pages/NexusWelcome.jsx');
  for (const filter of ['notes','pdfs','questions','diagrams','papers','practice']) assert.ok(source.includes("id: '" + filter + "'"), 'missing filter: ' + filter);
  assert.match(source, /Search modules, topics, questions and resources/);
  assert.match(source, /#\/cnr-notes\/module/);
  assert.match(source, /#\/q\//);
});

test('premium system intro mounts the app underneath one overlay and uses real readiness', () => {
  const source = read('src/components/StartupExperience.jsx');
  const css = read('src/components/CinematicIntro.css');
  assert.match(source, /const \[visible, setVisible\] = useState\(true\)/);
  assert.match(source, /<StartupErrorBoundary key=\{attempt\}/);
  assert.match(source, /\{children\}/);
  assert.doesNotMatch(source, /localStorage|SEEN_KEY|PRESENTATION_TICK_MS/);
  assert.match(source, /setAppReady\(true\)/);
  assert.match(source, /progressRef\.current = 100/);
  assert.match(source, /appReadyRef\.current && performance\.now\(\) - startedAt >= STARTUP_MIN_DURATION_MS/);
  assert.match(source, /prefers-reduced-motion: reduce/);
  assert.doesNotMatch(source, /cinematic-intro-skip|SkipForward/);
  assert.match(source, /ci-structure-art/);
  assert.match(source, /aria-valuenow=\{progress\}/);
  assert.match(css, /prefers-reduced-motion/);
  assert.match(css, /ci-structure-stage/);
});

test('all five syllabus modules have distinct real-photo hero and card imagery', () => {
  const photos = read('src/components/ModulePhotography.jsx');
  const page = read('src/pages/NexusWelcome.jsx');
  const styles = read('src/styles/module-photos.css');
  const welcomeStyles = read('src/pages/NexusWelcome.css');
  for (const moduleNumber of [1, 2, 3, 4, 5]) {
    assert.match(photos, new RegExp('^\\s*' + moduleNumber + ': \\{', 'm'), 'missing photo for module ' + moduleNumber);
  }
  assert.equal(photos.split('images.unsplash.com/photo-').length - 1, 5, 'each module must use its own Unsplash photograph');
  assert.equal((photos.match(/alt: '/g) || []).length, 5, 'each photograph needs descriptive alternative text');
  assert.match(page, /<ModulePhotography moduleNumber=\{module\.number\} variant="tile" \/>/);
  assert.match(page, /<ModulePhotography moduleNumber=\{activeModule\.number\} variant="hero" \/>/);
  assert.match(welcomeStyles, /cnr-module-detail-visual-grid/);
  assert.match(styles, /@media \(max-width: 760px\)/);
  assert.match(styles, /prefers-reduced-motion: reduce/);
});

test('Resource Vault provides photographic navigation for all five modules', () => {
  const vault = read('src/pages/ResourceVault.jsx');
  const styles = read('src/pages/ResourceVault.css');
  assert.match(vault, /CNR_MODULES\.map/);
  assert.match(vault, /ModulePhotography moduleNumber=\{module\.number\} variant="tile"/);
  assert.match(vault, /setModuleFilter\(String\(module\.number\)\)/);
  assert.match(styles, /rv-module-gallery-grid/);
  assert.match(styles, /@media \(max-width: 600px\)/);
  const shared = read('src/styles/module-photos.css');
  const appStyles = read('src/main.jsx');
  assert.match(appStyles, /styles\/module-photos\.css/);
  assert.match(shared, /\.cnr-module-photo \{/);
  assert.match(shared, /\.cnr-module-photo img \{/);
  assert.match(shared, /position: absolute/);
  assert.match(shared, /\.cnr-module-photo figcaption \{/);
  assert.match(shared, /text-overflow: ellipsis/);
  assert.match(shared, /prefers-reduced-motion/);
});

test('welcome hero uses CNR-specific student learning and conservation taglines', () => {
  const source = read('src/pages/NexusWelcome.jsx');
  assert.match(source, /YOUR <span className="text-brand">CNR LEARNING SPACE<\/span>/);
  assert.match(source, /Everything you need to learn, prepare &amp; excel/);
  assert.match(source, /A dedicated academic destination for BCV755B/);
  assert.match(source, /Understand nature\. Prepare with purpose\. Conserve for tomorrow\./);
  assert.match(source, /Learn today\. Conserve for tomorrow\./);
});

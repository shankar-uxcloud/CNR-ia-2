import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const read = (path) => fs.readFileSync(new URL('../' + path, import.meta.url), 'utf8');

test('EcoWeb Architect is lazy-routed and available in desktop and mobile navigation', () => {
  const app = read('src/App.jsx');
  const shell = read('src/components/Shell.jsx');
  assert.match(app, /import\('\.\/pages\/EcoWebArchitect'\)/);
  assert.match(app, /path === '\/ecoweb'/);
  assert.match(shell, /EcoWeb Architect/);
});

test('EcoWeb Architect teaches three distinct food webs and tests trophic cascades', () => {
  const page = read('src/pages/EcoWebArchitect.jsx');
  for (const habitat of ['Western Ghats rainforest', 'Freshwater wetland', 'Deccan grassland']) assert.ok(page.includes(habitat));
  assert.match(page, /Construct the food web/);
  assert.match(page, /Energy flows to the consumer/);
  assert.match(page, /Simulate species loss/);
  assert.match(page, /Learning model: simplified relationships/);
  assert.match(page, /aria-live="polite"/);
});

test('food-web scoring is derived from verified links and reset is available', () => {
  const page = read('src/pages/EcoWebArchitect.jsx');
  assert.match(page, /habitat\.links\.every/);
  assert.match(page, /built\.length \/ habitat\.links\.length/);
  assert.match(page, /setDisturbed\(true\)/);
  assert.match(page, /reset\(\)/);
});

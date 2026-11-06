import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const read = (path) => fs.readFileSync(new URL('../' + path, import.meta.url), 'utf8');

test('CNR ExamPrep is configured as an installable standalone PWA', () => {
  const html = read('index.html');
  const manifest = JSON.parse(read('public/manifest.webmanifest'));
  assert.match(html, /rel="manifest" href="\.\/manifest\.webmanifest"/);
  assert.equal(manifest.display, 'standalone');
  assert.equal(manifest.short_name, 'CNR ExamPrep');
  assert.ok(manifest.icons.some((icon) => icon.src === './pwa-icon.svg' && icon.purpose.includes('maskable')));
});

test('production build emits an asset list for complete offline precaching', () => {
  const config = read('vite.config.js');
  assert.match(config, /generateBundle/);
  assert.match(config, /precache-manifest\.json/);
  assert.match(config, /Object\.keys\(bundle\)/);
  assert.match(config, /base: '\.\/'/);
});

test('service worker precaches the built app, serves navigation offline and removes old caches', () => {
  const worker = read('src/pwa/sw.js');
  assert.match(worker, /cache\.addAll\(urls\)/);
  assert.match(worker, /request\.mode === 'navigate'/);
  assert.match(worker, /cache\.match\(new URL\('index\.html'/);
  assert.match(worker, /caches\.delete\(name\)/);
  assert.match(worker, /self\.clients\.claim\(\)/);
});

test('service worker registration respects the configured GitHub Pages base path', () => {
  const main = read('src/main.jsx');
  assert.match(main, /navigator\.serviceWorker\.register/);
  assert.match(main, /import\.meta\.env\.BASE_URL/);
  assert.match(main, /scope: import\.meta\.env\.BASE_URL/);
  assert.match(main, /import\.meta\.env\.PROD/);
});

test('PWA connection and install UI handles browser lifecycle events accessibly', () => {
  const component = read('src/components/PWAStatus.jsx');
  assert.match(component, /beforeinstallprompt/);
  assert.match(component, /appinstalled/);
  assert.match(component, /addEventListener\('offline'/);
  assert.match(component, /addEventListener\('online'/);
  assert.match(component, /aria-live="polite"/);
  assert.match(component, /saved study progress remains on this device/i);
});

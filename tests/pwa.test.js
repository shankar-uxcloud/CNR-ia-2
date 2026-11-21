import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const read = (path) => fs.readFileSync(new URL('../' + path, import.meta.url), 'utf8');

test('CNR-IA-2 is configured as an installable standalone PWA', () => {
  const html = read('index.html');
  const manifest = JSON.parse(read('public/manifest.webmanifest'));
  assert.match(html, /rel="manifest" href="\\.\\/manifest\\.webmanifest"/);
  assert.equal(manifest.display, 'standalone');
  assert.equal(manifest.short_name, 'CNR-IA-2');
  assert.ok(manifest.icons.some((icon) => icon.src === './pwa-icon.svg' && icon.purpose.includes('maskable')));
});

test('production build emits a precache manifest and build-versioned service worker', () => {
  const config = read('vite.config.js');
  const worker = read('src/pwa/sw.js');
  assert.match(config, /generateBundle/);
  assert.match(config, /precache-manifest\\.json/);
  assert.match(config, /Object\\.keys\\(bundle\\)/);
  assert.match(config, /fileName: 'sw\\.js'/);
  assert.match(config, /__BUILD_ID__/);
  assert.match(worker, /__BUILD_ID__/);
  assert.match(config, /base: '\\.\\/'/);
});

test('service worker precaches the built app, serves navigation offline and removes old caches', () => {
  const worker = read('src/pwa/sw.js');
  assert.match(worker, /cache\\.addAll\\(urls\\)/);
  assert.match(worker, /request\\.mode === 'navigate'/);
  assert.match(worker, /cache\\.match\\(new URL\\('index\\.html'/);
  assert.match(worker, /caches\\.delete\\(name\\)/);
  assert.match(worker, /self\\.clients\\.claim\\(\\)/);
});

test('service worker registration respects the configured GitHub Pages base path', () => {
  const main = read('src/main.jsx');
  assert.match(main, /navigator\\.serviceWorker\\.register/);
  assert.match(main, /import\\.meta\\.env\\.BASE_URL/);
  assert.match(main, /scope: import\\.meta\\.env\\.BASE_URL/);
  assert.match(main, /import\\.meta\\.env\\.PROD/);
});

test('PWAStatus preserves install lifecycle without owning connectivity notifications', () => {
  const component = read('src/components/PWAStatus.jsx');
  assert.match(component, /display-mode: standalone/);
  assert.match(component, /Add to Home Screen/);
  assert.match(component, /beforeinstallprompt/);
  assert.match(component, /appinstalled/);
  assert.doesNotMatch(component, /addEventListener\\('offline'/);
  assert.doesNotMatch(component, /addEventListener\\('online'/);
  assert.doesNotMatch(component, /You're offline/);
  assert.doesNotMatch(component, /You're back online!/);
});

test('ConnectivityToast owns accessible online and offline notifications', () => {
  const component = read('src/components/ConnectivityToast.jsx');
  assert.match(component, /addEventListener\\('offline'/);
  assert.match(component, /addEventListener\\('online'/);
  assert.match(component, /removeEventListener\\('offline'/);
  assert.match(component, /removeEventListener\\('online'/);
  assert.match(component, /aria-live="polite"/);
  assert.match(component, /You're offline/);
  assert.match(component, /You're back online!/);
  assert.match(component, /CONNECTIVITY_NOTICE_DURATION/);
  assert.match(component, /clearTimeout/);
  assert.match(component, /Dismiss connectivity notification/);
});

test('connectivity notification is mounted globally alongside the PWA install prompt', () => {
  const app = read('src/App.jsx');
  assert.match(app, /import ConnectivityToast from '.\\/components\\/ConnectivityToast'/);
  assert.match(app, /<PWAStatus \/>/);
  assert.match(app, /<ConnectivityToast \/>/);
});

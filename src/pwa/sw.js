const CACHE_PREFIX = 'cnr-examprep-';
const CACHE_NAME = CACHE_PREFIX + '__BUILD_ID__';
const CORE_FILES = ['.', 'index.html', 'manifest.webmanifest', 'pwa-icon.svg'];

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    const manifestUrl = new URL('precache-manifest.json', self.registration.scope);
    let builtFiles = [];
    try {
      const response = await fetch(manifestUrl, { cache: 'no-store' });
      if (response.ok) builtFiles = await response.json();
    } catch {
      // A core shell is still useful if the generated asset manifest is unavailable.
    }
    const urls = [...new Set([...CORE_FILES, ...builtFiles].map((file) => new URL(file, self.registration.scope).href))];
    await cache.addAll(urls);
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const names = await caches.keys();
    await Promise.all(names.filter((name) => name.startsWith(CACHE_PREFIX) && name !== CACHE_NAME).map((name) => caches.delete(name)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const response = await fetch(request);
        if (response.ok) {
          const cache = await caches.open(CACHE_NAME);
          cache.put(new URL('index.html', self.registration.scope).href, response.clone());
        }
        return response;
      } catch {
        const cache = await caches.open(CACHE_NAME);
        return (await cache.match(request)) || (await cache.match(new URL('index.html', self.registration.scope).href)) || Response.error();
      }
    })());
    return;
  }

  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    const cached = await cache.match(request);
    if (cached) return cached;
    try {
      const response = await fetch(request);
      if (response.ok && (response.type === 'basic' || response.type === 'default')) cache.put(request, response.clone());
      return response;
    } catch {
      return cached || Response.error();
    }
  })());
});

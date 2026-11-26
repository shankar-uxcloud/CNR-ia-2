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

  // Never cache authentication, API or callback traffic. Supabase normally uses
  // its own origin, but this guard also covers same-origin proxy deployments.
  const isAuthTraffic = /\\/(auth\\/v1|rest\\/v1|functions\\/v1)(\\/|$)/.test(url.pathname)
    || url.searchParams.has('code')
    || request.headers.has('authorization');
  if (isAuthTraffic) return;

  // HTML and executable assets must prefer the network so a deployment cannot
  // leave users running a stale application bundle from an older release.
  const isAppShell = request.mode === 'navigate';
  const isExecutableAsset = request.destination === 'script' || request.destination === 'style';

  if (isAppShell || isExecutableAsset) {
    event.respondWith((async () => {
      const cache = await caches.open(CACHE_NAME);
      try {
        const response = await fetch(request, { cache: 'no-store' });
        if (response.ok && (response.type === 'basic' || response.type === 'default')) {
          const cacheUrl = isAppShell
            ? new URL('index.html', self.registration.scope).href
            : request.url;
          await cache.put(cacheUrl, response.clone());
        }
        return response;
      } catch {
        return (await cache.match(request))
          || (isAppShell ? await cache.match(new URL('index.html', self.registration.scope).href) : null)
          || Response.error();
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
      if (response.ok && (response.type === 'basic' || response.type === 'default')) {
        await cache.put(request, response.clone());
      }
      return response;
    } catch {
      return cached || Response.error();
    }
  })());
});

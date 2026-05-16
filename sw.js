/* ============================================================
   SERVICE WORKER — sw.js  v4
   Network first with offline fallback.
   Always serves fresh content when online; falls back to
   cached version when the network is unavailable.
   ============================================================ */

var CACHE = 'codebook-v6';

var SHELL = [
  './',
  './app.js',
  './variables.css',
  './animations.css',
  './layout.css',
  './cover.css',
  './components.css',
  './panels.css',
  './overlays.css',
  './background.png',
];

self.addEventListener('install', function(e) {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE).then(function(cache) {
      return cache.addAll(SHELL.map(function(u) {
        return new Request(u, { cache: 'reload' });
      }));
    })
  );
});

self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(
        keys.filter(function(k) { return k !== CACHE; })
            .map(function(k) { return caches.delete(k); })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', function(e) {
  if (e.request.method !== 'GET') return;
  // Skip cross-origin requests (Google Fonts, etc.)
  if (!e.request.url.startsWith(self.location.origin)) return;

  e.respondWith(
    fetch(e.request)
      .then(function(res) {
        if (res.ok) {
          var clone = res.clone();
          caches.open(CACHE).then(function(c) { c.put(e.request, clone); });
        }
        return res;
      })
      .catch(function() {
        return caches.match(e.request);
      })
  );
});

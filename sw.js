/* ============================================================
   SERVICE WORKER — sw.js
   Must be served from the root of the site (same directory as
   index.html) for the scope to work correctly.
   ============================================================ */

var CACHE = 'codebook-v1';

var PRECACHE_URLS = [
  './',
  './index.html',
  './variables.css',
  './animations.css',
  './layout.css',
  './cover.css',
  './components.css',
  './panels.css',
  './overlays.css',
  './app.js'
];

// Install — cache all core assets
self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(CACHE).then(function(cache) {
      return cache.addAll(PRECACHE_URLS);
    })
  );
  self.skipWaiting();
});

// Activate — remove old caches
self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(
        keys
          .filter(function(key) { return key !== CACHE; })
          .map(function(key) { return caches.delete(key); })
      );
    })
  );
  self.clients.claim();
});

// Fetch — network first, fall back to cache
self.addEventListener('fetch', function(e) {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request)
      .then(function(response) {
        // Cache a clone of fresh responses
        caches.open(CACHE).then(function(cache) {
          cache.put(e.request, response.clone());
        });
        return response;
      })
      .catch(function() {
        // Offline fallback — serve from cache
        return caches.match(e.request);
      })
  );
});

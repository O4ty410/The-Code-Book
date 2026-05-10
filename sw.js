/* ============================================================
   SERVICE WORKER — sw.js
   Version 2 — forces cache clear on update
   ============================================================ */

var CACHE = 'codebook-v2';

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
  './app.js',
  './background.png'
];

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(CACHE).then(function(cache) {
      return cache.addAll(PRECACHE_URLS);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(
        keys.map(function(key) { return caches.delete(key); })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', function(e) {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request).then(function(response) {
      var responseClone = response.clone();
      caches.open(CACHE).then(function(cache) {
        cache.put(e.request, responseClone);
      });
      return response;
    }).catch(function() {
      return caches.match(e.request);
    })
  );
});

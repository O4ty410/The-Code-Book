/* ============================================================
   SERVICE WORKER — sw.js  v3
   Network first for HTML, cache first for assets
   ============================================================ */

var CACHE = 'codebook-v5';

self.addEventListener('install', function(e) {
  self.skipWaiting();
});

self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(keys.map(function(key) { return caches.delete(key); }));
    })
  );
  self.clients.claim();
});

// Network only — no caching at all
// This ensures users always get the latest version
self.addEventListener('fetch', function(e) {
  if (e.request.method !== 'GET') return;
  e.respondWith(fetch(e.request));
});

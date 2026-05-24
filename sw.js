/* ============================================================
   SERVICE WORKER — sw.js  v5
   Cache-first for shell assets; network-first for everything else.
   Includes streak reminder notification support.
   ============================================================ */

var CACHE = 'codebook-v19';

var SHELL = [
  './',
  './index.html',
  './manifest.json',
  './helpers.js',
  './canvas-bg.js',
  './srs.js',
  './challenges.js',
  './terms.js',
  './mobile.js',
  './app.js',
  './curriculum.js',
  './glitch.js',
  './chaos.js',
  './chaos-levels.js',
  './levels.js',
  './lore.js',
  './supabase-client.js',
  './variables.min.css',
  './animations.min.css',
  './layout.min.css',
  './components.min.css',
  './panels.min.css',
  './overlays.min.css',
  './mobile.min.css',
  './cover.min.css',
  './glitch.min.css',
];

self.addEventListener('install', function(e) {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE).then(function(cache) {
      return cache.addAll(SHELL.map(function(u) {
        return new Request(u, { cache: 'reload' });
      })).catch(function(err) {
        // Tolerate missing optional assets
        console.warn('[SW] addAll partial failure:', err);
      });
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
  if (!e.request.url.startsWith(self.location.origin)) return;

  var url = new URL(e.request.url);
  // Strip query string for cache matching — versioned URLs (?v=...) must still hit the cache
  var cacheKey = new Request(url.origin + url.pathname);
  var isShell = SHELL.some(function(s) {
    return url.pathname === s || url.pathname.endsWith(s.replace('./', '/'));
  });

  if (isShell) {
    // Cache-first for shell — match without query string
    e.respondWith(
      caches.match(cacheKey).then(function(cached) {
        var fetched = fetch(e.request).then(function(res) {
          if (res.ok) {
            caches.open(CACHE).then(function(c) { c.put(cacheKey, res.clone()); });
          }
          return res;
        });
        return cached || fetched;
      })
    );
  } else {
    // Network-first for dynamic content
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
  }
});

// ============================================================
// STREAK REMINDER NOTIFICATIONS
// ============================================================
self.addEventListener('message', function(e) {
  if (!e.data) return;

  if (e.data.type === 'SCHEDULE_REMINDER') {
    var delay = e.data.delayMs;
    if (!delay || delay <= 0) return;
    setTimeout(function() {
      // Check all clients — if any are focused, skip the notification
      self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(clients) {
        var anyFocused = clients.some(function(c) { return c.focused; });
        if (anyFocused) return;
        self.registration.showNotification('The Code Book', {
          body: e.data.body || 'Keep your streak alive — finish a section today.',
          tag: 'streak-reminder',
          renotify: false,
          data: { url: './' }
        });
      });
    }, delay);
  }

  if (e.data.type === 'CANCEL_REMINDER') {
    // Nothing to cancel for setTimeout-based reminders — handled by tag deduplication
  }
});

self.addEventListener('notificationclick', function(e) {
  e.notification.close();
  var target = (e.notification.data && e.notification.data.url) || './';
  e.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(clients) {
      for (var i = 0; i < clients.length; i++) {
        if ('focus' in clients[i]) { clients[i].focus(); return; }
      }
      if (self.clients.openWindow) return self.clients.openWindow(target);
    })
  );
});

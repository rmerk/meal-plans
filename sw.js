const CACHE_VERSION = 'v1.0.0';
const CACHE_NAME = `meal-plans-${CACHE_VERSION}`;

// Assets to cache immediately on install
const PRECACHE_ASSETS = [
  './',
  './index.html',
  './shopping-helper.html',
  './nutrition-dashboard.html',
  './recipe-scaler.html',
  './all-recipes.html',
  './rating-history.html',
  './meals/week1-meals.html',
  './meals/week2-meals.html',
  './meals/week3-meals.html',
  './meals/week1-breakfast.html',
  './meals/week2-breakfast.html',
  './meals/week3-breakfast.html',
  './meals/meal-utils.js',
  './meals/plans.js',
  './manifest.json',
  './dist/tailwind.css',
  './dark-mode.css',
  './landscape.css'
];

// CDN assets (External resources)
const CDN_ASSETS = [
  'https://fonts.googleapis.com',
  'https://fonts.gstatic.com',
  'https://cdn.jsdelivr.net'
];

// Install event - precache essential assets
self.addEventListener('install', (event) => {
  console.log('[ServiceWorker] Installing...');

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[ServiceWorker] Precaching assets');
        return cache.addAll(PRECACHE_ASSETS);
      })
      .then(() => {
        console.log('[ServiceWorker] Skip waiting');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('[ServiceWorker] Precache failed:', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[ServiceWorker] Activating...');

  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((cacheName) => {
              // Delete old cache versions
              return cacheName.startsWith('meal-plans-') && cacheName !== CACHE_NAME;
            })
            .map((cacheName) => {
              console.log('[ServiceWorker] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            })
        );
      })
      .then(() => {
        console.log('[ServiceWorker] Claiming clients');
        return self.clients.claim();
      })
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip chrome-extension and other non-http(s) requests
  if (!url.protocol.startsWith('http')) {
    return;
  }

  event.respondWith(
    caches.match(request)
      .then((cachedResponse) => {
        // Return cached response if found
        if (cachedResponse) {
          console.log('[ServiceWorker] Serving from cache:', url.pathname);

          // Update cache in background for HTML files (stale-while-revalidate)
          if (request.mode === 'navigate' || url.pathname.endsWith('.html')) {
            event.waitUntil(
              fetch(request)
                .then((freshResponse) => {
                  if (freshResponse && freshResponse.status === 200) {
                    return caches.open(CACHE_NAME).then((cache) => {
                      cache.put(request, freshResponse.clone());
                      return freshResponse;
                    });
                  }
                })
                .catch(() => {
                  // Network failed, continue using cached version
                })
            );
          }

          return cachedResponse;
        }

        // Not in cache, fetch from network
        console.log('[ServiceWorker] Fetching from network:', url.pathname);
        return fetch(request)
          .then((response) => {
            // Don't cache non-successful responses
            if (!response || response.status !== 200 || response.type === 'error') {
              return response;
            }

            // Clone the response
            const responseToCache = response.clone();

            // Cache the fetched response for future use
            caches.open(CACHE_NAME)
              .then((cache) => {
                // Only cache same-origin requests or CDN assets
                if (url.origin === location.origin || CDN_ASSETS.some(cdn => url.href.includes(cdn))) {
                  cache.put(request, responseToCache);
                }
              });

            return response;
          })
          .catch((error) => {
            console.error('[ServiceWorker] Fetch failed:', error);

            // Return offline page if available
            if (request.mode === 'navigate') {
              return caches.match('./index.html');
            }

            throw error;
          });
      })
  );
});

// Background sync for offline actions (future enhancement)
self.addEventListener('sync', (event) => {
  console.log('[ServiceWorker] Background sync:', event.tag);

  if (event.tag === 'sync-ratings') {
    event.waitUntil(
      // Sync ratings data when back online
      syncRatings()
    );
  }
});

// Push notifications (future enhancement)
self.addEventListener('push', (event) => {
  console.log('[ServiceWorker] Push notification received');

  const options = {
    body: event.data ? event.data.text() : 'Time to start meal prep!',
    icon: '/icon-192.png',
    badge: '/icon-192.png',
    vibrate: [200, 100, 200],
    tag: 'meal-reminder',
    requireInteraction: false
  };

  event.waitUntil(
    self.registration.showNotification('Meal Plans', options)
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  console.log('[ServiceWorker] Notification clicked');

  event.notification.close();

  event.waitUntil(
    clients.openWindow('./')
  );
});

// Helper function for syncing ratings (placeholder)
async function syncRatings() {
  // This would sync localStorage ratings to a backend if implemented
  console.log('[ServiceWorker] Syncing ratings...');
  return Promise.resolve();
}

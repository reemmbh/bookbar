const CACHE_NAME = 'book-bar-cache-v1';
const urlsToCache = [
  '/',
  '/home.html',
  '/style.css',
  '/home.css',
  '/images/book1.jpg',
  '/images/book2.jpg',
  '/images/book3.jpg',
  // Add other URLs to cache
];

// Install the service worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch cached resources
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

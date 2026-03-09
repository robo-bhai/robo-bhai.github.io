// Incrementing version forces the browser to update the PWA immediately
const CACHE_NAME = 'hadi88-ecosystem-v5';

// List of local assets to cache for offline native performance
const assets = [
  './',
  './index.html',
  './manifest.json',
  './a.jpg',
  'https://cdn.tailwindcss.com',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css'
];

// Install Event: Caches all essential files
self.addEventListener('install', (event) => {
  self.skipWaiting(); // Forces the waiting service worker to become the active service worker
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Hadi88: Caching system assets');
      return cache.addAll(assets);
    })
  );
});

// Activate Event: Cleans up old cache versions to prevent the "Copy URL" bug
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME)
            .map((key) => caches.delete(key))
      );
    })
  );
  return self.clients.claim(); // Immediately takes control of all open tabs
});

// Fetch Event: Serves assets from cache for instant "Native" loading
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
        

const CACHE_NAME = 'scientific-calculator-pwa-v1';
const URLS_TO_CACHE = [
  '/',
  'index.html',
  'impressum.html',
  'datenschutz.html',
  'https://cdn.tailwindcss.com',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap'
];

// Installation: Öffnet den Cache und fügt die Hauptdateien hinzu
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache geöffnet und Dateien werden hinzugefügt');
        return cache.addAll(URLS_TO_CACHE);
      })
  );
});

// Fetch: Reagiert auf Netzwerkanfragen
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Wenn die Datei im Cache gefunden wird, wird sie von dort geladen
        if (response) {
          return response;
        }
        // Ansonsten wird versucht, sie aus dem Netzwerk zu laden
        return fetch(event.request);
      })
  );
});

// Activate: Löscht alte Caches, wenn eine neue Version des Service Workers aktiv wird
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

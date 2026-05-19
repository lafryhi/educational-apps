const CACHE_NAME = "educational-apps-v6";
const APP_SHELL_FILES = [
  "/",
  "/index.html",
  "/css/style.css",
  "/js/app.js",
  "/manifest.json",
  "/apps/verbes/",
  "/apps/verbes/index.html",
  "/apps/verbes/css/style.css",
  "/apps/verbes/js/script.js",
  "/assets/images/founder.png",
  "/assets/images/hero-student-learning.png",
  "/assets/icons/app-verbes.svg",
  "/assets/icons/app-numbers.svg",
  "/assets/icons/app-letters.svg",
  "/assets/icons/app-math.svg",
  "/assets/icons/app-spelling.svg",
  "/assets/icons/app-reading.svg",
  "/assets/icons/icon-192.svg",
  "/assets/icons/icon-512.svg"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL_FILES)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames
          .filter((cacheName) => cacheName !== CACHE_NAME)
          .map((cacheName) => caches.delete(cacheName))
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") {
    return;
  }

  const requestUrl = new URL(event.request.url);

  if (requestUrl.origin !== self.location.origin) {
    return;
  }

  event.respondWith(
    caches.match(event.request, { ignoreSearch: true }).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(event.request)
        .then((networkResponse) => {
          if (!networkResponse || networkResponse.status !== 200) {
            return networkResponse;
          }

          const responseClone = networkResponse.clone();

          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });

          return networkResponse;
        })
        .catch(() => {
          if (event.request.mode === "navigate") {
            return caches.match("/index.html");
          }

          return Response.error();
        });
    })
  );
});

// // Service worker script (sw.js)
// const CACHE_NAME = 'my-cache';
// const CACHE_URLS = ['/images/network-error.png'];

// self.addEventListener('install', event => {
//   event.waitUntil(
//     caches.open(CACHE_NAME)
//       .then(cache => cache.addAll(CACHE_URLS))
//   );
// });

// self.addEventListener('fetch', event => {
//   const request = event.request;
  
//   event.respondWith(
//     caches.match(request)
//       .then(response => {
//         // Serve cached image if available
//         if (response) {
//           return response;
//         }
//         // Fallback to network if image is not cached
//         return fetch(request)
//           .then(networkResponse => {
//             // Cache the fetched image
//             caches.open(CACHE_NAME)
//               .then(cache => cache.put(request, networkResponse.clone()));
//             return networkResponse;
//           })
//           .catch(() => {
//             // Fallback to a default offline image
//             return caches.match('/images/network-error.png');
//           });
//       })
//   );
// });

// // service-worker.js

// const CACHE_NAME = 'my-app-cache';
// const urlsToCache = [
//   '/',
//   '/index.html',
//   '/styles.css',
//   '/static/js/main.js',
//   '../public/images/network-error.png'
// //   '/images/network-error.png' // Add your image path here
// ];

// self.addEventListener('install', (event) => {
//   // Perform install steps
//   event.waitUntil(
//     caches.open(CACHE_NAME)
//       .then((cache) => {
//         console.log('Opened cache');
//         return cache.addAll(urlsToCache);
//       })
//   );
// });

// self.addEventListener('fetch', (event) => {
//   event.respondWith(
//     caches.match(event.request)
//       .then((response) => {
//         // Cache hit - return response
//         if (response) {
//           return response;
//         }
//         return fetch(event.request);
//       })
//   );
// });

 /* 
self.addEventListener('install', function(event) {
	console.log('[ServiceWorker] install', event);
});

self.addEventListener('activate', function(event) {
	console.log('[ServiceWorker] activate', event);
});

self.addEventListener('fetch', function(event) {
	console.log('[ServiceWorker] fetch', event);
});
 */
 
// le worker box qui permet de lancer en off ligne
 
importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.1/workbox-sw.js');
if (workbox) {
console.log('Good! Workbox is loaded');
} else {
console.log('Bad! Workbox didnt load');
};
workbox.routing.registerRoute(
new RegExp('.*\.js'),              // tte pages js 
workbox.strategies.networkFirst()
);
workbox.precaching.precache([
  {
    url: '/index.html',       // tte pages html   une autre maniere d ecrire
    revision: '1',
  }, {
    url: '/service-worker.js',
    revision: '1',
  },
  {
    url: '/lib/.js',
    revision: '1',
  }
]);
workbox.precaching.addRoute();

workbox.routing.registerRoute(
// Cache CSS files
/.*\.css/,
// Use cache but update in the background ASAP
workbox.strategies.staleWhileRevalidate({
// Use a custom cache name
cacheName: 'css-cache',
})
);
workbox.routing.registerRoute(
// Cache CSS files
/.*\.html/,
// Use cache but update in the background ASAP
workbox.strategies.staleWhileRevalidate({
// Use a custom cache name
cacheName: 'html-cache',
})
);  
workbox.routing.registerRoute(
// Cache CSS files
/.*\.json/,
// Use cache but update in the background ASAP
workbox.strategies.staleWhileRevalidate({
// Use a custom cache name
cacheName: 'json-cache',
})
);    
    
    
workbox.routing.registerRoute(
// Cache image files
/.*\.(?:png|jpg|jpeg|svg|gif)/,
// Use the cache if it's available
workbox.strategies.cacheFirst({
// Use a custom cache name
cacheName: 'image-cache',
plugins: [
new workbox.expiration.Plugin({
// Cache only 20 images
maxEntries: 20,
// Cache for a maximum of a week
maxAgeSeconds: 7 * 24 * 60 * 60,
})
],
})
);
   
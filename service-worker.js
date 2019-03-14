self.addEventListener('install', function(event) {
	console.log('[ServiceWorker] install', event);
});

self.addEventListener('activate', function(event) {
	console.log('[ServiceWorker] activate', event);
});

self.addEventListener('fetch', function(event) {
	console.log('[ServiceWorker] fetch', event);
});
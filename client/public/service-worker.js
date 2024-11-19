console.log("Yo, wat up dawg?!");

const CACHE_NAME = 'noft-website-cache-v1';
const DATA_CACHE_NAME = 'noft-data-cache-v1';

const FILES_TO_CACHE = [
    '/',
    '/index.html',
    '/favicon.ico',
    '/manifest.json',
    '/service-worker.js',
];


/* Register the service worker the service worker */
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
        navigator.serviceWorker.register('/service-worker.js').then(function (registration) {
            // Registration was successful
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, function (err) {
            // registration failed :(
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}
/* Activate the service worker and remove old data from the cache
YOUR CODE HERE */

self.addEventListener('activate', function (evt) {
    evt.waitUntil(
        caches.keys().then(keyList => {
            return Promise.all(
                keyList.map(key => {
                    if (key !== CACHE_NAME && key !== DATA_CACHE_NAME) {
                        console.log('Removing old cache data', key);
                        return caches.delete(key);
                    }
                })
            );
        })
    );
    self.clients.claim();

});

/* Intercept fetch requests
YOUR CODE HERE */

self.addEventListener('fetch', function (evt) {

    evt.respondWith(
        fetch(evt.request).catch(function () {
            return caches.match(evt.request).then(function (response) {
                if (response) {
                    return response;
                } else if (evt.request.headers.get('accept').includes('text/html')) {
                    // return the cached home page for all requests for html pages
                    return caches.match('/');
                    /*
                    HAVE TO CHANGE THIS SO IT CAN CACHE THE IMAGES
                    
                    return caches.match('/post/');
                    return caches.match('/favorites/');
                    return caches.match('/about/');
                    return caches.match('/about/team/');
                    return caches.match('/commentForm/');
                    return caches.match('/commentList/'); */
                }
            });
        })
    );

});

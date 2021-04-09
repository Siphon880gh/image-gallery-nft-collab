console.log('Service worker say WUTUP DAWG');

self.addEventListener("install", event => {
    // The promise that skipWaiting() returns can be safely ignored.
    self.skipWaiting();

    event.waitUntil(
        caches.open("precache-v2").then(cache => {
            // Caching path does not have to be preceded with `public/` because starting the path with `/`
            // will start off the path from wherever Express delivered the HTML route
            const filesToCache = [
                "/",
                "/index.html",
                "favicon.ico",
                "nofttestlogo.png",
                "/manifest.json",
                "/service-worker.js"
                // TODO: need to add more files here to cache 
            ];

            cache.addAll(filesToCache);
        })
    );
});

self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});

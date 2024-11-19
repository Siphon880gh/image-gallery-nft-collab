self.addEventListener("install", event => {
    // The promise that skipWaiting() returns can be safely ignored.
    self.skipWaiting();

    event.waitUntil(
        caches.open("precache-v3").then(cache => {
            // Caching path does not have to be preceded with `public/` because starting the path with `/`
            // will start off the path from wherever Express delivered the HTML route
            const filesToCache = [
                "/",
                "/index.html",
                "favicon.ico",
                "nofttestlogo.png",
                "/manifest.json",
                "/service-worker.js"
            ];

            cache.addAll(filesToCache);
        })
    );
});

self.addEventListener("fetch", event => {
    // Cache only non-graphQL
    if(!event.request.url.includes("graphql")) {
        event.respondWith(
            caches.match(event.request).then(response => {
                return response || fetch(event.request);
            })
        );
    } else {
        event.respondWith(
            caches.match(event.request).then(response => {
                return fetch(event.request);
            })
        );
    }
});
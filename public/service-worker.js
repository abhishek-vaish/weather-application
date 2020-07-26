const CACHE_NAME = "version-1";
const urlToCache = ['index.html', 'offline.html'];

const self = this;

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then((cache) => {
            console.log("Opened Cache" , cache)
            return cache.addAll(urlToCache)
        })
    )
})

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
        .then(() => {
            return fetch(event.request)
                .catch(() => caches.match("offline.html"))
        })
    )
})


self.addEventListener('activate', (event) => {
    const whiteList = [];
    whiteList.push(CACHE_NAME);

    event.waitUntil(
        caches.keys().then((cacheNames) => Promise.all(
            cacheNames.map((cacheNames) => {
                if(!whiteList.includes(cacheNames)){
                    return caches.delete(cacheNames)
                }
            })
        ))
    )
})
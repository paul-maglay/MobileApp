var cacheName = 'petstore-v1';
var cacheFiles = [
    'index.html',
    'product.js',
    'petstore.webmanifest',
    'images/cat.png',
    'images/cat2.png',
    'images/cat3.png',
    'images/cat4.png',
    'images/cat5.png',
    'images/icon-512.png'


]
self.addEventListener('install',(e)=>{
    console.log('[Service Worker] Install');
    e.waitUntil(
        caches.open(cacheName).then((cache) =>{
            console.log('[Service Worker] Caching all the files');
            return cache.addAll(cacheFiles);
        })
    )
})

self.addEventListener('fetch', function(e){
    e.respondWith(
        caches.match(e.request).then(function (r) {
            //Download file if not in the cache,
            return r || fetch(e.request).then(function (response){
                //add the new file to cache
                return caches.open(cacheName).then(function (cache){
                    cache.put(e.request, response.clone());
                    return response;
                });
            });
        })
    )
})
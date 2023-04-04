const CACHE_NAME = 'my-site-cache-v1';

const urlsToCache = [
    '/',
    '/css/app.css',
    '/js/infiniteScroll.js',
    '/js/search.js',
    '/offline',
];


self.addEventListener('install', (e) => {
    console.log("Service Worker Installed");

    e.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log("Service Worker Caching Files");
                cache.addAll(urlsToCache);
            })
            .then(() => self.skipWaiting())
    )
});

self.addEventListener('activate', (e) => {
    console.log("Service Worker Activated");

    e.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if(cache !== CACHE_NAME){
                        console.log("Service Worker Clearing Old Cache");
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', (e) => {
    console.log("Service Worker Fetching", e.request.headers.get('accept'));
    // console.log(e.request);

    if(e.request.method == 'GET' && e.request.headers.get('accept').includes('text/html')){
        console.log("dit is een html get request", e.request.url)
        e.respondWith(

            caches.match(e.request.url)
            .then((response) => {
                return response || fetch(e.request.url)
            })
            .catch(() => caches.match('/offline'))
        );
    }else if(e.request.method == 'GET' && e.request.headers.get('accept').includes('image/*')){
        console.log('dit is een image request');
    }
    else if(e.request.method == 'GET' && e.request.headers.get('accept').includes('text/css')){
        console.log('dit is een css request');

        e.respondWith(
            caches.match(e.request)
            .then((response) => {
                return response || fetch(e.request);
            })
        );
    }
});
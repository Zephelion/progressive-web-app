const CACHE_NAME = 'my-site-cache-v1';

const urlsToCache = [
    '/',
    '/css/app.css',
    '/js/infiniteScroll.js',
    '/js/search.js',
    '/views/index.hbs',
];

self.addEventListener('install', (e) => {
    console.log("Service Worker Installed");
});
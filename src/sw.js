const staticCacheName = 's-app-v1';
const dynamicCacheName = 'd-app-v1';

const assetUrls = [
  'index.html',
  'index.bundle.js',
];

self.addEventListener('install', async (event) => {
  const cache = await caches.open(staticCacheName);
  await cache.addAll(assetUrls);
});

const cacheFirst = async (request) => {
  const cached = await caches.match(request);
  return await fetch(request) || cached;
};

const networkFirst = async (request) => {
  const cache = await caches.open(dynamicCacheName);
  try {
    const response = await fetch(request);
    await cache.put(request, response.clone());
    return response;
  } catch (err) {
    const cached = await cache.match(request);
    return cached;
  }
};

self.addEventListener('fetch', (event) => {
  const {request} = event;
  const url = new URL(request.url);
  if (url.origin === location.origin) {
    event.respondWith(cacheFirst(event.request));
  } else {
    event.respondWith(networkFirst(event.request));
  }
});

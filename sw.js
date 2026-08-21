const CACHE='sayeed-academy-v4-full-20260821-4';
const CORE=['./','./index.html','./assets/css/style.css','./assets/js/app.js','./data/catalog.json','./manifest.webmanifest','./assets/icons/logo.png'];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(CORE)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET') return;
  const url=new URL(event.request.url);
  if(url.pathname.endsWith('/sw.js')) return;
  event.respondWith(fetch(event.request).then(response=>{
    if(response.ok && url.origin===location.origin){const copy=response.clone();caches.open(CACHE).then(c=>c.put(event.request,copy)).catch(()=>{});}
    return response;
  }).catch(()=>caches.match(event.request).then(r=>r||caches.match('./index.html'))));
});

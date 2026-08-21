const CACHE="sayeed-academy-v6-premium-20260821";
const CORE=["./","./index.html","./assets/css/style.css","./assets/js/app.js","./data/catalog.json","./manifest.webmanifest","./assets/icons/logo.png"];
self.addEventListener("install",e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting())));
self.addEventListener("activate",e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener("fetch",e=>{if(e.request.method!=="GET")return;e.respondWith(caches.match(e.request).then(c=>c||fetch(e.request).then(r=>{if(r.ok){const copy=r.clone();caches.open(CACHE).then(x=>x.put(e.request,copy));}return r}).catch(()=>caches.match("./index.html"))))});

const CACHE="sayeed-academy-v4-20260821";
const ASSETS=["./","./index.html","./assets/css/style.css","./assets/js/app.js","./data/catalog.json","./manifest.webmanifest","./assets/icons/logo.png"];
self.addEventListener("install",e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener("activate",e=>e.waitUntil(
  caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())
));
self.addEventListener("fetch",e=>{
  if(e.request.method!=="GET") return;
  e.respondWith(
    caches.match(e.request).then(cached=>cached||fetch(e.request).then(response=>{
      if(response.ok){
        const copy=response.clone();
        caches.open(CACHE).then(c=>c.put(e.request,copy));
      }
      return response;
    }).catch(()=>caches.match("./index.html")))
  );
});

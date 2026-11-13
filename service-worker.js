/* V2.11.2 public-only scoped cache. Never caches uploaded private JSON or other origins. */
const PREFIX='jrt-public-v211-', CACHE=PREFIX+'2.11.3-doc-categories-mobile-v2';
const ASSETS=['./','./index.html','./style.css','./app.js','./db.js','./data.js','./reference.js','./card-engine-v2111.js','./card-guide-public.js','./private-store.js','./bootstrap.js','./manifest.json','./version.json','./trip-guide.html','./kakegawa-guide.html','./icons/icon-192.png','./icons/icon-512.png','./trip-private-docs.html','./trip-private-docs.css','./trip-private-docs.js'];
const ASSET_URLS=new Set(ASSETS.map(x=>new URL(x,self.registration.scope).pathname));
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil((async()=>{
  const keys=await caches.keys();
  await Promise.all(keys.filter(k=>k.startsWith(PREFIX)&&k!==CACHE).map(k=>caches.delete(k)));
  await self.clients.claim();
})()));
self.addEventListener('fetch',e=>{
  const request=e.request;
  if(request.method!=='GET')return;
  const u=new URL(request.url), scope=new URL(self.registration.scope);
  if(u.origin!==scope.origin||!u.pathname.startsWith(scope.pathname)||!ASSET_URLS.has(u.pathname))return;
  if(request.mode==='navigate'){
    e.respondWith(fetch(request).catch(()=>caches.match(request).then(hit=>hit||caches.match('./index.html'))));return;
  }
  e.respondWith(caches.match(request).then(hit=>hit||fetch(request).then(res=>{
    if(res.ok){const copy=res.clone();e.waitUntil(caches.open(CACHE).then(c=>c.put(request,copy)))}
    return res;
  })));
});

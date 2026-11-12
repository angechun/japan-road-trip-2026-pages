/* Separate worker scoped ONLY to /private-docs/. Does not replace the main PWA worker. */
const CACHE='jrt-private-docs-shell-1';
const ASSETS=['./','./index.html','./style.css','./vault.js','../db.js','../private-store.js'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil((async()=>{await self.clients.claim();})()));
self.addEventListener('fetch',e=>{
 const r=e.request,u=new URL(r.url);
 if(r.method!=='GET'||u.origin!==self.location.origin||!ASSETS.some(p=>new URL(p,self.registration.scope).pathname===u.pathname))return;
 e.respondWith(caches.match(r).then(hit=>hit||fetch(r).then(res=>res)));
});

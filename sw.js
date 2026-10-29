const C='jard-v2',A=['./','index.html','manifest.json','icon-192.png','icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(A)));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!=C).map(x=>caches.delete(x)))).then(()=>clients.claim()))});
self.addEventListener('fetch',e=>{const q=e.request;if(q.method!='GET'||new URL(q.url).origin!=location.origin)return;
e.respondWith(caches.match(q,{ignoreSearch:true}).then(r=>{const n=fetch(q).then(x=>{if(x.ok)caches.open(C).then(c=>c.put(q,x.clone()));return x}).catch(()=>r);return r||n}))});

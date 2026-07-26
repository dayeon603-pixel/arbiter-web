var C='fp-demo-v2';
var ASSETS=['./','index.html','manifest.json','assets/leaf1.jpg','assets/leaf2.jpg','assets/leaf3.jpg','icon-192.png','icon-512.png'];
self.addEventListener('install',function(e){ e.waitUntil(caches.open(C).then(function(c){ return c.addAll(ASSETS).catch(function(){}); })); self.skipWaiting(); });
self.addEventListener('activate',function(e){ e.waitUntil(caches.keys().then(function(ks){ return Promise.all(ks.map(function(k){ if(k!==C) return caches.delete(k); })); })); self.clients.claim(); });
self.addEventListener('fetch',function(e){ if(e.request.method!=='GET') return; e.respondWith(caches.match(e.request).then(function(r){ return r || fetch(e.request).then(function(resp){ var cp=resp.clone(); caches.open(C).then(function(c){ c.put(e.request,cp).catch(function(){}); }); return resp; }).catch(function(){ return caches.match('index.html'); }); })); });

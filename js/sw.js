function registerServiceWorker() {
    // registrando o service worker para navegadores com suporte
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('js/sw.js', { scope: '/' }).then(() => {
            console.log('Service Worker registrado com sucesso.');
        }).catch(error => {
            console.log('Service Worker falhou:', error);
        });
    }
}
registerServiceWorker();
self.addEventListener('install', e => {
    e.waitUntil(
        // depois que o Service Worker estiver instalado,,
        // abra um novo cache
        caches.open('my-pwa-cache').then(cache => {
            // adicione todas as URLs de recursos que queremos armazenar em cache
            return cache.addAll([
                '/',
                '/index.html'
            ]);
        })
    );
});
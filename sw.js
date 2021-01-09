function registerServiceWorker() {
    // registrando o service worker para navegadores com suporte
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('sw.js', { scope: '/' }).then(() => {
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

import gulp from 'gulp';
import path from 'path';
import swPrecache from 'sw-precache';
const rootDir = '/';
gulp.task('generate-service-worker', callback => {
  swPrecache.write(path.join(rootDir, 'sw.js'), {
    staticFileGlobs: [
      // rastreia e armazena em cache todos os arquivos que correspondem a esse padrão
      rootDir + '/**/*.{js,html,css,png,jpg,gif}',
    ],
    stripPrefix: rootDir
  }, callback);
});
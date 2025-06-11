import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
// import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

export default defineConfig({
  server: {
    host: '0.0.0.0',
    cors: {
      origin: ['https://katinkaruffieux.ch.test'],
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      credentials: true
    },
    hmr: {
      host: 'localhost'
    }
  },
  resolve: {
    alias: {
      img: resolve('resources/img'),
      fonts: resolve('resources/css/fonts')
    }
  },
  plugins: [
      laravel({
          input: [
              'resources/css/app.css',
              'resources/js/app.js',
              // Control Panel assets.
              // https://statamic.dev/extending/control-panel#adding-css-and-js-assets
              // 'resources/css/cp.css',
              // 'resources/js/cp.js',
          ],
          refresh: true,
      }),
      //vue(),
  ],
});

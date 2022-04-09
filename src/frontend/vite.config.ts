import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import replace from '@rollup/plugin-replace';
import childProcess from 'child_process';

// https://vitejs.dev/config/
export default defineConfig({
  root: 'src/frontend',
  server: { proxy: { '/api': 'http://127.0.0.1:8787' } },
  build: { outDir: '../../dist', emptyOutDir: true },
  resolve: { alias: { 'node-fetch': 'isomorphic-fetch' } },
  plugins: [
    replace({
      // 将本次 Commit 的 ID 写进前端，用于检查更新
      __COMMIT_ID__: childProcess.execSync('git rev-parse HEAD').toString().replace('\n', ''),
      preventAssignment: true,
    }),
    react(),
    VitePWA({
      mode: 'production',
      base: '/',
      registerType: 'autoUpdate',
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/testingcf\.jsdelivr\.net\/.*/i,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'vditor-assets',
              expiration: { maxAgeSeconds: 60 * 60 * 24 * 365 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
        ],
      },
      manifest: { name: 'Hexo#', short_name: 'Hexo#', lang: 'zh_CN', start_url: '' },
    }),
  ],
});

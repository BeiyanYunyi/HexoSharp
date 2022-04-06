import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  root: 'src/frontend',
  server: { proxy: { '/api': 'http://127.0.0.1:8787' } },
  build: { outDir: '../../dist', emptyOutDir: true },
  resolve: { alias: { 'node-fetch': 'isomorphic-fetch' } },
  plugins: [react()],
});

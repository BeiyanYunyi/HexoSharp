/* eslint-disable import/no-extraneous-dependencies */
import { build } from 'esbuild';
import copyStaticFiles from 'esbuild-copy-static-files';

(async () => {
  try {
    const build1 = build({
      bundle: true,
      sourcemap: true,
      format: 'iife',
      platform: 'browser',
      target: ['es2017', 'chrome58'],
      entryPoints: {
        frontend: './src/frontend/main.tsx',
      },
      outdir: './dist',
      plugins: [copyStaticFiles({ src: './src/frontend/static', dest: './dist' })],
    });
    const build2 = build({
      bundle: true,
      sourcemap: false,
      platform: 'node',
      format: 'cjs',
      target: ['es2017'],
      entryPoints: {
        worker: './src/worker/index.ts',
      },
      outdir: './dist',
      plugins: [],
    });
    await Promise.all([build1, build2]);
  } catch (e) {
    process.exitCode = 1;
  }
})();

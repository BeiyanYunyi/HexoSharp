/* eslint-disable import/no-extraneous-dependencies */
import { build } from 'esbuild';

(async () => {
  try {
    await build({
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
  } catch (e) {
    process.exitCode = 1;
  }
})();

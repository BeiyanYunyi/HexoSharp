/* eslint-disable import/no-extraneous-dependencies */
import { build } from 'esbuild';
import resolve from 'esbuild-plugin-resolve';
import path from 'path/posix';

const fetchPath = path.resolve('./src/worker/utils/fetch.ts');
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
      plugins: [resolve({ 'node-fetch': fetchPath })],
    });
  } catch (e) {
    process.exitCode = 1;
  }
})();

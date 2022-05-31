/* eslint-disable import/no-extraneous-dependencies */
import childProcess from 'child_process';
import { build } from 'esbuild';
import { replace } from 'esbuild-plugin-replace';
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
      plugins: [
        resolve({ 'node-fetch': fetchPath }),
        replace({
          __COMMIT_ID__: childProcess.execSync('git rev-parse HEAD').toString().replace('\n', ''),
        }),
      ],
    });
  } catch (e) {
    console.error(e);
    process.exitCode = 1;
  }
})();

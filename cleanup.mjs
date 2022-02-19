import childProcess from 'child_process';

const res = childProcess.execSync('wrangler kv:namespace list');
const ary = JSON.parse(res.toString());
const target = ary.find((item) => item.title === '__hexo-sharp-workers_sites_assets');
let count = 0;
if (target) {
  const res2 = childProcess.exec(`wrangler kv:namespace delete --namespace-id=${target.id}`);
  res2.stdout.on('data', (chunk) => {
    const msg = chunk.toString();
    if (msg.startsWith('Are you sure you want')) {
      res2.stdin.write('y\n');
    }
    console.log(`${count}: ${chunk.toString()}`);
    count += 1;
  });
  res2.on('close', () => {
    console.log('KV cleaned.');
  });
} else {
  console.log('KV is empty.');
}

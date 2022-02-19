import HSPKV from '../../types/HSPKV';
import router from '../router';

const kvRouter = () => {
  router.get('/api/kv/:key', async (req) => {
    const { key } = req.params as { key: string };
    const res = await HSPKV.get(key);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    if (!res) return new Response('null', { headers });
    return new Response(JSON.stringify({ value: res }), { headers });
  });
  router.post('/api/kv/:key', async (req: AppRequest) => {
    const { key } = (req as unknown as { params: { key: string } }).params;
    await HSPKV.put(key, req.parsedJson.value);
    return new Response(null, { status: 201 });
  });
  router.delete('/api/kv/:key', async (req) => {
    const { key } = req.params as { key: string };
    await HSPKV.delete(key);
    return new Response(null, { status: 204 });
  });
};

export default kvRouter;

import { getAssetFromKV } from '@cloudflare/kv-asset-handler';
import json from './middlewares/json';
import router from './router';
import ghCorsRouter from './routers/ghCorsRouter';

router.all('*', json);

ghCorsRouter();

router.all(
  '/api',
  (req) =>
    new Response(JSON.stringify(req, null, 2), {
      headers: { 'Content-Type': 'application/json' },
    }),
);

router.get('*', async (req, event: FetchEvent) => {
  try {
    const page = await getAssetFromKV(event);
    const response = new Response(page.body, page);
    response.headers.set('X-XSS-Protection', '1; mode=block');
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('Referrer-Policy', 'unsafe-url');
    response.headers.set('Feature-Policy', 'none');
    return response;
  } catch (e) {
    return new Response('404 Not Found');
  }
});

const handleRequest = async (request: Request, event: FetchEvent) => router.handle(request, event);

export default handleRequest;

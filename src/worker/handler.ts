import { getAssetFromKV } from '@cloudflare/kv-asset-handler';
import json from './middlewares/json';
import jwtVerify from './middlewares/jwtVerify';
import router from './router';
import authRouter from './router/authRouter';
import ghCorsRouter from './router/ghCorsRouter';
import kvRouter from './router/kvRouter';
import templateRouter from './router/templateRouter';

router.all('*', json);

authRouter();
ghCorsRouter();
templateRouter();
// 以下路径需要验证才可访问
router.all('/api/*', jwtVerify);
router.get(
  '/api/ping',
  () => new Response(null, { status: 200, headers: { 'Content-Type': 'text/plain' } }),
);

kvRouter();

router.all(
  '/api',
  (req) =>
    new Response(JSON.stringify(req, null, 2), {
      headers: { 'Content-Type': 'application/json' },
    }),
);

// 用户请求前端时，返回前端
router.get('*', async (req, event: FetchEvent & { waitUntil: (promise: Promise<any>) => void }) => {
  if (!event) return new Response(null, { status: 400 });
  try {
    const page = await getAssetFromKV(event, {
      mapRequestToAsset: (oriReq) => {
        const { url } = oriReq;
        if (/\/assets\/.*/.test(url)) return oriReq;
        if (/workbox.*.js/.test(url)) return oriReq;
        if (url.endsWith('sw.js')) return oriReq;
        return new Request(`${url.split('/').slice(0, 3).join('/')}/index.html`, oriReq);
      },
    });
    const response = new Response(page.body, page);
    response.headers.set('X-XSS-Protection', '1; mode=block');
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('Referrer-Policy', 'unsafe-url');
    response.headers.set('Feature-Policy', 'none');
    return response;
  } catch (e) {
    return new Response(null, { status: 404 });
  }
});

const handleRequest = async (request: Request, event?: FetchEvent) => router.handle(request, event);

export default handleRequest;

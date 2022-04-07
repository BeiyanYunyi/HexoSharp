import router from '../router';

const fix = (myHeadersFixing: Headers, event: FetchEvent) => {
  const origin = event.request.headers.get('Origin');
  if (origin) {
    myHeadersFixing.set('Access-Control-Allow-Origin', origin);
  } else {
    myHeadersFixing.set('Access-Control-Allow-Origin', '*');
  }
  const isOptions = event.request.method === 'OPTIONS';
  if (isOptions) {
    const acrm = event.request.headers.get('access-control-request-method');
    const acrh = event.request.headers.get('access-control-request-headers');
    if (acrm) {
      myHeadersFixing.set('Access-Control-Allow-Methods', acrm);
    }
    if (acrh) {
      myHeadersFixing.set('Access-Control-Allow-Headers', acrh);
    }
    myHeadersFixing.delete('X-Content-Type-Options');
  }
  return myHeadersFixing;
};

/** 反代 GitHub 给前端，解决 GH 被墙的问题。这个 Router 需要加入更细化的验证以防被滥用 */
const ghCorsRouter = () => {
  router.all('/api/gh/*', async (req, event: FetchEvent) => {
    const isOptions = event.request.method === 'OPTIONS';
    const targetUrl = req.url.replace(/https?.*gh\//, '');
    if (!targetUrl.includes('github')) {
      return new Response('Forbidden', { status: 403, statusText: 'Forbidden' });
    }
    const recvHeaders: Record<string, string> = {};
    // eslint-disable-next-line no-restricted-syntax
    for (const pair of event.request.headers.entries()) {
      if (
        pair[0].match('^origin') == null &&
        pair[0].match('eferer') == null &&
        pair[0].match('^cf-') == null &&
        pair[0].match('^x-forw') == null &&
        pair[0].match('^x-cors-headers') == null
      )
        // eslint-disable-next-line prefer-destructuring
        recvHeaders[pair[0]] = pair[1];
    }
    const newReq = new Request(event.request, { headers: recvHeaders });
    const fetchUrl = decodeURIComponent(targetUrl);
    const res = await fetch(fetchUrl, newReq);
    const resHeaders = fix(new Headers(res.headers), event);
    const is304 = res.status === 304;
    const body = isOptions || is304 ? null : await res.arrayBuffer();
    const corsHeaders: string[] = [];
    const allh: Record<string, string> = {};
    // eslint-disable-next-line no-restricted-syntax
    for (const pair of res.headers.entries()) {
      corsHeaders.push(pair[0]);
      // eslint-disable-next-line prefer-destructuring
      allh[pair[0]] = pair[1];
    }
    corsHeaders.push('cors-received-headers');
    resHeaders.set('Access-Control-Expose-Headers', corsHeaders.join(','));
    resHeaders.set('cors-received-headers', JSON.stringify(allh));
    try {
      return new Response(body, {
        headers: resHeaders,
        status: isOptions ? 200 : res.status,
        statusText: isOptions ? 'OK' : res.statusText,
      });
    } catch (e) {
      console.error({
        body: body ? body.toString() : null,
        status: isOptions ? 200 : res.status,
        statusText: isOptions ? 'OK' : res.statusText,
      });
      return new Response(JSON.stringify(e), {
        headers: { 'Content-Type': 'application/json' },
        status: 500,
        statusText: 'Internal Server Error',
      });
    }
  });
};

export default ghCorsRouter;

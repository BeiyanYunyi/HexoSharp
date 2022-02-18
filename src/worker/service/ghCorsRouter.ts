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

const ghCorsRouter = () => {
  router.all('/api/gh/*', async (req, event: FetchEvent) => {
    const isOptions = event.request.method === 'OPTIONS';
    const targetUrl = req.url.replace(/https?.*gh\//, '');
    if (!targetUrl.startsWith('https://api.github.com/')) {
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
    const body = isOptions ? null : await res.arrayBuffer();
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
    return new Response(body, {
      headers: resHeaders,
      status: isOptions ? 200 : res.status,
      statusText: isOptions ? 'OK' : res.statusText,
    });
  });
};

export default ghCorsRouter;

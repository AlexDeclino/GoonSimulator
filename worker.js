addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const env = { GOON_COUNTER: self.GOON_COUNTER };
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Content-Type': 'application/json',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers });
    }

    const url = new URL(request.url);

    if (url.pathname === '/increment') {
      const count = await env.GOON_COUNTER.get('count') || '0';
      const next = parseInt(count) + 1;
      await env.GOON_COUNTER.put('count', String(next));
      return new Response(JSON.stringify({ count: next }), { headers });
    }

    if (url.pathname === '/count') {
      const count = await env.GOON_COUNTER.get('count') || '0';
      return new Response(JSON.stringify({ count: parseInt(count) }), { headers });
    }

  return new Response('not found', { status: 404, headers });
}

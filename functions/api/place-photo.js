export async function onRequest(context) {
  const { searchParams } = new URL(context.request.url);
  const name = searchParams.get('name');

  if (!name || !name.startsWith('places/')) {
    return new Response('Invalid photo name', { status: 400 });
  }

  const apiKey = context.env.GOOGLE_PLACES_API_KEY;
  const url = `https://places.googleapis.com/v1/${name}/media?maxWidthPx=600&key=${apiKey}&skipHttpRedirect=false`;

  const res = await fetch(url, { redirect: 'follow' });

  return new Response(res.body, {
    headers: {
      'Content-Type': res.headers.get('Content-Type') || 'image/jpeg',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}

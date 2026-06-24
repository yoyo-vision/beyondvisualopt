export async function onRequest(context) {
  const { searchParams } = new URL(context.request.url);
  const store = searchParams.get('store') || 'xinzhuang';

  const PLACE_IDS = {
    xinzhuang: 'ChIJMeni-O6nQjQREQur5IaymvA',
    banqiao:   'ChIJdb1loDioQjQRZj9xNEZ3rXo',
  };

  const placeId = PLACE_IDS[store];
  if (!placeId) {
    return new Response(JSON.stringify({ error: 'Invalid store' }), { status: 400 });
  }

  const apiKey = context.env.GOOGLE_PLACES_API_KEY;
  const fields = 'rating,userRatingCount,reviews';
  const url = `https://places.googleapis.com/v1/places/${placeId}?languageCode=zh-TW`;

  const res = await fetch(url, {
    headers: {
      'X-Goog-Api-Key': apiKey,
      'X-Goog-FieldMask': fields,
    },
  });

  const data = await res.json();

  // 只回傳有文字內容的評論，最多 5 則
  const reviews = (data.reviews || [])
    .filter(r => r.text?.text?.length > 10)
    .slice(0, 5)
    .map(r => ({
      author: r.authorAttribution?.displayName || '匿名',
      photo:  r.authorAttribution?.photoUri || '',
      rating: r.rating,
      text:   r.text?.text || '',
      time:   r.relativePublishTimeDescription || '',
    }));

  return new Response(JSON.stringify({
    rating: data.rating,
    total:  data.userRatingCount,
    reviews,
  }), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=3600', // 快取 1 小時
      'Access-Control-Allow-Origin': '*',
    },
  });
}

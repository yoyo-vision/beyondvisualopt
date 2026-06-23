export async function onRequestGet(context) {
  const url = new URL(context.request.url);
  const code = url.searchParams.get('code');
  const provider = url.searchParams.get('provider');

  // Step 1: 初始授權 → 轉向 GitHub
  if (provider === 'github' && !code) {
    const githubAuthUrl = new URL('https://github.com/login/oauth/authorize');
    githubAuthUrl.searchParams.set('client_id', context.env.GITHUB_CLIENT_ID);
    githubAuthUrl.searchParams.set('scope', 'repo,user');
    githubAuthUrl.searchParams.set('redirect_uri', `${url.origin}/api/auth`);
    return Response.redirect(githubAuthUrl.toString(), 302);
  }

  // Step 2: GitHub 回調 → 交換 token
  if (code) {
    const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        client_id: context.env.GITHUB_CLIENT_ID,
        client_secret: context.env.GITHUB_CLIENT_SECRET,
        code,
      }),
    });

    const tokenData = await tokenRes.json();
    const token = tokenData.access_token;

    if (!token) {
      return new Response('授權失敗，請重試', { status: 400 });
    }

    // 把 token 透過 postMessage 傳回 CMS 視窗
    const html = `<!doctype html>
<html><body>
<script>
  (function() {
    const token = ${JSON.stringify(token)};
    const msg = JSON.stringify({ token, provider: 'github' });
    function send() {
      window.opener.postMessage('authorization:github:success:' + msg, '*');
    }
    window.addEventListener('message', function(e) {
      if (e.data === 'authorizing:github') send();
    });
    window.opener.postMessage('authorizing:github', '*');
  })();
</script>
</body></html>`;

    return new Response(html, {
      headers: { 'Content-Type': 'text/html' },
    });
  }

  return new Response('無效請求', { status: 400 });
}

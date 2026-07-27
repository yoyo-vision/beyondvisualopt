function randomState() {
  return crypto.randomUUID().replace(/-/g, '');
}

function readCookie(request, name) {
  const cookie = request.headers.get('Cookie') || '';
  const match = cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'));
  return match ? decodeURIComponent(match[1]) : null;
}

export async function onRequestGet(context) {
  const url = new URL(context.request.url);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  const provider = url.searchParams.get('provider');

  // Step 1: 初始授權 → 轉向 GitHub（帶 state 防 CSRF，同時存進 cookie 供回調比對）
  if (provider === 'github' && !code) {
    const oauthState = randomState();
    const githubAuthUrl = new URL('https://github.com/login/oauth/authorize');
    githubAuthUrl.searchParams.set('client_id', context.env.GITHUB_CLIENT_ID);
    githubAuthUrl.searchParams.set('scope', 'repo,user');
    githubAuthUrl.searchParams.set('redirect_uri', `${url.origin}/api/auth`);
    githubAuthUrl.searchParams.set('state', oauthState);

    return new Response(null, {
      status: 302,
      headers: {
        Location: githubAuthUrl.toString(),
        'Set-Cookie': `oauth_state=${oauthState}; Path=/; Max-Age=600; HttpOnly; Secure; SameSite=Lax`,
      },
    });
  }

  // Step 2: GitHub 回調 → 驗證 state 後交換 token
  if (code) {
    const savedState = readCookie(context.request, 'oauth_state');
    if (!state || !savedState || state !== savedState) {
      return new Response('授權驗證失敗（state 不符），請重新登入', { status: 400 });
    }

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

    // 把 token 透過 postMessage 傳回 CMS 視窗（targetOrigin 鎖定本站，不用 '*'）
    const html = `<!doctype html>
<html><body>
<script>
  (function() {
    const token = ${JSON.stringify(token)};
    const targetOrigin = ${JSON.stringify(url.origin)};
    const msg = JSON.stringify({ token, provider: 'github' });
    function send() {
      window.opener.postMessage('authorization:github:success:' + msg, targetOrigin);
    }
    window.addEventListener('message', function(e) {
      if (e.origin !== targetOrigin) return;
      if (e.data === 'authorizing:github') send();
    });
    window.opener.postMessage('authorizing:github', targetOrigin);
  })();
</script>
</body></html>`;

    return new Response(html, {
      headers: {
        'Content-Type': 'text/html',
        'Set-Cookie': 'oauth_state=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Lax',
      },
    });
  }

  return new Response('無效請求', { status: 400 });
}

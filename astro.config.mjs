import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import { readFileSync, readdirSync } from 'node:fs';

// 讀取部落格文章 frontmatter 的日期，供 sitemap lastmod 使用
// （只對「確定知道更新日期」的頁面標 lastmod，其他頁面不標，避免 Google 不信任）
// 2026-11-25：改為優先取 updated（改文日），未填才回退 date（發布日）。
// 原本只讀 date，於是「改內文但不動發布日」的頁面在 sitemap 看起來從沒變過，
// Google 不重爬、舊快照一直留著——11/23 驗光費下架後，搜尋結果掛著已下架的金額兩天，
// 就是這個原因。updated 欄位 schema 早已定義，文章頁也已用它輸出 dateModified，只有 sitemap 漏讀。
const blogDates = {};
for (const f of readdirSync('./src/content/blog')) {
  const src = readFileSync(`./src/content/blog/${f}`, 'utf8');
  const m = src.match(/^updated:\s*["']?(\d{4}-\d{2}-\d{2})/m)
         || src.match(/^date:\s*["']?(\d{4}-\d{2}-\d{2})/m);
  if (m) blogDates[f.replace(/\.mdx?$/, '')] = m[1];
}
// 部落格列表頁 lastmod = 最新一篇文章的日期
const latestPostDate = Object.values(blogDates).sort().at(-1);

// 手機放不下的表格（英文 3 欄以上、中文 5 欄以上）：加 class，並把欄名寫進每一格的 data-label，
// 手機才能改排成卡片（樣式在 src/styles/article-overflow.css）
function rehypeCardTable() {
  const text = (n) => n.type === 'text' ? n.value : (n.children ?? []).map(text).join('');
  const all = (n, tag) => (n.children ?? []).flatMap(c => c.tagName === tag ? [c] : all(c, tag));
  return (tree, file) => {
    const min = file.path?.includes('/blog-en/') ? 3 : 5; // 英文單字不能折行，3 欄就會超出
    for (const table of all(tree, 'table')) {
      const labels = all(table, 'th').map(th => text(th).trim());
      if (labels.length < min) continue;
      table.properties.className = ['card-table', ...(labels.length <= 4 ? ['card-table-stack'] : []), ...(labels.length >= 7 ? ['wide-table'] : [])];
      for (const tr of all(table, 'tr')) {
        all(tr, 'td').forEach((td, i) => {
          td.properties['data-label'] = labels[i];
          // 內容包一層 span，卡片版的「欄名｜內容」兩欄才不會被粗體、連結切開
          td.children = [{ type: 'element', tagName: 'span', properties: {}, children: td.children }];
        });
      }
    }
  };
}

export default defineConfig({
  site: 'https://beyondvisualopt.com',
  markdown: { rehypePlugins: [rehypeCardTable] },
  // /author 目前只有 YoYo 一位作者，直接轉址到作者頁（麵包屑中間層不落空）
  redirects: {
    '/author': '/author/yoyo/',
    // 2026-10-17：指南與文章合併成「視覺知識」單一入口，指南總覽頁轉到 /blog/（13 篇指南本身網址不變）
    '/guide': '/blog/',
    // 2026-10-17 老闆：鏡框定位是門市驗光人員用的後台工具，不放官網（門市實際使用 bv-fitting.pages.dev）
    '/tools/frame-fitting': '/services/',
    // 舊文章網址含「myopia-control」字樣，因法規用詞調整改名，301 保留既有搜尋權重
    '/blog/children-myopia-control-xinzhuang': '/blog/children-myopia-tracking-xinzhuang/',
    '/en/blog/children-myopia-control-xinzhuang': '/en/blog/children-myopia-tracking-xinzhuang/',
    // RGP 硬式隱形眼鏡文章因醫療器材廣告合規問題下架（2026-07-15 法務審核🔴），導去合規的服務頁
    '/blog/rgp-hard-contact-lens': '/services/',
    // 2026-08-07：本文與支柱頁主題重疊，GSC 判「已檢索但未建立索引」（爬過決定不收）。
    // 獨有內容（個人化鏡片六參數表、頂點距離補正機制）已併入支柱頁 #individual 段，301 集中權重。
    '/blog/good-lens-needs-good-fitting': '/guide/why-optometrist-matters/',
    '/en/blog/good-lens-needs-good-fitting': '/en/guide/why-optometrist-matters/',
  },
  integrations: [
    tailwind(),
    sitemap({
      // 後台操作指南是 noindex 頁，不該出現在 sitemap（訊號矛盾會被 GSC 警告）
      filter: (page) => !page.includes('/seo-guide'),
      serialize(item) {
        const postMatch = item.url.match(/\/blog\/([^/]+)\/?$/);
        if (postMatch && blogDates[postMatch[1]]) {
          item.lastmod = blogDates[postMatch[1]];
        } else if (item.url.replace(/\/$/, '').endsWith('/blog') && latestPostDate) {
          item.lastmod = latestPostDate;
        }
        return item;
      },
    }),
  ],
});

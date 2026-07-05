import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import { readFileSync, readdirSync } from 'node:fs';

// 讀取部落格文章 frontmatter 的日期，供 sitemap lastmod 使用
// （只對「確定知道更新日期」的頁面標 lastmod，其他頁面不標，避免 Google 不信任）
const blogDates = {};
for (const f of readdirSync('./src/content/blog')) {
  const m = readFileSync(`./src/content/blog/${f}`, 'utf8')
    .match(/^date:\s*["']?(\d{4}-\d{2}-\d{2})/m);
  if (m) blogDates[f.replace(/\.mdx?$/, '')] = m[1];
}
// 部落格列表頁 lastmod = 最新一篇文章的日期
const latestPostDate = Object.values(blogDates).sort().at(-1);

export default defineConfig({
  site: 'https://beyondvisualopt.com',
  // /author 目前只有 YoYo 一位作者，直接轉址到作者頁（麵包屑中間層不落空）
  redirects: {
    '/author': '/author/yoyo',
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

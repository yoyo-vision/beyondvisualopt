// 部落格 OG 封面圖卡批次生成器
// 用途：為 src/content/blog（中文）與 src/content/blog-en（英文）每篇文章
//       產生 1200×630 品牌圖卡（藏藍底＋金色框線＋serif 標題），
//       檔名 = 文章 slug（本身即英文關鍵字，符合 SEO 圖片檔名規範）。
// 輸出：public/images/blog/og/<slug>.png（中文）、public/images/blog/og-en/<slug>.png（英文）
// 執行：node scripts/generate-og.mjs（sharp 為 Astro 相依套件，本機 node_modules 已有）
import sharp from 'sharp';
import { readdirSync, readFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname;

// ── 版面常數（品牌規範：藏藍 #1a2f4e、金 #c9a84c）──
const W = 1200, H = 630, PAD = 80;           // 畫布與左右留白
const MAX_TEXT_W = W - PAD * 2;              // 標題可用寬度

// XML 特殊字元跳脫（標題含 & < > 會弄壞 SVG）
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// 估算字寬：CJK 全形 = 1 個字寬單位，半形英數 ≈ 0.55
const unit = (ch) => /[⺀-鿿豈-﫿＀-￯　-〿]/.test(ch) ? 1 : 0.55;
const lineUnits = (s) => [...s].reduce((a, c) => a + unit(c), 0);

// 斷行：優先在標點/空白處斷，超過寬度上限就硬斷；回傳行陣列
function wrap(text, maxUnits) {
  const BREAK = new Set([...'，。？！、：；｜—～ -']);
  const lines = [];
  let line = '', lineU = 0, lastBreak = -1;
  for (const ch of text) {
    line += ch; lineU += unit(ch);
    if (BREAK.has(ch)) lastBreak = line.length;
    if (lineU >= maxUnits) {
      // 在最近的標點斷；標點留行尾比掉行首好看
      const cut = lastBreak > line.length * 0.4 ? lastBreak : line.length;
      lines.push(line.slice(0, cut).trim());
      line = line.slice(cut); lineU = lineUnits(line); lastBreak = -1;
    }
  }
  if (line.trim()) lines.push(line.trim());
  return lines;
}

// 自動選字級：從大到小試，直到 3 行內放得下
function fitTitle(title) {
  for (const size of [60, 52, 44, 38]) {
    const lines = wrap(title, MAX_TEXT_W / size);
    if (lines.length <= 3) return { size, lines };
  }
  const size = 34;
  const lines = wrap(title, MAX_TEXT_W / size).slice(0, 3);
  lines[2] = lines[2].slice(0, -1) + '…'; // 真的太長就截尾
  return { size, lines };
}

// 產生單張圖卡 SVG（lang 決定品牌列與署名文案）
function cardSvg(title, lang) {
  const { size, lines } = fitTitle(title);
  const lineH = size * 1.45;
  const blockH = lines.length * lineH;
  const startY = (H - blockH) / 2 + size * 0.8 + 14; // 垂直置中（微往下讓出品牌列）
  const brand = lang === 'en' ? 'BEYOND VISUAL OPTOMETRY' : '能見度眼鏡行｜能見度視覺中心';
  const byline = lang === 'en' ? 'Written by Optometrist YoYo · Xinzhuang / Banqiao' : 'YoYo 驗光師 撰寫｜新莊・板橋';
  const serif = "'Songti TC','Noto Serif TC',Georgia,serif";
  const sans = "'PingFang TC','Helvetica Neue',sans-serif";
  const titleText = lines.map((l, i) =>
    `<text x="${W / 2}" y="${startY + i * lineH}" text-anchor="middle" font-family="${serif}" font-size="${size}" fill="#ffffff" font-weight="400">${esc(l)}</text>`
  ).join('\n  ');
  return `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#20365a"/>
      <stop offset="1" stop-color="#14243c"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <rect x="36" y="36" width="${W - 72}" height="${H - 72}" fill="none" stroke="#c9a84c" stroke-opacity="0.5" stroke-width="1.5"/>
  <text x="${W / 2}" y="118" text-anchor="middle" font-family="${sans}" font-size="22" letter-spacing="6" fill="#c9a84c">${esc(brand)}</text>
  <rect x="${W / 2 - 28}" y="140" width="56" height="2" fill="#c9a84c"/>
  ${titleText}
  <text x="${PAD}" y="${H - 66}" font-family="${sans}" font-size="19" fill="#ffffff" fill-opacity="0.62">${esc(byline)}</text>
  <text x="${W - PAD}" y="${H - 66}" text-anchor="end" font-family="${sans}" font-size="19" letter-spacing="1" fill="#c9a84c" fill-opacity="0.9">beyondvisualopt.com</text>
</svg>`;
}

// 讀 frontmatter title（不引 yaml 套件，正則即可）
const titleOf = (file) => readFileSync(file, 'utf8').match(/^title:\s*["']?(.+?)["']?\s*$/m)?.[1];

// 批次跑一個內容資料夾
async function run(contentDir, outDir, lang) {
  mkdirSync(outDir, { recursive: true });
  const files = readdirSync(contentDir).filter(f => f.endsWith('.md'));
  for (const f of files) {
    const title = titleOf(join(contentDir, f));
    if (!title) { console.warn(`跳過（無標題）: ${f}`); continue; }
    const slug = f.replace(/\.mdx?$/, '');
    await sharp(Buffer.from(cardSvg(title, lang))).png({ compressionLevel: 9 }).toFile(join(outDir, `${slug}.png`));
  }
  console.log(`${lang}: ${files.length} 張 → ${outDir}`);
}

await run(join(ROOT, 'src/content/blog'), join(ROOT, 'public/images/blog/og'), 'zh');
await run(join(ROOT, 'src/content/blog-en'), join(ROOT, 'public/images/blog/og-en'), 'en');

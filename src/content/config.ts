import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    // 用 date 型別保存，輸出 schema 時才轉 ISO 8601（避免變成英文長字串）
    date: z.coerce.date(),
    // 內容更新日（選填）：改文時填入，供 schema dateModified 傳達新鮮度；未填則同發布日
    updated: z.coerce.date().optional(),
    tag: z.string(),
    excerpt: z.string(),
    image: z.string().optional(),
    youtube: z.string().optional(),
    instagram: z.string().optional(),
  }),
});

// 英文版文章：slug 與中文版相同，放在 blog-en/，供 /en/blog/ 使用
const blogEn = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    tag: z.string(),
    excerpt: z.string(),
    image: z.string().optional(),
    youtube: z.string().optional(),
    instagram: z.string().optional(),
  }),
});

// 選配作品集：YoYo 驗光師的鏡框攝影 / 選配作品
// 每個作品 = src/content/portfolio/ 一個 .md 檔；照片放 public/images/portfolio/
const portfolio = defineCollection({
  type: 'content',
  schema: z.object({
    image: z.string(),                    // 照片路徑，例：/images/portfolio/lindberg-01.webp
    brand: z.string(),                    // 鏡框品牌，例：Lindberg
    model: z.string().optional(),         // 型號（選填）
    caption: z.string(),                  // 一句話描述（顯示在圖說與 alt）
    tags: z.array(z.string()).optional(), // 分類標籤（選填），例：["純鈦","無框"]
    date: z.coerce.date(),                // 拍攝/上架日期，供排序
    featured: z.boolean().optional(),     // 設 true 會優先排在前面
  }),
});

export const collections = { blog, 'blog-en': blogEn, portfolio };

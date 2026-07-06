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

export const collections = { blog, 'blog-en': blogEn };

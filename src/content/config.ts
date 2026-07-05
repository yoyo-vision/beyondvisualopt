import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    // 用 date 型別保存，輸出 schema 時才轉 ISO 8601（避免變成英文長字串）
    date: z.coerce.date(),
    tag: z.string(),
    excerpt: z.string(),
    image: z.string().optional(),
    youtube: z.string().optional(),
    instagram: z.string().optional(),
  }),
});

export const collections = { blog };

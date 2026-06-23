import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.string(),
    tag: z.string(),
    excerpt: z.string(),
    image: z.string().optional(),
    youtube: z.string().optional(),
    instagram: z.string().optional(),
  }),
});

export const collections = { blog };

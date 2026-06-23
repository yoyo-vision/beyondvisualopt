import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://beyondvisualopt.com',
  integrations: [
    sitemap({
      filter: (page) => !page.includes('undefined'),
    }),
    tailwind(),
  ],
});

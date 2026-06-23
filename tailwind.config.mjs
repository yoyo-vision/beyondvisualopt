/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#1a2f4e',
          gold: '#c9a84c',
          light: '#f8f5f0',
          gray: '#6b7280',
        }
      },
      fontFamily: {
        sans: ['Noto Sans TC', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
};

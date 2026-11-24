/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#1a2f4e',
          gold: '#c9a84c',
          light: '#f3ede3',
          paper: '#f7f3ec',
          ink: '#17140f',
          'ink-2': '#3a3530',
          // 2026-11-24 阿甘改版：次要文字加深，米色底 #f7f3ec 上對比從 5.2:1 提到 7.6:1（熟齡讀者看得清）
          'ink-3': '#524c46',
          gray: '#524c46',
        },
        // 2026-11-24 阿甘改版：站內 text-gray-400／500 只用在米白底的麵包屑、日期、摘要，
        // 原色對比只有 2.3:1／4.4:1，在 token 層直接加深，不逐頁改
        gray: {
          400: '#524c46',
          500: '#3a3530',
        },
      },
      fontFamily: {
        sans: ['"Noto Sans TC"', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['"Noto Serif TC"', 'Georgia', '"Times New Roman"', 'serif'],
      },
      fontSize: {
        base: ['17px', '1.75'],
        lg: ['19px', '1.75'],
        xl: ['21px', '1.7'],
      }
    },
  },
  plugins: [],
};

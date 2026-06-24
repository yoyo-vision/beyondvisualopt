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
          'ink-3': '#6b6560',
          gray: '#6b7280',
        }
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

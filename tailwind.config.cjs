const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue,mjs}',
    './node_modules/flowbite/**/*.js',
  ],
  darkMode: 'media',
  mode: 'jit',
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            lineHeight: '2',
            h2: {
              marginTop: '0',
            },
          },
          colors: {
            siravijpp: '#554994',
            siravijw: '#F29393',
            siravijdw: '#C17575',
            dwarn: '#332940',
          },
        },
      },
      fontFamily: {
        sans: ['Niramit', ...defaultTheme.fontFamily.sans],
        header: ['LINE Seed', ...defaultTheme.fontFamily.sans],
      },
      backgroundColor: {
        'black-overlay': 'rgba(0, 0, 0, 0.25)',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography', '')],
}

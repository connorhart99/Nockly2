/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-brown': {
          DEFAULT: 'var(--background)',
          '70': 'rgba(38, 13, 0, 0.7)'
        },
        'forest-green': 'var(--forest-green)',
        'deep-burgundy': 'var(--deep-burgundy)'
      },
    },
  },
  plugins: [],
}; 
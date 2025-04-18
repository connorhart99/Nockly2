/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-brown': '#260d00',
        'forest-green': '#05421b',
        'deep-burgundy': '#380000'
      },
    },
  },
  plugins: [],
}; 
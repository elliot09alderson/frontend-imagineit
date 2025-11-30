/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      colors: {
        'art-black': '#0a0a0a',
        'art-gray': '#1a1a1a',
        'art-accent': '#ff4d4d', // Example accent
      }
    },
  },
  plugins: [],
}


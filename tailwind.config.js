/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'main-gray-900': '#111827',
        'main-gray-500': '#6B7280',
        'main-gray-400': '#8D9192',
        'main-gray-300': '#E0E0E0',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif']
      }
    },
  },
  plugins: [],
}


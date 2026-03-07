/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'heading': ['Plus Jakarta Sans', 'sans-serif'],
        'body': ['Hind', 'sans-serif'],
      },
      colors: {
        'cool': {
          50: '#F7F9FF',
          900: '#2940FF',
        },
        'warm': {
          50: '#FDF8F3',
          400: '#DBB515',
          900: '#FF6D50',
        },
        'accent': '#ff6b35',
      }
    },
  },
  plugins: [],
}
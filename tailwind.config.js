/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ['Jost', 'sans-serif'],
      heading: ['Jost', 'sans-serif'],
      body: ['Jost', 'sans-serif'],
    },
    extend: {
      colors: {
        'text-primary': '#212325',
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
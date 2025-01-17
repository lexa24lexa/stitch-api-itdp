/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",
    "./js/**/*.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        mansalva: ['Mansalva', 'sans-serif'],
        salsa: ['Salsa', 'serif'],
        roboto: ['Roboto', 'sans-serif'],
      },
      colors: {
        lightblue: '#ADD8E6',
        darkblue: '#16376C',
        teal: '#A2E2E6',
      },
      spacing: {
        120: '30rem',
      },
    },
  },
  plugins: [],
};

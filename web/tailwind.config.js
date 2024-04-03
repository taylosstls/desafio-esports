/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,tsx}",
  "./index.html"],
  theme: {
    extend: {
      colors: {
      },
      backgroundImage: {
        'nlw-gradient': 'linear-gradient(90deg, #9572FC 15%, #43E7AD 40%, #E1D55D 90%)',
        'bg-space': "url('/bg-space.svg')",
        'game-gradient': 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, .9) 70% )'
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
  ],
}


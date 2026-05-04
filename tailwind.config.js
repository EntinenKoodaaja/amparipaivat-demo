/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'tokmanni-red': {
          DEFAULT: '#E3000F',
          dark: '#B8000C',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Helvetica Neue', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fff5f2',
          100: '#ffe8e1',
          200: '#ffd0c4',
          300: '#ffa896',
          400: '#ff745c',
          500: '#f95721', // Primary orange from mockup
          600: '#e53e09',
          700: '#c12e03',
          800: '#9d280a',
          900: '#7e260f',
        },
        darkcard: {
          bg: '#252930', // Dark overlay card from hero
          border: '#373D47',
        }
      },
      fontFamily: {
        sans: ['Pretendard', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        card: '0 4px 20px -2px rgba(0, 0, 0, 0.05), 0 2px 6px -1px rgba(0, 0, 0, 0.03)',
        floating: '0 20px 30px -10px rgba(0, 0, 0, 0.25)',
      }
    },
  },
  plugins: [],
}

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
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#16a34a', // Fresh Sprout Green (연두/초록)
          600: '#15803d', // Deep Green
          700: '#166534',
          800: '#14532d',
          900: '#0f5132', // Deep Forest Green (찐초록)
          950: '#062d1b',
        },
        forest: {
          DEFAULT: '#0f5132',
          dark: '#064e3b',
          deep: '#0b2b22',
        },
        sprout: {
          DEFAULT: '#22c55e',
          light: '#86efac',
        }
      },
      fontFamily: {
        sans: ['Pretendard', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        card: '0 4px 20px -2px rgba(0, 0, 0, 0.05), 0 2px 6px -1px rgba(0, 0, 0, 0.03)',
        floating: '0 20px 30px -10px rgba(15, 81, 50, 0.3)',
      }
    },
  },
  plugins: [],
}

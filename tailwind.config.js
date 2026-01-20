/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Color palette from podcast screenshot
        // Mustard yellow/gold from armchairs
        'mustard': {
          50: '#fef9e7',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b', // Primary mustard
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        // Dark green from walls
        'forest': {
          50: '#f0f9f4',
          100: '#dcf2e3',
          200: '#bce5cc',
          300: '#8fd1a8',
          400: '#5bb37d',
          500: '#38965a', // Primary forest
          600: '#2a7a47',
          700: '#23623a',
          800: '#1f4f31',
          900: '#1a4129', // Dark green from walls
        },
        // Brown from rug and furniture
        'brown': {
          50: '#faf7f2',
          100: '#f4ede0',
          200: '#e8d9c0',
          300: '#d9bf9a',
          400: '#c9a373',
          500: '#b88a5a', // Primary brown
          600: '#a6754a',
          700: '#8a5f3e',
          800: '#704e36',
          900: '#5c4130',
        },
        // Dark blue/black accents
        'dark': {
          50: '#f6f6f6',
          100: '#e7e7e7',
          200: '#d1d1d1',
          300: '#b0b0b0',
          400: '#888888',
          500: '#6d6d6d',
          600: '#5d5d5d',
          700: '#4f4f4f',
          800: '#454545',
          900: '#1a1a1a', // Very dark
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
}

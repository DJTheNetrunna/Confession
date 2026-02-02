/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#7A6CFF',
          dark: '#6347E8',
          light: '#9B84FF',
        },
        secondary: {
          DEFAULT: '#C86BFA',
          dark: '#B055E8',
          light: '#D88BFF',
        },
        dark: {
          bg: '#0B0B0E',
          card: '#14141F',
          border: '#1F1F2E',
        },
        ash: '#EDEDED',
        smoke: '#8B8B93',
      },
      fontFamily: {
        sans: ['Inter', 'Manrope', 'Satoshi', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #7A6CFF 0%, #9B84FF 100%)',
        'gradient-secondary': 'linear-gradient(135deg, #C86BFA 0%, #D88BFF 100%)',
        'gradient-dark': 'linear-gradient(180deg, #0B0B0E 0%, #14141F 100%)',
      },
      boxShadow: {
        'glow-primary': '0 0 20px rgba(122, 108, 255, 0.3)',
        'glow-secondary': '0 0 20px rgba(200, 107, 250, 0.3)',
        'card': '0 4px 24px rgba(0, 0, 0, 0.4)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(122, 108, 255, 0.3)' },
          '50%': { boxShadow: '0 0 30px rgba(122, 108, 255, 0.5)' },
        },
      },
    },
  },
  plugins: [],
}
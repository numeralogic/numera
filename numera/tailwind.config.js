/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif:  ['"Playfair Display"', 'Georgia', 'serif'],
        sans:   ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      colors: {
        gold: {
          DEFAULT: '#C8A96E',
          light:   '#D4BB8A',
          dark:    '#B8955A',
          deep:    '#8B6B2E',
        },
        slate: {
          50:  '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
        },
      },
      letterSpacing: {
        widest: '0.18em',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease both',
        'fade-in': 'fadeIn 0.5s ease both',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
      },
      boxShadow: {
        'gold-sm': '0 4px 16px rgba(200, 169, 110, 0.15)',
        'gold-md': '0 8px 32px rgba(200, 169, 110, 0.25)',
        'gold-lg': '0 16px 48px rgba(200, 169, 110, 0.35)',
        'card':    '0 2px 12px rgba(0,0,0,0.05)',
        'card-hover': '0 16px 48px rgba(200,169,110,0.1), 0 4px 16px rgba(0,0,0,0.06)',
      },
    },
  },
  plugins: [],
}

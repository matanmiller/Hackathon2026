/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Heebo', 'system-ui', 'sans-serif'],
      },
      colors: {
        emergency: {
          DEFAULT: '#ef4444',
          dark: '#b91c1c',
        },
      },
      keyframes: {
        'pulse-strong': {
          '0%, 100%': {
            transform: 'scale(1)',
            boxShadow: '0 0 0 0 rgba(239, 68, 68, 0.55)',
          },
          '50%': {
            transform: 'scale(1.015)',
            boxShadow: '0 0 0 12px rgba(239, 68, 68, 0)',
          },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'pulse-strong': 'pulse-strong 1.8s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in-up': 'fade-in-up 0.25s ease-out',
      },
    },
  },
  plugins: [],
};

// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif']
      },
      colors: {
        navy: { 800: '#0f172a', 900: '#0F1729', 950: '#080d1a' },
        snow: { 50: '#F8FAFC', 100: '#f1f5f9', 200: '#e2e8f0' },
        alpine: { 400: '#38bdf8', 500: '#0ea5e9', 600: '#0284c7' },
        gold: { 400: '#FBBF24', 500: '#F59E0B' }
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4,0,0.6,1) infinite'
      },
      keyframes: {
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp: { '0%': { opacity: '0', transform: 'translateY(20px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } }
      }
    }
  },
  plugins: []
}
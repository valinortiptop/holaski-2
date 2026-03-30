// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: { sans: ['Inter', 'system-ui', 'sans-serif'] },
      colors: {
        brand: { dark: '#0a1628', navy: '#0f1d3a', blue: '#2563eb', light: '#e0ecff' }
      }
    }
  },
  plugins: []
}
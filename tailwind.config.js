// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif']
      },
      colors: {
        holaski: {
          blue: '#2563EB',
          dark: '#1E3A5F',
          navy: '#0F172A',
          light: '#EFF6FF',
          accent: '#3B82F6'
        }
      }
    }
  },
  plugins: []
};
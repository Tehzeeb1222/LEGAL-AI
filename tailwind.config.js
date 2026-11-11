/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        roseSoft: '#F48B9B',
        roseLight: '#FFCED8',
        roseDeep: '#E15B70',
        creamWarm: '#FFF4DE',
        creamAlt: '#FFDDDD',
        charcoal: '#1E293B',
        slateText: '#475569',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        card: '0 4px 20px -2px rgba(244,139,155,0.14)',
        glow: '0 0 25px rgba(244,139,155,0.25)',
        elevated: '0 10px 30px -5px rgba(30,41,59,0.08), 0 4px 12px -2px rgba(244,139,155,0.12)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      }
    },
  },
  plugins: [],
}

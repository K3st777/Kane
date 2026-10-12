/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        lane: {
          dark: '#0D0D0D',
          card: '#161616',
          surface: '#1E1E1E',
          border: '#2A2A2A',
          accent: '#FF8284',
          accentHover: '#FF9B9D',
          accentMuted: 'rgba(255, 130, 132, 0.15)',
          muted: '#8A8A8A',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBg: "#030712",
        accentBlue: {
          light: "#60a5fa",
          DEFAULT: "#3b82f6",
          dark: "#1d4ed8",
        },
        accentPurple: {
          light: "#c084fc",
          DEFAULT: "#a855f7",
          dark: "#7e22ce",
        },
      },
      animation: {
        'pulse-slow': 'pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out infinite 3s',
        'glow-slow': 'glow 4s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        glow: {
          '0%': { opacity: '0.4', filter: 'blur(40px)' },
          '100%': { opacity: '0.8', filter: 'blur(60px)' },
        }
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}

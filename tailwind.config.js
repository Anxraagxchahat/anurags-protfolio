/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Kept for backward-compat with existing components
        darkBg: "#ffffff",
        accentBlue: {
          light: "#ffffff",
          DEFAULT: "#a3a3a3",
          dark: "#525252",
        },
        accentPurple: {
          light: "#e5e7eb",
          DEFAULT: "#ffffff",
          dark: "#262626",
        },
        // Bright premium system
        paper: {
          DEFAULT: "var(--paper)",
          soft: "var(--paper-soft)",
          dim: "var(--paper-dim)",
        },
        ink: {
          DEFAULT: "var(--ink)",
          soft: "var(--ink-soft)",
          mute: "var(--ink-mute)",
        },
        aurora: {
          violet: "#8A7CFF",
          indigo: "#6366F1",
          blue: "#4F86F7",
          cyan: "#5FD0E6",
          teal: "#59D9C4",
          pink: "#F58EC1",
          peach: "#FDB68A",
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
        mono: ['"Space Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.04em',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        soft: '0 2px 20px rgba(17,17,26,0.05)',
        glass: '0 8px 32px rgba(17,17,26,0.06)',
        'glass-lg': '0 24px 70px rgba(17,17,26,0.10)',
        'glass-xl': '0 40px 120px rgba(17,17,26,0.14)',
      },
      transitionTimingFunction: {
        expo: 'cubic-bezier(0.16, 1, 0.3, 1)',
        premium: 'cubic-bezier(0.65, 0, 0.35, 1)',
      },
      animation: {
        'pulse-slow': 'pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float 7s ease-in-out infinite',
        'float-delayed': 'float 7s ease-in-out infinite 3s',
        'blob': 'blob 18s ease-in-out infinite',
        'aurora-drift': 'aurora-drift 24s ease-in-out infinite',
        'shimmer': 'shimmer 3s linear infinite',
        'spin-slow': 'spin 22s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        blob: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0) scale(1) rotate(0deg)' },
          '33%': { transform: 'translate3d(4%, -5%, 0) scale(1.05) rotate(120deg)' },
          '66%': { transform: 'translate3d(-4%, 4%, 0) scale(0.96) rotate(240deg)' },
        },
        'aurora-drift': {
          '0%, 100%': { transform: 'translate3d(0,0,0) rotate(0deg)' },
          '50%': { transform: 'translate3d(4%, -3%, 0) rotate(8deg)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}

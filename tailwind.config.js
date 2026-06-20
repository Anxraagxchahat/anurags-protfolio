/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // ── Base / void (the ink between dimensions) ──────────────────
        ink: {
          DEFAULT: "#020205", // page base
          800: "#07070C",     // raised surfaces
          700: "#0C0D14",     // cards / panels base
        },
        paper: {
          DEFAULT: "#F4F5F7", // primary text on dark
          dim: "#9CA3AF",     // secondary text
        },

        // ── Dimensional accents (the Spider-Verse spectrum) ───────────
        spider: {
          red: "#E23636",         // Hero / Identity / portals
          "red-light": "#FF4D6D", // hot highlights, Voxtro
          blue: "#38BDF8",        // Skills / electric energy
          "blue-deep": "#0284C7", // graduated blue
          violet: "#A855F7",      // AI / Journey portal
          amber: "#FBBF24",       // highlights, Next.js/Firebase
          emerald: "#34D399",     // success, FastAPI
          pink: "#EC4899",        // WebRTC / accent
        },

        // ── Legacy aliases (keep current class names working) ─────────
        darkBg: "#020205",
        accentBlue: {
          light: "#38bdf8",
          DEFAULT: "#0284c7",
          dark: "#0369a1",
        },
        accentPurple: {
          light: "#ff4d6d",
          DEFAULT: "#e23636",
          dark: "#9b0c0e",
        },
      },

      fontFamily: {
        // Display / splash — ultra-bold comic weight (approved: Anton)
        display: ['Anton', 'Archivo Black', 'Impact', 'sans-serif'],
        // Headline — section titles, project names
        heading: ['"Space Grotesk"', 'Outfit', 'system-ui', 'sans-serif'],
        // Body / UI — continuity with current build
        sans: ['Outfit', '"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        // Mono / accent — eyebrows, tags, "DIMENSION 0X"
        mono: ['"Space Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },

      fontSize: {
        // Fluid, clamp()-based scale (doc 02 §3)
        splash:   ['clamp(4rem, 14vw, 13rem)',     { lineHeight: '0.85', letterSpacing: '-0.02em' }],
        h1:       ['clamp(2.75rem, 7vw, 6rem)',     { lineHeight: '0.9',  letterSpacing: '-0.01em' }],
        h2:       ['clamp(2rem, 4vw, 3.25rem)',     { lineHeight: '1.05' }],
        h3:       ['clamp(1.25rem, 2vw, 1.75rem)',  { lineHeight: '1.2' }],
        'body-lg':['clamp(1.05rem, 1.4vw, 1.25rem)',{ lineHeight: '1.6' }],
      },

      maxWidth: {
        content: '1200px', // wider than 5xl to give massive type room
      },

      spacing: {
        section: 'clamp(6rem, 12vh, 10rem)', // section vertical padding rhythm
      },

      borderRadius: {
        card: '1.5rem',   // 24px — glass cards
        panel: '0.25rem', // comic-panel variant
      },

      backgroundImage: {
        rift: 'linear-gradient(120deg, #E23636, #A855F7, #38BDF8)',
        portal: 'radial-gradient(circle, #38BDF8 0%, #A855F7 40%, #E23636 75%, transparent)',
      },

      boxShadow: {
        ambient: '0 24px 60px rgba(0,0,0,0.6)',
      },

      transitionTimingFunction: {
        expo: 'cubic-bezier(0.16, 1, 0.3, 1)',
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

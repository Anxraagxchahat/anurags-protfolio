import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Lift the threshold just above the (unavoidable) Three vendor chunk so the
    // build is clean; app code stays well under 500 kB on its own.
    chunkSizeWarningLimit: 1100,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return
          // Heavy 3D stack — its own cacheable, lazily-loaded chunk.
          if (/three|@react-three|postprocessing|maath/.test(id)) return 'three-vendor'
          if (/gsap|lenis|framer-motion/.test(id)) return 'motion-vendor'
          if (/react|scheduler/.test(id)) return 'react-vendor'
        },
      },
    },
  },
})

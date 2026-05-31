import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    port: 3000,
    host: true,
    allowedHosts: ['3000-e514d3d9234b243e.monkeycode-ai.online'],
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
})

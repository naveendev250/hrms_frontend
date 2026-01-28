import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'https://hrms-backend-1-gd3i.onrender.com',
        changeOrigin: true,
      }
    }
  }
})

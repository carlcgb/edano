import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Get API key from environment variable (from GitHub Secrets or .env file)
  const apiKey = process.env.VITE_GOOGLE_MAPS_API_KEY || ''
  
  // In production build, this MUST be set
  if (mode === 'production' && !apiKey) {
    console.error('❌ ERROR: VITE_GOOGLE_MAPS_API_KEY is not set for production build!')
    console.error('This will cause the map to not work in production.')
    console.error('Make sure the secret is set in GitHub Secrets.')
  }

  return {
    plugins: [react()],
    build: {
      outDir: 'dist',
      sourcemap: false,
    },
    // Force injection of API key using define
    define: {
      'import.meta.env.VITE_GOOGLE_MAPS_API_KEY': JSON.stringify(apiKey),
    },
  }
})

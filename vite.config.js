import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Get API key from environment variable (from GitHub Secrets or .env file)
  const apiKey = process.env.VITE_GOOGLE_MAPS_API_KEY || ''
  
  console.log('🔍 Vite config - Mode:', mode)
  console.log('🔍 Vite config - API Key available:', apiKey ? 'YES' : 'NO')
  if (apiKey) {
    console.log('🔍 Vite config - API Key preview:', apiKey.substring(0, 20) + '...')
  }
  
  // In production build, this MUST be set
  if (mode === 'production' && !apiKey) {
    console.error('❌ ERROR: VITE_GOOGLE_MAPS_API_KEY is not set for production build!')
    console.error('This will cause the map to not work in production.')
    console.error('Make sure the secret is set in GitHub Secrets.')
    process.exit(1)
  }

  return {
    plugins: [react()],
    build: {
      outDir: 'dist',
      sourcemap: false,
    },
    // Force injection of API key using define - this replaces import.meta.env.VITE_GOOGLE_MAPS_API_KEY at build time
    define: {
      'import.meta.env.VITE_GOOGLE_MAPS_API_KEY': JSON.stringify(apiKey),
      // Also define it as a regular variable for extra safety
      '__VITE_GOOGLE_MAPS_API_KEY__': JSON.stringify(apiKey),
    },
  }
})

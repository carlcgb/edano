// Script to ensure environment variables are available for Vite build
import { writeFileSync } from 'fs'

const apiKey = process.env.VITE_GOOGLE_MAPS_API_KEY

if (!apiKey) {
  console.error('❌ ERROR: VITE_GOOGLE_MAPS_API_KEY is not set')
  console.error('This script must be run with VITE_GOOGLE_MAPS_API_KEY environment variable')
  process.exit(1)
}

// Create .env.production file
const envContent = `VITE_GOOGLE_MAPS_API_KEY=${apiKey}\n`

writeFileSync('.env.production', envContent, 'utf8')
console.log('✅ Created .env.production with VITE_GOOGLE_MAPS_API_KEY')
console.log(`🔑 API Key preview: ${apiKey.substring(0, 20)}...`)

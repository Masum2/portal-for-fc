import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // এটি যোগ করুন

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // এটি যোগ করুন
  ],
})
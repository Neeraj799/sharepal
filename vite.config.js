import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Always this port; fail instead of silently starting on another one
  server: { port: 5173, strictPort: true },
})

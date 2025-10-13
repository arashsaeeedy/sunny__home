import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/sunny__home/', // Set base for GitHub Pages
  server: {
    historyApiFallback: true,
  },
})

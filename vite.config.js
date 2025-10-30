import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

<<<<<<< HEAD
export default defineConfig({
  plugins: [react()],
  base: '/sunny__home/' // set this to "/<your-repo-name>/" for GitHub Pages
=======
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/sunny__home/', // Set base for GitHub Pages
  server: {
    historyApiFallback: true,
  },
>>>>>>> 0bc683b718467269591d3468d2f129d3207db59d
})

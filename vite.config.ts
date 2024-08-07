import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 1998
  },
  css: {
    devSourcemap: true
  },
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, './src')
    }
  }
})

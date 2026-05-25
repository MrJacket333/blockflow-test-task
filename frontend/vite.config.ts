import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@atoms': path.resolve(__dirname, 'src/atoms'),
      '@molecules': path.resolve(__dirname, 'src/molecules'),
      '@organisms': path.resolve(__dirname, 'src/organisms'),
      '@templates': path.resolve(__dirname, 'src/templates'),
      '@pages': path.resolve(__dirname, 'src/pages'),
    },
  },
  server: {
    proxy: {
      '/socket.io': {
        target: 'http://localhost:3000',
        ws: true,
      },
      '/jobs': {
        target: 'http://localhost:3000',
      },
    },
  },
})

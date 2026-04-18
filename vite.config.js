import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  // Load Vite env vars (VITE_*) for this mode
  const env = loadEnv(mode, process.cwd(), '')
  // If VITE_API_BASE_URL is provided, use it; otherwise default to local backend for proxy target
  // Default local .NET API is https://localhost:7238
  const apiBase = env.VITE_API_BASE_URL || 'https://localhost:7238'

  return {
    plugins: [react()],
    server: {
      port: 3000,
      open: true,
      proxy: {
        // Proxy all /api requests to the backend during development.
        // If you set VITE_API_BASE_URL in .env.development it will proxy to that instead.
        '/api': {
          target: apiBase,
          changeOrigin: true,
          secure: false,
        },
      },
    },
    build: {
      outDir: 'dist',
      sourcemap: false,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom', 'react-router-dom'],
          },
        },
      },
    },
  }
})

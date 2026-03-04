import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0", // Listen on all local IPs
    port: 5173,
    strictPort: true,
    hmr: {
      host: "192.168.1.185", // Tells your phone's browser where to find the HMR websocket
    },
  },
});

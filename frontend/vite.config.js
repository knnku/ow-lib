import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0", // Listen on all local IPs
    port: 5173,
    strictPort: true,
    allowedHosts: true,
    hmr: {
      protocol: "wss", // Force Secure Web Sockets
      host: "economical-marcie-pardonably.ngrok-free.dev",
      clientPort: 443,
    },
    proxy: {
      "/api": {
        target: "http://backend:5000", // Uses Docker's internal network to find your API
        changeOrigin: true,
        secure: false,
      },
    },
  },
});

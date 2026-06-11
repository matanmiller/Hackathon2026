import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import mkcert from 'vite-plugin-mkcert';

export default defineConfig({
  // mkcert generates a locally-trusted HTTPS cert (incl. for LAN IPs), required by
  // browsers for navigator.mediaDevices.getUserMedia outside of localhost
  plugins: [react(), mkcert()],
  server: {
    host: true,
    // Proxy backend calls server-side so the https frontend can reach the http
    // FastAPI backend (avoids mixed-content blocking) from any device, including phones
    proxy: {
      '/api': 'http://127.0.0.1:8000',
      '/transcribe': 'http://127.0.0.1:8000',
    },
  },
});

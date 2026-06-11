import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import mkcert from 'vite-plugin-mkcert';

export default defineConfig({
  // mkcert generates a locally-trusted HTTPS cert (incl. for LAN IPs), required by
  // browsers for navigator.mediaDevices.getUserMedia outside of localhost
  plugins: [react(), mkcert()],
  server: {
    host: true,
  },
});

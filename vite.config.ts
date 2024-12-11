import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy API calls to the backend
      '/api': {
        target: 'https://pure-refuge-60633-b2696f758762.herokuapp.com/', // Backend server URL
        changeOrigin: true,
        secure: true,
      },
    },
  },
});

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import managedContentPlugin from './scripts/managed-content-plugin.js';
import directContentPlugin from './scripts/direct-content-plugin.js';

export default defineConfig({
  plugins: [react({ babel: { plugins: [managedContentPlugin, directContentPlugin] } })],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:5001',
        changeOrigin: true,
      },
      '/uploads': {
        target: 'http://localhost:5001',
        changeOrigin: true,
      },
    },
  },
});

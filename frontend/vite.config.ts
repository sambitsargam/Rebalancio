import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
    include: [
      'buffer', 
      'process',
      'util',
      'stream-browserify',
      'crypto-browserify',
      'assert',
      'url',
      'events',
      'pbkdf2',
      'create-hash',
    ],
  },
  define: {
    global: 'globalThis',
    'globalThis.Buffer': 'globalThis.Buffer',
    'process.env': '{}',
  },
  resolve: {
    alias: {
      buffer: 'buffer',
      crypto: 'crypto-browserify',
      stream: 'stream-browserify',
      util: 'util',
      process: 'process/browser.js',
      os: 'os-browserify/browser',
      https: 'https-browserify',
      http: 'stream-http',
      url: 'url',
      assert: 'assert',
      events: 'events',
    },
  },
  build: {
    rollupOptions: {
      output: {
        globals: {
          buffer: 'Buffer',
          process: 'process',
        },
      },
    },
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
  server: {
    port: 3000,
  },
});
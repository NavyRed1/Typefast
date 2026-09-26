import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Root-relative base: correct for a Vercel deployment (or any host serving
// the app from a domain root). If you instead host this on GitHub Pages
// under a repo subpath (https://user.github.io/typequest/), change this
// back to './' or to '/typequest/'.
export default defineConfig({
  base: '/',
  plugins: [react()],
  build: { target: 'es2020', chunkSizeWarningLimit: 900 },
  server: { port: 5173 },
});

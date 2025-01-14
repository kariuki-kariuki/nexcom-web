import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    define: {
      'process.env.URL': JSON.stringify(env.URL)
    },
    plugins: [react()],
    optimizeDeps: {
      exclude: ['chunk-J6642NXP.js']
    }
  };
});

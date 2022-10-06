import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import svgrPlugin from 'vite-plugin-svgr';
import viteTsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  preview: {
    port: 4040,
    open: true
  },
  server: {
    port: 4040,
    open: true
  },
  build: {
    outDir: 'build'
  },
  plugins: [
    react(),
    viteTsconfigPaths(),
    svgrPlugin(),
  ]
});

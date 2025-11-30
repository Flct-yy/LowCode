import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths()
  ],
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
  resolve: {
    // 修复路径映射，使用resolve函数确保正确解析
    alias: {
      '@': resolve(__dirname, './src'),
      '@type': resolve(__dirname, './src/type'),
      '@context': resolve(__dirname, './src/context'),
      '@components': resolve(__dirname, './src/components'),
      '@scss': resolve(__dirname, './src/scss'),
      '@pages': resolve(__dirname, './src/pages'),
      '@router': resolve(__dirname, './src/router'),
    }
  },
  optimizeDeps: {
    include: ['react', 'react-dom'],
  },
});
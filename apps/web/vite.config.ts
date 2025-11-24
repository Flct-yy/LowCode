import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { fileURLToPath, URL } from 'node:url';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
  // 解决Yarn PnP路径问题
  resolve: {
    preserveSymlinks: true,
    // 确保React相关模块能被正确解析
    dedupe: ['react', 'react-dom'],
  },
  // 优化依赖处理
  optimizeDeps: {
    include: ['react', 'react-dom', 'react/jsx-dev-runtime', 'react/jsx-runtime'],
  },
  // 修复PnP模式下的esbuild问题
  esbuild: {
    jsx: 'automatic',
  },
});
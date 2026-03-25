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
  base: './',
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: true,
    // 防止 React 重复打包的关键配置
    rollupOptions: {
      external: [],
      output: {
        // 确保 React 不会被打包多次
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-ui': ['antd', '@ant-design/icons'],
          'vendor-dnd': ['react-dnd', 'react-dnd-html5-backend'],
        },
        // 防止全局变量冲突
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
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
      '@utils': resolve(__dirname, './src/utils'),
      '@router': resolve(__dirname, './src/router'),
    }
  },
  optimizeDeps: {
    include: ['react', 'react-dom'],
  },
});
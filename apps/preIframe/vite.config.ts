import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  base: '/pre_iframe/',
  server: {
    port: 5174, // 修改端口号为 5174
    host: true, // 允许外部访问
    open: false, // 启动时自动打开浏览器
    cors: true, // 允许跨域请求
  },
  build: {
    outDir: 'dist', // 构建输出目录
    sourcemap: true, // 生成 sourcemap
    // 防止 React 重复打包的关键配置
    rollupOptions: {
      external: [],
      output: {
        // 确保 React 不会被打包多次
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
        },
        // 防止全局变量冲突
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom'],
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    }
  },
})

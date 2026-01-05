import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import { resolve } from 'dns'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    port: 5174, // 修改端口号为 5174
    host: true, // 允许外部访问
    open: false, // 启动时自动打开浏览器
    cors: true, // 允许跨域请求
  },
  build: {
    outDir: 'dist', // 构建输出目录
    sourcemap: true, // 生成 sourcemap
  },
})

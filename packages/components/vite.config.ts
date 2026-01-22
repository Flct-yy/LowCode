import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import dts from 'vite-plugin-dts'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(), dts({ // 新增这部分配置
    include: 'src/**/*',
    outDir: 'dist',
    insertTypesEntry: true
  })],
  build: {
    // 库模式构建配置
    lib: {
      entry: './src/index.ts',
      name: 'WectComponents',
      fileName: (format) => `index.${format}.js`,
      formats: ['es', 'umd'],
    },
    outDir: 'dist',
    sourcemap: true,
    // 确保构建时清理dist目录
    emptyOutDir: true,
    // 处理CSS配置
    cssCodeSplit: true,
    // 外部依赖配置，避免打包到库中
    rollupOptions: {
      external: ['react', 'react-dom', 'react-dnd', 'react-dnd-html5-backend'],
      output: {
        // 全局变量配置，用于UMD格式
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react-dnd': 'ReactDnD',
          'react-dnd-html5-backend': 'ReactDnDHTML5Backend',
        },
      },
    },
  },
})
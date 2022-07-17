import path from 'path'
import { defineConfig } from '@spearjs/cli'

export default defineConfig({
  name: '链接',
  type: 'component',
  componentType: 'basis',
  dependence: 'element-plus',
  platform: 'pc',
  editorFiles: path.resolve(__dirname, './src/editor.tsx'),
  renderFiles: path.resolve(__dirname, './src/render.tsx'),
  dest: 'dist',
})

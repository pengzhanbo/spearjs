import path from 'node:path'
import { defineConfig } from '@spearjs/cli'

export default defineConfig({
  name: '输入框',
  type: 'component',
  componentType: 'basis',
  dependence: 'element-plus',
  platform: 'pc',
  editorFiles: path.resolve(__dirname, './src/editor.tsx'),
  renderFiles: path.resolve(__dirname, './src/render.tsx'),
  dest: 'dist',
})

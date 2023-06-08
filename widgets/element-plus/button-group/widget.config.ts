import path from 'node:path'
import { defineConfig } from '@spearjs/cli'

export default defineConfig({
  name: '按钮组',
  type: 'component',
  componentType: 'container',
  dependence: 'element-plus',
  platform: 'pc',
  editorFiles: path.resolve(__dirname, './src/editor.tsx'),
  renderFiles: path.resolve(__dirname, './src/render.tsx'),
  dest: 'dist',
})

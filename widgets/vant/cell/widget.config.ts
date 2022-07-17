import path from 'path'
import { defineConfig } from '@spearjs/cli'

export default defineConfig({
  name: 'Cell单元格',
  type: 'component',
  componentType: 'basis',
  dependence: 'vant',
  platform: 'mobile',
  editorFiles: path.resolve(__dirname, './src/editor.tsx'),
  renderFiles: path.resolve(__dirname, './src/render.tsx'),
  dest: 'dist',
})

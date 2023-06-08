import path from 'node:path'
import { defineConfig } from '@spearjs/cli'

export default defineConfig({
  name: 'demo',
  type: 'component',
  componentType: 'basis',
  dependence: 'vant',
  platform: 'mobile',
  editorFiles: path.resolve(__dirname, './src/editor.ts'),
  renderFiles: path.resolve(__dirname, './src/render.tsx'),
  dest: 'dist',
})

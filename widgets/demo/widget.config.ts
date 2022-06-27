import path from 'path'
import { defineConfig } from '@spearjs/cli'

export default defineConfig({
  name: 'demo',
  type: 'component',
  componentType: 'basis',
  componentSubType: 'vant',
  platform: 'mobile',
  editorFiles: path.resolve(__dirname, './src/editor.ts'),
  renderFiles: path.resolve(__dirname, './src/render.tsx'),
  lib: ['vant'],
  dest: 'dist',
})

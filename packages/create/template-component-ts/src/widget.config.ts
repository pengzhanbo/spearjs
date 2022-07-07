import * as path from 'path'
import { defineConfig } from '@spearjs/cli'

export default defineConfig({
  name: 'my-widget',
  type: 'component',
  componentType: 'basis',
  dependence: '',
  platform: 'mobile',
  editorFiles: path.resolve(__dirname, './src/editor.tsx'),
  renderFiles: path.resolve(__dirname, './src/render.tsx'),
  dest: 'dist',
})

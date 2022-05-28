import path from 'path'

export default {
  label: 'demo',
  type: 'component',
  componentType: 'basis',
  componentSubType: 'vant',
  platform: 'mobile',
  description: '一个demo',
  descriptionFiles: path.resolve(__dirname, './src/description.ts'),
  editorFiles: path.resolve(__dirname, './src/editor.ts'),
  renderFiles: path.resolve(__dirname, './src/render.tsx'),
  lib: ['vant'],
  dest: 'dist',
}

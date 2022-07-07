import path from 'path'

/**
 * @type {import('@spearjs/cli').UserConfig}
 */
export default {
  name: 'my-widget',
  type: 'component',
  componentType: 'basis',
  dependence: '',
  platform: 'mobile',
  editorFiles: path.resolve(__dirname, './src/editor.jsx'),
  renderFiles: path.resolve(__dirname, './src/render.jsx'),
  dest: 'dist',
}

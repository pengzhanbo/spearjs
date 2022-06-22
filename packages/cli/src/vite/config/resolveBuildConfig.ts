import { path } from '@spearjs/utils'
import type { InlineConfig } from 'vite'

export const resolveDevConfig = (config: InlineConfig = {}): InlineConfig => {
  config.root = path.resolve(__dirname, '../../../preview/')
  config.build!.lib = {
    entry: '',
    formats: ['iife'],
    name: '',
    fileName: '',
  }
  config.build!.rollupOptions = {
    external: ['vue', 'element-plus', 'vant', 'ant-design-vue', 'cube-ui', 'naive-ui'],
    output: {
      globals: {
        'vue': 'Vue',
        'element-plus': 'ElementPlus',
        'vant': 'Vant',
        'ant-design-vue': 'AntDesignVue',
        'cube-ui': 'CubeUi',
        'naive-ui': 'NaiveUI',
      },
    },
  }

  return config
}

import type { InlineConfig } from 'vite'

export const resolveBuildConfig = (
  config: InlineConfig = {},
  { name, fileName, entry }: { name: string; fileName: string; entry: string }
): InlineConfig => {
  config.build!.target = ['es2018']
  config.build!.minify = 'terser'
  config.build!.terserOptions = {
    ecma: 2018,
    compress: {
      drop_console: true,
    },
  }
  config.build!.lib = {
    entry,
    formats: ['iife'],
    name,
    fileName,
  }
  config.build!.rollupOptions = {
    external: [
      '@spearjs/shared',
      'vue',
      'element-plus',
      'vant',
      'ant-design-vue',
      'cube-ui',
      'naive-ui',
    ],
    output: {
      globals: {
        '@spearjs/shared': 'SpearjsShared',
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

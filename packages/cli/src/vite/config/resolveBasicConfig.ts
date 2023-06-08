import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import type { InlineConfig } from 'vite'
import type { UserConfig } from '../../userConfig'
import { resolveWidgetPlugin } from '../plugins/resolveWidgetPlugin'

export const resolveBasicConfig = (
  config: InlineConfig = {},
  userConfig: UserConfig,
): InlineConfig => {
  config.base = '/'
  config.plugins = [resolveWidgetPlugin(userConfig), vue(), vueJsx()]
  config.build = {}
  config.css = {
    modules: {
      localsConvention: 'camelCase',
    },
  }
  config.configFile = false
  config.server = {}
  return config
}

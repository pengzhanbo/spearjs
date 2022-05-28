import type { InlineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { resolveWidgetPlugin } from '../plugins/resolveWidgetPlugin'
import type { UserConfig } from '../../config'

export const resolveBasicConfig = (
  config: InlineConfig = {},
  userConfig: UserConfig
): InlineConfig => {
  config.base = '/'
  config.plugins = [resolveWidgetPlugin(userConfig), vue(), vueJsx()]
  config.build = {}
  config.css = {}
  config.configFile = false
  config.server = {}
  return config
}

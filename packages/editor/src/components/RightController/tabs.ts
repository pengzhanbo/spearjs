import AttrsConfig from './AttrsConfig.vue'
import StylesConfig from './StylesConfig.vue'
import ActionConfig from './ActionsConfig.vue'
import PageConfig from './PageConfig.vue'
import AppConfig from './AppConfig.vue'

export const tabs = [
  {
    key: 'attrs-config',
    label: '属性',
    tab: AttrsConfig,
  },
  {
    key: 'styles-config',
    label: '样式',
    tab: StylesConfig,
  },
  {
    key: 'action-config',
    label: '动作',
    tab: ActionConfig,
  },
  {
    key: 'page-config',
    label: '页面设置',
    tab: PageConfig,
  },
  {
    key: 'app-config',
    label: '应用设置',
    tab: AppConfig,
  },
]

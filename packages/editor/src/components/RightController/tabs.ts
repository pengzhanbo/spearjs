import type { Component } from 'vue'
import ActionConfig from './ActionsConfig.vue'
import AppConfig from './AppConfig.vue'
import AttrsConfig from './AttrsConfig'
import PageConfig from './PageConfig.vue'
import StylesConfig from './StylesConfig.vue'

export interface RightControllerTabItem {
  key: string
  label: string
  tab: Component
}

export type RightControllerTabs = RightControllerTabItem[]

export const tabs: RightControllerTabs = [
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

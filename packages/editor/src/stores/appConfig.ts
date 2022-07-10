import { defineStore } from 'pinia'

/**
 * 一个应用，包括描述这个应用的APPID，app name，
 * 支持的平台，依赖的基础UI框架，依赖的UI框架决定了可以使用哪些组件，
 * 在这个基础上，还支持通过设置CSS变量，从细节上更细致的进行个性化配置。
 *
 * lib 实际上也是 widget的一部分
 */
export const useAppConfigStore = defineStore('appConfig', {
  state: (): AppConfig => ({
    appId: 'test-1',
    name: '',
    platform: 'PC',
    description: '描述信息',
    dependence: '',
    services: [],
    themeConfig: {
      CssVars: {
        '--app-c-bg': '#fff',
        '--app-c-text': '#000',
        '--app-c-brand': '',
      },
    },
  }),
  actions: {
    updateConfig(config: Partial<AppConfig>) {
      Object.assign(this, config)
    },
  },
})

export interface AppConfig {
  appId: string
  name: string
  platform: string
  description: string
  dependence: string
  services: AppService[]
  themeConfig: Record<string, any>
}

export interface AppService {
  id: string
  version: string
  label: string
}

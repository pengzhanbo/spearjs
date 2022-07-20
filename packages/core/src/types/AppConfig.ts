import type { AppPageList } from './AppPages'

export type Platform = 'pc' | 'mobile'

export type AppService = any

export interface AppConfig {
  appId: string
  name: string
  platform: Platform
  description: string
  dependence: string
  services: AppService[]
  themeConfig: Record<string, any>
  /**
   * 仅当platform为 pc时， layout有效，
   * 配置页面内容布局。指定网页内容宽度，是否居中
   */
  layout: {
    width: string
    center: boolean
  }
  pages: AppPageList
}

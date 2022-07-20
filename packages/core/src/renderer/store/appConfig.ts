import type { AppConfig } from '@core/types'
import { defineStore } from 'pinia'

export type AppConfigStore = Omit<AppConfig, 'description'>

export const useAppConfigStore = defineStore('appConfig', {
  state: (): AppConfigStore => {
    return {
      appId: '',
      name: '',
      themeConfig: {},
      platform: 'pc',
      dependence: '',
      services: [],
      layout: {
        width: '100%',
        center: true,
      },
      pages: [],
    }
  },
})

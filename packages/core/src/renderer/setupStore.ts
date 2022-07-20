import type { AppConfig } from '@core/types'
import { useAppConfigStore } from './store'

export const setupStore = (appConfig: AppConfig) => {
  const store = useAppConfigStore()
  store.$state = JSON.parse(JSON.stringify(appConfig))
}

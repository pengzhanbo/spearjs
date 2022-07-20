import type { AppConfig } from '@core/types'
import type { App } from 'vue'
import type { Router } from 'vue-router'
import { setupRouter } from './setupRouter'
import { setupStore } from './setupStore'

export const setupRenderer = async ({
  router,
  appConfig,
}: {
  app: App
  router: Router
  appConfig: AppConfig
}) => {
  setupStore(appConfig)
  setupRouter(router, appConfig)
}

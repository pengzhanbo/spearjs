import { createPinia } from 'pinia'
import type { App, Plugin } from 'vue'

export const store = createPinia()

export const setupStore = (app: App) => {
  app.use(store as unknown as Plugin)
}

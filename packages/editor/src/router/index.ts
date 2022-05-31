import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes'
import { setupGlobalGuards } from './globalGuard'
import type { App } from 'vue'

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

export const setupRouter = (app: App) => {
  setupGlobalGuards(router)
  app.use(router)
}

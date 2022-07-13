import type { App } from 'vue'
import type { Router } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import { setupGlobalGuards } from './globalGuard'
import { routes } from './routes'

export const router: Router = createRouter({
  history: createWebHistory(),
  routes,
})

export const setupRouter = (app: App) => {
  app.use(router as any)
  setupGlobalGuards(router)
}

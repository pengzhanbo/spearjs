import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes'
import { setupGlobalGuards } from './globalGuard'

const router = createRouter({
  history: createWebHistory(),
  routes,
})

setupGlobalGuards(router)

export { router }

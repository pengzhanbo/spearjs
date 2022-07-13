import type { RouteRecordRaw } from 'vue-router'

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/:appId/:pathMath(.*)*',
    name: 'appPage',
    component: () => import('../components/Home'),
  },
  {
    path: '/',
    name: 'home',
    component: () => import('../components/Home'),
  },
]

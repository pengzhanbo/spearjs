import Home from '@editor/components/Home'
import type { RouteRecordRaw } from 'vue-router'

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/:appId/:pathMath(.*)*',
    name: 'appPage',
    component: Home,
  },
  {
    path: '/',
    name: 'home',
    component: Home,
  },
]

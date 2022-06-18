import type { RouteRecordRaw } from 'vue-router'

export const routes: Array<RouteRecordRaw> = [
  {
    // path: '/:appId/:pathMatch(.*)*',
    path: '/',
    component: () => import('../components/Home'),
  },
  // {
  //   path: '/pc/:pathMatch(.*)*',
  //   meta: { platform: 'pc' },
  //   component: () => import('../views/index.vue'),
  // },
]

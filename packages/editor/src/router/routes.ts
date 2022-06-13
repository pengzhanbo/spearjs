import { RouteRecordRaw } from 'vue-router'

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/:appId/:pathMatch(.*)*',
    component: () => import('../components/Home'),
  },
  // {
  //   path: '/pc/:pathMatch(.*)*',
  //   meta: { platform: 'pc' },
  //   component: () => import('../views/index.vue'),
  // },
]

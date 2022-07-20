import Home from '@editor/components/Home'
import type { RouteRecordRaw } from 'vue-router'

/**
 * TODO 更改动态路由匹配，改用 addRoute 新增路由
 * 这里缺少考虑场景，通常一个应用，是支持子路由嵌套的，
 * 因为需要 一个应用存在 多个路由共享某些组件。
 * 如 PC 管理类，使用左侧菜单切换路由；移动端，使用底栏切换路由页面等。
 */
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

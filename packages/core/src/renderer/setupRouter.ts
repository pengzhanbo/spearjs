import type { AppConfig, AppPageList } from '@core/types'
import NProgress from 'nprogress'
import type { RouteRecordRaw, Router } from 'vue-router'
import { normalizePath } from '../utils'
import Page from './components/Page'
import 'nprogress/nprogress.css'

NProgress.configure({ showSpinner: false })

const addRoutes = (
  router: Router,
  children: AppPageList,
  parentPath = '',
  parentName?: symbol | string,
) => {
  children.forEach((item) => {
    const name = Symbol(item.title)
    const path = parentPath
      ? item.path.replace(/^\//, '')
      : item.path.startsWith('/')
      ? item.path
      : `/${item.path}`
    parentPath = normalizePath(parentPath, path)
    const route: RouteRecordRaw = {
      name,
      path,
      meta: { path: parentPath || path },
      component: Page,
    }
    parentName ? router.addRoute(parentName, route) : router.addRoute(route)
    if (item.children) {
      addRoutes(router, item.children, parentPath, name)
    }
  })
}

const setupRouterGuard = (router: Router) => {
  router.beforeEach(() => {
    NProgress.start()
    return true
  })
  router.afterEach(() => {
    NProgress.done()
  })
}

export const setupRouter = (router: Router, appConfig: AppConfig) => {
  addRoutes(router, appConfig.pages)
  setupRouterGuard(router)
}

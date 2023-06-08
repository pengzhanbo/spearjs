import { ignoreStoreCache } from '@editor/hooks'
import { useAppConfigStore, useAppPagesStore } from '@editor/stores'
import { parsePathMath, toPathMath } from '@editor/utils'
import NProgress from 'nprogress'
import type { Router } from 'vue-router'
import 'nprogress/nprogress.css'

NProgress.configure({ showSpinner: false })

export const setupGlobalGuards = (router: Router) => {
  router.beforeEach(() => {
    NProgress.start()
    return true
  })
  router.afterEach(() => {
    NProgress.done()
  })

  /**
   * 验证 路由是否有带上 appId 参数，
   * 如果没有，则从 store 中获取
   *
   * 假定进入页面时，是从非常规入口进来，没有带上 appId参数，
   * 那么尝试从store中获取一个appId， store会从本地缓存中尝试加载
   *
   * todo 获取appId时，如果没有，则需要重定向到 应用列表页
   */
  router.beforeEach((to) => {
    const appConfig = useAppConfigStore()
    if (!to.params.appId) {
      return {
        name: 'appPage',
        params: { ...to.params, appId: appConfig.appId },
      }
    }
    return true
  })

  /**
   * 校验当前路由的路径是否匹配 应用配置的 页面路径
   * 如果不符合，则需要重定向要 应用的首页，或者应用配置的第一个页面
   */
  router.beforeEach(async (to) => {
    const { pages, setCurrentPageByPath } = useAppPagesStore()
    const homePath = pages.find((page) => page.isHome)?.path || pages[0].path
    const pathMath = parsePathMath(to.params.pathMath) || homePath
    const ignore = history.state.ignoreStoreCache || false
    const currentPath = ignore
      ? await ignoreStoreCache(() => setCurrentPageByPath(pathMath))
      : setCurrentPageByPath(pathMath)
    if (currentPath === pathMath) {
      return true
    } else {
      return {
        name: 'appPage',
        params: { appId: to.params.appId, pathMath: toPathMath(currentPath) },
      }
    }
  })
}

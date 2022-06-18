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
}

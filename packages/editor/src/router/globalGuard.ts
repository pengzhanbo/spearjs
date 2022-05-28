import { Router } from 'vue-router'
import NProgress from 'nprogress'
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

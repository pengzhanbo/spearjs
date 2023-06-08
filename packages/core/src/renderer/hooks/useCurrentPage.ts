import type { AppPage, AppPageList } from '@core/types'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { normalizePath } from '../../utils'
import { useAppConfigStore } from '../store'

const getCurrentPage = (
  pageList: AppPageList,
  path: string,
): AppPage | undefined => {
  for (const page of pageList) {
    if (page.path === path) {
      return page
    }
    if (page.children) {
      const current = getCurrentPage(
        page.children,
        normalizePath(path, page.path),
      )
      if (current) return current
    }
  }
}

export const useCurrentPage = () => {
  const route = useRoute()
  const appConfig = useAppConfigStore()

  const currentPage = computed(() =>
    getCurrentPage(appConfig.pages, route.meta.path as string),
  )

  return currentPage
}

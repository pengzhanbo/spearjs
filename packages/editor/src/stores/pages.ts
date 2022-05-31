import { defineStore } from 'pinia'
import { hasOwn } from '@spearjs/shared'

const createAppPage = ({
  title = '新页面',
  path = '/',
  isHome = false,
}: {
  title: string
  path: string
  isHome?: boolean
}): AppPageItem => {
  return {
    title,
    path,
    isHome,
    config: {},
    blocks: [],
  }
}
export const useAppPagesStore = defineStore('pages', {
  state: (): AppPagesStore => {
    const firstPage = createAppPage({ title: '首页', path: '/', isHome: true })
    return {
      pages: [firstPage],
      currentPage: firstPage,
    }
  },
  actions: {
    createAppPage(option: { title: string; path: string; isHome?: boolean }): void {
      this.pages.push(createAppPage(option))
    },
    updatePage(index: number, page: Partial<AppPageItem>): void {
      this.pages[index] = Object.assign(this.pages[index], page)
    },
    removePage(index: number): void {
      this.pages.splice(index, 1)
    },
    setCurrentPage(page: AppPageItem): void {
      this.currentPage = page
    },
    updateHomePage(page: AppPageItem): void {
      if (page.isHome) return
      this.pages.forEach((item) => {
        if (hasOwn(item, 'isHome')) {
          item.isHome = false
        }
      })
      page.isHome = true
    },
    updateCurrentPage(page: AppPageItem): void {
      this.currentPage = Object.assign(this.currentPage, page)
    },
  },
})

export interface AppPagesStore {
  pages: AppPageList
  currentPage: AppPageItem
}

export type AppPageList = AppPageItem[]

export interface AppPageItem {
  path: string
  title: string
  isHome?: boolean
  config: AppPageConfig
  blocks: AppBlocks
}

export interface AppPageConfig {
  [prop: string]: any
}

export type AppBlocks = (AppBlock | AppBlockGroup)[]

export interface AppBlockGroup {
  label: string
  key: string
  blocks: AppBlock[]
}
export interface AppBlock {
  component: {
    id: string
    name: string
    version: string
  }
  uuid: string
  props: BlockProps
}

export type BlockProps = (BlockPropGroup | BlockPropItem)[]

export interface BlockPropGroup {
  key: string
  label: string
  props: BlockPropItem[]
}

export interface BlockPropItem {
  key: string
  label: string
  type: string
  defaultValue?: any
  options?: {
    label: string
    key: string
    defaultValue?: any
  }[]
}

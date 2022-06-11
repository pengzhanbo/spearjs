import { defineStore } from 'pinia'
import { hasOwn } from '@spearjs/shared'
import type { AppBlocks, AppBlock, AppBlockGroup } from '@editor/services'
import { findBlockGroup } from '@editor/services'

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
      focusBlock: null,
    }
  },
  getters: {
    blocks(state) {
      return state.currentPage.blocks
    },
  },
  actions: {
    // --- page
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
          delete item.isHome
        }
      })
      page.isHome = true
    },
    updateCurrentPage(page: Partial<AppPageItem>): void {
      if (page.path === this.currentPage.path) return
      this.currentPage = Object.assign(this.currentPage, page)
      this.setFocusBlock(null)
    },
    // --- block
    updateBlocks(blocks: AppBlocks): void {
      this.currentPage.blocks = [...blocks]
    },
    // 交换两个 block 的 位置
    swapBlock(prevBid: string, nextBid: string): void {
      // swap block
      console.log(prevBid, nextBid)
    },
    addBlock(block: AppBlock | AppBlockGroup, groupKey?: string): void {
      if (!groupKey) {
        this.currentPage.blocks.push(block)
        return
      }
      const blockGroup = findBlockGroup(this.currentPage.blocks, groupKey)
      blockGroup && blockGroup.blocks.push(block)
    },
    deleteBlock(bid: string): void {
      // bid
      console.log(bid)
    },
    setFocusBlock(block: AppBlock | null) {
      this.focusBlock = block
    },
  },
})

export interface AppPagesStore {
  pages: AppPageList
  currentPage: AppPageItem
  focusBlock: AppBlock | null
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

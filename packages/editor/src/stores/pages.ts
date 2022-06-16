import { defineStore } from 'pinia'
import { hasOwn } from '@spearjs/shared'
import type { AppBlocks, AppBlock, AppBlockGroup } from '@editor/services'

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
    getBlocksByRoadMap(roadMap: string): AppBlocks {
      const mapList = roadMap.split('|')
      let i = 0,
        blocks = this.currentPage.blocks
      while (i < mapList.length) {
        const [type, name, index] = mapList[i].split(':')
        if (type === 'slot') {
          blocks = blocks[index].slots[name]
        }
        if (type === 'group') {
          blocks = blocks[index].blocks
        }
        i++
      }
      return blocks
    },
    addBlock(block: AppBlock | AppBlockGroup, roadMap?: string, insertTo?: number): void {
      roadMap = roadMap || ''
      const blocks = this.getBlocksByRoadMap(roadMap)
      if (insertTo === undefined) {
        blocks.push(block)
      } else {
        blocks.splice(insertTo, 0, block)
      }
    },
    deleteBlock(
      index: number,
      roadMap?: string,
      done?: (block: AppBlock | AppBlockGroup) => void
    ): AppBlock | AppBlockGroup {
      roadMap = roadMap || ''
      const blocks = this.getBlocksByRoadMap(roadMap)
      const block = blocks[index]
      done && done(block)
      blocks.splice(index, 1)
      return block
    },
    moveSameRoadMapBlock(source: number, target: number, roadMap?: string): void {
      roadMap = roadMap || ''
      const blocks = this.getBlocksByRoadMap(roadMap)
      const block = blocks[source]
      blocks.splice(source, 1)
      blocks.splice(target, 0, block)
    },
    setFocusBlock(block: AppBlock | AppBlockGroup | null) {
      this.focusBlock = block
    },
    updateFocusBlockProps(props: Record<string, any>): void {
      if (this.focusBlock && this.focusBlock.type === 'block') {
        this.focusBlock.props = props
      }
    },
    updateFocusBlockSlots(slotList: string[]): void {
      if (this.focusBlock && this.focusBlock.type === 'block') {
        const oldSlots = this.focusBlock.slots
        const newSlots = {}
        slotList.forEach((name) => {
          newSlots[name] = oldSlots[name] || []
        })
        this.focusBlock.slots = newSlots
      }
    },
  },
})

export interface AppPagesStore {
  pages: AppPageList
  currentPage: AppPageItem
  focusBlock: AppBlock | AppBlockGroup | null
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

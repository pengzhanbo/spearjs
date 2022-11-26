import { findBlockByBid } from '@editor/services'
import type {
  AppBlock,
  AppBlockAction,
  AppBlockGroup,
  AppBlocks,
  BlockEditorOption,
} from '@spearjs/core'
import { hasOwn } from '@spearjs/shared'
import { defineStore } from 'pinia'

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
    updateAppPage(state: AppPagesStore) {
      Object.assign(this, state)
    },
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
    setCurrentPageByPath(path: string): string {
      const page = this.pages.find((page) => page.path === path)
      this.currentPage = page || this.pages[0]
      return this.currentPage.path
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
    parseRoadMap(roadMap: string) {
      let blocks = this.currentPage.blocks
      let block!: AppBlock | AppBlockGroup
      if (!roadMap) return { blocks, block }
      const mapList = roadMap.split('|')
      let i = 0
      while (i < mapList.length) {
        if (i === 0) {
          block = blocks[Number(mapList[i])]
        } else {
          const [type, name] = mapList[i].split(':')
          if (type !== 'slot') {
            const index = Number(type)
            if (block.type === 'group') {
              blocks = block.blocks
            }
            block = blocks[index]
          } else {
            blocks = (block as AppBlock).slots[name]
          }
        }
        i++
      }
      return { blocks, block }
    },
    addBlock(block: AppBlock | AppBlockGroup, roadMap?: string, insertTo?: number): void {
      roadMap = roadMap || ''
      const { blocks } = this.parseRoadMap(roadMap)
      if (insertTo === undefined) {
        blocks.push(block)
      } else {
        blocks.splice(insertTo, 0, block)
      }
    },
    pushBlockToGroup(item: AppBlock | AppBlockGroup, roadMap?: string) {
      roadMap = roadMap || ''
      const { block } = this.parseRoadMap(roadMap)
      if (block.type === 'group') {
        block.blocks.push(item)
      }
    },
    deleteBlock(
      index: number,
      roadMap?: string,
      done?: (block: AppBlock | AppBlockGroup) => void
    ): AppBlock | AppBlockGroup {
      roadMap = roadMap || ''
      const { blocks } = this.parseRoadMap(roadMap)
      const block = blocks[index]
      done && done(block)
      blocks.splice(index, 1)
      return block
    },
    moveSameRoadMapBlock(source: number, target: number, roadMap?: string): void {
      roadMap = roadMap || ''
      const { blocks } = this.parseRoadMap(roadMap)
      const block = blocks[source]
      if (source > target) {
        blocks.splice(source, 1)
        blocks.splice(target, 0, block)
      } else {
        blocks.splice(target, 0, block)
        blocks.splice(source, 1)
      }
    },
    setFocusBlock(block: AppBlock | AppBlockGroup | null) {
      this.focusBlock = block
    },
    updateFocusBlockProps(props: Record<string, any>): void {
      if (this.focusBlock && this.focusBlock.type === 'block') {
        this.focusBlock.props = props
      }
    },
    updateFocusBlockStyles(styles: Record<string, any>): void {
      if (this.focusBlock && this.focusBlock.type === 'block') {
        this.focusBlock.styles = styles
      }
    },
    updateFocusBlockSlots(slotList: string[]): void {
      if (this.focusBlock && this.focusBlock.type === 'block') {
        const oldSlots = this.focusBlock.slots
        const newSlots: Record<string, AppBlocks> = {}
        slotList.forEach((name) => {
          newSlots[name] = oldSlots[name] || []
        })
        this.focusBlock.slots = newSlots
      }
    },
    updateFocusBlockAction(name: string, action: AppBlockAction, index: number) {
      if (this.focusBlock && this.focusBlock.type === 'block') {
        this.focusBlock.actions[name][index] = action
      }
    },
    addFocusBlockAction(name: string, action: AppBlockAction) {
      if (this.focusBlock && this.focusBlock.type === 'block') {
        this.focusBlock.actions[name].push({ ...action })
      }
    },
    deleteFocusBlockAction(name: string, index: number) {
      if (this.focusBlock && this.focusBlock.type === 'block') {
        this.focusBlock.actions[name].splice(index, 1)
      }
    },
    updateBlockLabel(bid: string, label: string) {
      const block = findBlockByBid(this.currentPage.blocks, bid)
      if (block) {
        block.label = label
      }
    },
    updateBlockEditorOption(bid: string, option: BlockEditorOption) {
      const block = findBlockByBid(this.currentPage.blocks, bid)
      if (block) {
        Object.assign(block.editor, option)
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

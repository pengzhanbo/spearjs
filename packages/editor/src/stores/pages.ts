import { defineStore } from 'pinia'
import { ComponentWidget, hasOwn, WidgetPropItem, WidgetPropsGroup } from '@spearjs/shared'
import { generateComponentId } from '@editor/services/componentId'

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

function getDefaultValue(type: any, defaultValue: any): any {
  if (type === String) {
    return defaultValue || ''
  }
  if (type === Object) {
    return defaultValue || {}
  }
  if (type === Array) {
    return defaultValue || []
  }
  if (type === Boolean) {
    return !!defaultValue
  }
  if (type === Function) {
    return defaultValue || (() => {})
  }
  return defaultValue
}

let uuid = 0
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
          item.isHome = false
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
    createBlock(widget: ComponentWidget): AppBlock {
      const data = {}
      const { props } = widget
      props.forEach((prop) => {
        if ((prop as WidgetPropsGroup).props) {
          ;(prop as WidgetPropsGroup).props.forEach((prop: WidgetPropItem) => {
            data[prop.key] = getDefaultValue(prop.type, prop?.form?.defaultValue)
          })
        } else {
          prop = prop as WidgetPropItem
          data[prop.key] = getDefaultValue(prop.type, prop?.form?.defaultValue)
        }
      })
      return {
        component: {
          id: widget.id,
          name: 'widget-' + widget.id,
          version: widget.version,
        },
        componentId: generateComponentId(),
        props: { ...data, buttonText: (data as any).buttonText + uuid++ },
        styles: {},
      }
    },
    updateBlocks(blocks: AppBlocks) {
      this.currentPage.blocks = [...blocks]
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
  componentId: string
  props: Record<string, any>
  styles: Record<string, any>
}

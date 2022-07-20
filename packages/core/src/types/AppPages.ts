import type { AppBlocks } from './AppBlocks'

export type AppPageList = AppPage[]

export interface AppPage {
  path: string
  title: string
  isHome?: boolean
  config: AppPageConfig
  blocks: AppBlocks
  children?: AppPageList
}

export interface AppPageConfig {
  [prop: string]: any
}

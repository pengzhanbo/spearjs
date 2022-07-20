export type AppBlocks = (AppBlock | AppBlockGroup)[]

export interface AppBlockGroup {
  bid: string
  type: 'group'
  label: string
  blocks: AppBlocks
  editor: BlockEditorOption
}
export interface AppBlock {
  type: 'block'
  label: string
  widget: AppBlockWidgetAsset
  bid: string
  props: Record<string, any>
  styles: AppBlockStyles
  slots: Record<string, AppBlocks>
  actions: AppBlockActions
  editor: BlockEditorOption
}

export interface AppBlockWidgetAsset {
  id: string
  version: string
  js: string[] | string
  css: string[] | string
}

export type AppBlockActions = Record<string, AppBlockAction[]>

export interface AppBlockAction {
  /**
   * service 查找区间
   */
  type: 'global' | 'block'
  /**
   * type 为 block 时，通过 bid 查找 block 上的 expose
   */
  bid?: string
  /**
   * expose name
   */
  name: string
  /**
   * 参数映射
   * 将当前 block props 映射为 service 需要的第一个入参
   * service的第一个参数必须是一个对象
   */
  mapping: any[]
}

export interface BlockEditorOption {
  visibility: boolean
}

/**
 * 限定 layer的值格式
 */
export type LayerValue = `${number}px` | `${number}rem` | `${number}%` | 0 | '0' | 'auto' | ''

export interface AppBlockStyles {
  display?: 'inline-block' | 'block'
  width?: LayerValue
  height?: LayerValue
  zIndex?: number
  position?: 'relative' | 'absolute' | 'fixed' | 'sticky' | ''
  top?: LayerValue
  right?: LayerValue
  bottom?: LayerValue
  left?: LayerValue
  paddingTop?: LayerValue
  paddingRight?: LayerValue
  paddingBottom?: LayerValue
  paddingLeft?: LayerValue
  backgroundColor?: LayerValue
  marginTop?: LayerValue | 'auto'
  marginRight?: LayerValue | 'auto'
  marginBottom?: LayerValue | 'auto'
  marginLeft?: LayerValue | 'auto'
  borderTop?: LayerValue
  borderRight?: LayerValue
  borderBottom?: LayerValue
  borderLeft?: LayerValue
  opacity?: number
}

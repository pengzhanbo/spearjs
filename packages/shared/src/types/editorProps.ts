/**
 * 编辑器 配置字段类型
 */
export type EditorPropsType =
  | 'input'
  | 'inputNumber'
  | 'color'
  | 'select'
  | 'table'
  | 'switch'
  | 'modelBind'

/**
 * 编辑器下拉选择器配置项
 */
export interface EditorSelectorOptionsItem {
  label: string
  value: string | number | boolean | object
  [prop: string]: any
}

/**
 * 编辑器下拉选择器配置
 */
export type EditorSelectorOptions = EditorSelectorOptionsItem[]

/**
 * 编辑器表格配置
 */
export interface EditorTableOptions {
  options: {
    label: string
    field: string
  }[]
  showKey: string
}

/**
 * 编辑器配置属性
 */
export interface EditorProps {
  type: EditorPropsType
  label: string
  tips?: string
  labelPosition?: string
  defaultValue?: any

  options?: EditorSelectorOptions
  multiple?: boolean
  showItemPropsConfig?: boolean

  max?: number
  min?: number

  table?: EditorTableOptions
}

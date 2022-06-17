import type { FormItemRule } from 'element-plus'

export type WidgetPropsType =
  | 'text'
  | 'number'
  | 'select'
  | 'switch'
  | 'date'
  | 'color'
  | 'group'
  | 'object'
  | 'array'

export type WidgetPropItem =
  | WidgetTextProp
  | WidgetNumberProp
  | WidgetSelectProp
  | WidgetSwitchProp
  | WidgetDateProp
  | WidgetObjectProp
  | WidgetColorProp
  | WidgetArrayProp

export type WidgetProps = (WidgetPropItem | WidgetGroupProp)[]

export interface WidgetBaseProp {
  key: string
  type: WidgetPropsType
  label: string
  tips?: string
}

export interface WidgetGroupProp {
  type: 'group'
  label: string
  props: WidgetPropItem[]
}

export interface WidgetTextProp extends WidgetBaseProp {
  type: 'text'
  defaultValue?: string
  maxLength?: number
  rules?: FormItemRule | FormItemRule[]
  /**
   * 是否使用 文本域
   */
  textarea?: boolean
  /**
   * 占位内容
   */
  placeholder?: string
  /**
   * 使用 textarea时，显示行数
   */
  rows?: number
  /**
   * 使用 textarea 时，是否自动撑开高度
   */
  autosize?: boolean | { minRows: number; maxRows: number }
}

export interface WidgetNumberProp extends WidgetBaseProp {
  type: 'number'
  defaultValue?: number
  max?: number
  min?: number
  /**
   * 步进
   */
  step?: number
  /**
   * 显示精度
   */
  precision?: number
}

export interface WidgetSelectPropOptionsItem<T = any> {
  label: string
  value: T
}

export interface WidgetSelectPropOptionsGroup<T = any> {
  label: string
  options: WidgetSelectPropOptionsItem<T>[]
}

export type WidgetSelectPropOptions<T = any> = (
  | WidgetSelectPropOptionsGroup<T>
  | WidgetSelectPropOptionsItem<T>
)[]

export interface WidgetSelectProp<T = any> extends WidgetBaseProp {
  type: 'select'
  defaultValue?: T
  options: WidgetSelectPropOptions<T>
  multiple?: boolean
  multipleLimit?: number
  keyValue?: string
  clearable?: boolean
  collapseTags?: boolean
  collapseTagsTooltip?: boolean
  placeholder?: string
  filterable?: boolean
  allowCreate?: boolean
  filterMethod?: (options: WidgetSelectPropOptions<T>) => WidgetSelectPropOptions<T>
  remote?: boolean
  remoteMethod?: (query: string) => WidgetSelectPropOptions<T>
  loading?: boolean
  loadingText?: string
  noMatchText?: string
  noDataText?: string
  defaultFirstOption?: boolean
}

export interface WidgetSwitchProp extends WidgetBaseProp {
  type: 'switch'
  defaultValue?: boolean | string | number
  activeText?: string
  inactiveText?: string
  activeValue?: boolean | string | number
  inactiveValue?: boolean | string | number
}

export interface WidgetDateProp extends WidgetBaseProp {
  type: 'date'
  defaultValue?: Date
}

export interface WidgetColorProp extends WidgetBaseProp {
  type: 'color'
  defaultValue?: string
  format?: 'hex' | 'rgb'
}

export interface WidgetObjectProp extends WidgetBaseProp {
  type: 'object'
  label: string
  defaultValue?: Record<string, any>
  props: WidgetPropItem[]
}

export type WidgetArrayPropItem =
  | Omit<WidgetTextProp, 'key'>
  | Omit<WidgetNumberProp, 'key'>
  | Omit<WidgetSelectProp, 'key'>
  | Omit<WidgetSwitchProp, 'key'>
  | Omit<WidgetDateProp, 'key'>
  | Omit<WidgetColorProp, 'key'>
  | Omit<WidgetObjectProp, 'key'>
  | Omit<WidgetArrayProp, 'key'>

export interface WidgetArrayProp extends WidgetBaseProp {
  type: 'array'
  defaultValue?: any[]
  maxLength?: number
  minLength?: number
  items: WidgetArrayPropItem | WidgetArrayPropItem[]
}

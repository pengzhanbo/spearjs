import type { FormItemRule } from 'element-plus'
import type { CSSProperties } from 'vue'

/**
 * textView 文本展示 | text 文本输入框 | number 数组输入框 | select 下拉选择器 | radio 单选框 |
 * checkbox 复选框 | color 颜色选择器 | border 边框选择器 | slider 滑动条 |
 * group 分组 | object 对象配置 | array 数组配置
 *
 * todo: route 选择跳转路由 | service 选择服务 | bindModel 数据模型绑定
 * todo: richText 富文本编辑 | upload 资源上传
 */
export type WidgetPropsType =
  | 'textView'
  | 'text'
  | 'number'
  | 'select'
  | 'switch'
  | 'radio'
  | 'checkbox'
  | 'date'
  | 'color'
  | 'border'
  | 'slider'
  | 'richText'
  | 'group'
  | 'object'
  | 'array'

export type WidgetPropItem =
  | WidgetTextViewProp
  | WidgetTextProp
  | WidgetNumberProp
  | WidgetSelectProp
  | WidgetSwitchProp
  | WidgetCheckboxProp
  | WidgetSliderProp
  | WidgetRadioProp
  | WidgetDateProp
  | WidgetColorProp
  | WidgetBorderProp
  | WidgetRichTextProp
  | WidgetObjectProp
  | WidgetArrayProp

export type WidgetProps = (WidgetPropItem | WidgetGroupProp)[]

export type WidgetPropOptions = (
  | {
      label: string
      value: any
    }
  | string
  | number
)[]

export interface WidgetBaseProp<P = Record<string, any>> {
  /**
   * prop key
   */
  key: string
  /**
   * 配置类型
   */
  type: WidgetPropsType
  /**
   * 显示 label
   */
  label: string
  /**
   * 提示信息
   */
  tips?: string

  showProp?: boolean | ((props: P) => boolean)
}

/**
 * props 分组配置
 *
 * 分组有利于 分类 不同的 prop，
 * 用更加清晰的方式组织你的props
 */
export interface WidgetGroupProp<P = Record<string, any>> {
  type: 'group'
  label: string
  /**
   * 是否展开
   */
  spread?: boolean
  /**
   * 是否强制展开
   */
  forgetSpread?: boolean
  /**
   * 提示信息
   */
  tips?: string
  props: WidgetPropItem[]

  showProp?: boolean | ((props: P) => boolean)
}

export interface WidgetTextViewProp extends WidgetBaseProp {
  type: 'textView'
}

/**
 * 文本类型 prop 配置
 *
 * 支持配置 textarea
 */
export interface WidgetTextProp extends WidgetBaseProp {
  type: 'text'
  /**
   * 默认值
   */
  defaultValue?: string
  /**
   * 文本长度
   */
  maxLength?: number
  /**
   * 校验规则
   */
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

/**
 * 配置 数字类型 prop
 */
export interface WidgetNumberProp extends WidgetBaseProp {
  type: 'number'
  /**
   * 默认值
   */
  defaultValue?: number
  /**
   * 最大值
   */
  max?: number
  /**
   * 最小值
   */
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
  options: WidgetSelectPropOptions<T> | ((props: Record<string, any>) => WidgetSelectPropOptions<T>)
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

export interface WidgetRadioProp extends WidgetBaseProp {
  type: 'radio'
  defaultValue?: any
  options: WidgetPropOptions
  border?: boolean
  button?: boolean
}

export interface WidgetCheckboxProp extends WidgetBaseProp {
  type: 'checkbox'
  defaultValue?: any[]
  border?: boolean
  button?: boolean
  options: WidgetPropOptions
  checkAll?: boolean
  min?: number
  max?: number
}

export interface WidgetSliderProp extends WidgetBaseProp {
  type: 'slider'
  defaultValue?: number | [number, number]
  min?: number
  max?: number
  step?: number
  showInput?: boolean
  range?: boolean
  showStops?: boolean
  marks?: Record<number | string, string | { style?: CSSProperties; label: string }>
}

// todo date prop
export interface WidgetDateProp extends WidgetBaseProp {
  type: 'date'
  defaultValue?: Date
}

export interface WidgetColorProp extends WidgetBaseProp {
  type: 'color'
  defaultValue?: string
  colorFormat?: 'hsl' | 'hsv' | 'hex' | 'rgb'
  showAlpha?: boolean
  predefine?: string[]
}

export interface WidgetBorderProp extends WidgetBaseProp {
  type: 'border'
  /**
   * 默认值的书写顺序必须是 `border-width border-style border-color`
   */
  defaultValue?: `${string} ${string} ${string}`
  colorFormat: 'hsl' | 'hsv' | 'hex' | 'rgb'
  showAlpha?: boolean
  predefine?: string[]
}

export interface WidgetRichTextProp extends WidgetBaseProp {
  type: 'richText'
  defaultValue?: string
}

export interface WidgetObjectProp extends WidgetBaseProp {
  type: 'object'
  label: string
  defaultValue?: Record<string, any>
  props: WidgetPropItem[]
}

export type WidgetArrayPropItem =
  | Omit<WidgetTextViewProp, 'key'>
  | Omit<WidgetTextProp, 'key'>
  | Omit<WidgetNumberProp, 'key'>
  | Omit<WidgetSelectProp, 'key'>
  | Omit<WidgetSwitchProp, 'key'>
  | Omit<WidgetRadioProp, 'key'>
  | Omit<WidgetCheckboxProp, 'key'>
  | Omit<WidgetSliderProp, 'key'>
  | Omit<WidgetDateProp, 'key'>
  | Omit<WidgetColorProp, 'key'>
  | Omit<WidgetBorderProp, 'key'>
  | Omit<WidgetRichTextProp, 'key'>
  | Omit<WidgetObjectProp, 'key'>
  | Omit<WidgetArrayProp, 'key'>

export interface WidgetArrayProp extends WidgetBaseProp {
  type: 'array'
  defaultValue?: any[]
  maxLength?: number
  minLength?: number
  items: WidgetArrayPropItem | WidgetArrayPropItem[]
}

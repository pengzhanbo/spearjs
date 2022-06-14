export type WidgetPropsType =
  | 'text'
  | 'number'
  | 'select'
  | 'switch'
  | 'date'
  | 'group'
  | 'object'
  | 'array'

export type WidgetPropItem<T = any, F = T> =
  | WidgetTextProp
  | WidgetNumberProp
  | WidgetSelectProp<T>
  | WidgetSwitchProp<T, F>
  | WidgetDateProp
  | WidgetObjectProp
  | WidgetArrayProp<T, F>
  | WidgetGroupProp

export type WidgetProps<T = any, F = T> = WidgetPropItem<T, F>[]

export interface WidgetBaseProp {
  key: string
  type: WidgetPropsType
  label: string
  tips?: string
}

export interface WidgetGroupProp {
  type: 'group'
  label: string
  props: WidgetProps
}

export interface WidgetTextProp extends WidgetBaseProp {
  type: 'text'
  defaultValue?: string
  maxLength: number
  validator: (key: string) => boolean | RegExp
}

export interface WidgetNumberProp extends WidgetBaseProp {
  type: 'number'
  defaultValue?: number
  max?: number
  min?: number
}

export interface WidgetSelectProp<T = any> extends WidgetBaseProp {
  type: 'select'
  defaultValue?: T
  options: {
    label: string
    value: T
  }[]
  multiple: boolean
}

export interface WidgetSwitchProp<T = any, F = T> extends WidgetBaseProp {
  type: 'switch'
  defaultValue?: boolean
  truly?: T
  falsely?: F
}

export interface WidgetDateProp extends WidgetBaseProp {
  type: 'date'
  defaultValue?: Date
}

export interface WidgetObjectProp extends WidgetBaseProp {
  type: 'object'
  label: string
  props: (
    | WidgetTextProp
    | WidgetNumberProp
    | WidgetObjectProp
    | WidgetDateProp
    | WidgetSelectProp
    | WidgetSwitchProp
    | WidgetArrayProp
  )[]
}

export interface WidgetArrayProp<T = any, K = any, F = K> extends WidgetBaseProp {
  type: 'array'
  defaultValue?: T[]
  items: Omit<WidgetPropItem<K, F>, 'key'> & { defaultValue?: unknown }
}

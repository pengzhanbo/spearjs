import type { Platform } from './platform'
import type { RenderFunction, SetupContext } from 'vue'

/**
 * widget 类型
 *
 * component  组件
 *
 * service 提供各类服务支持，如 第三方库加载支持，接口请求封装， 数据封装 等功能类
 */
export type WidgetType = 'component' | 'service'

/**
 * 组件类型的 widget 的 组件类型
 *
 * basis 基础组件
 *
 * container 容器组件
 *
 * form 表单组件
 *
 * business 业务组件
 */
export type WidgetComponentType = 'basis' | 'container' | 'form' | 'business'

/**
 * 组件类型的 widget 的组件子类型
 *
 * 这个类型描述的是，当前组件是使用了第三方的UI框架，有外部依赖，
 * 并且在编辑器中，会将这类型单独归到子类中以作为区分。
 *
 * vant vant UI 框架的组件 适用于 移动端
 *
 * element-plus  element-plus UI 框架的组件 适用于 PC端
 */
export type WidgetComponentSubType = 'vant' | 'element-plus'

/**
 * widget 适用平台
 *
 * 可以同时适用于多个平台
 */
export type WidgetPlatform = Platform | Platform[]

export type WidgetMap = Widget[]

export type Widget = ComponentWidget | ServiceWidget

export interface BaseWidget {
  id: string
  version: string
  label: string
  platform: WidgetPlatform
  type: WidgetType
  enhance?: () => void
}
export interface ComponentWidget<Props = WidgetProps> extends BaseWidget {
  type: 'component'
  componentType: WidgetComponentType
  componentSubType?: WidgetComponentSubType
  props: Props
  slots?:
    | ((
        props: Record<
          Props extends WidgetProps<infer K>
            ? K extends WidgetPropsGroup
              ? K['props'][number]['key']
              : K extends WidgetPropItem
              ? K['key']
              : never
            : never,
          any
        >
      ) => string[])
    | string[]
  description: () => ReturnType<RenderFunction>
  preview: () => ReturnType<RenderFunction>
  setup?: <
    P = Record<
      Props extends WidgetProps<infer K>
        ? K extends WidgetPropsGroup
          ? K['props'][number]['key']
          : K extends WidgetPropItem
          ? K['key']
          : never
        : never,
      any
    >,
    RawBindings = object
  >(
    props: Readonly<P>,
    ctx: SetupContext
  ) => ComponentWidget['render'] | RawBindings
  render?: (option: {
    props: Record<
      Props extends WidgetProps<infer K>
        ? K extends WidgetPropsGroup
          ? K['props'][number]['key']
          : K extends WidgetPropItem
          ? K['key']
          : never
        : never,
      any
    > & { [prop: string]: any }
    styles: {
      [prop: string]: string
    }
    [prop: string]: any
  }) => ReturnType<RenderFunction>
}

export interface ServiceWidget extends BaseWidget {
  type: 'service'
  service?: WightService
  services?: WightService[]
}

export interface WightService {
  type: string
  name: string
  fn: <T>() => () => T | Promise<T>
}

export type WidgetProps<T = WidgetPropsGroup | WidgetPropItem> = T[]

export interface WidgetPropsGroup {
  key: string
  label: string
  props: WidgetPropItem[]
}

export interface WidgetPropItem {
  key: string
  type: any
  form: {
    label: string
    type: string
    defaultValue: any
    options?: {
      label: string
      key: string
      defaultValue?: any
    }[]
  }
}

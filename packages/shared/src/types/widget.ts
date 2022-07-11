import type {
  App,
  ComponentPublicInstance,
  CSSProperties,
  RenderFunction,
  SetupContext,
  VNode,
} from 'vue'
import type { Router } from 'vue-router'
import type { Platform } from './platform'
import type { WidgetVersion } from './version'
import type { WidgetProps } from './widgetProps'

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
 * 组件类型的 widget 的组件 U框架依赖
 *
 * 这个类型描述的是，当前组件是使用了第三方的UI框架，有外部依赖，
 * 并且在编辑器中，会将这类型单独归到子类中以作为区分。
 *
 * vant vant UI 框架的组件 适用于 移动端
 * element-plus  element-plus UI 框架的组件 适用于 PC端
 * ant-design-vue UI框架，适用于PC端
 * naive-ui UI框架，适用于PC端
 */
export type WidgetDependence = 'vant' | 'element-plus' | 'ant-design-vue' | 'naive-ui'

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
  version: WidgetVersion
  /**
   * widget 名称
   */
  label: string
  /**
   * widget 适用的平台
   */
  platform: WidgetPlatform
  /**
   * widget 类型，component 表示提供组件， service 表示提供服务
   */
  type: WidgetType
}

/**
 * 组件类型的widget
 */
export interface ComponentWidget<P = Record<string, any>, RawBinding = Record<string, any>>
  extends BaseWidget {
  type: 'component'
  /**
   * 组件widget的类型，包括基础组件、容器组件、表单组件、业务组件等
   */
  componentType: WidgetComponentType
  /**
   * 组件widget的UI框架依赖
   */
  dependence?: WidgetDependence
  /**
   * 组件的 props 定义描述
   */
  props?: WidgetProps
  /**
   * 组件的 actions 动作 定义描述
   */
  actions?: WidgetActions
  /**
   * 组件对外导出的 变量或方法 的定义描述
   */
  expose?: WidgetExposeList
  /**
   * 组件 slots 的描述
   */
  slots?: ((props: P) => string[]) | string[]
  /**
   * 组件所在层控制
   */
  layer?: WidgetComponentLayer
  /**
   * widget的使用描述，
   *
   * 这里提供为一个render function是为了更灵活的表述组件的使用说明
   */
  description: () => ReturnType<RenderFunction>
  /**
   * 提供组件预览，展示在编辑器的左侧组件列表中
   *
   * 尽可能简单的展示组件的大略渲染效果即可
   */
  preview: () => ReturnType<RenderFunction>
  /**
   * 类似于 vue 组件的 setup函数，但是不能返回一个 render function
   * 支持返回一个数据对象，可以在render中通过 this[key] 获取
   */
  setup?: (props: Readonly<P>, ctx: SetupContext & { bid: string }) => RawBinding | undefined
  /**
   * 渲染函数
   */
  render: (
    this: ComponentPublicInstance<P> & RawBinding,
    option: {
      props: Readonly<P>
      slots: WidgetSlots
      action: (name: string) => void
      [prop: string]: any
    }
  ) => ReturnType<RenderFunction>
}

/**
 * todo: Service Widget Type
 */
export interface ServiceWidget extends BaseWidget {
  type: 'service'
  enhance?: (option: { app: App; router: Router }) => void
  service?: WightService
  services?: WightService[]
}

export interface WightService {
  type: string
  label: string
  fn: <T>() => () => T | Promise<T>
}

/**
 * 对于 slot，可以通过 class 或者 style 来控制slot所在层的表现
 */
export interface WidgetSlotOptions {
  class?: string | string[]
  style?: CSSProperties
}

/**
 * 描述 widget component slot
 */
export interface WidgetSlots {
  [slotName: string]: (options?: WidgetSlotOptions) => VNode
}

/**
 * widget actions 动作列表
 */
export type WidgetActions = WidgetAction[]

/**
 * 定义动作
 */
export interface WidgetAction {
  /**
   * 动作名称，标签，仅展示时使用
   */
  label: string
  /**
   * 动作名
   */
  action: string
  /**
   * 提示信息
   */
  tips?: string
}

/**
 * 组件类型的widget可以对外导出方法或属性，提供给其他组件监听或者通过动作调用
 */
export type WidgetExposeList = WidgetExpose[]

export interface WidgetExpose {
  /**
   * 导出类型，方法、 属性
   */
  type: 'method' | 'prop'
  /**
   * 标签描述
   */
  label: string
  /**
   * 方法名或属性名
   */
  name: string
  /**
   * 是否可被其他组件获取或者调用
   */
  global: boolean
}

/**
 * 限定 layer的值格式
 */
export type LayerValue = `${number}px` | `${number}rem` | `${number}%` | 0 | '0' | 'auto' | ''

/**
 * widget 组件所在层样式
 * 通过 layer控制层的表现行为。
 *
 * 但这里仅控制layer必须的表现，即 盒模型 上的必要属性，以及布局相关的必要属性
 *
 * 更多行为应该在内部实现的组件上进行控制
 */
export interface WidgetComponentLayer {
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

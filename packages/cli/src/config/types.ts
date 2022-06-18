import type {
  EditorProps,
  WidgetComponentSubType,
  WidgetComponentType,
  WidgetPlatform,
} from '@spearjs/shared'
import type { VNode } from 'vue'
interface UserBasicConfig {
  /**
   * widget 名称
   */
  label: string
  /**
   * widget 适用的平台
   */
  platform: WidgetPlatform
  /**
   * widget 使用说明 普通文本
   */
  description?: string
  /**
   * widget 使用说明， 支持 markdown 文件 或 .vue 文件，或者返回一个 render 函数
   *
   * 展示在 编辑器的 widget 描述中，尽可能的表述清楚使用方法，功能等
   */
  descriptionFiles?: string
  /**
   * 在编辑器中使用的，定义 widget的 预览、props、styles、actions 等
   */
  editorFiles?: string
  /**
   * widget 在 渲染器中正式渲染时使用，可以是一个 vue文件、或者 jsx/tsx 返回一个 vue组件或者 渲染函数
   */
  renderFiles?: string
  /**
   * widget 的外部依赖库，用于构建时做体积优化等，一般是声明为 elementPlus, vant 等
   */
  lib?: string[]
  /**
   * widget 打包构建输出目录
   *
   * 默认： dist
   */
  dest?: string
}

type UserConfigByComponent = UserBasicConfig & {
  /**
   * widget 类型， 当前支持 component 和 service
   */
  type: 'component'
  /**
   * widget 为组件时，组件的分类， 默认： basis
   */
  componentType: WidgetComponentType
  /**
   * widget 为组件时，组件的二级分类
   *
   * 比如，vant 组件，elementPlus 组件
   */
  componentSubType?: WidgetComponentSubType
}

type UserConfigByService = UserBasicConfig & {
  type: 'service'
}

export type UserConfig = UserConfigByComponent | UserConfigByService
export interface EditorWidgetByComponent {
  preview: () => JSX.Element | VNode
  props: EditorProps[]
}

export interface EditorWidgetByService {
  [prop: string]: any
}

export type EditorWidget = EditorWidgetByComponent | EditorWidgetByService

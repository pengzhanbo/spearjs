import type { BaseWidget, ComponentWidget } from '@spearjs/shared'

export interface UserBasicConfig {
  /**
   * widget 名称
   */
  name: string

  /**
   * widget 适用的平台
   */
  platform: BaseWidget['platform']

  /**
   * 在编辑器中使用的，定义 widget的 预览、props、styles、actions 等
   */
  editorFiles?: string
  /**
   * widget 在 渲染器中正式渲染时使用，可以是一个 vue文件、或者 jsx/tsx 返回一个 vue组件或者 渲染函数
   */
  renderFiles?: string

  /**
   * widget 打包构建输出目录
   *
   * 默认： dist
   */
  dest?: string
}

export interface UserConfigByComponent extends UserBasicConfig {
  /**
   * widget 类型， 当前支持 component 和 service
   */
  type: 'component'
  /**
   * widget 为组件时，组件的分类， 默认： basis
   */
  componentType: ComponentWidget['componentType']
  /**
   * widget 为组件时，组件的二级分类
   *
   * 比如，vant 组件，elementPlus 组件
   */
  dependence?: ComponentWidget['dependence']
}

export interface UserConfigByService extends UserBasicConfig {
  type: 'service'
}

export type UserConfig = UserConfigByComponent | UserConfigByService

declare module 'spearjs/widget/*' {
  const result: any
  export default result
}

declare module 'spearjs/widget/config' {
  import type {
    WidgetComponentType,
    WidgetDependence,
    WidgetPlatform,
    WidgetType,
    WidgetVersion,
  } from '@spearjs/shared'
  const config: {
    id: string
    version: WidgetVersion
    name: string
    platform: WidgetPlatform
    type: WidgetType
    componentType: WidgetComponentType
    dependence: WidgetDependence
  }
  export default config
}

declare module 'spearjs/widget/editor' {
  const editor: any
  export default editor
}

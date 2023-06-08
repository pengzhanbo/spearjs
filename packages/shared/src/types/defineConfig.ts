import type { ComponentPublicInstance, RenderFunction, SetupContext } from 'vue'
import type {
  ComponentWidget,
  ServiceWidget,
  WidgetActions,
  WidgetComponentLayer,
  WidgetExposeList,
  WidgetSlots,
} from './widget'
import type { WidgetProps } from './widgetProps'

export interface EditorConfigByComponent {
  preview: () => ReturnType<RenderFunction>
  description: string | ComponentWidget['description']
  props?: WidgetProps
  slots?: ((props: Record<string, any>) => string[]) | string[]
  actions?: WidgetActions
  layer?: WidgetComponentLayer
  expose?: WidgetExposeList
}
export interface EditorConfigByService {
  description: string | (() => ReturnType<RenderFunction>)
}

export type EditorConfig = EditorConfigByComponent | EditorConfigByService

export interface RenderConfigByComponent<Props, RawBindings> {
  setup?: (
    props: Readonly<Props>,
    ctx: SetupContext & { bid: string },
  ) => RawBindings
  render: (
    this: RawBindings & ComponentPublicInstance<Props>,
    options: {
      props: Readonly<Props>
      slots: WidgetSlots
      action: (name: string) => void
    },
  ) => ReturnType<RenderFunction>
}

export interface RenderConfigByService {
  enhance?: ServiceWidget['enhance']
}

export type RenderConfig<Props, RawBindings> =
  | RenderConfigByComponent<Props, RawBindings>
  | RenderConfigByService

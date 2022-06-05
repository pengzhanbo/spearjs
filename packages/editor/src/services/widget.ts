import type { ComponentWidget } from '@spearjs/shared'
import type { DefineComponent, PropType, SetupContext } from 'vue'
import { defineComponent } from 'vue'

export interface WidgetComponentItem {
  id: string
  label: string
  version: string
  type: 'component'
  componentType: string
  url: string
}

export const getWidgetComponentList = async ({
  type = 'basis',
}): Promise<WidgetComponentItem[]> => {
  console.log(type)
  return [
    {
      id: 'button',
      label: 'button',
      version: '1.0.0',
      type: 'component',
      componentType: 'basis',
      url: '',
    },
  ]
}

export const findWidget = (id: string, version: string) => {
  const spearJs = window.__spearjs_low_code__ || {}
  const widgetMap = spearJs.widgetMap || {}
  const key = `${id}-${version}`
  return widgetMap[key]
}

export type DefineWidgetComponent = DefineComponent<{
  componentId: string
  props: Record<string, any>
  styles: Record<string, any>
}>

const componentList: Record<string, DefineWidgetComponent> = {}

export function createComponent({
  id,
  version,
  render,
  setup,
}: ComponentWidget): DefineWidgetComponent {
  const name = `Widget${id}${version}`
  if (componentList[name]) {
    return componentList[name]
  }
  componentList[name] = defineComponent({
    name,
    props: {
      componentId: {
        type: String,
        default: 'com_',
      },
      props: {
        type: Object as PropType<Record<string, any>>,
        default: () => ({}),
      },
      styles: {
        type: Object as PropType<Record<string, any>>,
        default: () => ({}),
      },
    },
    setup: (props, ctx: SetupContext) => {
      if (setup) {
        // @ts-ignore
        return setup(props, ctx)
      }
    },
    render({ props, styles, $attrs, $slots, $emit }) {
      return render!.bind(this)({
        props,
        styles,
        slots: $slots,
        attrs: $attrs,
        emit: $emit,
      })
    },
  }) as DefineWidgetComponent

  return componentList[name]
}

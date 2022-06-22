import type { ComponentWidget } from '@spearjs/shared'
import type { DefineComponent, PropType, SetupContext } from 'vue'
import { defineComponent } from 'vue'
import { generateWidgetName } from './idGenerator'

export type DefineWidgetComponent = DefineComponent<{
  bid: string
  props: Record<string, any>
  styles: Record<string, any>
}>

const componentList: Record<string, DefineWidgetComponent> = {}

/**
 * 根据 widget，创建一个 widget对应的 component
 * @param {ComponentWidget} option
 * @returns {DefineWidgetComponent}
 */
export function createWidgetComponent({
  id,
  version,
  render,
  setup,
}: ComponentWidget): DefineWidgetComponent {
  const key = `${id}-v${version}`
  if (componentList[key]) {
    return componentList[key]
  }
  componentList[key] = defineComponent({
    name: generateWidgetName(),
    props: {
      bid: {
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
      // TODO 通过 bid 将组件实例挂载

      // 允许 widget 内部自定义 setup，自定义其他的数据或者逻辑，
      // 在 render 中可以通过 this[prop] 获取到相关的返回内容
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

  return componentList[key]
}

import { useBlock } from '@editor/hooks/useBlock'
import type { ComponentWidget } from '@spearjs/shared'
import type {
  ComponentOptions,
  DefineComponent,
  PropType,
  SetupContext,
} from 'vue'
import { defineComponent, getCurrentInstance, onUnmounted } from 'vue'
import {
  addComponentInstance,
  deleteComponentInstance,
} from './componentInstanceMap'
import { generateWidgetName } from './idGenerator'

export type DefineWidgetComponent = DefineComponent<{
  bid: string
  props: Record<string, any>
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
    },
    setup: (props, ctx: SetupContext) => {
      // TODO 通过 bid 将组件实例挂载
      addComponentInstance(props.bid, getCurrentInstance()!)
      onUnmounted(() => deleteComponentInstance(props.bid))

      const block = useBlock()

      // expose 有调用次数限制
      // 注入 expose 预导出
      // 同时允许 覆盖预设导出的方法
      const expose: SetupContext['expose'] = (
        exposed?: Record<string, any>,
      ) => {
        exposed = Object.assign(
          {
            show: () => block.setStyles({ display: '' }),
            hide: () => block.setStyles({ display: 'none' }),
          },
          exposed || {},
        )
        ctx.expose(exposed)
      }

      const res = { action: block.action }

      // 允许 widget 内部自定义 setup，自定义其他的数据或者逻辑，
      // 在 render 中可以通过 this[prop] 获取到相关的返回内容
      if (setup) {
        Object.assign(
          res,
          setup(props.props, { ...ctx, bid: props.bid, expose }) || {},
        )
      }
      return res
    },
    render({ props, $attrs, $slots, $emit }: ComponentOptions) {
      return render!.bind(this)({
        props,
        slots: $slots,
        attrs: $attrs,
        emit: $emit,
        action: this.action,
      })
    },
  }) as DefineWidgetComponent

  return componentList[key]
}

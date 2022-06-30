import type { WidgetPropItem } from '@spearjs/shared'
import { isFunction } from '@spearjs/shared'
import { computed, defineComponent, h, readonly, toRaw } from 'vue'
import type { PropType } from 'vue'
import { components } from './components'
import type { FormInjectKey } from './hooks'
import { useFormData } from './hooks'

export default defineComponent({
  name: 'FormidablePropItem',
  props: {
    config: {
      type: Object as PropType<WidgetPropItem>,
      required: true,
    },
    injectKey: {
      type: Symbol as PropType<FormInjectKey>,
      required: true,
    },
    dotKey: {
      type: String,
      default: '',
    },
  },
  setup(props, { slots }) {
    const model = useFormData(props.injectKey)
    const show = computed(() => {
      const showProp = typeof props.config.showProp === 'undefined' ? true : props.config.showProp
      return isFunction(showProp) ? showProp(readonly(toRaw(model))) : showProp
    })

    return () =>
      h(
        components[props.config.type],
        {
          config: props.config,
          injectKey: props.injectKey,
          dotKey: props.dotKey,
          show: show.value,
        },
        slots
      )
  },
})

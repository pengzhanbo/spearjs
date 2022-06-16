import type { WidgetPropItem } from '@spearjs/shared'
import { defineComponent, h } from 'vue'
import type { PropType } from 'vue'
import { components } from './components'
import type { FormInjectKey } from './hooks'

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
    return () =>
      h(
        components[props.config.type],
        {
          config: props.config,
          injectKey: props.injectKey,
          dotKey: props.dotKey,
        },
        slots
      )
  },
})

import type { WidgetPropItem } from '@spearjs/shared'
import { defineComponent, h } from 'vue'
import type { PropType, InjectionKey } from 'vue'
import { components } from './components'

export default defineComponent({
  name: 'FormidablePropItem',
  props: {
    config: {
      type: Object as PropType<WidgetPropItem>,
      required: true,
    },
    injectKey: {
      type: Symbol as PropType<InjectionKey<symbol>>,
      required: true,
    },
  },
  setup(props) {
    return () =>
      h(components[props.config.type], { config: props.config, injectKey: props.injectKey })
  },
})

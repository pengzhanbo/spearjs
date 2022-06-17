import type { WidgetColorProp } from '@spearjs/shared'
import { defineComponent, PropType } from 'vue'
import { FormInjectKey } from '../hooks'

export default defineComponent({
  name: 'FormidableColorProp',
  props: {
    config: {
      type: Object as PropType<WidgetColorProp>,
      required: true,
    },
    injectKey: {
      type: Symbol as PropType<FormInjectKey>,
      required: true,
    },
  },
  setup() {
    return () => <div>color</div>
  },
})

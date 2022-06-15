import type { WidgetColorProp } from '@spearjs/shared'
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'FormidableColorProp',
  props: {
    config: {
      type: Object as PropType<WidgetColorProp>,
      required: true,
    },
    injectKey: {
      type: Symbol,
      required: true,
    },
  },
  setup() {
    return () => <div>color</div>
  },
})

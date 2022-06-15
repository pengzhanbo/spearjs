import type { WidgetArrayProp } from '@spearjs/shared'
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'FormidableArrayProp',
  props: {
    config: {
      type: Object as PropType<WidgetArrayProp>,
      required: true,
    },
    injectKey: {
      type: Symbol,
      required: true,
    },
  },
  setup() {
    return () => <div>array</div>
  },
})

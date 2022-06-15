import type { WidgetObjectProp } from '@spearjs/shared'
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'FormidableObjectProp',
  props: {
    config: {
      type: Object as PropType<WidgetObjectProp>,
      required: true,
    },
    injectKey: {
      type: Symbol,
      required: true,
    },
    dotKey: {
      type: String,
      default: '',
    },
  },
  setup() {
    return () => <div>object</div>
  },
})

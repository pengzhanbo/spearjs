import type { WidgetDateProp } from '@spearjs/shared'
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'FormidableDateProp',
  props: {
    config: {
      type: Object as PropType<WidgetDateProp>,
      required: true,
    },
    injectKey: {
      type: Symbol,
      required: true,
    },
  },
  setup() {
    return () => <div>date</div>
  },
})

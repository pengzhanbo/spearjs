import type { WidgetDateProp } from '@spearjs/shared'
import { defineComponent, PropType } from 'vue'
import { FormInjectKey } from '../hooks'

export default defineComponent({
  name: 'FormidableDateProp',
  props: {
    config: {
      type: Object as PropType<WidgetDateProp>,
      required: true,
    },
    injectKey: {
      type: Symbol as PropType<FormInjectKey>,
      required: true,
    },
  },
  setup() {
    return () => <div>date</div>
  },
})

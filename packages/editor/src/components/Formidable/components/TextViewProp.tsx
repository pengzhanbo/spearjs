import type { WidgetTextViewProp } from '@spearjs/shared'
import { ElFormItem } from 'element-plus'
import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import type { FormInjectKey } from '../hooks'
import { useDotKey, useDotProp, useFormData } from '../hooks'
import { tips } from '../Tips'

export default defineComponent({
  name: 'FormidableTextViewProp',
  props: {
    config: {
      type: Object as PropType<WidgetTextViewProp>,
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
    show: {
      type: Boolean,
      default: true,
    },
  },
  setup(props, { slots }) {
    const model = useFormData(props.injectKey)

    const dotKey = useDotKey(props)

    const text = useDotProp(model, dotKey)

    return () => (
      <ElFormItem
        label={props.config.label}
        labelWidth="auto"
        prop={dotKey.value}
        v-show={props.show}
        style={{ width: '100%' }}
      >
        <p class="w-full flex items-center justify-start">
          <p class="font-bold">{text.value}</p>
          {tips(props.config.tips)}
          {slots.default?.()}
        </p>
      </ElFormItem>
    )
  },
})

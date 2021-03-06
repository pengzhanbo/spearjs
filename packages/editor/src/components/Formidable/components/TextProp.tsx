import type { WidgetTextProp } from '@spearjs/shared'
import { ElFormItem, ElInput } from 'element-plus'
import { computed, defineComponent } from 'vue'
import type { PropType } from 'vue'
import type { FormInjectKey } from '../hooks'
import { useDotKey, useDotProp, useFormData } from '../hooks'
import { tips } from '../Tips'

export default defineComponent({
  name: 'FormidableTextProp',
  props: {
    config: {
      type: Object as PropType<WidgetTextProp>,
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

    const options = computed(() => {
      const config = props.config
      return {
        type: config.textarea ? 'textarea' : 'text',
        placeholder: config.placeholder ?? '',
        rows: config.rows || 2,
        autosize: config.autosize || false,
      }
    })

    return () => (
      <ElFormItem
        label={props.config.label}
        labelWidth="auto"
        rules={props.config.rules}
        prop={dotKey.value}
        v-show={props.show}
        style={{ width: props.config.textarea ? '100%' : '' }}
      >
        <p class="w-full flex items-center justify-start">
          <ElInput class="flex-1" v-model={text.value} {...options.value} />
          {tips(props.config.tips)}
          {slots.default?.()}
        </p>
      </ElFormItem>
    )
  },
})

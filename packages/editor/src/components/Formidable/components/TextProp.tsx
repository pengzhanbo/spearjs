import type { WidgetTextProp } from '@spearjs/shared'
import { computed, defineComponent, PropType } from 'vue'
import { ElFormItem, ElInput } from 'element-plus'
import { tips } from '../Tips'
import { useFormData, useDotProp } from '../hooks'

export default defineComponent({
  name: 'FormidableTextProp',
  props: {
    config: {
      type: Object as PropType<WidgetTextProp>,
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
  setup(props, { slots }) {
    const model = useFormData(props.injectKey)

    const dotKey = computed(() => {
      return props.dotKey ? `${props.dotKey}.${props.config.key}` : props.config.key
    })

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
      <ElFormItem label={props.config.label} rules={props.config.rules} prop={dotKey.value}>
        <p class="w-full flex items-center justify-start">
          <ElInput class="flex-1" v-model={text.value} {...options.value} />
          {tips(props.config.tips)}
          {slots.default?.()}
        </p>
      </ElFormItem>
    )
  },
})

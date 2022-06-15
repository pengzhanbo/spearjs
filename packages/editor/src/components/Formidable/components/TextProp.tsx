import type { WidgetTextProp } from '@spearjs/shared'
import { computed, defineComponent, PropType } from 'vue'
import { ElFormItem, ElInput } from 'element-plus'
import { tips } from '../Tips'
import { useFormData } from '../hooks'

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
  },
  setup(props) {
    const model = useFormData(props.injectKey)

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
      <ElFormItem label={props.config.label} rules={props.config.rules} prop={props.config.key}>
        <p class="w-full flex items-center justify-start">
          <ElInput class="flex-1" v-model={model.value[props.config.key]} {...options.value} />
          {tips(props.config.tips)}
        </p>
      </ElFormItem>
    )
  },
})

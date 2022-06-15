import type { WidgetNumberProp } from '@spearjs/shared'
import { defineComponent, PropType, computed } from 'vue'
import { ElFormItem, ElInputNumber } from 'element-plus'
import { tips } from '../Tips'
import { useFormData } from '../hooks'

export default defineComponent({
  name: 'FormidableNumberProp',
  props: {
    config: {
      type: Object as PropType<WidgetNumberProp>,
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
      const { defaultValue: _d, type: _t, tips: _ti, label: _l, key: _k, ...options } = props.config
      return options
    })

    return () => (
      <ElFormItem label={props.config.label} prop={props.config.key}>
        <p class="w-full flex items-center justify-start">
          <ElInputNumber
            class="flex-1"
            v-model={model.value[props.config.key]}
            {...options.value}
          />
          {tips(props.config.tips)}
        </p>
      </ElFormItem>
    )
  },
})

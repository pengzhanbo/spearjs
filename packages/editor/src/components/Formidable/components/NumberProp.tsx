import type { WidgetNumberProp } from '@spearjs/shared'
import { defineComponent, computed } from 'vue'
import type { PropType } from 'vue'
import { ElFormItem, ElInputNumber } from 'element-plus'
import { tips } from '../Tips'
import { useFormData, useDotProp, useDotKey, FormInjectKey } from '../hooks'

export default defineComponent({
  name: 'FormidableNumberProp',
  props: {
    config: {
      type: Object as PropType<WidgetNumberProp>,
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
  },
  setup(props, { slots }) {
    const model = useFormData(props.injectKey)
    const dotKey = useDotKey(props)
    const number = useDotProp(model, dotKey)

    const options = computed(() => {
      const { defaultValue: _d, type: _t, tips: _ti, label: _l, key: _k, ...options } = props.config
      return options
    })

    return () => (
      <ElFormItem label={props.config.label} labelWidth="auto" prop={dotKey.value}>
        <p class="w-full flex items-center justify-start">
          <ElInputNumber class="flex-1" v-model={number.value} {...options.value} />
          {tips(props.config.tips)}
          {slots.default?.()}
        </p>
      </ElFormItem>
    )
  },
})

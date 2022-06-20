import type { WidgetSliderProp } from '@spearjs/shared'
import { ElFormItem, ElSlider } from 'element-plus'
import { computed, defineComponent } from 'vue'
import type { PropType } from 'vue'
import type { FormInjectKey } from '../hooks'
import { useDotKey, useDotProp, useFormData } from '../hooks'
import { tips } from '../Tips'

export default defineComponent({
  name: 'FormidableSliderProp',
  props: {
    config: {
      type: Object as PropType<WidgetSliderProp>,
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
    const slider = useDotProp(model, dotKey)

    const options = computed(() => {
      const { min, max, step, showInput, showStops, range, marks } = props.config
      return { min, max, step, showInput, showStops, range, marks }
    })

    return () => (
      <ElFormItem class="w-full mr-4" label={props.config.label} prop={dotKey.value}>
        <p class="w-full flex items-center justify-start">
          <ElSlider class="flex-1" v-model={slider.value} {...options.value} />
          {tips(props.config.tips)}
          {slots.default?.()}
        </p>
      </ElFormItem>
    )
  },
})

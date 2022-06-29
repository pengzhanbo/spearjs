import type { WidgetCheckboxProp } from '@spearjs/shared'
import { ElColorPicker, ElFormItem } from 'element-plus'
import { computed, defineComponent } from 'vue'
import type { PropType } from 'vue'
import type { FormInjectKey } from '../hooks'
import { useDotKey, useDotProp, useFormData } from '../hooks'
import { tips } from '../Tips'

// TODO Checkbox Prop
export default defineComponent({
  name: 'FormidableColorProp',
  props: {
    config: {
      type: Object as PropType<WidgetCheckboxProp>,
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
    const color = useDotProp(model, dotKey)

    const options = computed(() => {
      // const { colorFormat, showAlpha, predefine } = props.config
      // return { colorFormat, showAlpha, predefine }
      return {}
    })

    return () => (
      <ElFormItem label={props.config.label} labelWidth="auto" prop={dotKey.value}>
        <p class="w-full flex items-center justify-start">
          <ElColorPicker class="flex-1" v-model={color.value} {...options.value} />
          {tips(props.config.tips)}
          {slots.default?.()}
        </p>
      </ElFormItem>
    )
  },
})
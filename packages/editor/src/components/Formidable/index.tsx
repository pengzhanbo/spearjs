import type { WidgetProps } from '@spearjs/shared'
import { defineComponent, PropType } from 'vue'
import { ElForm } from 'element-plus'
import PropItem from './PropItem'
import Group from './Group'
import { useVModel } from '@vueuse/core'
import { useFormDataProvide } from './hooks'

export default defineComponent({
  name: 'Formidable',
  props: {
    config: {
      type: Array as PropType<WidgetProps>,
      required: true,
    },
    modelValue: {
      type: Object as PropType<Record<string, any>>,
      default: () => ({}),
    },
  },
  setup(props, { emit }) {
    const model = useVModel(props, 'modelValue', emit)

    const injectKey = useFormDataProvide(model)

    return () => (
      <ElForm labelWidth="auto" model={model.value}>
        {props.config.map((prop) =>
          prop.type === 'group' ? (
            <Group config={prop} injectKey={injectKey} />
          ) : (
            <PropItem config={prop} injectKey={injectKey} />
          )
        )}
      </ElForm>
    )
  },
})

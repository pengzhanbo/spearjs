import type { WidgetProps } from '@spearjs/shared'
import { useVModel } from '@vueuse/core'
import { ElForm } from 'element-plus'
import type { PropType } from 'vue'
import { defineComponent } from 'vue'
import Group from './Group'
import type { FormData } from './hooks'
import { useFormDataProvide } from './hooks'
import styles from './index.module.scss'
import PropItem from './PropItem'

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

    const injectKey = useFormDataProvide(model as unknown as FormData)

    /* BUG form item 存在 嵌套行为导致了 labelWidth 计算有问题
     * 这是一个 element-plus 内部抛出的 debug warn
     */
    return () => (
      <ElForm
        class={styles.formWrapper}
        labelWidth="auto"
        model={model.value}
        inline
        labelSuffix=":"
        inlineMessage
      >
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

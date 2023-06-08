import type { WidgetRichTextProp } from '@spearjs/shared'
import { ElFormItem } from 'element-plus'
import type { PropType } from 'vue'
import { defineComponent } from 'vue'
import type { FormInjectKey } from '../hooks'
import { useDotKey, useDotProp, useFormData } from '../hooks'
import { tips } from '../Tips'

// todo 可以考虑替换为 tiny editor
export default defineComponent({
  name: 'FormidableRichTextProp',
  props: {
    config: {
      type: Object as PropType<WidgetRichTextProp>,
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
    const richText = useDotProp(model, dotKey)
    // eslint-disable-next-line no-console
    console.log(richText.value)

    return () => (
      <ElFormItem
        label={props.config.label}
        labelWidth="auto"
        prop={dotKey.value}
        v-show={props.show}
        class="w-full"
      >
        <p class="w-full flex items-center justify-between">
          {tips(props.config.tips)}
          {slots.default?.()}
        </p>
        <div class="w-full">富文本编辑器</div>
      </ElFormItem>
    )
  },
})

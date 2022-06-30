import type { WidgetRadioProp } from '@spearjs/shared'
import { isObject } from '@spearjs/shared'
import { ElFormItem, ElRadio, ElRadioButton, ElRadioGroup } from 'element-plus'
import { computed, defineComponent } from 'vue'
import type { PropType } from 'vue'
import type { FormInjectKey } from '../hooks'
import { useDotKey, useDotProp, useFormData } from '../hooks'
import { tips } from '../Tips'

// TODO RadioProp
export default defineComponent({
  name: 'FormidableRadioProp',
  props: {
    config: {
      type: Object as PropType<WidgetRadioProp>,
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
    const radio = useDotProp(model, dotKey)

    const options = computed(() => {
      return props.config.options.map((option) => {
        if (isObject(option)) {
          return option
        } else {
          return { label: option, value: option }
        }
      })
    })

    return () => (
      <ElFormItem
        label={props.config.label}
        labelWidth="auto"
        prop={dotKey.value}
        v-show={props.show}
      >
        <p class="w-full flex items-center justify-start">
          <ElRadioGroup class="flex-1" v-model={radio.value}>
            {options.value.map(({ label, value }) =>
              props.config.button ? (
                <ElRadioButton label={value}>{label}</ElRadioButton>
              ) : (
                <ElRadio label={value} border={props.config.border}>
                  {label}
                </ElRadio>
              )
            )}
          </ElRadioGroup>
          {tips(props.config.tips)}
          {slots.default?.()}
        </p>
      </ElFormItem>
    )
  },
})

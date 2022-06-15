import type {
  WidgetSelectProp,
  WidgetSelectPropOptionsGroup,
  WidgetSelectPropOptionsItem,
} from '@spearjs/shared'
import { defineComponent, PropType, computed } from 'vue'
import { ElFormItem, ElOption, ElOptionGroup, ElSelect } from 'element-plus'
import { tips } from '../Tips'
import { useFormData } from '../hooks'

export default defineComponent({
  name: 'FormidableSelectProp',
  props: {
    config: {
      type: Object as PropType<WidgetSelectProp>,
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
      const { defaultValue: _d, type: _t, tips: _ti, options: _o, ...option } = props.config
      return option
    })
    return () => (
      <ElFormItem label={props.config.label} prop={props.config.key}>
        <p class="w-full flex items-center justify-start">
          <ElSelect class="flex-1" v-model={model.value[props.config.key]} {...options.value}>
            {props.config.options.map((option) => {
              if ((option as WidgetSelectPropOptionsGroup).options) {
                return (
                  <ElOptionGroup key={option.label} label={option.label}>
                    {(option as WidgetSelectPropOptionsGroup).options.map((opt) => (
                      <ElOption key={opt.value} label={opt.label} value={opt.value} />
                    ))}
                  </ElOptionGroup>
                )
              } else {
                option = option as WidgetSelectPropOptionsItem
                return <ElOption key={option.value} label={option.label} value={option.value} />
              }
            })}
          </ElSelect>
          {tips(props.config.tips)}
        </p>
      </ElFormItem>
    )
  },
})

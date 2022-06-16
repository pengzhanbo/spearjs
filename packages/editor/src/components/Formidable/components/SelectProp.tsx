import type {
  WidgetSelectProp,
  WidgetSelectPropOptionsGroup,
  WidgetSelectPropOptionsItem,
} from '@spearjs/shared'
import { defineComponent, PropType, computed } from 'vue'
import { ElFormItem, ElOption, ElOptionGroup, ElSelect } from 'element-plus'
import { tips } from '../Tips'
import { useDotProp, useFormData } from '../hooks'

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
    dotKey: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const model = useFormData(props.injectKey)

    const dotKey = computed(() => {
      return props.dotKey ? `${props.dotKey}.${props.config.key}` : props.config.key
    })

    const binding = useDotProp(model, dotKey)

    const options = computed(() => {
      /* TODO select options 配置属性白名单优化
       * 虽然这种模式可以拿到 options，但是存在隐患，
       * 后面再改成白名单获取值
       */
      const {
        defaultValue: _d,
        type: _t,
        tips: _ti,
        options: _o,
        label: _l,
        key: _k,
        ...option
      } = props.config
      return option
    })
    return () => (
      <ElFormItem label={props.config.label} prop={dotKey.value}>
        <p class="w-full flex items-center justify-start">
          <ElSelect class="flex-1" v-model={binding.value} {...options.value}>
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

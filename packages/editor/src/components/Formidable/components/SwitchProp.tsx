import type { WidgetSwitchProp } from '@spearjs/shared'
import { defineComponent, PropType, computed } from 'vue'
import { ElFormItem, ElSwitch } from 'element-plus'
import { tips } from '../Tips'
import { useFormData, useDotProp } from '../hooks'

export default defineComponent({
  name: 'FormidableSwitchProp',
  props: {
    config: {
      type: Object as PropType<WidgetSwitchProp>,
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
      const { activeValue, inactiveValue, activeText, inactiveText } = props.config
      const option = {
        activeValue,
        inactiveValue,
        activeText,
        inactiveText,
        activeIcon: activeText ? undefined : 'Check',
        inactiveIcon: inactiveText ? undefined : 'Close',
      }
      return option
    })
    return () => (
      <ElFormItem label={props.config.label} prop={dotKey.value}>
        <p class="w-full flex items-center justify-start">
          <ElSwitch class="flex-1" v-model={binding.value} {...options.value} />
          {tips(props.config.tips)}
        </p>
      </ElFormItem>
    )
  },
})

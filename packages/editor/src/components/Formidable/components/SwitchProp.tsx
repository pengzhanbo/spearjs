import type { WidgetSwitchProp } from '@spearjs/shared'
import { defineComponent, PropType, computed } from 'vue'
import { ElFormItem, ElSwitch } from 'element-plus'
import { tips } from '../Tips'
import { useFormData } from '../hooks'

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
  },
  setup(props) {
    const model = useFormData(props.injectKey)

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
      <ElFormItem label={props.config.label} prop={props.config.key}>
        <p class="w-full flex items-center justify-start">
          <ElSwitch class="flex-1" v-model={model.value[props.config.key]} {...options.value} />
          {tips(props.config.tips)}
        </p>
      </ElFormItem>
    )
  },
})

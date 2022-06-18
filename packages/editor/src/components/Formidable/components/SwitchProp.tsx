import type { WidgetSwitchProp } from '@spearjs/shared'
import { ElFormItem, ElSwitch } from 'element-plus'
import { computed, defineComponent } from 'vue'
import type { PropType } from 'vue'
import type { FormInjectKey } from '../hooks'
import { useDotKey, useDotProp, useFormData } from '../hooks'
import { tips } from '../Tips'

export default defineComponent({
  name: 'FormidableSwitchProp',
  props: {
    config: {
      type: Object as PropType<WidgetSwitchProp>,
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
      <ElFormItem label={props.config.label} labelWidth="auto" prop={dotKey.value}>
        <p class="w-full flex items-center justify-start">
          <ElSwitch class="flex-1" v-model={binding.value} {...options.value} />
          {tips(props.config.tips)}
          {slots.default?.()}
        </p>
      </ElFormItem>
    )
  },
})

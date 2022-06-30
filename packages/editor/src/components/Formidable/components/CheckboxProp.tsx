import type { WidgetCheckboxProp } from '@spearjs/shared'
import { isObject } from '@spearjs/shared'
import { ElCheckbox, ElCheckboxButton, ElCheckboxGroup, ElFormItem } from 'element-plus'
import { computed, defineComponent, ref, watch } from 'vue'
import type { PropType } from 'vue'
import type { FormInjectKey } from '../hooks'
import { useDotKey, useDotProp, useFormData } from '../hooks'
import { tips } from '../Tips'

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
    show: {
      type: Boolean,
      default: true,
    },
  },
  setup(props, { slots }) {
    const model = useFormData(props.injectKey)
    const dotKey = useDotKey(props)
    const checkList = useDotProp(model, dotKey)

    const options = computed(() => {
      return props.config.options.map((option) => {
        if (isObject(option)) {
          return option
        } else {
          return { label: option, value: option }
        }
      })
    })

    const checkAll = ref(false)
    const isIndeterminate = ref(false)

    const checkAllHandle = () => {
      checkList.value = checkAll.value ? options.value.map(({ value }) => value) : []
    }

    watch(
      () => props.config.defaultValue,
      (defaultValue) => {
        isIndeterminate.value = !!defaultValue && defaultValue.length > 0
      },
      { immediate: true }
    )

    return () => (
      <ElFormItem
        label={props.config.label}
        labelWidth="auto"
        prop={dotKey.value}
        v-show={props.show}
      >
        <p class="w-full flex items-center justify-start">
          {props.config.button ? (
            <ElCheckboxButton
              v-model={checkAll.value}
              indeterminate={isIndeterminate.value}
              onChange={checkAllHandle}
            >
              全选
            </ElCheckboxButton>
          ) : (
            <ElCheckbox
              v-model={checkAll.value}
              indeterminate={isIndeterminate.value}
              onChange={checkAllHandle}
            >
              全选
            </ElCheckbox>
          )}
          <ElCheckboxGroup
            class="flex-1"
            v-model={checkList.value}
            min={props.config.min}
            max={props.config.max}
            label={props.config.label}
          >
            {options.value.map(({ label, value }) =>
              props.config.button ? (
                <ElCheckboxButton label={value}>{label}</ElCheckboxButton>
              ) : (
                <ElCheckbox label={value}>{label}</ElCheckbox>
              )
            )}
          </ElCheckboxGroup>

          {tips(props.config.tips)}
          {slots.default?.()}
        </p>
      </ElFormItem>
    )
  },
})

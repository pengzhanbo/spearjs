import type {
  WidgetSelectProp,
  WidgetSelectPropOptionsGroup,
  WidgetSelectPropOptionsItem,
} from '@spearjs/shared'
import { isFunction } from '@spearjs/shared'
import { ElFormItem, ElOption, ElOptionGroup, ElSelect } from 'element-plus'
import { computed, defineComponent, readonly, toRaw } from 'vue'
import type { PropType } from 'vue'
import type { FormInjectKey } from '../hooks'
import { useDotKey, useDotProp, useFormData } from '../hooks'
import { tips } from '../Tips'

export default defineComponent({
  name: 'FormidableSelectProp',
  props: {
    config: {
      type: Object as PropType<WidgetSelectProp>,
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

    const binding = useDotProp(model, dotKey)

    const options = computed(() => {
      const {
        multiple,
        multipleLimit,
        keyValue,
        clearable,
        collapseTags,
        collapseTagsTooltip,
        placeholder,
        filterable,
        allowCreate,
        filterMethod,
        remote,
        remoteMethod,
        loading,
        loadingText,
        noMatchText,
        noDataText,
        defaultFirstOption,
      } = props.config
      return {
        multiple,
        multipleLimit,
        keyValue,
        clearable,
        collapseTags,
        collapseTagsTooltip,
        placeholder,
        filterable,
        allowCreate,
        filterMethod,
        remote,
        remoteMethod,
        loading,
        loadingText,
        noMatchText,
        noDataText,
        defaultFirstOption,
      }
    })

    const selectOptions = computed(() => {
      const options = props.config.options
      return isFunction(options) ? options(readonly(toRaw(model.value))) : options
    })
    return () => (
      <ElFormItem
        label={props.config.label}
        labelWidth="auto"
        prop={dotKey.value}
        v-show={props.show}
      >
        <p class="w-full flex items-center justify-start">
          <ElSelect class="flex-1" v-model={binding.value} {...options.value}>
            {selectOptions.value.map((option) => {
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
          {slots.default?.()}
        </p>
      </ElFormItem>
    )
  },
})

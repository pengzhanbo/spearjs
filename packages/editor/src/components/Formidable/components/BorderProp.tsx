import { stylesBorerStyle, stylesUnit } from '@editor/common'
import type { WidgetBorderProp } from '@spearjs/shared'
import { ElColorPicker, ElFormItem, ElInput, ElOption, ElSelect } from 'element-plus'
import { computed, defineComponent, ref, watch } from 'vue'
import type { PropType } from 'vue'
import type { FormInjectKey } from '../hooks'
import { useDotKey, useDotProp, useFormData } from '../hooks'
import { tips } from '../Tips'

export default defineComponent({
  name: 'FormidableBorderProp',
  props: {
    config: {
      type: Object as PropType<WidgetBorderProp>,
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
    const borderRegExp = /^(\w+)\s(-?\d+)(px|rem|%)?\s([^]+)$/
    const defaultColor = 'rgba(0, 0, 0, 1)'
    const model = useFormData(props.injectKey)
    const dotKey = useDotKey(props)
    const border = useDotProp(model, dotKey)
    const borderStyle = ref({
      style: '',
      width: 0,
      unit: 'px',
      color: defaultColor,
    })

    watch(
      () => border.value,
      (border) => {
        border = border.trim()
        if (border === '') {
          borderStyle.value = {
            style: '',
            width: 0,
            unit: 'px',
            color: defaultColor,
          }
          return
        } else if (border === 'none') {
          borderStyle.value = {
            style: 'none',
            width: 0,
            unit: 'px',
            color: defaultColor,
          }
        } else {
          const [, style = '', width = 0, unit = 'px', color = defaultColor] =
            border.trim().match(borderRegExp) || []
          borderStyle.value = { style, width, unit, color }
        }
      },
      { immediate: true }
    )

    watch(
      () => borderStyle.value,
      (borderStyle) => {
        const { style, width, unit, color = defaultColor } = borderStyle
        if (style === 'none') {
          border.value = 'none'
        } else if (style === '') {
          border.value = ''
        } else {
          const w = Number(width) === 0 ? width : `${width}${unit}`
          border.value = `${style} ${w} ${color}`
        }
      },
      { deep: true }
    )

    const colorOptions = computed(() => {
      const { colorFormat, showAlpha, predefine } = props.config
      return { colorFormat, showAlpha, predefine }
    })

    const disabled = computed(() => {
      const style = borderStyle.value.style
      return style === 'none' || style === ''
    })

    return () => (
      <ElFormItem label={props.config.label} labelWidth="auto" prop={dotKey.value}>
        <p class="w-full flex items-center justify-start">
          <ElInput type="number" v-model={borderStyle.value.width} disabled={disabled.value}>
            {{
              prepend: () => (
                <ElSelect v-model={borderStyle.value.style} style={{ width: '100px' }}>
                  {stylesBorerStyle.map((item) => (
                    <ElOption value={item.value}>
                      <p class="h-full flex items-center">
                        <span class="mr-2">{item.label || '默认'}</span>
                        {item.value ? (
                          <span
                            class="inline-block w-8 h-0 border-t-3 border-gray-400 my-auto"
                            style={{ borderStyle: item.value }}
                          ></span>
                        ) : null}
                      </p>
                    </ElOption>
                  ))}
                </ElSelect>
              ),
              append: () => (
                <ElSelect
                  v-model={borderStyle.value.unit}
                  disabled={disabled.value}
                  style={{ width: '60px' }}
                >
                  {stylesUnit.map((unit) => (
                    <ElOption {...unit} />
                  ))}
                </ElSelect>
              ),
            }}
          </ElInput>
          <ElColorPicker
            v-model={borderStyle.value.color}
            {...colorOptions.value}
            disabled={disabled.value}
          />
          {tips(props.config.tips)}
          {slots.default?.()}
        </p>
      </ElFormItem>
    )
  },
})

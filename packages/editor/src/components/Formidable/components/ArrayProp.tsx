import { isArray, WidgetArrayProp, WidgetArrayPropItem } from '@spearjs/shared'
import { defineComponent, computed, PropType } from 'vue'
import { tips } from '../Tips'
import PropItem from '../PropItem'
import { useFormData, useDotProp } from '../hooks'
import { ElFormItem, ElButton } from 'element-plus'

import styles from '../index.module.scss'

export default defineComponent({
  name: 'FormidableArrayProp',
  props: {
    config: {
      type: Object as PropType<WidgetArrayProp>,
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
    const array = useDotProp<any[]>(model, dotKey)

    const maxLength = computed(() => props.config.maxLength || Infinity)
    const minLength = computed(() => props.config.minLength || 0)
    const canAdd = computed(() => array.value.length < maxLength.value)
    const canDelete = computed(() => array.value.length > minLength.value)

    const addItem = () => {
      if (isArray(props.config.items)) return
      if (array.value.length < maxLength.value) {
        array.value.push(props.config.items.defaultValue)
      }
    }

    const deleteItem = (index: number) => {
      if (isArray(props.config.items)) return
      if (array.value.length > minLength.value) {
        array.value.splice(index, 1)
      }
    }

    return () => (
      <div class={styles.arrayWrapper}>
        <p class={styles.arrayTitle}>
          <span>{props.config.label}</span>
          {tips(props.config.tips)}
        </p>
        {isArray(props.config.items) ? (
          props.config.items.map((item, index) => (
            <PropItem
              config={{ key: `${index}`, ...item }}
              injectKey={props.injectKey}
              dotKey={dotKey.value}
            />
          ))
        ) : (
          <>
            {array.value.map((_, index) => (
              <PropItem
                config={{ key: `${index}`, ...(props.config.items as WidgetArrayPropItem) }}
                injectKey={props.injectKey}
                dotKey={dotKey.value}
              >
                <ElButton
                  class="ml-4"
                  size="small"
                  type="danger"
                  icon="Delete"
                  circle
                  disabled={!canDelete.value}
                  onClick={() => deleteItem(index)}
                />
              </PropItem>
            ))}
            <ElFormItem>
              <ElButton
                size="small"
                type="primary"
                icon="CirclePlus"
                disabled={!canAdd.value}
                onClick={addItem}
              >
                添加新项
              </ElButton>
            </ElFormItem>
          </>
        )}
      </div>
    )
  },
})

import { CirclePlus, Delete } from '@element-plus/icons-vue'
import { isArray } from '@spearjs/shared'
import type { WidgetArrayProp, WidgetArrayPropItem } from '@spearjs/shared'
import { ElButton, ElFormItem } from 'element-plus'
import cloneDeep from 'lodash-es/cloneDeep'
import { computed, defineComponent } from 'vue'
import type { PropType } from 'vue'
import type { FormInjectKey } from '../hooks'
import { useDotKey, useDotProp, useFormData } from '../hooks'
import styles from '../index.module.scss'
import PropItem from '../PropItem'
import { tips } from '../Tips'

export default defineComponent({
  name: 'FormidableArrayProp',
  props: {
    config: {
      type: Object as PropType<WidgetArrayProp>,
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
    const array = useDotProp<any[]>(model, dotKey)

    const maxLength = computed(() => props.config.maxLength || Infinity)
    const minLength = computed(() => props.config.minLength || 0)
    const canAdd = computed(() => array.value.length < maxLength.value)
    const canDelete = computed(() => array.value.length > minLength.value)

    const addItem = () => {
      if (isArray(props.config.items)) return
      if (array.value.length < maxLength.value) {
        array.value.push(cloneDeep(props.config.items.defaultValue))
      }
    }

    const deleteItem = (index: number) => {
      if (isArray(props.config.items)) return
      if (array.value.length > minLength.value) {
        array.value.splice(index, 1)
      }
    }

    return () => (
      <div class={styles.arrayWrapper} v-show={props.show}>
        <div class="flex-1">
          <p class={styles.arrayTitle}>
            <span>{props.config.label}</span>
            {tips(props.config.tips)}
          </p>
          {isArray(props.config.items) ? (
            props.config.items.map((item, index) => (
              <PropItem
                config={{ ...item, key: `${index}` }}
                injectKey={props.injectKey}
                dotKey={dotKey.value}
              />
            ))
          ) : (
            <>
              {array.value.map((_, index) => (
                <PropItem
                  config={{
                    ...(props.config.items as WidgetArrayPropItem),
                    key: `${index}`,
                  }}
                  injectKey={props.injectKey}
                  dotKey={dotKey.value}
                >
                  <ElButton
                    class="ml-4"
                    size="small"
                    type="danger"
                    icon={Delete}
                    circle
                    disabled={!canDelete.value}
                    onClick={() => deleteItem(index)}
                  />
                </PropItem>
              ))}
              <ElFormItem class="w-full">
                <ElButton
                  size="small"
                  type="primary"
                  icon={CirclePlus}
                  disabled={!canAdd.value}
                  onClick={addItem}
                >
                  添加新项
                </ElButton>
              </ElFormItem>
            </>
          )}
        </div>
        {slots.default?.()}
      </div>
    )
  },
})

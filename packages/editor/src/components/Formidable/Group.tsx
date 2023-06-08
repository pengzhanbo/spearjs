import { ArrowRightBold } from '@element-plus/icons-vue'
import type { WidgetGroupProp } from '@spearjs/shared'
import { isFunction } from '@spearjs/shared'
import { ElCollapseTransition, ElIcon } from 'element-plus'
import isBoolean from 'lodash-es/isBoolean'
import { computed, defineComponent, readonly, ref } from 'vue'
import type { PropType } from 'vue'
import type { FormInjectKey } from './hooks'
import { useFormData } from './hooks'
import styles from './index.module.scss'
import PropItem from './PropItem'
import { tips } from './Tips'

export default defineComponent({
  name: 'FormidableGroupProp',
  props: {
    config: {
      type: Object as PropType<WidgetGroupProp>,
      required: true,
    },
    injectKey: {
      type: Symbol as PropType<FormInjectKey>,
      required: true,
    },
  },
  setup(props) {
    const model = useFormData(props.injectKey)
    const spread = ref(
      props.config.forgetSpread
        ? true
        : isBoolean(props.config.spread)
        ? props.config.spread
        : true,
    )
    const handleClick = () => {
      if (props.config.forgetSpread) return
      spread.value = !spread.value
    }
    const show = computed(() => {
      const showProp =
        typeof props.config.showProp === 'undefined'
          ? true
          : props.config.showProp
      return isFunction(showProp) ? showProp(readonly(model)) : showProp
    })
    return () => (
      <div class={styles.groupWrapper} v-show={show.value}>
        <label class={styles.groupLabel} onClick={handleClick}>
          {tips(props.config.tips)}
          <span>{props.config.label}</span>
          <ElIcon>
            <ArrowRightBold
              class={[styles.groupIcon, { [styles.open]: spread.value }]}
            />
          </ElIcon>
        </label>
        <ElCollapseTransition>
          <div v-show={spread.value}>
            {props.config.props.map((prop) => (
              <PropItem config={prop} injectKey={props.injectKey} />
            ))}
          </div>
        </ElCollapseTransition>
      </div>
    )
  },
})

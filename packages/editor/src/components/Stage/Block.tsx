import { AppBlock, useAppPagesStore } from '@editor/stores'
import { computed, defineComponent, h, readonly, watch } from 'vue'
import type { PropType } from 'vue'
import { createComponent, findWidget } from '@editor/services/widget'
import styles from './index.module.scss'
import { useBlockDnd } from '@editor/hooks'
import { storeToRefs } from 'pinia'

export default defineComponent({
  name: 'StageBlock',
  props: {
    block: {
      type: Object as PropType<AppBlock>,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
    groupIndex: {
      type: Number,
      default: 0,
    },
    type: {
      type: String as PropType<'group' | undefined>,
      default: '',
    },
  },
  setup(props) {
    const { setRef, dragCollect, dropCollect, setItem } = useBlockDnd({
      componentId: props.block.componentId,
      index: props.index,
      groupIndex: props.groupIndex,
      isGroup: props.type === 'group',
    })

    watch(
      [props],
      ([props]) => {
        setItem({
          componentId: props.block.componentId,
          index: props.index,
          groupIndex: props.groupIndex,
          isGroup: props.type === 'group',
        })
      },
      { immediate: true }
    )

    const opacity = computed(() => {
      return dragCollect.value.isDragging ? 0 : 1
    })

    const block = computed(() => {
      const { component, componentId, props: _props, styles } = props.block
      const widget = findWidget(component.id, component.version)
      return {
        component: createComponent(widget),
        label: widget.label,
        componentId,
        props: _props,
        styles,
      }
    })

    const pageStore = useAppPagesStore()

    const { focusBlock } = storeToRefs(pageStore)

    const setFocusBlock = () => pageStore.setFocusBlock(props.block)

    return () => (
      <div
        class={[
          styles.widgetComponent,
          {
            [styles.focus]: props.block.componentId === focusBlock.value?.componentId,
          },
        ]}
        style={{ opacity: opacity.value }}
        ref={(el) => setRef(el as Element)}
        data-handler-id={dropCollect.value.handlerId}
        data-label={block.value.label}
        onClick={setFocusBlock}
      >
        {h(block.value.component, {
          componentId: block.value.componentId,
          props: readonly(block.value.props),
          styles: readonly(block.value.styles),
        })}
      </div>
    )
  },
})

/**
 * 渲染 widget component slot。
 * 每个 slot 也被当做是一个 blocks 来进行处理；
 * 并且支持 传入 class 以及 style 来控制 slot容器的表现；
 */
import { useBlocksDrop } from '@editor/hooks'
import type { AppBlocks } from '@spearjs/core'
import type { WidgetSlotOptions } from '@spearjs/shared'
import { isArray } from '@spearjs/shared'
import { computed, defineComponent, toRefs } from 'vue'
import type { PropType } from 'vue'
import Blocks from './Blocks'
import styles from './slot.module.scss'

export default defineComponent({
  name: 'BlockSlot',
  props: {
    roadMap: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
    index: {
      type: Number,
      default: 0,
    },
    blocks: {
      type: Array as PropType<AppBlocks>,
      default: () => [],
    },
    option: {
      type: Object as PropType<WidgetSlotOptions>,
      default: () => ({}),
    },
  },
  setup(props) {
    const { blocks, name } = toRefs(props)

    const roadMap = computed(() => {
      const roadMap = `slot:${props.name}`
      return props.roadMap ? `${props.roadMap}|${roadMap}` : roadMap
    })

    const { dropCollect, setDropRef } = useBlocksDrop(roadMap)

    const slotClass = computed(() => {
      const list = [
        styles.blockSlot,
        dropCollect.value.canDrop ? styles.canDrop : '',
      ]
      if (props.option.class) {
        isArray(props.option.class)
          ? list.push(...props.option.class)
          : list.push(props.option.class)
      }
      return list
    })

    return () => (
      <div
        class={slotClass.value}
        ref={(el) => setDropRef(el as HTMLElement)}
        data-handler-id={dropCollect.value.handlerId}
        style={props.option.style}
      >
        {blocks.value.length === 0 ? (
          <div class={styles.slotPlaceholder}>组件拖到此slot:{name.value}</div>
        ) : (
          <Blocks blocks={blocks.value} roadMap={roadMap.value} />
        )}
      </div>
    )
  },
})

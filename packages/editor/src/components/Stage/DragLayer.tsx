/**
 * 默认的 拖拽效果是 截取当前元素并生成图片，
 * 但是这种默认行为在交互表现上并不友好，
 * 生成的拖拽元素图片可能会附带额外的不相关的内容。
 * 所以这里重写了拖拽时的效果，使表现一致。
 */

/* FIXME 放置在非目标元素时，重置回初始位置存在延迟
 * 这个问题 导致自定义layer未立即重置，从表现上看是由于 拖拽预览的默认动画行为导致的 （该问题仅发生在 mac上）
 * 尝试过使用 mouseup 或者 dragend 事件来重写，但效果不理想
 * mouseup事件应该是在 dragend中被阻止冒泡了
 * dragend 是在默认动画行为结束后才触发
 */
/* TODO 重新计算layer信息
 * 如果 元素设置了 定位相关的 偏移， 自定义layer需要重新计算位置信息
 */
import { WIDGET_DND_TYPE } from '@editor/common'
import { findBlockByBid } from '@editor/services'
import { useAppPagesStore } from '@editor/stores'
import { computed, defineComponent } from 'vue'
import { useDragLayer } from 'vue3-dnd'
import Block from './Block'
import BlockGroup from './BlockGroup'
import styles from './index.module.scss'

export default defineComponent({
  name: 'StageDragLayer',
  setup() {
    const collect = useDragLayer((monitor) => ({
      item: monitor.getItem(),
      itemType: monitor.getItemType(),
      initialOffset: monitor.getInitialSourceClientOffset(),
      currentOffset: monitor.getSourceClientOffset(),
      isDragging: monitor.isDragging(),
    }))

    const pageStore = useAppPagesStore()

    const isBlock = computed(
      () => collect.value.itemType === WIDGET_DND_TYPE.Block,
    )

    const block = computed(() =>
      findBlockByBid(pageStore.currentPage.blocks, collect.value.item.bid),
    )

    const blockStyles = computed(() => {
      const { initialOffset, currentOffset } = collect.value
      if (!initialOffset || !currentOffset)
        return {
          display: 'none',
        }

      const { x, y } = currentOffset

      return {
        transform: `translate(${x}px, ${y}px)`,
      }
    })

    const renderBlock = () => {
      if (block.value) {
        if (block.value.type === 'block') {
          return <Block block={block.value} index={0} preview></Block>
        } else {
          return <BlockGroup group={block.value} index={0} preview></BlockGroup>
        }
      }
    }

    return () =>
      isBlock.value ? (
        <div class={styles.dragLayer} style={blockStyles.value}>
          {renderBlock()}
        </div>
      ) : null
  },
})

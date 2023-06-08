import { contextMenuOutSide, setupContextMenu } from '@editor/hooks'
import { createBlockGroup } from '@editor/services'
import { useAppPagesStore } from '@editor/stores'
import { ElCard } from 'element-plus'
import type { PropType } from 'vue'
import { defineComponent, watch, withModifiers } from 'vue'
import styles from './index.module.scss'

export default defineComponent({
  name: 'StageContextMenu',
  directives: { contextMenuOutSide },
  props: {
    rootRef: {
      type: Object as PropType<HTMLElement>,
      default: document.body,
    },
  },
  setup: (props) => {
    const { isOpen, style, block, roadMap, index, close, setContextMenuRoot } =
      setupContextMenu()
    const appPageStore = useAppPagesStore()

    watch(
      () => props.rootRef,
      (root) => setContextMenuRoot(root),
      { deep: true },
    )

    const onDelete = () => {
      appPageStore.deleteBlock(index.value!, roadMap.value, (block) => {
        appPageStore.focusBlock?.bid === block.bid &&
          appPageStore.setFocusBlock(null)
      })
      close()
    }
    const onAddBlockGroup = () => {
      const group = createBlockGroup()
      if (block.value?.type === 'group') {
        appPageStore.pushBlockToGroup(group, roadMap.value)
      } else {
        appPageStore.addBlock(group, roadMap.value)
      }
      close()
    }
    return () => (
      <div
        v-show={isOpen.value}
        style={style.value}
        class={styles.contextMenuWrapper}
        v-contextMenuOutSide
        onContextmenu={withModifiers(() => {}, ['prevent'])}
      >
        <ElCard bodyStyle={{ padding: '10px 0' }}>
          {block.value?.type !== 'block' ? (
            <div class={styles.menuItem} onClick={onAddBlockGroup}>
              新建分组
            </div>
          ) : null}
          {block.value ? (
            <p class={styles.menuItem} onClick={onDelete}>
              删除{block.value.type === 'block' ? '组件' : '分组'}
            </p>
          ) : null}
        </ElCard>
      </div>
    )
  },
})

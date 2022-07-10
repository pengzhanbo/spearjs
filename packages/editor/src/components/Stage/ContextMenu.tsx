import { createBlockGroup } from '@editor/services'
import { useAppPagesStore } from '@editor/stores'
import { ElCard } from 'element-plus'
import type { PropType } from 'vue'
import { defineComponent, watch } from 'vue'
import { contextMenuOutSide, setupContextMenu } from './hooks'
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
    const { isOpen, style, block, roadMap, index, close, setContextMenuRoot } = setupContextMenu()
    const appPageStore = useAppPagesStore()

    watch(
      () => props.rootRef,
      (root) => setContextMenuRoot(root),
      { deep: true }
    )

    const onDelete = () => {
      appPageStore.deleteBlock(index.value!, roadMap.value)
      close()
    }
    const onAddBlockGroup = () => {
      appPageStore.addBlock(createBlockGroup(), roadMap.value)
      close()
    }
    return () => (
      <div
        v-show={isOpen.value}
        style={style.value}
        class={styles.contextMenuWrapper}
        v-contextMenuOutSide
      >
        <ElCard bodyStyle={{ padding: '15px 10px' }}>
          {block.value ? null : (
            <div class={styles.menuItem} onClick={onAddBlockGroup}>
              新建分组
            </div>
          )}
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

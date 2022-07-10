import { CloseIcon, EditIcon, EyeIcon, EyeSlashIcon, FileIcon } from '@editor/components/Icons'
import type { AppBlock } from '@editor/services'
import { useAppPagesStore } from '@editor/stores'
import type { Component, PropType } from 'vue'
import { computed, defineComponent, nextTick, ref, watch, withModifiers } from 'vue'
import styles from './index.module.scss'
import SlotItem from './SlotItem'

export default defineComponent({
  name: 'TreeBlock',
  props: {
    block: {
      type: Object as PropType<AppBlock>,
      required: true,
    },
    roadMap: {
      type: String,
      default: '',
    },
    index: {
      type: Number,
      default: 0,
    },
  },
  setup(props) {
    const roadMap = computed(() => {
      const roadMap = `${props.index}`
      return props.roadMap ? `${props.roadMap}|${roadMap}` : roadMap
    })

    const renderSlots = (): Component[] | undefined => {
      if (!props.block.slots) return
      const slots: Component[] = []
      Object.keys(props.block.slots).forEach((slot) => {
        const blocks = props.block.slots[slot] || []
        if (blocks.length) {
          slots.push(
            <SlotItem name={slot} index={props.index} roadMap={roadMap.value} blocks={blocks} />
          )
        }
      })
      return slots
    }

    const pageStore = useAppPagesStore()

    const isFocus = computed(() => pageStore.focusBlock?.bid === props.block.bid)

    const isEdit = ref(false)

    const blockLabel = ref('')
    const iptRef = ref<HTMLElement>()

    watch(
      () => props.block.label,
      (label) => (blockLabel.value = label),
      { immediate: true }
    )

    const openEdit = async () => {
      isEdit.value = true
      await nextTick()
      iptRef.value && iptRef.value.focus()
    }

    const submitEdit = () => {
      pageStore.updateBlockLabel(props.block.bid, blockLabel.value || props.block.label)
      isEdit.value = false
    }

    const cancelEdit = () => {
      blockLabel.value = props.block.label
      isEdit.value = false
    }

    const iptKeyDown = (ev: KeyboardEvent) => {
      if (ev.key === 'Enter') {
        submitEdit()
      }
      if (ev.key === 'Escape') {
        cancelEdit()
      }
    }

    const triggerVisibility = () =>
      pageStore.updateBlockEditorOption(props.block.bid, {
        visibility: !props.block.editor.visibility,
      })

    const setFocusBlock = () => pageStore.setFocusBlock(props.block)

    const deleteBlock = () => {
      pageStore.deleteBlock(props.index, props.roadMap)
      isFocus.value && pageStore.setFocusBlock(null)
    }

    return () => (
      <li class={styles.treeBlockItem}>
        <div class={[styles.treeTitle, isFocus.value ? styles.focus : '']}>
          <p class={styles.titleItem}>
            <span class={['el-icon', styles.iconShow]}>
              <FileIcon />
            </span>
            {isEdit.value ? (
              <>
                <input
                  ref={(el) => (iptRef.value = el as HTMLElement)}
                  type="text"
                  class={styles.blockIpt}
                  v-model={blockLabel.value}
                  onKeyup={iptKeyDown}
                  onBlur={cancelEdit}
                />
                <span class={['el-icon ml-2', styles.iconShow]} onClick={submitEdit}>
                  <EditIcon />
                </span>
                <span class={['el-icon ml-2', styles.iconShow]} onClick={cancelEdit}>
                  <CloseIcon />
                </span>
              </>
            ) : (
              <>
                <span
                  class="ml-1"
                  onClick={setFocusBlock}
                  onDblclick={withModifiers(openEdit, ['prevent'])}
                >
                  {props.block.label}
                </span>
                <span class="el-icon ml-2 " onClick={openEdit}>
                  <EditIcon />
                </span>
              </>
            )}
          </p>
          <p class={styles.titleItem}>
            <span class="el-icon" onClick={triggerVisibility}>
              {props.block.editor.visibility ? <EyeIcon /> : <EyeSlashIcon />}
            </span>
            <span class="el-icon ml-2" onClick={deleteBlock}>
              <CloseIcon />
            </span>
          </p>
        </div>
        {renderSlots()}
      </li>
    )
  },
})

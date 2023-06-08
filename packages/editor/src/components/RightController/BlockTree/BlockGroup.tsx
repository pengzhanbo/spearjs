import {
  CloseIcon,
  EditIcon,
  EyeIcon,
  EyeSlashIcon,
  FolderIcon,
  FolderOpenIcon,
} from '@editor/components/Icons'
import { useAppPagesStore } from '@editor/stores'
import type { AppBlockGroup } from '@spearjs/core'
import { ElCollapseTransition } from 'element-plus'
import type { PropType } from 'vue'
import {
  computed,
  defineComponent,
  nextTick,
  ref,
  watch,
  withModifiers,
} from 'vue'
import Blocks from './Blocks'
import styles from './index.module.scss'

export default defineComponent({
  name: 'TreeBlockGroup',
  props: {
    group: {
      type: Object as PropType<AppBlockGroup>,
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

    const spread = ref(true)
    const triggerSpread = () => {
      spread.value = !spread.value
    }

    const pageStore = useAppPagesStore()

    const isFocus = computed(
      () => pageStore.focusBlock?.bid === props.group.bid,
    )

    const isEdit = ref(false)

    const blockLabel = ref('')
    const iptRef = ref<HTMLElement>()

    watch(
      () => props.group.label,
      (label) => (blockLabel.value = label),
      { immediate: true },
    )

    const openEdit = async () => {
      isEdit.value = true
      await nextTick()
      iptRef.value && iptRef.value.focus()
    }

    const submitEdit = () => {
      pageStore.updateBlockLabel(
        props.group.bid,
        blockLabel.value || props.group.label,
      )
      isEdit.value = false
    }

    const cancelEdit = () => {
      blockLabel.value = props.group.label
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
      pageStore.updateBlockEditorOption(props.group.bid, {
        visibility: !props.group.editor.visibility,
      })

    const setFocusBlock = () => pageStore.setFocusBlock(props.group)

    const deleteBlock = () => {
      pageStore.deleteBlock(props.index, props.roadMap)
      isFocus.value && pageStore.setFocusBlock(null)
    }

    return () => (
      <li class={styles.treeBlockItem}>
        <div class={[styles.treeTitle, isFocus.value ? styles.focus : '']}>
          <p class={styles.titleItem}>
            <span
              class={['el-icon select-none', styles.iconShow]}
              onClick={triggerSpread}
            >
              {spread.value ? <FolderOpenIcon /> : <FolderIcon />}
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
                <span
                  class={['el-icon ml-2', styles.iconShow]}
                  onClick={submitEdit}
                >
                  <EditIcon />
                </span>
                <span
                  class={['el-icon ml-2', styles.iconShow]}
                  onClick={cancelEdit}
                >
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
                  {props.group.label}
                </span>
                <span class="el-icon ml-2 " onClick={openEdit}>
                  <EditIcon />
                </span>
              </>
            )}
          </p>
          <p class={styles.titleItem}>
            <span class="el-icon" onClick={triggerVisibility}>
              {props.group.editor.visibility ? <EyeIcon /> : <EyeSlashIcon />}
            </span>
            <span class="el-icon ml-2" onClick={deleteBlock}>
              <CloseIcon />
            </span>
          </p>
        </div>
        <ElCollapseTransition>
          <Blocks
            v-show={spread.value}
            blocks={props.group.blocks}
            roadMap={roadMap.value}
          />
        </ElCollapseTransition>
      </li>
    )
  },
})

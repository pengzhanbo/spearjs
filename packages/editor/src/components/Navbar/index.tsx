import {
  PlatformIcon,
  PreviewIcon,
  RedoIcon,
  SaveIcon,
  TemplateIcon,
  UndoIcon,
} from '@editor/components/Icons'
import { useStoreCache } from '@editor/hooks'
import { ArrowDown, Promotion } from '@element-plus/icons-vue'
import { ElDropdown, ElDropdownItem, ElDropdownMenu, ElIcon } from 'element-plus'
import type { FunctionalComponent } from 'vue'
import { defineComponent } from 'vue'
import styles from './index.module.scss'

export default defineComponent({
  name: 'Navbar',
  setup: () => {
    const { canRedo, canUndo, redo, undo } = useStoreCache()

    const SiteBrand: FunctionalComponent = () => {
      return (
        <div class={styles.siteBrand}>
          <img src="/images/logo_128.png" alt="SpearJs Logo" />
          <span aria-label="SpearJs">SpearJs</span>
        </div>
      )
    }
    return () => (
      <header class={styles.spearHeader}>
        <SiteBrand />
        <div class="flex flex-1 items-center">
          <p class={styles.headerItem}>
            <ElIcon class="el-icon--left">
              <TemplateIcon />
            </ElIcon>
            <span>模板</span>
          </p>
          <ElDropdown>
            {{
              default: () => (
                <p class={styles.headerItem}>
                  <ElIcon class="el-icon--left">
                    <PlatformIcon />
                  </ElIcon>
                  <span>平台</span>
                  <ElIcon class="el-icon--right">
                    <ArrowDown />
                  </ElIcon>
                </p>
              ),
              dropdown: () => (
                <ElDropdownMenu>
                  <ElDropdownItem>PC(1280x768)</ElDropdownItem>
                  <ElDropdownItem>Mobile</ElDropdownItem>
                </ElDropdownMenu>
              ),
            }}
          </ElDropdown>
        </div>
        <div class="flex items-center">
          <p class={styles.headerItem}>
            <ElIcon class="el-icon--left">
              <PreviewIcon />
            </ElIcon>
            <span>预览</span>
          </p>
          <p class={[styles.headerItem, canRedo.value ? '' : styles.disabled]} onClick={redo}>
            <ElIcon class="el-icon--left">
              <RedoIcon />
            </ElIcon>
            <span>前进</span>
          </p>
          <p class={[styles.headerItem, canUndo.value ? '' : styles.disabled]} onClick={undo}>
            <ElIcon class="el-icon--left">
              <UndoIcon />
            </ElIcon>
            <span>撤销</span>
          </p>
          <p class={styles.headerItem}>
            <ElIcon class="el-icon--left">
              <SaveIcon />
            </ElIcon>
            <span>保存</span>
          </p>
          <p class={styles.headerItem}>
            <ElIcon class="el-icon--left">
              <Promotion />
            </ElIcon>
            <span>提交</span>
          </p>
        </div>
      </header>
    )
  },
})

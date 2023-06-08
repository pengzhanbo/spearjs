import Formidable from '@editor/components/Formidable'
import { useAppPagesStore } from '@editor/stores'
import { Close } from '@element-plus/icons-vue'
import type { AppBlockStyles } from '@spearjs/core'
import { ElIcon } from 'element-plus'
import type { FunctionalComponent } from 'vue'
import { computed, defineComponent } from 'vue'
import { BlockHeader } from '../ConfigHeader'
import BoxInput from './BoxInput'
import styles from './index.module.scss'
import stylesFormConfig from './stylesFormConfig'

export default defineComponent({
  name: 'StylesConfig',
  setup: () => {
    const pageStore = useAppPagesStore()

    const block = computed(() => {
      const block = pageStore.focusBlock
      if (block) {
        if (block.type === 'block') {
          return block
        }
      }
      return null
    })

    const blockStyles = computed<AppBlockStyles>({
      get() {
        return block.value ? block.value.styles : {}
      },
      set(styles) {
        if (!block.value) return
        if (styles.position === '') {
          styles.left = ''
          styles.right = ''
          styles.top = ''
          styles.bottom = ''
        }
        pageStore.updateFocusBlockStyles(styles)
      },
    })

    const ContentBox: FunctionalComponent = () => (
      <div class={styles.contentBox}>
        <p>content</p>
        <div class="flex justify-start items-center">
          <BoxInput
            placeholder="width"
            auto
            v-model={blockStyles.value.width}
          />
          <ElIcon size="small">
            <Close />
          </ElIcon>
          <BoxInput
            placeholder="height"
            auto
            v-model={blockStyles.value.height}
          />
        </div>
      </div>
    )
    const PaddingBox: FunctionalComponent = (_, { slots }) => (
      <div class={styles.paddingBox}>
        <p>padding</p>
        <div class="flex justify-center items-center">
          <div class="mb-1">
            <p>top</p>
            <BoxInput
              direction="horizontal"
              v-model={blockStyles.value.paddingTop}
            />
          </div>
        </div>
        <div class="flex justify-center items-center">
          <div class="mr-1">
            <p>left</p>
            <BoxInput v-model={blockStyles.value.paddingLeft} />
          </div>
          {slots.default?.()}
          <div class="ml-1">
            <p>right</p>
            <BoxInput v-model={blockStyles.value.paddingRight} />
          </div>
        </div>
        <div class="flex justify-center items-center">
          <div class="mt-1">
            <p>bottom</p>
            <BoxInput
              direction="horizontal"
              v-model={blockStyles.value.paddingBottom}
            />
          </div>
        </div>
      </div>
    )

    const BorderBox: FunctionalComponent = (_, { slots }) => (
      <div class={styles.borderBox}>
        <div class={styles.borderTop}></div>
        <div class={styles.borderRight}></div>
        <div class={styles.borderBottom}></div>
        <div class={styles.borderLeft}></div>
        {slots.default?.()}
      </div>
    )

    const MarginBox: FunctionalComponent = (_, { slots }) => (
      <div class={styles.marginBox}>
        <p>margin</p>
        <div class="flex justify-center items-center">
          <div class="mb-1">
            <p>top</p>
            <BoxInput
              direction="horizontal"
              auto
              v-model={blockStyles.value.marginTop}
            />
          </div>
        </div>
        <div class="flex justify-center items-center">
          <div class="mr-1">
            <p>left</p>
            <BoxInput auto v-model={blockStyles.value.marginLeft} />
          </div>
          {slots.default?.()}
          <div class="ml-1">
            <p>right</p>
            <BoxInput auto v-model={blockStyles.value.marginRight} />
          </div>
        </div>
        <div class="flex justify-center items-center">
          <div class="mt-1">
            <p>bottom</p>
            <BoxInput
              direction="horizontal"
              auto
              v-model={blockStyles.value.marginBottom}
            />
          </div>
        </div>
      </div>
    )

    const PositionBox: FunctionalComponent = () => (
      <div class={styles.positionBox}>
        <div class="flex justify-center items-center">
          <div class="mb-1">
            <p>top</p>
            <BoxInput direction="horizontal" v-model={blockStyles.value.top} />
          </div>
        </div>
        <div class="flex justify-center items-center">
          <div class="mr-1">
            <p>left</p>
            <BoxInput v-model={blockStyles.value.left} />
          </div>
          <div class={styles.positionContent}>
            <p>content</p>
          </div>
          <div class="ml-1">
            <p>right</p>
            <BoxInput v-model={blockStyles.value.right} />
          </div>
        </div>
        <div class="flex justify-center items-center">
          <div class="mt-1">
            <p>bottom</p>
            <BoxInput
              direction="horizontal"
              v-model={blockStyles.value.bottom}
            />
          </div>
        </div>
      </div>
    )

    return () =>
      !block.value ? null : (
        <>
          <BlockHeader block={block.value} />
          <Formidable config={stylesFormConfig} v-model={blockStyles.value} />
          <p class={styles.boxTitle}>
            <span>盒模型设置</span>
          </p>
          <div class={styles.boxModel}>
            <MarginBox>
              <BorderBox>
                <PaddingBox>
                  <ContentBox />
                </PaddingBox>
              </BorderBox>
            </MarginBox>
          </div>
          <div v-show={blockStyles.value.position}>
            <p class={styles.boxTitle}>
              <span>定位设置</span>
            </p>
            <div class={styles.boxModel}>
              <PositionBox />
            </div>
          </div>
        </>
      )
  },
})

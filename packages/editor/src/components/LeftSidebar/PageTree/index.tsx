import { useAppPagesStore } from '@editor/stores'
import type { AppPageItem } from '@editor/stores'
import { parsePathMath, toPathMath } from '@editor/utils'
import { CirclePlus, Close, Edit, HomeFilled } from '@element-plus/icons-vue'
import {
  ElButton,
  ElDialog,
  ElForm,
  ElFormItem,
  ElIcon,
  ElInput,
  ElMessage,
  ElMessageBox,
  ElTooltip,
} from 'element-plus'
import { storeToRefs } from 'pinia'
import type { Ref } from 'vue'
import { computed, defineComponent, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import styles from './index.module.scss'

type PageOption = Pick<AppPageItem, 'title' | 'path'>

export default defineComponent({
  name: 'PageTess',
  setup: () => {
    const pageStore = useAppPagesStore()
    const { pages, currentPage } = storeToRefs(pageStore)

    const router = useRouter()
    const route = useRoute()

    let isRouterTo = false

    const routeTo = (page: AppPageItem) => {
      if (page.path === currentPage.value.path) return
      isRouterTo = true
      router.push({
        state: { ignoreStoreCache: false },
        params: {
          pathMath: toPathMath(page.path),
        },
      })
    }

    watch(
      () => currentPage.value,
      (nowPage, oldPage) => {
        if (nowPage.path !== oldPage.path && !isRouterTo) {
          router.replace({
            state: { ignoreStoreCache: true },
            params: {
              pathMath: toPathMath(nowPage.path),
            },
          })
        }
        isRouterTo = false
      }
    )

    const showDialog = ref(false)
    const isEdit = ref(false)

    const dialogText = computed<{ title: string; submit: string }>(() => {
      if (isEdit.value) {
        return { title: '修改页面', submit: '修改' }
      } else {
        return { title: '新增页面', submit: '添加' }
      }
    })

    const newPage: Ref<PageOption> = ref({
      title: '',
      path: '/',
    })
    const pageIndex = ref(0)

    const openDialogByEdit = ({ title, path }: PageOption, index: number): void => {
      isEdit.value = true
      showDialog.value = true
      newPage.value = { title, path }
      pageIndex.value = index
    }
    const openDialogByCreate = (): void => {
      isEdit.value = false
      showDialog.value = true
    }
    const submitDialog = (): void => {
      let { title, path } = newPage.value
      title = title.trim()
      path = path.trim()
      path = path.startsWith('/') ? path : `/${path}`
      if (!title || !path) {
        ElMessage({
          message: '标题或路径不能为空',
          type: 'warning',
        })
        return
      }
      if (pages.value.some((page) => page.path === path)) {
        ElMessage({
          message: '页面路径已存在，请重新修改',
          type: 'warning',
        })
        return
      }
      if (isEdit.value) {
        pageStore.updatePage(pageIndex.value, newPage.value)
      } else {
        pageStore.createAppPage(newPage.value)
      }
      showDialog.value = false
      newPage.value = { title: '', path: '/' }
    }
    const removePage = async (page: PageOption, index: number): Promise<void> => {
      await ElMessageBox.confirm(`是否删除 ${page.title} ?`, '警告', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
      })
      pageStore.removePage(index)
      const pathMath = parsePathMath(route.params.pathMath)
      if (pathMath === page.path) {
        const homePage = pages.value.find((page) => page.isHome) || pageStore.pages[0]
        routeTo(homePage)
      }
    }
    return () => (
      <div class={styles.pageTree}>
        <ElButton icon={CirclePlus} type="primary" onClick={openDialogByCreate}>
          新增页面
        </ElButton>
        {/* @ts-ignore */}
        <ElDialog v-model={showDialog.value} title={dialogText.value.title} append-to-body>
          {{
            default: () => (
              <ElForm model={newPage.value}>
                <ElFormItem label="页面标题">
                  <ElInput v-model={newPage.value.title} />
                </ElFormItem>
                <ElFormItem label="页面路径">
                  <ElInput v-model={newPage.value.path} />
                </ElFormItem>
              </ElForm>
            ),
            footer: () => (
              <span class={styles.dialogFooter}>
                <ElButton onClick={() => (showDialog.value = false)}>取消</ElButton>
                <ElButton type="primary" onClick={submitDialog}>
                  {dialogText.value.submit}
                </ElButton>
              </span>
            ),
          }}
        </ElDialog>
        <ul class={styles.pageTreeList}>
          <li class={styles.listHead}>
            <span class="flex-1">标题(路径)</span>
          </li>
          {pages.value.map((page, index) => (
            <li class={{ [styles.current]: page.path === currentPage.value.path }} key={page.path}>
              <p class="flex-1">
                <ElTooltip
                  effect="dark"
                  show-after={600}
                  placement="bottom-start"
                  content={`${page.title} (${page.path})`}
                >
                  <span class="cursor-pointer" onClick={() => routeTo(page)}>
                    {page.title} ({page.path})
                  </span>
                </ElTooltip>
              </p>
              <p class="flex items-center">
                <ElTooltip
                  effect="dark"
                  show-after={600}
                  placement="bottom-start"
                  content="设置为首页"
                >
                  <ElIcon
                    class={{ 'is-home': page.isHome }}
                    // @ts-ignore
                    onClick={() => pageStore.updateHomePage(page)}
                  >
                    <HomeFilled />
                  </ElIcon>
                </ElTooltip>
                <ElTooltip show-after={600} effect="dark" placement="bottom-start" content="编辑">
                  <ElIcon
                    // @ts-ignore
                    onClick={() => openDialogByEdit(page, index)}
                  >
                    <Edit />
                  </ElIcon>
                </ElTooltip>
                <ElTooltip show-after={600} effect="dark" placement="bottom-start" content="删除">
                  <ElIcon
                    // @ts-ignore
                    onClick={() => removePage(page, index)}
                  >
                    <Close />
                  </ElIcon>
                </ElTooltip>
              </p>
            </li>
          ))}
        </ul>
      </div>
    )
  },
})

<script setup lang="ts">
import { useAppPagesStore } from '@editor/stores'
import type { AppPageItem } from '@editor/stores'
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
import { computed, ref } from 'vue'

type PageOption = Pick<AppPageItem, 'title' | 'path'>

const pageStore = useAppPagesStore()
const { pages, currentPage } = storeToRefs(pageStore)

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
  path: '',
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
  const { title, path } = newPage.value
  if (title && path) {
    if (isEdit.value) {
      pageStore.updatePage(pageIndex.value, newPage.value)
    } else {
      pageStore.createAppPage(newPage.value)
    }
    showDialog.value = false
    newPage.value = { title: '', path: '' }
  } else {
    ElMessage({
      message: '标题或路径不能为空',
      type: 'warning',
    })
  }
}
const removePage = async (page: PageOption, index: number): Promise<void> => {
  await ElMessageBox.confirm(`是否删除 ${page.title} ?`, '警告', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning',
  })
  pageStore.removePage(index)
}
</script>
<template>
  <div class="page-tree">
    <ElButton :icon="CirclePlus" type="primary" @click="openDialogByCreate">新增页面</ElButton>
    <ElDialog v-model="showDialog" :title="dialogText.title" append-to-body>
      <ElForm :model="newPage">
        <ElFormItem label="页面标题">
          <ElInput v-model="newPage.title" />
        </ElFormItem>
        <ElFormItem label="页面路径">
          <ElInput v-model="newPage.path" />
        </ElFormItem>
      </ElForm>
      <template #footer>
        <span class="dialog-footer">
          <ElButton @click="showDialog = false">取消</ElButton>
          <ElButton type="primary" @click="submitDialog">{{ dialogText.submit }}</ElButton>
        </span>
      </template>
    </ElDialog>
    <ul class="page-tree-list">
      <li class="list-head">
        <span class="flex-1">标题(路径)</span>
      </li>
      <template v-for="(page, index) in pages" :key="index">
        <li :class="{ current: page.path === currentPage.path }">
          <p class="flex-1">
            <ElTooltip
              effect="dark"
              :show-after="600"
              placement="bottom-start"
              :content="`${page.title} (${page.path})`"
            >
              <span class="cursor-pointer" @click="pageStore.setCurrentPage(page)"
                >{{ page.title }} ({{ page.path }})</span
              >
            </ElTooltip>
          </p>
          <p class="flex items-center">
            <ElTooltip
              effect="dark"
              :show-after="600"
              placement="bottom-start"
              content="设置为首页"
            >
              <ElIcon :class="{ 'is-home': page.isHome }" @click="pageStore.updateHomePage(page)">
                <HomeFilled />
              </ElIcon>
            </ElTooltip>
            <ElTooltip :show-after="600" effect="dark" placement="bottom-start" content="编辑">
              <ElIcon @click="openDialogByEdit(page, index)"><Edit /></ElIcon>
            </ElTooltip>
            <ElTooltip :show-after="600" effect="dark" placement="bottom-start" content="删除">
              <ElIcon @click="removePage(page, index)"><Close /></ElIcon>
            </ElTooltip>
          </p>
        </li>
      </template>
    </ul>
  </div>
</template>
<style lang="scss" scoped>
.page-tree {
  width: 240px;
}

.page-tree-list {
  @apply mt-5;

  li {
    @apply flex justify-start items-center py-2 px-2 my-2;

    transition: color var(--t-color), background-color var(--t-color);

    :deep(.el-icon) {
      @apply mr-1 cursor-pointer opacity-0;

      transition: opacity var(--t-color);

      &:last-of-type {
        @apply mr-0;
      }

      &.is-home {
        @apply opacity-100;
      }
    }

    &:hover :deep(.el-icon) {
      @apply opacity-100;
    }

    &.current {
      color: var(--c-brand);
      background-color: var(--c-bg-light);
      border-radius: 5px;
    }
  }

  .list-head {
    @apply font-bold border-b pb-2;
  }
}
</style>

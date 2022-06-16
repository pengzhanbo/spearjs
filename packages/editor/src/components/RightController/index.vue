<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'RightController',
})
</script>
<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import { ElTabs, ElTabPane } from 'element-plus'
import { DArrowLeft, DArrowRight } from '@element-plus/icons-vue'
import { tabs } from './tabs'
import BlockTree from './BlockTree'
import { useAppPagesStore } from '@editor/stores'

const pageStore = useAppPagesStore()

const tabEnabled = computed(() => {
  const block = pageStore.focusBlock
  const list = ['page-config', 'app-config']
  if (block && block.type === 'block')
    list.unshift('attrs-config', 'styles-config', 'action-config')
  return list
})

const activeTab = ref(tabEnabled.value[0])

watch([() => pageStore.focusBlock, () => tabEnabled.value], ([block, list]) => {
  if (!block || block.type === 'group') {
    if (!list.includes(activeTab.value)) activeTab.value = 'page-config'
  } else {
    activeTab.value = list[0]
  }
})

const isOpen = ref(true)
const handleOpen = () => {
  isOpen.value = !isOpen.value
}
</script>
<template>
  <div class="right-controller-wrapper" :class="{ open: isOpen }">
    <div class="btn-arrow" @click="handleOpen">
      <component :is="isOpen ? DArrowRight : DArrowLeft" />
    </div>
    <ElTabs v-model="activeTab" type="border-card" class="right-controller-tabs">
      <template v-for="tab in tabs" :key="tab.key">
        <ElTabPane
          :label="tab.label"
          :name="tab.key"
          :disabled="!tabEnabled.includes(tab.key)"
          lazy
        >
          <component :is="tab.tab" />
        </ElTabPane>
      </template>
    </ElTabs>
    <BlockTree />
  </div>
</template>
<style lang="scss" scoped>
.right-controller-wrapper {
  @apply fixed right-0 top-14 bottom-5 z-50 -shadow-md;
  @apply w-1/3 rounded-tl-md rounded-bl-md;

  contain: layout;
  min-width: 320px;
  max-width: 450px;
  background-color: var(--c-bg-container);
  transition: transform 0.5s ease-in-out;
  transform: translate3d(100%, 0, 0);

  &.open {
    transform: translate3d(0, 0, 0);
  }

  & :deep(.el-tabs__content) {
    height: calc(100% - 40px);
    overflow-y: auto;
  }

  .btn-arrow {
    @apply absolute top-1/2 left-0 cursor-pointer;
    @apply flex justify-center items-center;
    @apply rounded-tl-md rounded-bl-md -shadow-md;

    width: 20px;
    height: 80px;
    color: var(--c-text-lightest);
    background-color: var(--c-bg-container);
    transform: translate(-100%, -50%);

    &::after {
      position: absolute;
      top: 0;
      right: -4px;
      display: block;
      width: 4px;
      height: 80px;
      content: '';
      background-color: var(--c-bg-container);
    }
  }

  .right-controller-tabs {
    height: calc(100% - 240px);
    border: none;
  }
}
</style>

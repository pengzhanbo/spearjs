<script lang="ts" setup>
import { ref } from 'vue'
import { ElTabs, ElTabPane } from 'element-plus'
import { DArrowLeft, DArrowRight } from '@element-plus/icons-vue'
import { tabs } from './tabs'

const activeTab = ref(tabs[0].key)

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
    <ElTabs v-model="activeTab" type="border-card" stretch class="right-controller-tabs">
      <template v-for="tab in tabs" :key="tab.key">
        <ElTabPane :label="tab.label" :name="tab.key" lazy>
          <component :is="tab.tab" />
        </ElTabPane>
      </template>
    </ElTabs>
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
    height: 100%;
    border: none;
  }
}
</style>

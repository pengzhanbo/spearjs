<script lang="ts" setup>
import { ElTabs, ElTabPane, ElIcon } from 'element-plus'
import { tabs } from './tabs'
import { ref } from 'vue'

const activeTab = ref(tabs[0].key)
</script>
<template>
  <div class="left-sidebar-wrapper">
    <ElTabs v-model="activeTab" tab-position="left" class="left-sidebar-tabs">
      <template v-for="tab in tabs" :key="tab.key">
        <ElTabPane :name="tab.key" lazy>
          <template #label>
            <div class="sidebar-tab">
              <ElIcon :size="24"><component :is="tab.icon" /></ElIcon>
              <p>{{ tab.label }}</p>
            </div>
          </template>
          <component :is="tab.tab" />
        </ElTabPane>
      </template>
    </ElTabs>
  </div>
</template>
<style lang="scss" scoped>
.left-sidebar-wrapper {
  @apply fixed left-0 top-14 bottom-5 z-50 shadow-md;
  @apply rounded-tr-md rounded-br-md;

  background-color: var(--c-bg-container);

  .left-sidebar-tabs {
    min-height: 100%;
    contain: layout;

    > :deep(.el-tabs__header) {
      margin-top: 1rem;
      margin-right: 0;

      .el-tabs__item {
        height: 85px;
        padding: 1rem;

        .sidebar-tab {
          @apply flex flex-col items-center justify-center;

          p {
            @apply leading-8;
          }
        }
      }
      /* stylelint-disable-next-line selector-id-pattern */
      #tab-pageTree {
        @apply relative mt-10;

        &::before {
          @apply inline-block absolute border-t-2 -top-5 left-1/2;

          width: 60px;
          height: 0;
          content: '';
          transform: translateX(-50%);
        }
      }
    }

    > :deep(.el-tabs__content) {
      padding: 1.25rem 1rem;
    }
  }
}
</style>

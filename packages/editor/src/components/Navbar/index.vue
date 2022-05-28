<script lang="ts" setup>
import SiteBrand from './SiteBrand.vue'
import { ElDropdown, ElDropdownItem, ElDropdownMenu, ElIcon } from 'element-plus'
</script>
<template>
  <header class="spear-header">
    <SiteBrand></SiteBrand>
    <div class="flex flex-1 items-center">
      <p class="header-item">
        <ElIcon class="el-icon--left"><Files /></ElIcon>
        <span>模板</span>
      </p>
      <ElDropdown>
        <p class="header-item">
          <ElIcon class="el-icon--left"><Monitor /></ElIcon>
          <span>平台</span>
          <ElIcon class="el-icon--right">
            <ArrowDown />
          </ElIcon>
        </p>
        <template #dropdown>
          <ElDropdownMenu>
            <ElDropdownItem>PC(1280x768)</ElDropdownItem>
            <ElDropdownItem>Mobile</ElDropdownItem>
          </ElDropdownMenu>
        </template>
      </ElDropdown>
    </div>
    <div class="flex items-center">
      <p class="header-item">
        <ElIcon class="el-icon--left"><View /></ElIcon>
        <span>预览</span>
      </p>
      <p class="header-item">
        <ElIcon class="el-icon--left"><RefreshRight /></ElIcon>
        <span>前进</span>
      </p>
      <p class="header-item">
        <ElIcon class="el-icon--left"><RefreshLeft /></ElIcon>
        <span>撤销</span>
      </p>
      <p class="header-item">
        <ElIcon class="el-icon--left"><Document /></ElIcon>
        <span>保存</span>
      </p>
      <p class="header-item">
        <ElIcon class="el-icon--left"><Promotion /></ElIcon>
        <span>提交</span>
      </p>
    </div>
  </header>
</template>
<style lang="scss" scoped>
.spear-header {
  @apply flex items-center fixed z-50 top-0 left-0 w-full h-12 px-9 shadow-md;

  background-color: var(--c-bg-navbar);

  .header-item {
    @apply flex items-center mr-8 text-sm cursor-pointer font-bold;

    color: var(--c-text);
    transition: color var(--t-color);

    &:hover {
      color: var(--c-brand);
    }
  }
}
</style>

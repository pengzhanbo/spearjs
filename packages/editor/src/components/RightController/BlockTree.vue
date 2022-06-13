<script setup lang="ts"></script>
<template>
  <div class="blocks-tree-wrapper">
    <h3>组件树</h3>
    <div class="flex-1 px-5 py-2 overflow-y-auto"></div>
  </div>
</template>
<style lang="scss" scoped>
.blocks-tree-wrapper {
  @apply w-full border-t-3 border-double;
  @apply flex flex-col;

  height: 240px;

  h3 {
    @apply px-5 py-1 text-sm font-bold bg-light-300 border-b;

    color: var(--c-text-lighter);
  }
}
</style>

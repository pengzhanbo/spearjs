<script setup lang="ts">
import zhCN from 'element-plus/lib/locale/lang/zh-cn'
import { DndProvider } from 'vue3-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
</script>

<template>
  <ElConfigProvider :locale="zhCN">
    <DndProvider :backend="HTML5Backend">
      <RouterView #="{ Component, route }">
        <Component :is="Component" :key="route.path"></Component>
      </RouterView>
    </DndProvider>
  </ElConfigProvider>
</template>

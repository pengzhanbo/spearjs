<script setup lang="ts">
import zhCN from 'element-plus/lib/locale/lang/zh-cn'
</script>

<template>
  <ElConfigProvider :locale="zhCN">
    <RouterView #="{ Component, route }">
      <Component :is="Component" :key="route.path"></Component>
    </RouterView>
  </ElConfigProvider>
</template>

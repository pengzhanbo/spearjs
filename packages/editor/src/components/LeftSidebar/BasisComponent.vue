<script lang="ts" setup>
import type { WidgetComponentItem } from '@editor/services/widget'
import { getWidgetComponentList } from '@editor/services/widget'
import { ref } from 'vue'
import WidgetPreview from '../WidgetPreview'

const widgetList = ref<WidgetComponentItem[]>([])

const initWidgetList = async () => {
  widgetList.value = await getWidgetComponentList({ _type: 'basis' })
}
initWidgetList()
</script>
<template>
  <div class="basis-component-container">
    <template v-for="widget in widgetList" :key="widget.id">
      <WidgetPreview :widget="widget" />
    </template>
  </div>
</template>
<style lang="scss" scoped>
.basis-component-container {
  @apply w-1/3;

  min-width: 320px;
  max-width: 450px;
}
</style>

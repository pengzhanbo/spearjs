<script lang="ts" setup>
import Draggable from 'vuedraggable'
import { useVModel } from '@vueuse/core'

const emit = defineEmits(['update:modelValue', 'update:drag'])

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => [],
  },
  itemKey: {
    type: String,
    default: '_widget',
  },
  drag: {
    type: Boolean,
    default: false,
  },
  group: {
    type: Object,
    default: () => ({ name: 'components' }),
  },
  fallbackClass: {
    type: String,
    default: '',
  },
})

const isDrag = useVModel(props, 'drag', emit)
const list = useVModel(props, 'modelValue', emit)
</script>
<template>
  <Draggable
    v-model="list"
    v-bind="{ ...$attrs }"
    :class="{ isDrag }"
    class="dragArea list-group"
    tag="transition-group"
    :component-data="{
      tag: 'div',
      type: 'transition-group',
      name: !isDrag ? 'flip-list' : null,
    }"
    :animation="200"
    :disabled="false"
    :scroll="true"
    ghost-class="ghost"
    @start="isDrag = true"
    @end="isDrag = false"
  >
    <template #item="item">
      <div :class="{ 'item-drag': item.element.draggable }" :data-el="item.element.draggable">
        <slot name="item" v-bind="item"></slot>
      </div>
    </template>
  </Draggable>
</template>
<style lang="scss" scoped>
.flip-list-move {
  transition: transform 0.5s;
}

.no-move {
  transition: transform 0s;
}

.ghost {
  background-color: var(--c-bg-lighter);
  opacity: 0.5;
}

// &.isDrag:not(.no-child) :deep(.list-group-item.has-slot) {

// }
</style>

<script lang="ts" setup>
import Stage from '../components/Stage'
import Navbar from '../components/Navbar/index.vue'
import LeftSidebar from '../components/LeftSidebar/index.vue'
import RightController from '../components/RightController/index.vue'
import { useStagePosition } from '../hooks/useStagePosition'
import { computed, ref, Ref, onMounted } from 'vue'

const position = useStagePosition()

const containerStyle = computed(() => ({
  width: position.value.cw + 'px',
  height: position.value.ch + 'px',
}))
const stageStyle = computed(() => ({
  'position': 'absolute',
  'top': position.value.y + 'px',
  'left': position.value.x + 'px',
  'width': position.value.sw + 'px',
  'min-height': position.value.sh + 'px',
}))

const wrapperEl: Ref<HTMLElement | null> = ref(null)

onMounted(() => {
  if (wrapperEl.value) {
    wrapperEl.value.scrollTo({ left: position.value.cl, top: position.value.ct })
  }
})
</script>
<template>
  <div :ref="(el) => (wrapperEl = el as HTMLElement)" class="editor-wrapper">
    <Navbar />
    <LeftSidebar />
    <div class="editor-container" :style="containerStyle">
      <Stage :style="stageStyle"></Stage>
    </div>
    <RightController />
  </div>
</template>
<style lang="scss" scoped>
.editor-wrapper {
  @apply w-full h-full overflow-auto;

  .editor-container {
    @apply relative;
  }

  &::-webkit-scrollbar {
    width: 0;
    height: 7px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.55);
    border-radius: 3.5px;
  }
}
</style>

import type { Ref } from 'vue'
import { computed, defineComponent, onMounted, ref } from 'vue'
import { useStagePosition } from '../../hooks/useStagePosition'
import LeftSidebar from '../LeftSidebar'
import Navbar from '../Navbar'
import RightController from '../RightController'
import Stage from '../Stage'
import styles from './index.module.scss'

export default defineComponent({
  name: 'Home',
  setup() {
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

    return () => (
      <div ref={(el) => (wrapperEl.value = el as HTMLElement)} class={styles.editorWrapper}>
        <Navbar />
        <LeftSidebar />
        <div class={styles.editorContainer} style={containerStyle.value}>
          <Stage style={stageStyle.value}></Stage>
        </div>
        <RightController />
      </div>
    )
  },
})

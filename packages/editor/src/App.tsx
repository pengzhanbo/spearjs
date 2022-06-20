import { ElConfigProvider } from 'element-plus'
import zhCN from 'element-plus/lib/locale/lang/zh-cn'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { defineComponent } from 'vue'
import { RouterView } from 'vue-router'
import { DndProvider } from 'vue3-dnd'

export default defineComponent({
  name: 'App',
  setup() {
    return () => (
      <ElConfigProvider locale={zhCN}>
        <DndProvider backend={HTML5Backend}>
          <RouterView></RouterView>
        </DndProvider>
      </ElConfigProvider>
    )
  },
})

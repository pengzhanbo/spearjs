import { defineComponent } from 'vue'
import zhCN from 'element-plus/lib/locale/lang/zh-cn'
import { DndProvider } from 'vue3-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { ElConfigProvider } from 'element-plus'
import { RouterView } from 'vue-router'

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

import 'element-plus/dist/index.css'
import ElementPlus from 'element-plus'
import type { App } from 'vue'
import * as ElementPlusIcons from '@element-plus/icons-vue'

export function setupElementPlus(app: App) {
  app.use(ElementPlus)
  for (const [key, component] of Object.entries(ElementPlusIcons)) {
    app.component(key, component)
  }
}

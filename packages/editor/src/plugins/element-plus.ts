import 'element-plus/dist/index.css'
import {
  Check,
  Delete,
  Edit,
  Message,
  Search,
  Star,
} from '@element-plus/icons-vue'
import ElementPlus from 'element-plus'
import type { App, Plugin } from 'vue'

const iconList = [Search, Delete, Edit, Check, Message, Star]

export function setupElementPlus(app: App) {
  app.use(ElementPlus as unknown as Plugin)
  iconList.forEach((icon) => app.component(icon.name, icon))
}

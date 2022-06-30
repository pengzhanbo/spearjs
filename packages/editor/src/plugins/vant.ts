import 'vant/lib/index.css'
import Vant from 'vant'
import type { App } from 'vue'

export const setupVant = (app: App) => {
  app.use(Vant)
}

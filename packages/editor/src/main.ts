import { createApp } from 'vue'
import App from './App'
import { setupStoreCache } from './hooks'
import { setupElementPlus, setupVant } from './plugins'
import { router, setupRouter } from './router'
import { setupStore } from './stores'
import './widgets'

import 'virtual:windi-devtools'
import 'virtual:windi.css'
import './styles/index.scss'

const bootstrap = async () => {
  const app = createApp(App)

  setupElementPlus(app)
  setupVant(app)

  setupStore(app)
  await setupStoreCache()

  setupRouter(app)

  await router.isReady()
  app.mount('#app')
}

bootstrap()

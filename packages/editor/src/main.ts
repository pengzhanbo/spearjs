import { createApp } from 'vue'
import App from './App'
import { setupElementPlus, setupVant } from './plugins'
import { router, setupRouter } from './router'
import { setupStore } from './stores'
import './widgets'

import 'virtual:windi-devtools'
import 'virtual:windi.css'

import './styles/index.scss'

const app = createApp(App)

setupStore(app)
setupRouter(app)
setupElementPlus(app)
setupVant(app)

router.isReady().then(() => app.mount('#app'))

import { createApp } from 'vue'
import App from './App.vue'
import { setupRouter, router } from './router'
import { setupStore } from './stores'
import { setupElementPlus } from './plugins'
import './widgets'

import 'virtual:windi-devtools'
import 'virtual:windi.css'

import './styles/index.scss'

const app = createApp(App)

setupStore(app)
setupRouter(app)
setupElementPlus(app)

router.isReady().then(() => app.mount('#app'))

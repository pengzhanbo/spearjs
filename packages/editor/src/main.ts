import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'
import { setupElementPlus } from './plugins'

import 'normalize.css'
import 'virtual:windi.css'
import 'virtual:windi-devtools'
import './styles/index.scss'

const app = createApp(App)

setupElementPlus(app)

app.use(router)

router.isReady().then(() => app.mount('#app'))

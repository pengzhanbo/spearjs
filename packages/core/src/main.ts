import { createPinia } from 'pinia'
import { createApp } from 'vue'
import type { Router } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App'
import { appConfig } from './mock'
import { setupRenderer } from './renderer'

const bootstrap = async () => {
  const app = createApp(App)

  const router: Router = createRouter({
    history: createWebHistory(),
    routes: [],
  })

  const store = createPinia()

  app.use(store)

  await setupRenderer({
    app,
    router,
    appConfig,
  })

  app.use(router)

  await router.isReady()
  app.mount('#app')
}

bootstrap()

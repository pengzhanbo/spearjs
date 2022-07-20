# @spearjs/core

- 应用渲染器
- 资源加载器
- 类型

## Usage

`main.ts`:

```ts
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import type { Router } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App'
import { appConfig } from './appConfig'
import { setupRenderer } from '@spearjs/core'

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
```

`App.vue`:

```vue
<script lang="ts" setup>
import { ApplicationView } from '@spearjs/core'
</script>
<template>
  <ApplicationView />
</template>
```

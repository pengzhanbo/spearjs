import { resolve } from 'path'
import legacy from '@vitejs/plugin-legacy'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import type { UserConfig } from 'vite'
import { defineConfig, loadEnv } from 'vite'
import windicss from 'vite-plugin-windicss'

export default defineConfig(({ mode }): UserConfig => {
  const { VITE_BASE_URL } = loadEnv(mode, process.cwd())
  return {
    base: VITE_BASE_URL || '/',
    resolve: {
      alias: [{ find: '@editor', replacement: resolve(__dirname, './src') }],
    },
    server: {
      cors: true,
      host: '0.0.0.0',
      proxy: {
        '/api': {
          target: 'http://localhost:4396',
          changeOrigin: true,
          secure: false,
          rewrite: (url) => url.replace('/api/', '/'),
        },
        '/static': {
          target: 'http://localhost:4396',
          changeOrigin: true,
          secure: false,
          rewrite: (url) => url.replace('/static/', '/'),
        },
      },
    },
    plugins: [vue(), vueJsx(), windicss(), legacy({ targets: ['defaults', 'not IE 11'] })],
    css: {
      modules: {
        localsConvention: 'camelCase',
      },
    },
    build: {
      cssCodeSplit: true,
      sourcemap: false,
      chunkSizeWarningLimit: 550,
      assetsInlineLimit: 4096,
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
    },
    optimizeDeps: {
      include: ['@vueuse/core', 'element-plus', 'lodash-es', 'vue3-dnd'],
    },
  }
})

import { loadEnv, defineConfig, UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import windicss from 'vite-plugin-windicss'
import legacy from '@vitejs/plugin-legacy'
import { resolve } from 'path'

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
          target: '',
          changeOrigin: true,
          secure: false,
          // rewrite: (url) => url.replace('/api/', '/'),
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
      include: ['@vueuse/core', 'element-plus', 'lodash-es'],
    },
  }
})

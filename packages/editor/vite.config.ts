import { loadEnv, defineConfig, UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import windicss from 'vite-plugin-windicss'
import legacy from '@vitejs/plugin-legacy'
import * as path from 'path'

export default defineConfig(({ mode }): UserConfig => {
  const { VITE_BASE_URL } = loadEnv(mode, process.cwd())
  return {
    base: VITE_BASE_URL,
    plugins: [vue(), vueJsx(), windicss(), legacy({ targets: ['defaults', 'not IE 11'] })],
    resolve: {
      alias: [{ find: '@editor', replacement: path.resolve(__dirname, './src') }],
    },
    proxy: {
      '/api': {
        target: '',
        changeOrigin: true,
        secure: false,
        // rewrite: (url) => url.replace('/api/', '/'),
      },
    },
    server: {
      cors: true,
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
      include: ['@vueuse/core', 'element-plus', 'lodash-es', 'vuedraggable'],
    },
    css: {
      modules: {
        localsConvention: 'camelCase',
      },
      preprocessorOptions: {
        scss: {
          charset: false,
        },
      },
      // @ts-ignore
      charset: false,
      postcss: {
        plugins: [
          {
            postcssPlugin: 'internal:charset-removal',
            AtRule: {
              charset: (atRule) => {
                if (atRule.name === 'charset') {
                  atRule.remove()
                }
              },
            },
          },
        ],
      },
    },
  }
})

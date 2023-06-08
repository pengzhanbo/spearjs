import { resolve } from 'node:path'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import type { UserConfigExport } from 'vite'
import { defineConfig } from 'vite'
import windicss from 'vite-plugin-windicss'

export default defineConfig({
  resolve: {
    alias: [{ find: '@core', replacement: resolve(__dirname, './src') }],
  },
  plugins: [vue(), vueJsx(), windicss()],
  css: {
    modules: {
      localsConvention: 'camelCase',
    },
  },
  build: {
    cssCodeSplit: false,
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
    lib: {
      entry: resolve('src/core.ts'),
      name: 'SpearjsCore',
      fileName: 'core',
    },
    rollupOptions: {
      external: ['vue', 'vue-router', 'pinia', '@spearjs/shared'],
      output: {
        globals: {
          'vue': 'Vue',
          'vue-router': 'VueRouter',
          'pinia': 'Pinia',
        },
      },
    },
  },
  optimizeDeps: {
    include: ['lodash-es'],
  },
}) as UserConfigExport

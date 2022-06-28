/**
 * 目前阶段，可以选择支持以下 四大UI框架，也可以不使用任意一个。
 */
export const thirdLibList = [
  {
    name: 'element-plus',
    assert: {
      js: ['//unpkg.com/element-plus'],
      css: ['//unpkg.com/element-plus/dist/index.css'],
    },
  },
  {
    name: 'vant',
    assert: {
      js: ['//unpkg.com/vant'],
      css: ['//unpkg.com/vant/lib/index.css'],
    },
  },
  // ant-design-vue 有 dayjs的依赖，所以需要全局安装dayjs
  {
    name: 'ant-design-vue',
    assert: {
      js: ['//unpkg.com/ant-design-vue'],
      css: ['//unpkg.com/ant-design-vue/antd.min.css'],
    },
  },
  {
    name: 'naive-ui',
    asserts: {
      js: ['//unpkg.com/naive-ui/dist/index.prod.js'],
    },
    preload: [],
  },
]

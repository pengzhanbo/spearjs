import { provide, inject } from 'vue'
import type { InjectionKey } from 'vue'

const applicationDataSymbol: InjectionKey<ReturnType<typeof initApplicationData>> = Symbol()

const initApplicationData = () => {
  const applicationData = {
    pages: {
      '/': {
        title: '',
        path: '/',
        isHome: true,
        // 页面配置
        config: {},
        // 页面布局 blocks
        // 存放页面使用到的所有 block
        blocks: [],
        actions: [],
        services: [],
        // 路由守卫
        // 在这里 需要考虑如何实现
        guards: [
          {
            type: 'beforeEach',
            name: '',
            // 进入条件
            condition: [],
          },
        ],
      },
    },
    // 应用配置
    config: {
      // 路由公共前缀
      base: '/',
      // 路由模式 history hash 默认： hash
      history: '',
      theme: {},
    },
    // 数据模型 emm 好像需要，但是还没考虑清楚
    models: [
      {
        // 模型名称
        name: '',
        entities: [{ key: '', name: '', type: '', value: '' }],
      },
    ],
    // 请求接口数据源配置
    fetches: [
      {
        name: '',
        url: '',
        method: '',
        contentType: '',
        // 请求入参数据模型
        requestModel: [],
        // 响应体数据模型
        responseModel: [],
        // 请求成功标记
        sussesFlag: {
          key: '',
          value: '',
        },
      },
    ],
    // 动作合集
    // 这里收集的是各个定义一些动作，可以通过交互触发
    actions: [],
    // 功能服务
    // 直接内置的一些功能服务，如请求某个接口，以及其他功能，还没想好
    services: {},
  }
  return {
    applicationData,
  }
}

export const setupApplicationData = () => {
  const applicationData = initApplicationData()
  provide(applicationDataSymbol, applicationData)
}

export const useApplicationData = (): ReturnType<typeof initApplicationData> => {
  const applicationData = inject(applicationDataSymbol)
  if (!applicationData) {
    throw new Error('useApplicationData() is called without provider')
  }
  return applicationData
}

import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PageConfig',
  setup: () => {
    return () => (
      <div>
        <p>页面路由配置： 路由参数配置</p>
        <p>初始化数据配置： 通过 services 获取数据，并挂载在 store上。</p>
        <p>组件可以通过数据模型映射获取store上的数据</p>
      </div>
    )
  },
})

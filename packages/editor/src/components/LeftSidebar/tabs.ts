import { Box, Coin, Grid, HotWater, Reading, ScaleToOriginal } from '@element-plus/icons-vue'
import BasisComponent from './BasisComponent.vue'
import BusinessComponent from './BusinessComponent.vue'
import ContainerComponent from './ContainerComponent.vue'
import DataModel from './DataModel.vue'
import ModuleComponent from './ModuleComponent.vue'
import PageTree from './PageTree.vue'

export const tabs = [
  {
    label: '基础组件',
    key: 'basisComponents',
    icon: Box,
    tab: BasisComponent,
  },
  {
    label: '容器组件',
    key: 'containerComponents',
    icon: Grid,
    tab: ContainerComponent,
  },
  {
    label: '业务组件',
    key: 'businessComponents',
    icon: ScaleToOriginal,
    tab: BusinessComponent,
  },
  {
    label: '模块',
    key: 'moduleComponents',
    icon: HotWater,
    tab: ModuleComponent,
  },
  {
    label: '页面',
    key: 'pageTree',
    icon: Reading,
    tab: PageTree,
  },
  {
    label: '数据源',
    key: 'dataModel',
    icon: Coin,
    tab: DataModel,
  },
]

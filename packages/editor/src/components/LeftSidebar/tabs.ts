import {
  BasisComponentIcon,
  BusinessComponentIcon,
  ContainerComponentIcon,
  DataSourceIcon,
  ModulesIcon,
  PageIcon,
} from '../Icons'
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
    icon: BasisComponentIcon,
    tab: BasisComponent,
  },
  {
    label: '容器组件',
    key: 'containerComponents',
    icon: ContainerComponentIcon,
    tab: ContainerComponent,
  },
  {
    label: '业务组件',
    key: 'businessComponents',
    icon: BusinessComponentIcon,
    tab: BusinessComponent,
  },
  {
    label: '模块',
    key: 'moduleComponents',
    icon: ModulesIcon,
    tab: ModuleComponent,
  },
  {
    label: '页面',
    key: 'pageTree',
    icon: PageIcon,
    tab: PageTree,
  },
  {
    label: '数据源',
    key: 'dataModel',
    icon: DataSourceIcon,
    tab: DataModel,
  },
]

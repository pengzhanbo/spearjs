import {
  BasisComponentIcon,
  BusinessComponentIcon,
  ContainerComponentIcon,
  DataSourceIcon,
  ModulesIcon,
  PageIcon,
} from '../Icons'
import BasisComponent from './Basis'
import BusinessComponent from './Business'
import ContainerComponent from './Container'
import DataModel from './Data'
import ModuleComponent from './Modules'
import PageTree from './PageTree'

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

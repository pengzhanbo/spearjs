import { spearJs } from '@editor/common'
import type { ComponentWidget } from '@spearjs/shared'
import Button from './button'
import Flex from './flex'
import Gird from './gird'
import VantButton from './vant/Button'
import VantCell from './vant/Cell'

const widgetList: ComponentWidget[] = [Button, Gird, Flex, VantButton, VantCell]

widgetList.forEach((widget) => spearJs.registerWidget(widget))

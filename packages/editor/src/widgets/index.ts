import { spearJs } from '@editor/common'
import { ComponentWidget } from '@spearjs/shared'
import Button from './button'
import Gird from './gird'
import Flex from './flex'

const widgetList: ComponentWidget[] = [Button, Gird, Flex]

widgetList.forEach((widget) => spearJs.registerWidget(widget))

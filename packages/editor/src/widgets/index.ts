import { spearJs } from '@editor/common'
import { ComponentWidget } from '@spearjs/shared'
import Button from './button'
import Gird from './gird'

const widgetList: ComponentWidget[] = [Button, Gird]

widgetList.forEach((widget) => spearJs.registerWidget(widget))

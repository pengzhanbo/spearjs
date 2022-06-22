import type { WidgetActions } from '@spearjs/shared'
import type { AppBlockActions } from './appBlocks'

export const createBlockActions = (actions: WidgetActions): AppBlockActions => {
  const blockActions: AppBlockActions = {}
  actions.forEach(({ action }) => {
    blockActions[action] = []
  })
  return blockActions
}

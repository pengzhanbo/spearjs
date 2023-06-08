import type { AppBlockActions } from '@spearjs/core'
import type { WidgetActions } from '@spearjs/shared'
import { isFunction } from '@spearjs/shared'
import { getComponentInstance } from './componentInstanceMap'

export const createBlockActions = (actions: WidgetActions): AppBlockActions => {
  const blockActions: AppBlockActions = {}
  actions.forEach(({ action }) => {
    blockActions[action] = []
  })
  return blockActions
}

export const emitAction = (actions: AppBlockActions, name: string) => {
  if (!actions[name]) return
  const list = actions[name]
  list.forEach(async ({ type, bid, name }) => {
    if (type === 'block') {
      const instance = getComponentInstance(bid!)
      const expose =
        instance && instance.exposed && instance.exposed[name]
          ? instance.exposed[name]
          : null
      isFunction(expose) && (await expose())
    }
  })
}

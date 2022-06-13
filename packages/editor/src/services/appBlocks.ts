import type { ComponentWidget, WidgetPropItem, WidgetPropsGroup } from '@spearjs/shared'
import { isFunction } from '@spearjs/shared'
import { generateBid, generateBlockGroupKey } from './idGenerator'

export type AppBlocks = (AppBlock | AppBlockGroup)[]

export interface AppBlockGroup {
  bid: string
  type: 'group'
  label: string
  blocks: AppBlocks
}
export interface AppBlock {
  type: 'block'
  label: string
  component: {
    id: string
    version: string
  }
  bid: string
  props: Record<string, any>
  styles: Record<string, any>
  slots: Record<string, AppBlocks>
}

export function getDefaultValue(type: any, defaultValue?: any): any {
  if (defaultValue) {
    return defaultValue
  }
  if (type === String) {
    return ''
  }
  if (type === Object) {
    return {}
  }
  if (type === Array) {
    return []
  }
  if (type === Boolean) {
    return !!defaultValue
  }
  if (type === Function) {
    return () => {}
  }
}

const blockIndex: Record<string, number> = {
  block: 0,
}

const getBlockLabel = (label?: string): string => {
  if (!label) {
    return 'block_' + blockIndex.block++
  }
  if (!blockIndex[label]) {
    blockIndex[label] = 0
  }
  return `${label}_${blockIndex[label]++}`
}

export const createBlock = (widget: ComponentWidget): AppBlock => {
  const data = {}
  const { props, slots = [] } = widget
  props.forEach((prop) => {
    if ((prop as WidgetPropsGroup).props) {
      ;(prop as WidgetPropsGroup).props.forEach((prop: WidgetPropItem) => {
        data[prop.key] = getDefaultValue(prop.type, prop?.form?.defaultValue)
      })
    } else {
      prop = prop as WidgetPropItem
      data[prop.key] = getDefaultValue(prop.type, prop?.form?.defaultValue)
    }
  })
  const _slots = {}
  ;(isFunction(slots) ? slots(data) : slots).forEach((name: string) => {
    _slots[name] = []
  })
  return {
    type: 'block',
    label: getBlockLabel(widget.label),
    component: {
      id: widget.id,
      version: widget.version,
    },
    bid: generateBid(),
    props: data,
    styles: {},
    slots: _slots,
  }
}

let groupIndex = 0
export const createBlockGroup = (label?: string): AppBlockGroup => {
  return {
    bid: generateBlockGroupKey(),
    label: label || 'group_' + groupIndex++,
    type: 'group',
    blocks: [],
  }
}

/**
 * 查找 block group 分组
 */
export const findBlockGroup = (blocks: AppBlocks, bid: string | number): AppBlockGroup | null => {
  // 优先同级遍历，同级查找不到再进行深度遍历
  const group = blocks.find((block) => block.type === 'group' && block.bid === bid)
  if (group) return group as AppBlockGroup
  for (let i = 0, l = blocks.length; i < l; i++) {
    const block = blocks[i]
    if (block.type === 'group') {
      const group = findBlockGroup(block.blocks, bid)
      if (group) return group
    } else {
      // 查找同级的 slots 是否有 对应的 group
      const slots = Object.keys(block.slots).map((name: string) => block.slots[name])
      if (slots.length) {
        for (let s = 0, sl = slots.length; s < sl; s++) {
          const group = findBlockGroup(slots[s], bid)
          if (group) return group
        }
      }
    }
  }
  return null
}

export const findBlockByBid = (blocks: AppBlocks, bid: string): AppBlock | AppBlockGroup | null => {
  const block = blocks.find((block) => block.type === 'block' && block.bid === bid)
  if (block) return block
  for (let i = 0, l = blocks.length; i < l; i++) {
    const block = blocks[i]
    if (block.type === 'group') {
      const current = findBlockByBid(block.blocks, bid)
      if (current) return current
    } else {
      const slots = Object.keys(block.slots).map((key: string) => block.slots[key])
      if (slots.length) {
        for (let s = 0, sl = slots.length; s < sl; s++) {
          const current = findBlockByBid(slots[s], bid)
          if (current) return current
        }
      }
    }
  }
  return null
}

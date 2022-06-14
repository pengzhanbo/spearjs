import { ComponentWidget, hasOwn, WidgetPropItem, WidgetProps } from '@spearjs/shared'
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

export function getDefaultValue(prop: WidgetPropItem): any {
  switch (prop.type) {
    case 'text':
      return prop.defaultValue || ''
    case 'number':
      return prop.defaultValue || prop.min || 0
    case 'select':
      const multiple = hasOwn(prop, 'multiple') ? prop.multiple : false
      if (multiple) {
        return prop.defaultValue
          ? Array.isArray(prop.defaultValue)
            ? prop.defaultValue
            : [prop.defaultValue]
          : []
      } else {
        return prop.defaultValue || prop.options[0].value
      }
    case 'switch':
      return hasOwn(prop, 'defaultValue') ? prop.defaultValue : false
    case 'date':
      return prop.defaultValue || new Date()
    case 'array':
      return (
        prop.defaultValue || (hasOwn(prop.items, 'defaultValue') ? [prop.items.defaultValue] : [])
      )
    case 'object':
      const obj = {}
      prop.props.forEach((prop) => {
        obj[prop.key] = getDefaultValue(prop)
      })
      return obj
    default:
      return undefined
  }
}

const createProps = (props: WidgetProps, result: Record<string, any> = {}): Record<string, any> => {
  props.forEach((prop: WidgetPropItem) => {
    if (prop.type === 'group') {
      createProps(prop.props, result)
    } else {
      result[prop.key] = getDefaultValue(prop)
    }
  })
  return result
}

export const createBlock = (widget: ComponentWidget): AppBlock => {
  const props = createProps(widget.props || [])
  const { slots = [] } = widget
  const _slots = {}
  ;(isFunction(slots) ? slots(props) : slots).forEach((name: string) => {
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
    props,
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

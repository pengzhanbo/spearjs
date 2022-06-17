import type { ComponentWidget } from '@spearjs/shared'
import { isFunction } from '@spearjs/shared'
import { generateBid, generateBlockGroupKey } from './idGenerator'
import { createProps } from './createProps'
import { createStyles } from './createStyles'
import { readonly } from 'vue'
import cloneDeep from 'lodash-es/cloneDeep'

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
  const props = cloneDeep(createProps(widget.props || []))
  const { slots = [] } = widget
  const _slots = {}
  ;(isFunction(slots) ? slots(readonly(props)) : slots).forEach((name: string) => {
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
    styles: cloneDeep(createStyles(widget)),
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

export const findBlockByBid = (blocks: AppBlocks, bid: string): AppBlock | AppBlockGroup | null => {
  const block = blocks.find((block) => block.bid === bid)
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

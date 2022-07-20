import type { AppBlock, AppBlockGroup, AppBlocks } from '@spearjs/core'
import type { ComponentWidget } from '@spearjs/shared'
import { isFunction } from '@spearjs/shared'
import cloneDeep from 'lodash-es/cloneDeep'
import { readonly } from 'vue'
import { createBlockActions } from './appActions'
import { createProps } from './createProps'
import { createStyles } from './createStyles'
import { generateBid, generateBlockGroupKey } from './idGenerator'

const blockIndex: Record<string, number> = {
  block: 0,
}

/**
 * 生成一个 block label
 */
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
    widget: {
      id: widget.id,
      version: widget.version,
      // todo widget js css
      js: '',
      css: '',
    },
    bid: generateBid(),
    props,
    styles: cloneDeep(createStyles(widget)),
    slots: _slots,
    actions: createBlockActions(widget.actions || []),
    editor: {
      visibility: true,
    },
  }
}

let groupIndex = 0
export const createBlockGroup = (label?: string): AppBlockGroup => {
  return {
    bid: generateBlockGroupKey(),
    label: label || 'group_' + groupIndex++,
    type: 'group',
    blocks: [],
    editor: {
      visibility: true,
    },
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

// export type AppBlocks = (AppBlock | AppBlockGroup)[]

// export interface AppBlockGroup {
//   bid: string
//   type: 'group'
//   label: string
//   blocks: AppBlocks
//   editor: BlockEditorOption
// }
// export interface AppBlock {
//   type: 'block'
//   label: string
//   component: {
//     id: string
//     version: string
//   }
//   bid: string
//   props: Record<string, any>
//   styles: AppBlockStyles
//   slots: Record<string, AppBlocks>
//   actions: AppBlockActions
//   editor: BlockEditorOption
// }

// export type AppBlockActions = Record<string, AppBlockAction[]>
// export interface AppBlockAction {
//   /**
//    * service 查找区间
//    */
//   type: 'global' | 'block'
//   /**
//    * type 为 block 时，通过 bid 查找 block 上的 expose
//    */
//   bid?: string
//   /**
//    * expose name
//    */
//   name: string
//   /**
//    * 参数映射
//    * 将当前 block props 映射为 service 需要的第一个入参
//    * service的第一个参数必须是一个对象
//    */
//   mapping: any[]
// }

// export interface BlockEditorOption {
//   visibility: boolean
// }

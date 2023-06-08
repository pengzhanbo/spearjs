import type { AppPageList } from '@editor/stores'
import type { AppBlocks } from '@spearjs/core'
import { findWidget } from './widget'

const findBlocksDependencies = (
  blocks: AppBlocks,
  result: string[] = [],
): string[] => {
  for (let i = 0, l = blocks.length; i < l; i++) {
    const block = blocks[i]
    if (block.type === 'group') {
      findBlocksDependencies(block.blocks, result)
    } else {
      const widget = findWidget(block.widget.id, block.widget.version)
      widget && widget.dependence && result.push(widget.dependence)
      const slots = Object.keys(block.slots).map(
        (key: string) => block.slots[key],
      )
      if (slots.length) {
        for (let s = 0, sl = slots.length; s < sl; s++) {
          findBlocksDependencies(slots[s], result)
        }
      }
    }
  }
  return result
}

export const getDependencies = (pages: AppPageList): string[] => {
  const result: string[] = []
  pages.forEach((page) => findBlocksDependencies(page.blocks, result))
  return Array.from(new Set(result))
}

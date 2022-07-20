import type { AppBlock } from '@spearjs/core'
import type { FunctionalComponent } from 'vue'

export const BlockHeader: FunctionalComponent<{ block: AppBlock }> = ({ block }) => {
  return (
    <p class="flex justify-between items-center text-sm font-bold pb-2 border-b mb-4">
      <span>组件名：{block.label}</span>
      <span>组件ID: {block.bid}</span>
    </p>
  )
}

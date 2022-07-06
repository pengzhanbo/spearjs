import type { AppBlock } from '@editor/services'
import { emitAction, findBlockByBid } from '@editor/services'
import { useAppPagesStore } from '@editor/stores'
import type { CSSProperties } from 'vue'
import { getCurrentInstance, mergeProps, readonly, toRaw } from 'vue'

export const useBlock = (bid?: string) => {
  const pageStore = useAppPagesStore()
  if (!bid) {
    const instance = getCurrentInstance()!
    bid = instance.props.bid as string
  }
  if (!bid) {
    throw new Error(`Block not found.
Don't use useBlock() in global services.
But you can useBlock(bid) to get a block.
`)
  }
  const block = findBlockByBid(pageStore.currentPage.blocks, bid) as AppBlock

  const setProps = (props: Record<string, any>) => {
    block.props = mergeProps(block.props, props || {})
  }

  const setStyles = (styles: CSSProperties) => Object.assign(block.styles, styles)

  const action = (name: string) => emitAction(block.actions, name)

  return {
    props: readonly(toRaw(block.props)),
    setProps,
    setStyles,
    action,
  }
}

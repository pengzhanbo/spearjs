import type { ComponentInternalInstance } from 'vue'

const instanceMap: Map<string, ComponentInternalInstance> = new Map()

export const addComponentInstance = (bid: string, instance: ComponentInternalInstance): void => {
  instanceMap.set(bid, instance)
}

export const deleteComponentInstance = (bid: string): void => {
  instanceMap.delete(bid)
}

export const hasComponentInstance = (bid: string): boolean => {
  return instanceMap.has(bid)
}

export const getComponentInstance = (bid: string): ComponentInternalInstance | undefined => {
  return instanceMap.get(bid)
}

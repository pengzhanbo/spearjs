import { customAlphabet } from 'nanoid'

const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz', 8)

export const generateComponentId = () => {
  const id = nanoid()
  return `com_${id}`
}

import path from 'node:path'
import { fileURLToPath } from 'node:url'

export const getDirname = (importMetaUrl: string) => {
  return path.dirname(fileURLToPath(importMetaUrl))
}

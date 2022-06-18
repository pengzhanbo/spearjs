import { debug } from '@spearjs/utils'
import type { BuildCommand } from './types'

export const createBuild = (): BuildCommand => {
  const log = debug('spearjs:cli/build')
  const build: BuildCommand = async (commandOptions = {}) => {
    log(`commandOptions:`, commandOptions)
  }
  return build
}

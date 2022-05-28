import { BuildCommand } from './types'
import { debug } from '@spearjs/utils'

export const createBuild = (): BuildCommand => {
  const log = debug('spearjs:cli/build')
  const build: BuildCommand = async (commandOptions = {}) => {
    log(`commandOptions:`, commandOptions)
  }
  return build
}

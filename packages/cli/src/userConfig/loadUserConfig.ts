import { createRequire } from 'node:module'
import { hasExportDefault } from '@spearjs/utils'
import type { UserConfig } from './types'

const require = createRequire(process.cwd())

export const loadUserConfig = async (
  configFile: string,
): Promise<UserConfig> => {
  const required = require(configFile)

  const config = hasExportDefault(required) ? required.default : required

  return config as UserConfig
}

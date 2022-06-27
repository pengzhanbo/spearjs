import { path } from '@spearjs/utils'
import type { UserConfig } from './types'

export const resolveDefaultConfig = (): UserConfig => {
  const cwd = process.cwd()
  const pkg = require(path.resolve(cwd, 'package.json'))
  return {
    name: pkg.name,
    type: 'component',
    componentType: 'basis',
    platform: 'mobile',
  }
}

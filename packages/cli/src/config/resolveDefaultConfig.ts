import type { UserConfig } from './types'
import { path } from '@spearjs/utils'

export const resolveDefaultConfig = (): UserConfig => {
  const cwd = process.cwd()
  const pkg = require(path.resolve(cwd, 'package.json'))
  return {
    label: pkg.name,
    description: pkg.description || '',
    type: 'component',
    componentType: 'basis',
    platform: 'mobile',
  }
}

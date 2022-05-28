import { isPlainObject } from '@spearjs/shared'

export const hasExportDefault = <T = any>(mod: unknown): mod is { default: T } =>
  isPlainObject(mod) && !!mod.__esModule && Object.prototype.hasOwnProperty.call(mod, 'default')

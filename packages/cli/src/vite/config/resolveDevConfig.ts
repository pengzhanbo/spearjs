import type { InlineConfig } from 'vite'
import { path } from '@spearjs/utils'

export const resolveDevConfig = (config: InlineConfig = {}): InlineConfig => {
  config.root = path.resolve(__dirname, '../../../preview/')
  config.build!.rollupOptions = {
    input: path.resolve(__dirname, '../../../preview/index.html'),
  }

  return config
}

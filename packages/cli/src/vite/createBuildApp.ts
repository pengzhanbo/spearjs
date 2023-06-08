import { path } from '@spearjs/utils'
import type { InlineConfig } from 'vite'
import { build } from 'vite'
import type { BuildCommandOptions } from '../commands'
import type { UserConfig } from '../userConfig'
import { resolveBasicConfig, resolveBuildConfig } from './config'

export const createBuildApp = async (
  commandOptions: BuildCommandOptions,
  userConfig: UserConfig,
  { name, fileName, entry }: { name: string; fileName: string; entry: string },
) => {
  const config: InlineConfig = {}

  resolveBasicConfig(config, userConfig)
  resolveBuildConfig(config, { name, fileName, entry })

  config.build!.outDir = path.resolve(
    process.cwd(),
    commandOptions.dest || userConfig.dest || 'dist',
    name,
  )

  config.build!.assetsDir = ''
  config.build!.emptyOutDir = false

  await build(config)
}

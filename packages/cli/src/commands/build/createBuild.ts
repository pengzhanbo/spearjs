import { debug, fs, logger, path } from '@spearjs/utils'
import { loadUserConfig, resolveUserConfigPath } from '../../userConfig'
import { createBuildApp } from '../../vite'
import type { BuildCommand } from './types'

export const builder: BuildCommand = async (commandOptions = {}) => {
  const log = debug('spearjs:cli/build')
  log('commandOptions:', commandOptions)

  if (process.env.NODE_ENV === undefined) {
    process.env.NODE_ENV = 'production'
  }

  const userConfigPath = resolveUserConfigPath(commandOptions.config)

  log('userConfigPath:', userConfigPath)

  const userConfig = await loadUserConfig(userConfigPath!)

  const dest = commandOptions.dest || userConfig.dest || 'dist'
  const outputDir = path.join(process.cwd(), dest)

  await fs.remove(outputDir)

  logger.info('Building SpearJs Widget...')

  await createBuildApp(commandOptions, userConfig, {
    name: 'render',
    fileName: 'index',
    entry: path.resolve(__dirname, '../../../preview/render-entry.ts'),
  })
  await createBuildApp(commandOptions, userConfig, {
    name: 'editor',
    fileName: 'index',
    entry: path.resolve(__dirname, '../../../preview/editor-entry.ts'),
  })
}

export const createBuild = (): BuildCommand => builder

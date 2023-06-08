import { debug, logger } from '@spearjs/utils'
import type { FSWatcher } from 'chokidar'
import { resolveUserConfigPath } from '../../userConfig'
import { createDevApp } from '../../vite'
import { resolveDevUserConfig } from './resolveDevUserConfig'
import type { DevCommand } from './types'
import { watchUserConfigFile } from './watchUserConfigFile'

export const createDev = (): DevCommand => {
  const log = debug('spearjs:cli/dev')
  const dev: DevCommand = async (commandOptions = {}): Promise<void> => {
    log('commandOptions:', commandOptions)

    if (process.env.NODE_ENV === undefined) {
      process.env.NODE_ENV = 'development'
    }

    const userConfigPath = resolveUserConfigPath(commandOptions.config)

    log('userConfigPath:', userConfigPath)

    const { userConfig, userConfigDeps } = await resolveDevUserConfig(
      userConfigPath,
    )

    logger.info('Starting SpearJs Widget development server...')

    const app = await createDevApp(commandOptions, userConfig)

    let watchers: FSWatcher[] = []

    const restart = async (): Promise<void> => {
      await Promise.all([...watchers.map((item) => item.close()), app.close()])
      watchers = []
      await dev(commandOptions)
      logger.tip('dev server has restarted, please refresh you browser')
    }

    if (userConfigPath) {
      watchers.push(
        ...watchUserConfigFile({
          userConfigPath,
          userConfigDeps,
          restart,
        }),
      )
    }
  }
  return dev
}

import { colors, logger } from '@spearjs/utils'
import * as chokidar from 'chokidar'
import type { FSWatcher } from 'chokidar'

export const watchUserConfigFile = ({
  userConfigPath,
  userConfigDeps,
  restart,
}: {
  userConfigPath: string
  userConfigDeps: string[]
  restart: () => Promise<void>
}): FSWatcher[] => {
  const cwd = process.cwd()

  const configWatcher = chokidar.watch(userConfigPath, {
    cwd,
    ignoreInitial: true,
  })

  configWatcher.on('change', (configFile) => {
    logger.info(`config ${colors.magenta(configFile)} is modified`)
    restart()
  })

  const depsWatcher = chokidar.watch(userConfigDeps, {
    cwd,
    ignoreInitial: true,
  })

  depsWatcher.on('change', (depFile) => {
    logger.info(`config dependency ${colors.magenta(depFile)} is modified`)
    restart()
  })

  return [configWatcher, depsWatcher]
}

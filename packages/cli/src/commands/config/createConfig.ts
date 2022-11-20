import { colors, inquirer, logger } from '@spearjs/utils'
import { loadCliConfig, writeCliConfig } from '../../cliConfig'
import type { ConfigCommandOptions } from './types'

export const createConfig = () => {
  return async (command: ConfigCommandOptions) => {
    const { addRepository, deleteRepository, list } = command
    const config = loadCliConfig()!

    if (list) {
      logger.info('spearjs config:\n', JSON.stringify(config, null, 2))
      return
    }

    if (addRepository && !config.repositoryList.includes(addRepository)) {
      config.repositoryList.push(addRepository)
      logger.info(`Add repository: ${colors.cyan(addRepository)} success`)

      if (!config.repository) {
        config.repository = addRepository
        logger.info(`Current repository : ${colors.cyan(addRepository)}`)
      }
    }

    if (deleteRepository) {
      const index = config.repositoryList.indexOf(deleteRepository)
      if (index !== -1) {
        config.repositoryList.splice(index, 1)
        logger.info(`Delete repository: ${colors.cyan(deleteRepository)} success`)
      } else {
        logger.warn(`${colors.cyan(deleteRepository)} Not found, delete failed.`)
      }
    }

    if (!addRepository && !deleteRepository) {
      const { repo } = await inquirer.prompt([
        {
          name: 'repo',
          type: 'list',
          default: config.repository || config.repositoryList[0] || '',
          choices: config.repositoryList.map((repo) => ({
            value: repo,
            name: repo,
          })),
        },
      ])
      config.repository = repo
      logger.info(`Current repository : ${colors.cyan(repo)}`)
    }

    writeCliConfig(config)
  }
}

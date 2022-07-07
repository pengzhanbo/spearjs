import { logger } from '@spearjs/utils'
import * as minimist from 'minimist'
import { cli } from './cli'
import { normalizeArgv } from './normalizeArgv'

const init = async () => {
  const argv = minimist(process.argv.slice(2), { string: ['_'] })
  await cli(normalizeArgv(argv), process.cwd())
}

init().catch((e) => {
  logger.error(e)
})

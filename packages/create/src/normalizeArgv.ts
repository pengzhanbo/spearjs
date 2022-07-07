import type { ArgvOptions } from './types'
import { formatTargetDir } from './utils'

export const normalizeArgv = (argv: Record<string, boolean>): ArgvOptions => {
  const service = (argv.s || argv.service) && 'service'
  const component = (argv.c || argv.component) && 'component'
  return {
    targetDir: formatTargetDir(argv._[0]),
    template: component || service || '',
    typescript: argv.t || argv.typescript,
  }
}

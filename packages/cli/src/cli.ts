import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { colors } from '@spearjs/utils'
import { cac } from 'cac'
import { createBuild, createConfig, createDev, createPublish } from './commands'
import { allowTs } from './utils'

const wrapCommand = (cmd: (...args: any[]) => Promise<void>): typeof cmd => {
  const wrappedCommand: typeof cmd = (...args) =>
    cmd(...args).catch((err) => {
      console.error(colors.red(err.stack))
      process.exit(1)
    })
  return wrappedCommand
}

/**
 * SpearJs cli
 */
export const cli = (): void => {
  // allow ts files globally
  allowTs()

  const program = cac('spearjs')

  let pkg: Record<string, unknown> = {}
  const dirname =
    typeof __dirname !== 'undefined'
      ? __dirname
      : path.dirname(fileURLToPath(import.meta.url))

  try {
    pkg = JSON.parse(
      fs.readFileSync(path.join(dirname, '../package.json'), 'utf-8'),
    )
  } catch {}

  const versionCli = pkg.version

  program.version(`spearjs/cli@${versionCli}`)

  program.help()

  // register `dev` command
  program
    .command('dev', 'Start widget development server')
    .option('-c, --config <config>', 'Set path to config file')
    .option('-p, --port <port>', 'Use specified port (default: 8989)')
    .option('--host <host>', 'Use specified host (default: 0.0.0.0)')
    .option('--open', 'Open browser when ready')
    .action(wrapCommand(createDev()))

  // register `build` command
  program
    .command('build', 'Build widget')
    .option('-c, --config <config>', 'Set path to config file')
    .option(
      '-d, --dest <dest>',
      'Set the directory build output (default: dist)',
    )
    .action(wrapCommand(createBuild()))

  // register `publish` command
  program
    .command('publish', 'Publish widget to SpearJs lowCode platform')
    .option('-c, --config <config>', 'Set path to config file')
    .option('-t, --target <target>', 'publish widget to target server')
    .option(
      '-d, --dest <dest>',
      'Set the directory publish assets (default: dist)',
    )
    .action(wrapCommand(createPublish()))

  program
    .command('config', 'Config Spearjs Cli')
    .option('-l, --list', 'print spearjs cli config list')
    .option('-a, --add-repository <repository>', 'add repository')
    .option('-d, --delete-repository <repository>', 'delete a repository')
    .action(wrapCommand(createConfig()))

  // program.command('login')

  program.parse(process.argv)
}

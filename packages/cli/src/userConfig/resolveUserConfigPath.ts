import { colors, fs, logger, path } from '@spearjs/utils'

const configFiles = ['widget.config.ts', 'widget.config.js', 'config.ts', 'config.js']

export const resolveUserConfigPath = (config?: string): string | undefined => {
  const cwd = process.cwd()
  let configPath: string | undefined = undefined
  if (config) {
    configPath = path.resolve(cwd, config)
    if (fs.pathExistsSync(configPath)) {
      return configPath
    } else {
      throw logger.createError(`config file does not exist: ${colors.magenta(config)}`)
    }
  }
  configPath = configFiles
    .map((filename: string) => path.resolve(cwd, filename))
    .find((file: string) => fs.pathExistsSync(file))

  return configPath
}

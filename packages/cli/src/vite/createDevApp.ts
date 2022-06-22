import type { InlineConfig, ViteDevServer } from 'vite'
import { createServer } from 'vite'
import type { DevCommandOptions } from '../commands'
import type { UserConfig } from '../config'
import { resolveBasicConfig, resolveDevConfig } from './config'

export const createDevApp = async (
  commandOptions: DevCommandOptions,
  userConfig: UserConfig
): Promise<ViteDevServer> => {
  const config: InlineConfig = {}

  resolveBasicConfig(config, userConfig)
  resolveDevConfig(config)

  // 是否打开 浏览器
  config.server!.open = commandOptions.open

  // TODO resolve userConfig
  // 这里暂时还没考虑好 方案

  const app = await createServer(config)

  await app.listen(commandOptions.port || 8989)

  app.printUrls()

  return app
}

import * as os from 'node:os'
import { win32 } from 'node:path'
import { loadUserConfig, resolveDefaultConfig } from '../../userConfig'
import type { UserConfig } from '../../userConfig'

const normalizeRequireCacheKey: (key: string) => string = (key) =>
  os.platform() === 'win32' ? win32.normalize(key) : key

const resolveDeps = (
  filename: string,
  deps: Set<string> = new Set(),
  seen: Set<string> = new Set(),
): Set<string> => {
  const mod = require.cache[normalizeRequireCacheKey(filename)]
  if (!mod) return deps

  if (seen.has(filename)) return deps
  seen.add(filename)

  mod.children.forEach(({ id }) => {
    if (!id.includes('node_modules')) {
      deps.add(id)
      resolveDeps(id, deps, seen)
    }
  })

  return deps
}

export const resolveDevUserConfig = async (
  userConfigPath?: string,
): Promise<{
  userConfig: UserConfig
  userConfigDeps: string[]
}> => {
  if (!userConfigPath) {
    return {
      userConfig: resolveDefaultConfig(),
      userConfigDeps: [],
    }
  }

  const deps = resolveDeps(userConfigPath)
  deps.forEach((item) => {
    delete require.cache[normalizeRequireCacheKey(item)]
  })
  delete require.cache[normalizeRequireCacheKey(userConfigPath)]

  const userConfig = await loadUserConfig(userConfigPath)
  const userConfigDeps = Array.from(deps)

  return {
    userConfig,
    userConfigDeps,
  }
}

import { fs } from '@spearjs/utils'
import { getRCFilePath } from './resolveConfigPath'

export interface CliConfig {
  username: string
  token: string
  repository: string
  repositoryList: string[]
}
const defaultConfig = {
  username: '',
  token: '',
  repository: '',
  repositoryList: [],
}

let configCache: CliConfig | null = null

export const loadCliConfig = () => {
  if (configCache) return configCache
  const filepath = getRCFilePath()
  if (fs.existsSync(filepath)) {
    const content = fs.readFileSync(filepath, 'utf-8') || ''
    configCache = JSON.parse(content) || defaultConfig
  } else {
    configCache = defaultConfig
  }
  return configCache
}

export const writeCliConfig = (config: Partial<CliConfig>) => {
  configCache = Object.assign({}, loadCliConfig(), config)
  const content = JSON.stringify(configCache, null, 2)
  const filepath = getRCFilePath()
  fs.writeFileSync(filepath, content, 'utf-8')
  return configCache
}

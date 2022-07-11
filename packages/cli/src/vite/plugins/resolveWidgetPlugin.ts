import { path } from '@spearjs/utils'
import type { Plugin } from 'vite'
import type { UserConfig } from '../../userConfig'

const editorModuleId = 'spearjs/widget/editor'
const renderModuleId = 'spearjs/widget/render'
const configModuleId = 'spearjs/widget/config'

const resolveEditorCode = ({ editorFiles }: UserConfig): string | null => {
  if (editorFiles) {
    return `import editor from '${editorFiles}'\nexport default editor\n`
  }
  return null
}

const resolveRenderCode = ({ renderFiles }: UserConfig): string | null => {
  if (renderFiles) {
    return `import render from '${renderFiles}'\nexport default render`
  }
  return null
}

const resolveConfigCode = (userConfig: UserConfig): string => {
  const pkg = require(path.resolve(process.cwd(), 'package.json'))

  // todo 这里的逻辑需要优化
  const config: Record<any, any> = {
    id: pkg.widgetId || '',
    version: pkg.version || '',
    label: userConfig.name || pkg.name,
    platform: userConfig.platform,
    type: userConfig.type,
    componentType: (userConfig as any).componentType,
    dependence: (userConfig as any).dependence,
  }
  return `export default ${JSON.stringify(config, null, 2)}`
}

export const resolveWidgetPlugin = (userConfig: UserConfig): Plugin => {
  return {
    name: 'vite-plugin-spearjs-widget',
    resolveId(id) {
      if ([editorModuleId, renderModuleId, configModuleId].includes(id)) {
        return `${id}.ts`
      }
    },

    load(id) {
      if (id === editorModuleId + '.ts') {
        return resolveEditorCode(userConfig)
      }
      if (id === renderModuleId + '.ts') {
        return resolveRenderCode(userConfig)
      }
      if (id === configModuleId + '.ts') {
        return resolveConfigCode(userConfig)
      }
    },
  }
}

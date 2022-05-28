import type { UserConfig } from '../../config'
import type { Plugin } from 'vite'
import { path } from '@spearjs/utils'

const descriptionModuleId = 'spearjs/widget/description'
const editorModuleId = 'spearjs/widget/editor'
const renderModuleId = 'spearjs/widget/render'
const configModuleId = 'spearjs/widget/config'

const resolveDescriptionCode = ({ description }: UserConfig): string | null => {
  if (description) {
    return `export default function description() { return <p>${description}</p> }`
  }
  return null
}

const resolveDescriptionFileCode = ({ descriptionFiles }: UserConfig): string | null => {
  if (descriptionFiles) {
    return `import description from '${descriptionFiles}'\nexport default description\n`
  }
  return null
}

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

  const config: Record<any, any> = {
    id: pkg.widgetId || '',
    version: pkg.version || '',
    label: userConfig.label || pkg.name,
    platform: userConfig.platform,
    type: userConfig.type,
    componentType: (userConfig as any).componentType,
    componentSubType: (userConfig as any).componentSubType,
  }
  return `export default ${JSON.stringify(config, null, 2)}`
}

export const resolveWidgetPlugin = (userConfig: UserConfig): Plugin => {
  return {
    name: 'vite-plugin-spearjs-widget',
    resolveId(id) {
      if (id === descriptionModuleId) {
        if (userConfig.descriptionFiles) {
          return `${id}.ts`
        }
        if (userConfig.description) {
          return `${id}.tsx`
        }
      }
      if ([editorModuleId, renderModuleId, configModuleId].includes(id)) {
        return `${id}.ts`
      }
    },

    load(id) {
      if (id === descriptionModuleId + '.tsx') {
        return resolveDescriptionCode(userConfig)
      }
      if (id === descriptionModuleId + '.ts') {
        return resolveDescriptionFileCode(userConfig)
      }
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

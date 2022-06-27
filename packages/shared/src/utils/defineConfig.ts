import type { EditorConfig, RenderConfig } from '../types'
export function defineEditorConfig(config: EditorConfig) {
  return config
}

export function defineRenderConfig<Props = Record<string, any>, RawBindings = Record<string, any>>(
  config: RenderConfig<Props, RawBindings>
): RenderConfig<Props, RawBindings> {
  return config
}

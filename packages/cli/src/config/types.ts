import type { WidgetPlatform, WidgetComponentType, WidgetComponentSubType } from '@spearjs/shared'

interface UserBasicConfig {
  label: string
  platform: WidgetPlatform
  description?: string
  descriptionFiles?: string
  editorFiles?: string
  renderFiles?: string
  lib?: string[]
  dest?: string
}

type UserConfigByComponent = UserBasicConfig & {
  type: 'component'
  componentType: WidgetComponentType
  componentSubType?: WidgetComponentSubType
}

type UserConfigByService = UserBasicConfig & {
  type: 'service'
}

export type UserConfig = UserConfigByComponent | UserConfigByService

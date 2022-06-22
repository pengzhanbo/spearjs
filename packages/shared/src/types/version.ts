type VersionSort = `${number}.${number}.${number}`

type VersionPreReleaseType = 'Alpha' | 'Beta' | 'Rc'

type VersionPreRelease = `${VersionPreReleaseType}.${number}` | VersionPreReleaseType

/**
 * 版本号
 * example: 1.0.0 | 1.0.0-Alpha | 1.0.0-Alpha.1
 */
export type WidgetVersion = VersionSort | `${VersionSort}-${VersionPreRelease}`

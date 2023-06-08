/**
 * Type of `build` command function
 */
export type BuildCommand = (
  commandOptions?: BuildCommandOptions,
) => Promise<void>

export interface BuildCommandOptions {
  dest?: string
  config?: string
  debug?: boolean
}

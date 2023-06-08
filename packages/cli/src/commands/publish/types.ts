/**
 * Type of `build` command function
 */
export type PublishCommand = (
  commandOptions?: PublishCommandOptions,
) => Promise<void>

export interface PublishCommandOptions {
  target?: string
  dest?: string
  config?: string
}

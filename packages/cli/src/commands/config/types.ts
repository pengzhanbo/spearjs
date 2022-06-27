/**
 * Type of `config` command function
 */
export type ConfigCommand = (commandOptions?: ConfigCommandOptions) => Promise<void>

export interface ConfigCommandOptions {
  list: boolean
  addRepository: string
  deleteRepository: string
}

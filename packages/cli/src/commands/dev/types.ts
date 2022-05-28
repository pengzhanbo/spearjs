/**
 * type of `dev` command functions
 */
export type DevCommand = (commandOptions?: DevCommandOptions) => Promise<void>

/**
 * Cli options of `dev` command
 */
export interface DevCommandOptions {
  port?: number
  host?: string
  open?: boolean

  config?: string
}

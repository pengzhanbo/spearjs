import { transformTsFile } from './esbuild'

export const allowTs = (): void => {
  require.extensions['.ts'] = (m: any, filename) => {
    m._compile(transformTsFile(filename), filename)
  }
}

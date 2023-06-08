import { transformTsFile } from './esbuild'

export const allowTs = (): void => {
  // eslint-disable-next-line n/no-deprecated-api
  require.extensions['.ts'] = (m: any, filename) => {
    m._compile(transformTsFile(filename), filename)
  }
}

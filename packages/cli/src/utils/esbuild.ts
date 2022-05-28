import { fs } from '@spearjs/utils'
import { transformSync } from 'esbuild'

export const transformTsFile = (filename: string): string =>
  transformSync(fs.readFileSync(filename).toString(), {
    format: 'cjs',
    loader: 'ts',
    sourcefile: filename,
    sourcemap: 'inline',
    target: 'node14',
  }).code

import { fs, path } from '@spearjs/utils'
import sortPackageJson from 'sort-package-json'

export const resolvePackageJson = () => {
  const pkgPath = path.join(process.cwd(), 'package.json')
  if (fs.existsSync(pkgPath)) {
    return JSON.parse(fs.readFileSync(pkgPath, 'utf8'))
  } else {
    return {}
  }
}

export const writePackageJson = (pkgJson: Record<string, any>) => {
  const content = sortPackageJson(JSON.stringify(pkgJson, null, 2))
  fs.writeFileSync(path.join(process.cwd(), 'package.json'), content, 'utf-8')
}

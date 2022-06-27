import * as os from 'os'
import { fs, path } from '@spearjs/utils'

const xdgConfigPath = (file: string) => {
  const xdgConfigHome = process.env.XDG_CONFIG_HOME
  if (xdgConfigHome) {
    const rcDir = path.join(xdgConfigHome, 'spearjs-low-code')
    if (!fs.existsSync(rcDir)) {
      fs.ensureDirSync(rcDir, 0o700)
    }
    return path.join(rcDir, file)
  }
}

export const getRcPath = (file: string) => xdgConfigPath(file) || path.join(os.homedir(), file)

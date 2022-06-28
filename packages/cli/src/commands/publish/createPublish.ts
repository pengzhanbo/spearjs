/**
 * 发布 widget 的流程：
 * 1. 验证发布者身份，未登录则进行登录，是否是 注册用户，且是否是开发者。
 * 2. 如果没有 widget id， 先从通过 nanoid 生成一个 8位的唯一ID
 * 3. 通过选项式命令行交互更新版本号
 * 4. 选择发布环境 （这部分可以通过 config 接口进行配置
 * 5. 调用构建方法构建widget
 * 6. 压缩构建包
 * 7. 调用接口发布widget
 */
import { chalk, fs, inquirer, logger, path } from '@spearjs/utils'
import * as FormData from 'form-data'
import * as zipDir from 'zip-dir'
import type { UserConfigByComponent } from '../../userConfig'
import { loadUserConfig, resolveUserConfigPath } from '../../userConfig'
import { builder } from '../build'
import { generateId } from './generateId'
import { getHttp, updateWidget } from './http'
import { resolvePackageJson, writePackageJson } from './resolvePackage'
import type { PublishCommand } from './types'
import { getVersionList } from './version'

export const createPublish = (): PublishCommand => {
  return async (commandOptions = {}) => {
    // todo 验证发布者

    const pkg = resolvePackageJson()

    // 检查 widget， 没有则自动创建
    if (!pkg.widgetId) {
      pkg.widgetId = generateId()
    }

    // 更新版本号
    const versionList = getVersionList(pkg.version)
    const { version, latest } = await inquirer.prompt([
      {
        name: 'version',
        message: '选择发布版本号',
        type: 'list',
        choices: versionList,
        default: versionList[0].value,
      },
      {
        name: 'latest',
        message: '是否作为最新可用版本？',
        type: 'confirm',
        default: false,
      },
    ])
    pkg.version = version

    // 构建包
    await builder({ dest: commandOptions.dest })

    const configPath = resolveUserConfigPath(commandOptions.config)!
    const userConfig = await loadUserConfig(configPath)
    const dest = commandOptions.dest || userConfig.dest || 'dist'
    const cacheZip = path.join(process.cwd(), dest, `${pkg.widgetId}-${pkg.version}.zip`)
    const http = getHttp(commandOptions.target)
    const formData = new FormData()

    await zipDir(path.join(process.cwd(), dest), {
      saveTo: cacheZip,
    })

    formData.append('widgetId', pkg.widgetId)
    formData.append('version', pkg.version)
    formData.append('name', userConfig.name)
    formData.append('type', userConfig.type)
    formData.append('platform', userConfig.platform)
    formData.append('componentType', (userConfig as UserConfigByComponent).componentType)
    formData.append('componentSubType', (userConfig as UserConfigByComponent).componentSubType)
    formData.append('file', fs.createReadStream(cacheZip))
    formData.append(
      'editorAssert',
      JSON.stringify({
        js: 'editor/index.iife.js',
        css: 'editor/style.css',
      })
    )
    formData.append(
      'renderAssert',
      JSON.stringify({
        js: 'render/index.iife.js',
        css: 'render/style.css',
      })
    )
    formData.append('latest', latest ? 1 : 0)

    const res = (await updateWidget(http, formData)) as unknown as { code: number; message: string }
    // 删除临时压缩包
    await fs.unlink(cacheZip)

    // 更新 package.json
    writePackageJson(pkg)

    if (res.code === 200) {
      logger.info(`
        widget id: ${chalk.cyan(pkg.widgetId)}
        widget name: ${chalk.cyan(userConfig.name)}
        widget version: ${chalk.cyan(pkg.version)}

        发布成功！
      `)
    } else {
      logger.error(res.message)
    }
  }
}

import { chalk, fs, inquirer, logger, path } from '@spearjs/utils'
import type { ArgvOptions } from './types'
import {
  copy,
  emptyDir,
  formatTargetDir,
  isEmpty,
  isValidPackageName,
  toValidPackageName,
} from './utils'

const renameFiles = {
  _gitignore: '.gitignore',
}

export const cli = async ({ template, typescript, targetDir }: ArgvOptions, cwd: string) => {
  const defaultTargetDir = 'widget-project'

  const firstAnswer = await inquirer.prompt<{
    targetDir: string
    overwrite: boolean
  }>([
    {
      type: 'input',
      name: 'targetDir',
      default: defaultTargetDir,
      message: '请输入项目目录: ',
      when: () => !targetDir,
      transformer: (input) => formatTargetDir(input) || defaultTargetDir,
    },
    {
      name: 'overwrite',
      type: 'confirm',
      default: false,
      message: () =>
        (targetDir === '.' ? 'Current Directory' : `Target Directory ${targetDir}`) +
        ' is not empty. Remove existing files and continue?',
      when: () => fs.existsSync(targetDir) && !isEmpty(targetDir),
    },
  ])

  const { overwrite } = firstAnswer
  targetDir = firstAnswer.targetDir

  if (overwrite === false) {
    throw new Error(`${chalk.red('✖')} Operation cancelled.`)
  }

  const getProjectName = () => (targetDir === '.' ? path.basename(path.resolve()) : targetDir)

  const secondAnswer = await inquirer.prompt<{
    packageName: string
    template: ArgvOptions['template']
  }>([
    {
      name: 'packageName',
      type: 'text',
      message: '请输入包名',
      default: () => toValidPackageName(getProjectName()),
      when: () => isValidPackageName(getProjectName()),
      validate: (input) => isValidPackageName(input) || 'Invalid package.json name',
    },
    {
      type: 'list',
      name: 'template',
      default: 'component',
      message: '请选择 widget 类型：',
      choices: [
        { name: 'widget 组件 (component)', value: 'component' },
        { name: 'widget 服务 (service)', value: 'service' },
      ],
      when: () => !template,
    },
  ])

  const { packageName } = secondAnswer
  template = secondAnswer.template

  const root = path.join(cwd, targetDir)

  if (overwrite) {
    emptyDir(root)
  } else if (!fs.existsSync(root)) {
    fs.mkdirSync(root, { recursive: true })
  }

  const templateDir = path.resolve(
    __dirname,
    '..',
    `template-${template}` + (typescript ? '-ts' : '')
  )
  const write = (file: string, content?: string) => {
    const targetPath = renameFiles[file]
      ? path.join(root, renameFiles[file])
      : path.join(root, file)
    if (content) {
      fs.writeFileSync(targetPath, content)
    } else {
      copy(path.join(templateDir, file), targetPath)
    }
  }

  const files = fs.readdirSync(templateDir)
  for (const file of files.filter((f) => f !== 'package.json')) {
    write(file)
  }

  const pkg = JSON.parse(fs.readFileSync(path.join(templateDir, 'package.json'), 'utf8'))

  pkg.name = packageName || getProjectName()
  write('package.json', JSON.stringify(pkg, null, 2))

  logger.success(`Generate ${pkg.name} to ${targetDir} Successful.`)
  if (cwd !== root) {
    logger.info(`cd ${path.relative(cwd, root)}`)
  }
  logger.info('npm install')
  logger.info('npm dev')
}

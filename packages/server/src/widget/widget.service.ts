import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { InjectRepository } from '@nestjs/typeorm'
import { fs, path } from '@spearjs/utils'
import * as extractZip from 'extract-zip'
import { EntityManager, Repository } from 'typeorm'
import { WidgetEntity, WidgetVersionsEntity } from '../entities'
import { UploadWidgetDto, WidgetDto } from './dto'

@Injectable()
export class WidgetService {
  constructor(
    private readonly config: ConfigService,
    @InjectRepository(WidgetEntity)
    private readonly widgetEntity: Repository<WidgetEntity>,
    @InjectRepository(WidgetVersionsEntity)
    private readonly versionListEntity: Repository<WidgetVersionsEntity>
  ) {}

  /**
   * 获取 widget 列表
   */
  async getWidgetList(page: number, pageSize: number, type: string, componentType: string) {
    const where: Record<string, string> = { type }
    componentType && (where.componentType = componentType)
    const [widgetList, total] = await this.widgetEntity
      .createQueryBuilder()
      .where(where)
      .orderBy({ 'update_time': 'DESC', '`order`': 'DESC' })
      .offset((page - 1) * pageSize)
      .limit(pageSize)
      .getManyAndCount()
    const list = widgetList.map((widget) => new WidgetEntity(widget))
    return { page, pageSize, list, total }
  }

  async updateWidget(body: WidgetDto, assert: WidgetAssert) {
    const widget = await this.widgetEntity.findOne({
      where: { widgetId: body.widgetId },
    })
    const versionWidget = await this.versionListEntity.findOne({
      where: { widgetId: body.widgetId, version: body?.version },
    })
    const editorUrl = assert.editorAssert
    const renderUrl = assert.renderAssert
    const latest = Number(body.latest) === 1
    const currentTime = new Date()
    const current = new WidgetVersionsEntity({
      version: body.version,
      name: body.name,
      type: body.type,
      componentType: body.componentType,
      platform: body.platform,
      componentSubType: body.componentSubType,
      // todo 这个字段暂时还没想好该如何做交互
      dependence: [],
      latest,
      editorUrl,
      renderUrl,
      updateTime: currentTime,
    })
    await this.versionListEntity.manager.transaction(async (manager: EntityManager) => {
      // 在 widget 表中已存在，检查是否更新 latest 的版本，并将版本添加到 WidgetVersionList表
      // 如果不存在，则更新widget，且添加版本
      // 如果是版本号一致，则仅更新 widgetVersionList
      const widgetEntity = manager.getRepository(WidgetEntity)
      if (widget) {
        latest &&
          (await widgetEntity.update(widget.id, {
            ...current,
          }))
      } else {
        const latestWidget: Partial<WidgetEntity> = {
          ...current,
          widgetId: body.widgetId,
          createTime: currentTime,
        }
        await widgetEntity.save(latestWidget)
      }

      if (latest) {
        // 如果重新设置 latest， 则需要将旧的重置为false
        const latestWidget = await manager.findOne(WidgetVersionsEntity, {
          where: { widgetId: body.widgetId, latest: true },
        })
        latestWidget &&
          latestWidget.version !== body.version &&
          (await manager.update(WidgetVersionsEntity, latestWidget.id, {
            latest: false,
            updateTime: new Date(),
          }))
      }
      if (versionWidget) {
        await manager.update(WidgetVersionsEntity, versionWidget.id, current)
      } else {
        current.widgetId = body.widgetId
        current.createTime = currentTime
        await manager.save(current)
      }
    })
  }

  /**
   * 将上传的 widget 压缩包 解压到 对应的目录中
   */
  async uploadFile(file: Express.Multer.File, widget: UploadWidgetDto): Promise<WidgetAssert> {
    const staticDir = this.config.get('staticDir')
    const widgetDir = path.join('/widgets', `${widget.widgetId}-${widget.version}`)
    const outputDir = path.join(staticDir, widgetDir)

    await fs.ensureDir(outputDir) // 创建目录
    await extractZip(file.path, { dir: outputDir }) // 解压
    await fs.unlink(file.path) // 删除临时压缩包

    const editorAssert = JSON.parse(widget.editorAssert)
    const renderAssert = JSON.parse(widget.renderAssert)
    editorAssert.js = path.join(widgetDir, editorAssert.js)
    editorAssert.css = path.join(widgetDir, editorAssert.css)
    renderAssert.js = path.join(widgetDir, renderAssert.js)
    renderAssert.css = path.join(widgetDir, renderAssert.css)
    return {
      renderAssert,
      editorAssert,
    }
  }
}

interface AssertOption {
  js: string
  css: string
}

interface WidgetAssert {
  renderAssert: AssertOption
  editorAssert: AssertOption
}

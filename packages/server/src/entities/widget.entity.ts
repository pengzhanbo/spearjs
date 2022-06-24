import { Column, Entity } from 'typeorm'
import { BaseEntity } from './Base'

/**
 * widget 列表
 * 包括widget的所有版本，详细信息
 */
@Entity({ name: 'tb_widget' })
export class WidgetEntity extends BaseEntity {
  @Column('varchar', { length: 8, name: 'widget_id', comment: 'widget ID' })
  widgetId!: string

  @Column('varchar', { length: 50, comment: 'widget名称' })
  name!: string

  @Column('varchar', { length: 25, comment: 'widget版本' })
  version!: string

  @Column('boolean', { comment: '是否是最新的可用版本', default: false })
  latest!: boolean

  @Column('varchar', { length: 10, comment: 'widget类型, component/service' })
  type!: string

  @Column('varchar', { length: 10 })
  componentType!: string

  @Column('varchar', {
    length: 50,
    transformer: {
      from: (value: string): string[] => (value || '').split(','),
      to: (value: string[]): string => (value || []).join(','),
    },
    comment: 'widget 依赖的外部库',
  })
  dependence!: string[]

  @Column('varchar', { length: 10 })
  platform!: string

  @Column('json')
  editorUrl!: { js: string; css: string }

  @Column('json')
  renderUrl!: { js: string; css: string }
}

/**
 * widget 最新可用版本
 * 仅包含最新可用的widget、版本，以及排序优先级
 */
@Entity({ name: 'tb_widget_latest' })
export class WidgetLatestEntity extends BaseEntity {
  @Column('varchar', { length: 8, name: 'widget_id' })
  widgetId!: string

  @Column('varchar', { length: 25, comment: 'widget版本' })
  version!: string

  @Column('int')
  order!: number
}

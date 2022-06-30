import { Exclude } from 'class-transformer'
import { Column, Entity } from 'typeorm'
import { BaseEntity } from './Base'

/**
 * widget 列表
 * 包括widget的所有版本，详细信息
 */
@Entity({ name: 'tb_widget_version_list' })
export class WidgetVersionsEntity extends BaseEntity {
  constructor(options: Partial<WidgetVersionsEntity>) {
    super()
    Object.assign(this, options)
  }

  @Column('varchar', { length: 16, name: 'widget_id', comment: 'widget ID' })
  widgetId!: string

  @Column('varchar', { length: 50, comment: 'widget名称' })
  name!: string

  @Column('varchar', { length: 25, comment: 'widget版本' })
  version!: string

  @Exclude()
  @Column('boolean', { comment: '是否是最新的可用版本', default: false })
  latest!: boolean

  @Column('varchar', { length: 10, comment: 'widget类型, component/service' })
  type!: string

  @Column('varchar', { length: 20 })
  componentType!: string

  @Column('varchar', { length: 20, default: '', comment: 'widget 子类型' })
  componentSubType!: string

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

  @Column('mediumtext', {
    transformer: {
      from: (value: string) => JSON.parse(value),
      to: (value: Record<string, any>) => JSON.stringify(value),
    },
  })
  editorUrl!: Record<string, any>

  @Column('mediumtext', {
    transformer: {
      from: (value: string) => JSON.parse(value),
      to: (value: Record<string, any>) => JSON.stringify(value),
    },
  })
  renderUrl!: Record<string, any>
}

@Entity({ name: 'tb_widget' })
export class WidgetEntity extends WidgetVersionsEntity {
  constructor(options: Partial<WidgetEntity>) {
    super(options)
  }

  @Exclude()
  @Column('bigint', { default: 1 })
  order!: number
}

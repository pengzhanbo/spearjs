import { Column, Entity } from 'typeorm'
import { BaseEntity } from './Base'

@Entity({ name: 'tb_application' })
export class ApplicationEntity extends BaseEntity {
  constructor(options: Partial<ApplicationEntity>) {
    super()
    Object.assign(this, options)
  }
  @Column('varchar', { length: 8, comment: 'appId', name: 'app_id' })
  appId!: string

  @Column('varchar', { length: 50, comment: '应用名称' })
  name!: string

  @Column('mediumtext')
  description!: string

  @Column('varchar', { length: 25 })
  platform!: string

  @Column('varchar', { length: 50, comment: '应用依赖的库，必须是预设的依赖' })
  dependence!: string

  @Column('mediumtext')
  config!: string
}

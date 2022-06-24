import { Column, Entity } from 'typeorm'
import { BaseEntity } from './Base'

@Entity({ name: 'tb_application' })
export class ApplicationEntity extends BaseEntity {
  @Column('varchar', { length: 50, comment: '应用名称' })
  name!: string

  @Column('mediumtext')
  config!: string
}

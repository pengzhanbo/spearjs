import { Exclude } from 'class-transformer'
import { Column, PrimaryGeneratedColumn } from 'typeorm'

export class BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Exclude()
  @Column('datetime', { name: 'create_time' })
  createTime!: Date

  @Exclude()
  @Column('datetime', { name: 'update_time' })
  updateTime!: Date
}

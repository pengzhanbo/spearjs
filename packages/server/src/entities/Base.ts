import { Column, PrimaryGeneratedColumn } from 'typeorm'

export class BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Column('datetime', { name: 'create_time' })
  createTime!: Date

  @Column('datetime', { name: 'update_time' })
  updateTime!: Date
}

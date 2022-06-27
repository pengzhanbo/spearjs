import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ApplicationEntity } from '../entities/applications.entity'
import { generateAppId } from '../utils/generateId'
import { CreateApplicationDto } from './dto'

@Injectable()
export class ApplicationService {
  constructor(
    @InjectRepository(ApplicationEntity)
    private readonly applicationEntity: Repository<ApplicationEntity>
  ) {}

  async create(appDto: CreateApplicationDto) {
    const app = new ApplicationEntity()
    app.appId = generateAppId()
    app.name = appDto.name
    app.config = ''
    app.createTime = new Date()
    app.updateTime = app.createTime
    return await this.applicationEntity.save(app)
  }
}

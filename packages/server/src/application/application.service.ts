import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ApplicationEntity } from '../entities/applications.entity'

@Injectable()
export class ApplicationService {
  constructor(
    @InjectRepository(ApplicationEntity)
    private readonly applicationEntity: Repository<ApplicationEntity>
  ) {}

  async create() {}
}

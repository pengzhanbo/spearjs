import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { WidgetEntity } from '../entities'

@Injectable()
export class WidgetService {
  constructor(
    @InjectRepository(WidgetEntity)
    private readonly widgetEntity: Repository<WidgetEntity>
  ) {}

  async add() {}
}

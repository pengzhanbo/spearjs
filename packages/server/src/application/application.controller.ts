import { Body, Controller, Get, Post } from '@nestjs/common'
import { ApplicationService } from './application.service.js'
import { CreateApplicationDto } from './dto/index.js'

@Controller('/application')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}
  @Get()
  list() {}

  @Post('/add')
  async add(@Body() appDto: CreateApplicationDto) {
    const app = await this.applicationService.create(appDto)
    return { appId: app.appId }
  }
}

import { Controller, Get, Post } from '@nestjs/common'

@Controller('/application')
export class ApplicationController {
  @Get()
  list() {}

  @Post()
  add() {}
}

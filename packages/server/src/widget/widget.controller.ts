import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { UpdateWidgetDto } from './dto'
import { WidgetService } from './widget.service'

@Controller('/widget')
export class WidgetController {
  constructor(private readonly widgetService: WidgetService) {}

  @Post('/upload')
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile() file: Express.Multer.File, @Body() body: UpdateWidgetDto) {
    console.log(file)
    console.log(body)
    return {}
  }
}

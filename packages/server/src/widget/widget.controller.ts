import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  ParseIntPipe,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { UploadWidgetDto } from './dto/index.js'
import { WidgetService } from './widget.service.js'

@Controller('/widget')
export class WidgetController {
  constructor(private readonly widgetService: WidgetService) {}

  @Post('/publish')
  @UseInterceptors(FileInterceptor('file'))
  async publish(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: UploadWidgetDto,
  ) {
    const asserts = await this.widgetService.uploadFile(file, body)
    await this.widgetService.updateWidget(body, asserts)
    return {}
  }

  @Get('/list')
  @UseInterceptors(ClassSerializerInterceptor)
  async list(
    @Query('page', ParseIntPipe) page: number,
    @Query('pageSize', ParseIntPipe) pageSize: number,
    @Query('type') type: string,
    @Query('componentType') componentType: string,
  ) {
    return await this.widgetService.getWidgetList(
      page,
      pageSize,
      type,
      componentType,
    )
  }
}

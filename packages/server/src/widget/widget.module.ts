import * as path from 'node:path'
import { Module } from '@nestjs/common'
import { MulterModule } from '@nestjs/platform-express'
import { TypeOrmModule } from '@nestjs/typeorm'
import { diskStorage } from 'multer'
import { WidgetEntity, WidgetHistoryEntity } from '../entities/index.js'
import { WidgetController } from './widget.controller.js'
import { WidgetService } from './widget.service.js'

@Module({
  imports: [
    TypeOrmModule.forFeature([WidgetEntity, WidgetHistoryEntity]),
    MulterModule.register({
      storage: diskStorage({
        destination: path.join(process.cwd(), 'upload'),
        filename: (req, file, cb) => {
          return cb(null, file.originalname)
        },
      }),
    }),
  ],
  controllers: [WidgetController],
  providers: [WidgetService],
})
export class WidgetModule {}

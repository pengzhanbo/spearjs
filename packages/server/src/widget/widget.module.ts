import * as path from 'path'
import { Module } from '@nestjs/common'
import { MulterModule } from '@nestjs/platform-express'
import { TypeOrmModule } from '@nestjs/typeorm'
import { diskStorage } from 'multer'
import { WidgetEntity, WidgetHistoryEntity } from '../entities'
import { WidgetController } from './widget.controller'
import { WidgetService } from './widget.service'

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

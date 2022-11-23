import path from 'path'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { ServeStaticModule } from '@nestjs/serve-static'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ApplicationModule } from './application/application.module.js'
import AppConfig from './config/index.js'
import { WidgetModule } from './widget/widget.module.js'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.local', '.env'],
      load: [AppConfig],
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: path.join(process.cwd(), 'static'),
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const database = config.get('database')
        return {
          ...database,
          port: config.get('MYSQL_PORT'),
          database: config.get('MYSQL_DATABASE'),
          host: config.get('MYSQL_HOST'),
          username: config.get('MYSQL_USERNAME'),
          password: config.get('MYSQL_PASSWORD'),
        }
      },
    }),
    ApplicationModule,
    WidgetModule,
  ],
})
export class AppModule {}

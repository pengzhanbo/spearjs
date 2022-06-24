import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller'
import { ApplicationModule } from './application/application.module'
import AppConfig from './config'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.local', '.env'],
      load: [AppConfig],
      isGlobal: true,
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
  ],
  controllers: [AppController],
})
export class AppModule {}

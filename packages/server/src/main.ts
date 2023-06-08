import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module.js'
import {
  useGlobalFilter,
  useGlobalInterceptor,
  useGlobalMiddleware,
  useGlobalPipe,
} from './shared/index.js'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // logger: ['warn', 'error'],
  })
  const config = app.get(ConfigService)

  // 注入全局中间件
  useGlobalMiddleware(app)
  // 注入全局拦截器
  useGlobalInterceptor(app)
  // 注入全局管道
  useGlobalPipe(app)
  // 注入全局过滤器
  useGlobalFilter(app)

  const port = config.get('SERVER_PORT') || 3000
  await app.listen(port)

  // eslint-disable-next-line no-console
  console.log(`Spearjs server is running on: http://localhost:${port}/`)
}

bootstrap()

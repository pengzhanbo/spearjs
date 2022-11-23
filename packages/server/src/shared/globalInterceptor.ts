import { INestApplication } from '@nestjs/common'
import { TransformResponseInterceptor } from './interceptors/index.js'

export const useGlobalInterceptor = (app: INestApplication) => {
  app.useGlobalInterceptors(new TransformResponseInterceptor())
}

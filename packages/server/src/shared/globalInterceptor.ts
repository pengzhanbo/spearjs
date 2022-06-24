import { INestApplication } from '@nestjs/common'
import { TransformResponseInterceptor } from './interceptors'

export const useGlobalInterceptor = (app: INestApplication) => {
  app.useGlobalInterceptors(new TransformResponseInterceptor())
}

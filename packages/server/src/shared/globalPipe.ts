import { INestApplication } from '@nestjs/common'
import { validation } from './pipes'

export const useGlobalPipe = (app: INestApplication) => {
  app.useGlobalPipes(validation())
}

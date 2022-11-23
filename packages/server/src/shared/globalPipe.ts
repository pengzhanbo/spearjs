import { INestApplication } from '@nestjs/common'
import { validation } from './pipes/index.js'

export const useGlobalPipe = (app: INestApplication) => {
  app.useGlobalPipes(validation())
}

import { ConsoleLogger, INestApplication } from '@nestjs/common'
import { GlobalExceptionFilter } from './filters/index.js'

export const useGlobalFilter = (app: INestApplication) => {
  app.useGlobalFilters(new GlobalExceptionFilter(new ConsoleLogger('global filter')))
}

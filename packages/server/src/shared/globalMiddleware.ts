import { INestApplication } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import cookieParser from 'cookie-parser'
// import * as csurf from 'csurf'
import helmet from 'helmet'

export const useGlobalMiddleware = (app: INestApplication) => {
  const config: ConfigService = app.get(ConfigService)
  app.use(helmet())

  // inject csurf
  app.enableCors()
  // app.use(csurf(config.get('csurf')))

  app.use(cookieParser(config.get('cookieSecret')))
}

import * as path from 'path'
import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { CookieOptions } from 'express'
interface ConfigOptions {
  database: TypeOrmModuleOptions
  token: {
    name: string
    options: CookieOptions
  }
  cookieSecret: string
  csurf: {
    cookie: boolean
    ignoreMethods: string[]
  }
}
export default (): ConfigOptions => {
  return {
    database: {
      type: 'mysql',
      entities: [path.resolve(__dirname, '../entities', '*.entity.{ts,js}')],
      synchronize: true,
    },
    cookieSecret: 'faa61cf511218fe7c693be7c2b57bb21',
    token: {
      name: 'spearjs_access_token',
      options: {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        domain: '',
        path: '/',
        // secure: true, // if user https ,use true
        httpOnly: false,
      },
    },
    csurf: {
      cookie: true,
      ignoreMethods: ['GET', 'HEAD', 'OPTIONS'],
    },
  }
}

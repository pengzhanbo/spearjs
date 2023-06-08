import * as path from 'node:path'
import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { CookieOptions } from 'express'
import { getDirname } from '../utils/index.js'

interface ConfigOptions {
  staticDir: string
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
    staticDir: path.join(process.cwd(), 'static'),
    database: {
      type: 'mysql',
      entities: [
        path.resolve(
          getDirname(import.meta.url),
          '../entities',
          '*.entity.{ts,js}',
        ),
      ],
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

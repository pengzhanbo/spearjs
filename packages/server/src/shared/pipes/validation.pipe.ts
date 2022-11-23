import { ValidationError, ValidationPipe } from '@nestjs/common'
import { FetchException } from '../exceptions/index.js'
import { httpCode } from '../httpCode.js'

export const validation = () =>
  new ValidationPipe({
    whitelist: true,
    transform: true,
    exceptionFactory: (errors: ValidationError[]) => {
      const error: ValidationError = errors[0]
      let code!: number
      let message!: string
      if (error.constraints) {
        for (const key of Object.keys(error.constraints)) {
          message = error.constraints[key]
          const contexts = (error as any).contexts
          if (contexts && typeof contexts[key] !== 'undefined' && contexts[key]) {
            code = contexts[key].code
          }
          break
        }
      } else {
        let children = errors[0].children
        while (children && children[0]) {
          if (children[0].constraints) {
            for (const key of Object.keys(children[0].constraints)) {
              message = children[0].constraints[key]
              const contexts = (children[0] as any).contexts
              if (
                contexts &&
                typeof contexts[key] !== 'undefined' &&
                contexts[key].code !== 'undefined'
              ) {
                code = contexts[key].code
              }
              break
            }
            break
          }
          children = children[0].children
        }
      }
      throw new FetchException({
        code: code || httpCode.paramsError.code,
        message: message || httpCode.paramsError.message,
      })
    },
  })

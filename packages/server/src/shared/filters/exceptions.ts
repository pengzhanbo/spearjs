import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  LoggerService,
} from '@nestjs/common'
import { FetchException } from '../exceptions/index.js'
import { httpCode } from '../httpCode.js'

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: LoggerService) {}

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse()
    // csrf 验证，原路返回
    if (exception.code === 'EBADCSRFTOKEN') {
      response.status(HttpStatus.FORBIDDEN).json({
        code: httpCode.forbidden.code,
        message: 'invalid csrf token',
      })
    } else if (exception.getStatus) {
      // 自定义错误
      const httpException: FetchException = exception as FetchException
      const httpResponse: any = httpException.getResponse()
      response.status(HttpStatus.OK).json({
        code: httpResponse.statusCode,
        message: httpResponse.message,
      })
    } else {
      // 未知错误
      this.logger.warn(exception)
      response.status(HttpStatus.OK).json({
        ...httpCode.error,
      })
    }
  }
}

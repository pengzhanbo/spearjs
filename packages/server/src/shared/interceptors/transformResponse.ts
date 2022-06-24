import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import { Request } from 'express'
import { map, Observable } from 'rxjs'
import { httpCode } from '../httpCode'

@Injectable()
export class TransformResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map(async (data: any) => {
        const req: Request = context.switchToHttp().getRequest()

        const path: string = req.route.path
        // 非 /api 进来的请求， 不走转换通道
        if (!path.includes('/api')) {
          return data
        }
        return {
          ...httpCode.success,
          data,
        }
      })
    )
  }
}

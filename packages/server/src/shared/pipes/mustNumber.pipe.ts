import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common'
import { FetchException } from '../exceptions/index.js'
import { httpCode } from '../httpCode.js'

@Injectable()
export class MustNumberPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type !== 'param' && metadata.type !== 'query') {
      return value
    }
    const val = Number(value)
    if (isNaN(val)) {
      throw new FetchException(httpCode.paramsError)
    }
    return val
  }
}

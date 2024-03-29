import { HttpException, HttpStatus } from '@nestjs/common'
import { HttpCode, httpCode } from '../httpCode.js'

export class FetchException extends HttpException {
  constructor(excData: HttpCode) {
    if (typeof excData.code === 'undefined') {
      excData.code = httpCode.error.code
    }
    super(excData, HttpStatus.OK)
  }
}

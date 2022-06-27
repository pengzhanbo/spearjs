import { IsString, MaxLength } from 'class-validator'
import { httpCode } from '../../shared'

export class CreateApplicationDto {
  @MaxLength(50, {
    message: '应用名称长度不能超过25',
    context: { code: httpCode.paramsError.code },
  })
  @IsString()
  name!: string
}

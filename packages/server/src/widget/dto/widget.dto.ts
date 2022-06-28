import { IsNumberString, IsString } from 'class-validator'

export class WidgetDto {
  @IsString()
  widgetId!: string

  @IsString()
  name!: string

  @IsString()
  type!: string

  @IsString()
  componentType!: string

  @IsString()
  componentSubType!: string

  @IsString()
  platform!: string

  @IsString()
  version!: string

  @IsNumberString()
  latest!: number
}

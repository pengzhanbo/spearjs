import { IsString } from 'class-validator'
export class UpdateWidgetDto {
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
}

import { IsString } from 'class-validator'
import { WidgetDto } from './widget.dto'

export class UploadWidgetDto extends WidgetDto {
  @IsString()
  editorAssert!: string

  @IsString()
  renderAssert!: string
}

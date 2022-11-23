import { IsString } from 'class-validator'
import { WidgetDto } from './widget.dto.js'

export class UploadWidgetDto extends WidgetDto {
  @IsString()
  editorAssert!: string

  @IsString()
  renderAssert!: string
}

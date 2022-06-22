import { ElIcon, ElTooltip } from 'element-plus'
import { InfoIcon } from '../Icons'

export const tips = (tips?: string) => {
  return tips ? (
    <ElTooltip placement="bottom">
      {{
        default: () => (
          <ElIcon class="mx-2 text-blue-500 text-base">
            <InfoIcon></InfoIcon>
          </ElIcon>
        ),
        content: () => (
          <p class="text-sm" style={{ maxWidth: '320px' }}>
            {tips}
          </p>
        ),
      }}
    </ElTooltip>
  ) : null
}

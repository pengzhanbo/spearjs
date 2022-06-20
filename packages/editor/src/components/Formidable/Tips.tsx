import { InfoFilled } from '@element-plus/icons-vue'
import { ElIcon, ElTooltip } from 'element-plus'

export const tips = (tips?: string) => {
  return tips ? (
    <ElTooltip placement="bottom">
      {{
        default: () => (
          <ElIcon class="mx-2">
            <InfoFilled></InfoFilled>
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

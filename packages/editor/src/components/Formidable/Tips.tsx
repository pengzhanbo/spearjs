import { InfoFilled } from '@element-plus/icons-vue'
import { ElIcon, ElTooltip } from 'element-plus'

export const tips = (tips?: string) => {
  return tips ? (
    <ElTooltip content={tips} placement="bottom">
      <ElIcon class="el-icon__right ml-2">
        <InfoFilled></InfoFilled>
      </ElIcon>
    </ElTooltip>
  ) : null
}

import { ElTooltip, ElIcon } from 'element-plus'
import { InfoFilled } from '@element-plus/icons-vue'

export const tips = (tips?: string) => {
  return tips ? (
    <ElTooltip content={tips} placement="bottom">
      <ElIcon class="el-icon__right ml-2">
        <InfoFilled></InfoFilled>
      </ElIcon>
    </ElTooltip>
  ) : null
}

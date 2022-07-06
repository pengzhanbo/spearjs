import { preExposeList } from '@editor/common'
import { AddIcon, CloseIcon, EditIcon } from '@editor/components/Icons'
import type { AppBlock, AppBlockAction } from '@editor/services'
import { findBlockByBid, findWidget } from '@editor/services'
import { useAppPagesStore } from '@editor/stores'
import type { WidgetAction } from '@spearjs/shared'
import { ElButton } from 'element-plus'
import type { PropType } from 'vue'
import { computed, defineComponent } from 'vue'

export default defineComponent({
  name: 'ActionConfigItem',
  props: {
    action: {
      type: Object as PropType<WidgetAction>,
      required: true,
    },
    block: {
      type: Object as PropType<AppBlock>,
      required: true,
    },
  },
  emits: ['edit', 'delete', 'add'],
  setup: (props, { emit }) => {
    const pageStore = useAppPagesStore()
    const handlerList = computed(() => {
      const handlerList: AppBlockAction[] = props.block.actions[props.action.action]
      return handlerList.map((handler) => {
        if (handler.type === 'block') {
          const block =
            props.block.bid === handler.bid
              ? props.block
              : (findBlockByBid(pageStore.currentPage.blocks, handler.bid!) as AppBlock)
          const widget = findWidget(block.component.id, block.component.version)
          const widgetAction = [...preExposeList, ...(widget.expose || [])].find(
            (item) => item.name === handler.name
          )
          return {
            handler,
            component: `关联组件：${block.label} (${block.bid})`,
            expose: `执行方法：${widgetAction?.label || ''}`,
          }
        } else {
          return {
            handler,
            message: '',
          }
        }
      })
    })

    return () => (
      <>
        {handlerList.value.map(({ handler, component, expose }, index) => (
          <div class="flex justify-between items-center mx-2 px-2 py-1 border-b">
            <div>
              <p>{component}</p>
              <p>{expose}</p>
            </div>
            <p class="ml-5">
              <ElButton
                icon={EditIcon}
                type="primary"
                size="small"
                circle
                onClick={() => emit('edit', props.action.action, handler, index)}
              />
              <ElButton
                icon={CloseIcon}
                type="danger"
                size="small"
                circle
                onClick={() => emit('delete', props.action.action, index)}
              />
            </p>
          </div>
        ))}
        <div class="text-right mt-5">
          <ElButton type="primary" icon={AddIcon} onClick={() => emit('add', props.action.action)}>
            新增动作响应
          </ElButton>
        </div>
      </>
    )
  },
})

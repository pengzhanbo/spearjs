import { actionTypeList, preExposeList } from '@editor/common'
import { InfoIcon } from '@editor/components/Icons'
import { findBlockByBid, findWidget } from '@editor/services'
import { useAppPagesStore } from '@editor/stores'
import type { AppBlock, AppBlockAction } from '@spearjs/core'
import type { WidgetAction, WidgetActions } from '@spearjs/shared'
import {
  ElButton,
  ElCollapse,
  ElCollapseItem,
  ElDialog,
  ElForm,
  ElFormItem,
  ElIcon,
  ElMessageBox,
  ElOption,
  ElSelect,
  ElTooltip,
} from 'element-plus'
import cloneDeep from 'lodash-es/cloneDeep'
import type { FunctionalComponent } from 'vue'
import { computed, defineComponent, ref, watch } from 'vue'
import BlockSelector from '../BlockSelector'
import { BlockHeader } from '../ConfigHeader'
import ActionItem from './ActionItem'

const ActionTitle: FunctionalComponent<{ action: WidgetAction; index: number }> = ({
  action,
  index,
}) => {
  return (
    <h4 class="flex items-center font-bold">
      <span class="mr-3">动作{index + 1}:</span>
      <span>{action.label}</span>
      {action.tips ? (
        <ElTooltip content={action.tips}>
          <ElIcon class="text-blue-400 ml-4 text-base">
            <InfoIcon />
          </ElIcon>
        </ElTooltip>
      ) : null}
    </h4>
  )
}

export default defineComponent({
  name: 'ActionsConfig',
  setup: () => {
    const pageStore = useAppPagesStore()

    const block = computed(() => {
      const block = pageStore.focusBlock
      if (block) {
        if (block.type === 'block') {
          return block
        }
      }
      return null
    })

    const widget = computed(() => {
      const widget = block.value?.widget
      if (widget) {
        return findWidget(widget.id, widget.version)
      }
      return null
    })

    const actionList = computed(() => {
      return widget.value && widget.value.actions ? widget.value.actions : ([] as WidgetActions)
    })
    const collapse = ref('')
    watch(
      () => actionList.value,
      (list) => {
        collapse.value = list[0]?.action
      },
      { immediate: true }
    )

    const showDialog = ref(false)
    const dialogType = ref<'add' | 'edit'>('add')
    const dialogTitle = computed(() => {
      return dialogType.value === 'add' ? '新增动作响应' : '修改动作响应'
    })
    const currentActionName = ref('')
    const currentIndex = ref(0)

    const actionHandler = ref<AppBlockAction>({
      bid: '',
      type: 'block',
      name: '',
      mapping: [],
    })

    watch(
      () => actionHandler.value.type,
      (type) => {
        if (type === 'global') {
          actionHandler.value.bid = ''
        }
      }
    )

    const exposeList = computed(() => {
      if (actionHandler.value.type === 'block' && actionHandler.value.bid) {
        const curBlock = findBlockByBid(
          pageStore.currentPage.blocks,
          actionHandler.value.bid
        ) as AppBlock
        const curWidget = findWidget(curBlock.widget.id, curBlock.widget.version)
        return [...preExposeList, ...(curWidget.expose || [])].filter((expose) => {
          if (curBlock.bid === block.value?.bid) {
            return expose.type === 'method'
          } else {
            return expose.type === 'method' && expose.global
          }
        })
      } else {
        return []
      }
    })

    const onAddActionHandler = (name: string) => {
      dialogType.value = 'add'
      showDialog.value = true
      currentActionName.value = name
      actionHandler.value = {
        bid: '',
        type: 'block',
        name: '',
        mapping: [],
      }
    }

    const onEditActionHandler = (name: string, handler: AppBlockAction, index: number) => {
      dialogType.value = 'edit'
      showDialog.value = true
      actionHandler.value = cloneDeep(handler)
      currentActionName.value = name
      currentIndex.value = index
    }

    const onDeleteActionHandler = async (actionName: string, index: number) => {
      await ElMessageBox.confirm('是否删除当前动作响应？', '提示')
      pageStore.deleteFocusBlockAction(actionName, index)
    }

    const onCancel = () => {
      showDialog.value = false
    }

    const onSubmit = () => {
      const handler = actionHandler.value
      if (handler.type === 'block') {
        if (!handler.name || !handler.bid) {
          return
        }
        dialogType.value === 'add'
          ? pageStore.addFocusBlockAction(currentActionName.value, handler)
          : pageStore.updateFocusBlockAction(currentActionName.value, handler, currentIndex.value)
      }
      showDialog.value = false
    }

    const DialogFooter: FunctionalComponent = () => (
      <div class="text-right">
        <ElButton class="mr-5" onClick={onCancel}>
          取消
        </ElButton>
        <ElButton type="primary" onClick={onSubmit}>
          {dialogType.value === 'add' ? '新增' : '更新'}
        </ElButton>
      </div>
    )

    const DialogBody: FunctionalComponent = () => (
      <ElForm labelPosition="right" labelWidth="auto" labelSuffix=":">
        <ElFormItem label="动作类型">
          <ElSelect v-model={actionHandler.value.type}>
            {actionTypeList.map((item) => (
              <ElOption {...item} />
            ))}
          </ElSelect>
        </ElFormItem>
        <ElFormItem label="组件" v-show={actionHandler.value.type === 'block'}>
          <BlockSelector v-model={actionHandler.value.bid!} block={block.value!} />
        </ElFormItem>
        <ElFormItem label="执行方法" v-show={actionHandler.value.bid}>
          <ElSelect v-model={actionHandler.value.name}>
            {exposeList.value.map((item) => (
              <ElOption label={item.label} value={item.name} />
            ))}
          </ElSelect>
        </ElFormItem>
      </ElForm>
    )

    return () =>
      block.value && widget.value ? (
        <>
          <BlockHeader block={block.value} />
          <ElCollapse accordion class="border-none" v-model={collapse.value}>
            {actionList.value.map((action, index) => (
              <ElCollapseItem name={action.action} key={action.action}>
                {{
                  title: () => <ActionTitle action={action} index={index} />,
                  default: () => (
                    <ActionItem
                      action={action}
                      block={block.value!}
                      onAdd={onAddActionHandler}
                      onEdit={onEditActionHandler}
                      onDelete={onDeleteActionHandler}
                    />
                  ),
                }}
              </ElCollapseItem>
            ))}
          </ElCollapse>
          <ElDialog
            v-model={showDialog.value}
            modelValue={showDialog.value}
            title={dialogTitle.value}
            appendToBody
          >
            {{
              footer: () => <DialogFooter />,
              default: () => <DialogBody />,
            }}
          </ElDialog>
        </>
      ) : null
  },
})

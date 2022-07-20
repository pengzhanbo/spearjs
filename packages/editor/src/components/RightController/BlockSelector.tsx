import { useAppPagesStore } from '@editor/stores'
import type { AppBlock, AppBlocks } from '@spearjs/core'
import { useVModel } from '@vueuse/core'
import { ElOption, ElOptionGroup, ElSelect } from 'element-plus'
import type { PropType } from 'vue'
import { computed, defineComponent } from 'vue'

interface SelectItem {
  label: string
  value: string
  children?: SelectItem[]
}

interface SelectGroup {
  label: string
  children: SelectItem[]
}

type SelectOptions = (SelectItem | SelectGroup)[]

export default defineComponent({
  name: 'WidgetCascader',
  props: {
    block: {
      type: Object as PropType<AppBlock>,
      required: true,
    },
    modelValue: {
      type: String,
      default: '',
    },
  },
  setup: (props, { emit }) => {
    const pageStore = useAppPagesStore()
    const currentBid = useVModel(props, 'modelValue', emit)

    const getSelectOptions = (blocks: AppBlocks, res: SelectOptions = []) => {
      blocks.forEach((block) => {
        if (block.type === 'group') {
          res.push({
            label: block.label,
            children: getSelectOptions(block.blocks),
          } as SelectGroup)
        } else {
          const item: SelectItem = { label: block.label, value: block.bid }
          const slotBlockList: SelectGroup[] = []
          if (block.slots) {
            Object.keys(block.slots).forEach((name) => {
              block.slots[name].length &&
                slotBlockList.push({
                  label: 'slot:' + name,
                  children: getSelectOptions(block.slots[name]),
                } as SelectGroup)
            })
          }
          if (block.bid === props.block.bid) {
            item.label += '(当前)'
            res.unshift(item, ...slotBlockList)
          } else {
            res.push(item, ...slotBlockList)
          }
        }
      })
      return res
    }

    const selectOptions = computed<SelectOptions>(() =>
      getSelectOptions(pageStore.currentPage.blocks)
    )

    return () => (
      <ElSelect v-model={currentBid.value} clearable filterable>
        {selectOptions.value.map((option) => {
          if ((option as SelectGroup).children) {
            return (
              <ElOptionGroup key={option.label} label={option.label}>
                {(option as SelectGroup).children.map((opt) => (
                  <ElOption key={opt.value} label={opt.label} value={opt.value} />
                ))}
              </ElOptionGroup>
            )
          } else {
            option = option as SelectItem
            return <ElOption key={option.value} label={option.label} value={option.value} />
          }
        })}
      </ElSelect>
    )
  },
})

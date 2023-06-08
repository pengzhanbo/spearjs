import { thirdLibList } from '@editor/common'
import type { WidgetProps } from '@spearjs/shared'

export default [
  {
    type: 'textView',
    label: 'appId',
    key: 'appId',
  },
  {
    type: 'text',
    key: 'name',
    label: '应用名称',
    maxLength: 25,
    placeholder: '请输入应用名称',
  },
  {
    type: 'textView',
    key: 'platform',
    label: '归属平台',
    tips: '一般指定为 PC客户端或者 mobile移动端。应用在创建时设置，之后不能被修改。',
  },
  {
    type: 'select',
    key: 'layout.width',
    label: '内容宽度',
    showProp: ({ platform }) => platform === 'pc',
    defaultValue: '100%',
    options: [
      { label: '100%', value: '100%' },
      { label: '1200px', value: '1200px' },
      { label: '1000px', value: '1000px' },
      { label: '860px', value: '860px' },
    ],
    placeholder: '选择或输入内容宽度',
    allowCreate: true,
    filterable: true,
    tips: '指定页面的内容宽度，一般使用百分比，或者px单位',
  },
  {
    type: 'switch',
    key: 'layout.center',
    label: '内容居中',
    defaultValue: true,
    showProp: ({ platform }) => platform === 'pc',
  },
  {
    type: 'select',
    key: 'dependence',
    label: 'UI框架',
    defaultValue: '',
    options: (props) => {
      const list = [{ label: '不使用UI框架', value: '' }]
      list.push(
        ...thirdLibList
          .filter((lib) => lib.platform === props.platform)
          .map(({ name }) => ({
            label: name,
            value: name,
          })),
      )
      return list
    },
  },
  {
    type: 'text',
    key: 'description',
    textarea: true,
    label: '应用描述',
    placeholder: '请输入应用描述',
    autosize: { minRows: 3, maxRows: 6 },
  },
  {
    type: 'group',
    label: '主题定制',
    spread: false,
    props: [
      {
        type: 'color',
        key: 'themeConfig.CssVars.--app-c-bg',
        label: '背景色',
        colorFormat: 'rgb',
        showAlpha: true,
        predefine: ['#f3f4f6', '#fff', '#f2f2f2'],
      },
      {
        type: 'color',
        key: 'themeConfig.CssVars.--app-c-brand',
        label: '主题色',
        colorFormat: 'rgb',
        showAlpha: true,
      },
    ],
  },
  {
    type: 'group',
    label: '应用扩展',
    spread: false,
    props: [],
  },
] as WidgetProps

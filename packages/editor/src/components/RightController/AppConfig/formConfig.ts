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
    type: 'radio',
    key: 'platform',
    label: '归属平台',
    button: true,
    defaultValue: 'PC',
    options: ['PC', 'mobile'],
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
          }))
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

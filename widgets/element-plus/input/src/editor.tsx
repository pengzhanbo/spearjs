import { defineEditorConfig } from '@spearjs/shared'
import { ElInput } from 'element-plus'

export default defineEditorConfig({
  preview() {
    return <ElInput placeholder="输入框" />
  },
  description() {
    return (
      <div>
        <p>Element-Plus 输入框。</p>
      </div>
    )
  },
  layer: {
    display: 'inline-block',
  },
  expose: [
    {
      label: '绑定值',
      name: 'inputValue',
      type: 'prop',
      global: true,
    },
  ],
  actions: [
    {
      label: 'change事件',
      action: 'change',
    },
    {
      label: 'input事件',
      action: 'input',
    },
    {
      label: 'focus事件',
      action: 'focus',
    },
    {
      label: 'blur事件',
      action: 'blur',
    },
    {
      label: '清空事件',
      action: 'clear',
      tips: '点击清除按钮，清空输入框内容时触发',
    },
  ],
  props: [
    {
      type: 'select',
      key: 'type',
      label: '类型',
      defaultValue: 'text',
      options: [
        { label: '单行输入框', value: 'text' },
        { label: '多行输入框', value: 'textarea' },
      ],
    },
    {
      type: 'text',
      key: 'label',
      label: '标签文本',
      defaultValue: '',
    },
    {
      type: 'text',
      key: 'placeholder',
      label: '占位文本',
      defaultValue: '请输入内容',
    },
    {
      type: 'select',
      key: 'size',
      label: '大小',
      options: [
        { label: '默认', value: '' },
        { label: '大号', value: 'large' },
        { label: '小号', value: 'small' },
      ],
    },
    {
      type: 'switch',
      key: 'clearable',
      label: '是否可清空',
      defaultValue: false,
    },
    {
      type: 'number',
      key: 'rows',
      label: '行数',
      showProp: (props) => props.type === 'textarea',
      defaultValue: 2,
      min: 1,
    },
    {
      type: 'switch',
      key: 'autosize',
      label: '自适应行数',
      showProp: (props) => props.type === 'textarea',
      defaultValue: false,
    },
    {
      type: 'number',
      key: 'maxlength',
      label: '最大长度',
      min: 0,
    },
    {
      type: 'number',
      key: 'minlength',
      label: '最小长度',
      min: 0,
    },
  ],
})

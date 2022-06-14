export const jsonSchema = [
  {
    key: 'name',
    type: 'text',
    defaultValue: '',
    maxLength: 10,
    description: '',
    validator: '', // (name) => boolean || RegExp
  },
  {
    key: 'age',
    type: 'number',
    defaultValue: 18,
    min: 0,
    max: 100,
  },
  {
    key: 'sex',
    type: 'select',
    defaultValue: 1,
    multiple: false,
    options: [
      { label: '男', value: 1 },
      { label: '女', value: 0 },
    ],
  },
  {
    key: '是否已婚',
    type: 'switch',
    defaultValue: true,
    options: { truly: 1, falsely: 0 },
  },
  {
    key: '颜色',
    type: 'color',
    defaultValue: '#000',
    format: 'hex|rgb', // 颜色格式
  },
  {
    key: '日期',
    type: 'date',
    defaultValue: new Date(),
  },
  {
    type: 'group',
    label: '',
    props: [], // 支持进一步的分组
  },
  {
    key: 'obj',
    type: 'object',
    props: [],
  },
  {
    key: 'arr',
    type: 'array',
    items: {
      type: '',
    },
  },
]

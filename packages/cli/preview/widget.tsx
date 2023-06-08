// import description from 'spearjs/widget/description'
// import preview from 'spearjs/widget/editor'
// import render from 'spearjs/widget/render'
// import widgetConfig from 'spearjs/widget/config'
// import type { WidgetMapItem } from '@spearjs/shared'

// export default {
//   ...widgetConfig,
//   description,
//   preview,
//   ...render,
// } as WidgetMapItem
export default {
  id: 'widgetDemo',
  name: 'WidgetDemo',
  version: '1.0.0',
  type: 'component',
  componentType: 'basis',
  componentSubType: '',
  props: [
    {
      name: 'message',
      form: {
        type: 'input',
        defaultValue: 'demo',
      },
    },
  ],
  description: () => {
    return <p>详情描述</p>
  },
  preview: () => {
    return <p>Widget Demo Preview</p>
  },
  enhance: () => {
    // do
  },
  setup: () => {
    return {
      message2: 333,
    }
  },
  render: ({ props }: any) => {
    return (
      <p>
        Widget Demo Render message: {props.message}, message2: {props.message2}
      </p>
    )
  },
}

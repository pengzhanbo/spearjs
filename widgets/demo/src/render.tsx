export default {
  enhance({ app, router }) {
    console.log(app, router)
  },
  setup() {
    console.log('setup')
  },
  render: ({ props, styles }) => {
    return (
      <button {...props} {...styles}>
        {props.text}
      </button>
    )
  },
  // 如果是提供一个服务
  services: [
    {
      name: 'demo',
      type: 'global',
      fn: ({ router, app, services }) => {
        return () => {
          console.log(router, app, services)
        }
      },
    },
  ],
}

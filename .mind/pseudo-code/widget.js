const componentWidget = {
  id: '',
  name: '',
  version: '',
  type: 'component',
  componentType: 'basis',
  componentSubType: '',
  props: [],
  styles: [],
  actions: [],
  enhance() {},
  setup() {},
  preview() {},
  render() {},
}

const serviceWidget = {
  id: '',
  name: '',
  version: '',
  type: 'service',
  enhance() {},
  services: [
    {
      name: '{name}',
      type: 'global',
      fn({ app, router }) {
        return () => {}
      },
      paramModel: [],
      returnModel: [],
    },
  ],
}

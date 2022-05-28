export const createPage = ({ title = '新页面', path = '/' } = {}) => ({
  title,
  path,
  blocks: [],
})

export const defaultApplicationConfig = {
  pages: {
    '/': createPage(),
  },
  models: [],
}

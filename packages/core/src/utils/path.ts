export const normalizePath = (cwd: string, relative: string) => {
  return `/${cwd}/${relative}`.replace(/\/+/g, '/').replace(/\/+$/, '')
}

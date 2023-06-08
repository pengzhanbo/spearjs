/**
 * pathMath 主要是为了处理 路由中，
 * 例如： 当使用了 /:pathMath(.*)* 做动态匹配时，
 * 从params.pathMath 获取值
 * 目的是为了获取 匹配路径
 * 在 params中获取到的结果为一个 数据，需要重新将其解析为一个完整的路径字符串
 * ['list'] -> /list ； ['list', 'subList'] -> /list/subList
 * 并且需要实现两者之间的相互转换
 */
import { isArray } from '@spearjs/shared'

export const parsePathMath = (pathMath: string | string[]): string => {
  return isArray(pathMath)
    ? `/${pathMath.join('/')}`
    : pathMath
    ? `/${pathMath}`
    : ''
}

export const toPathMath = (pathMath = ''): string[] => {
  return pathMath.trim().replace(/^\/+/, '').split('/')
}

/**
 * Loader 主要用于加载 lib资源、 widget 资源，
 * 一个 lib/widget 资源会同时包含 js、css 资源
 * 通过传入一个 资源配置，调用 load 方法进行加载
 * 且对已加载过的资源进行缓存
 * 并提供卸载资源的 unload 方法
 *
 * 这里加载的资源默认是被作为 iife 打包的资源，需要根据具体lib、widget
 * 从全局或者其他地方获取 资源实例
 */
import { isArray } from '@spearjs/shared'
import { scriptLoader, styleSheetLoader } from './loadAssert'

export interface AssetsOptions {
  name?: string
  js?: string | string[]
  css?: string | string[]
}

export class Loader {
  private jsCache: Record<string, HTMLScriptElement> = {}
  private cssCache: Record<string, HTMLLinkElement> = {}

  async jsLoader(url: string, name?: string): Promise<void> {
    if (this.jsCache[url]) return Promise.resolve()
    const [script, loader] = scriptLoader(url, name)
    this.jsCache[url] = script
    return await loader()
  }

  async cssLoader(url: string, name?: string): Promise<void> {
    if (this.cssCache[url]) return Promise.resolve()
    const [css, loader] = styleSheetLoader(url, name)
    this.cssCache[url] = css
    return await loader()
  }

  async load({ name, js, css }: AssetsOptions): Promise<void> {
    const promise: Promise<void>[] = []
    if (js) {
      const jsList = isArray(js) ? js : [js]
      jsList.forEach((js) => promise.push(this.jsLoader(js, name)))
    }
    if (css) {
      const cssList = isArray(css) ? css : [css]
      cssList.forEach((css) => promise.push(this.cssLoader(css, name)))
    }
    await Promise.all(promise)
  }

  unload({ js, css }: AssetsOptions): void {
    if (js) {
      const jsList = isArray(js) ? js : [js]
      jsList.forEach((js) => {
        const el = this.jsCache[js]
        el && el.parentNode?.removeChild(el)
      })
    }
    if (css) {
      const cssList = isArray(css) ? css : [css]
      cssList.forEach((css) => {
        const el = this.cssCache[css]
        el && el.parentNode?.removeChild(el)
      })
    }
  }
}

export const loader = new Loader()

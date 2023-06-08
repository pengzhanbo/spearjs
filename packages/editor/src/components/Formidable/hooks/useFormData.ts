/**
 * 在一个支持无限层级的 Form 结构中
 * 比较理想的方式是使用 provide/inject 来将 formData注入到各个item中
 * 然后使用 dotKey 的方式来进行读写
 */
import type { InjectionKey, Ref, WritableComputedRef } from 'vue'
import { inject, provide } from 'vue'

export type FormData =
  | Ref<Record<string, any>>
  | WritableComputedRef<Record<string, any>>

export type FormInjectKey = InjectionKey<FormData>

export const useFormDataProvide = (formData: FormData): FormInjectKey => {
  const key: FormInjectKey = Symbol('formData')
  provide(key, formData)

  return key
}

export const useFormData = (key: FormInjectKey): FormData =>
  inject<FormData>(key)!

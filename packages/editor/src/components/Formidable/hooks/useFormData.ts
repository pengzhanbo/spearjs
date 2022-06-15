import { provide, inject, Ref, WritableComputedRef, InjectionKey } from 'vue'

export type FormData = Ref<Record<string, any>> | WritableComputedRef<Record<string, any>>

export type FormInjectKey = InjectionKey<FormData>

export const useFormDataProvide = (formData: FormData): FormInjectKey => {
  const key: FormInjectKey = Symbol('formData')
  provide(key, formData)

  return key
}

export const useFormData = (key: FormInjectKey): FormData => inject<FormData>(key)!

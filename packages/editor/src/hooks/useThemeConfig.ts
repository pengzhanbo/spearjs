import { useAppConfigStore } from '@editor/stores'
import { useStyleTag } from '@vueuse/core'
import { watch } from 'vue'

export const useThemeConfig = () => {
  const { css, load, unload } = useStyleTag('')
  const appConfig = useAppConfigStore()

  watch(
    () => appConfig.themeConfig,
    (themeConfig) => {
      const ruleList: string[] = []
      const { CssVars } = themeConfig
      ruleList.push(':root {')
      Object.keys(CssVars).forEach((key) => {
        const value = CssVars[key]
        value && ruleList.push(`  ${key}: ${value};`)
      })
      ruleList.push('}')

      css.value = ruleList.join('')
    },
    { immediate: true, deep: true },
  )

  return { load, unload }
}

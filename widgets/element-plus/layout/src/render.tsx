import { defineRenderConfig } from '@spearjs/shared'
import { ElAside, ElContainer, ElFooter, ElHeader, ElMain } from 'element-plus'
import type { CSSProperties } from 'vue'
import { computed } from 'vue'

interface Props {
  header: boolean
  aside: boolean
  footer: boolean
  headerConfig: {
    height: number
    bgColor: string
    fixed: boolean
    marginBottom: number
  }
  asideConfig: {
    width: number
    bgColor: string
    fixed: boolean
    height: 'auto' | 'fill'
  }
  mainConfig: {
    bgColor: string
    marginLeft: number
    paddingY: number
    paddingX: number
    height: 'auto' | 'fill'
  }
  footerConfig: {
    height: number
    bgColor: string
    fixed: boolean
    marginTop: number
  }
}

export default defineRenderConfig<Props>({
  setup: (props) => {
    const headerStyle = computed<CSSProperties>(() => {
      const headerConfig = props.headerConfig
      const style: CSSProperties = {}
      style.height = `${headerConfig.height}px`
      style.backgroundColor = headerConfig.bgColor
      if (headerConfig.fixed) {
        style.position = 'fixed'
        style.top = 0
        style.left = 0
        style.width = '100%'
      } else {
        style.marginBottom = `${headerConfig.marginBottom}px`
      }
      return style
    })

    const containerStyle = computed<CSSProperties>(() => {
      const headerConfig = props.headerConfig
      const style: CSSProperties = {}
      if (headerConfig.fixed) {
        style.paddingTop = `${
          headerConfig.height + headerConfig.marginBottom
        }px`
      }
      return style
    })

    const asideStyle = computed<CSSProperties>(() => {
      const style: CSSProperties = {}
      style.width = `${props.asideConfig.width}px`
      style.backgroundColor = props.asideConfig.bgColor
      if (props.asideConfig.fixed) {
        const top = props.headerConfig.height + props.headerConfig.marginBottom
        style.position = 'fixed'
        style.left = 0
        style.top = `${top}px`
        style.maxHeight = `calc(100% - ${top}px)`
        style.overflowY = 'auto'
      }
      if (props.asideConfig.height === 'fill') {
        style.height = `calc(100% - ${top}px)`
        style.overflowY = 'auto'
      }
      return style
    })
    const mainStyle = computed<CSSProperties>(() => {
      const style: CSSProperties = {}
      style.marginLeft = `${props.mainConfig.marginLeft}px`
      style.padding = `${props.mainConfig.paddingY || 0}px ${
        props.mainConfig.paddingX || 0
      }px`
      style.backgroundColor = props.mainConfig.bgColor
      const marginBottom = `${
        props.footerConfig.height + props.footerConfig.marginTop
      }px`
      if (props.footerConfig.fixed) {
        style.marginBottom = marginBottom
      }
      if (props.mainConfig.height === 'fill') {
        style.height = `calc(100% - ${marginBottom})`
        style.overflowY = 'auto'
      }
      return style
    })
    const footerStyle = computed<CSSProperties>(() => {
      const style: CSSProperties = {}
      style.backgroundColor = props.footerConfig.bgColor
      style.height = `${props.footerConfig.height}px`
      if (props.footerConfig.fixed) {
        style.position = 'fixed'
        style.left = `${
          props.asideConfig.width + props.mainConfig.marginLeft
        }px`
        style.right = 0
        style.bottom = 0
      }
      return style
    })

    return { headerStyle, containerStyle, asideStyle, mainStyle, footerStyle }
  },
  render({ props, slots }) {
    return (
      <ElContainer>
        {props.header ? (
          <ElHeader style={this.headerStyle.value}>{slots.header?.()}</ElHeader>
        ) : null}
        <ElContainer style={this.containerStyle.value}>
          {props.aside ? (
            <ElAside style={this.asideStyle.value}>{slots.aside?.()}</ElAside>
          ) : null}
          <ElContainer>
            <ElMain style={this.mainStyle.value}>{slots.main?.()}</ElMain>
            {props.footer ? (
              <ElFooter style={this.footerStyle.value}>
                {slots.footer?.()}
              </ElFooter>
            ) : null}
          </ElContainer>
        </ElContainer>
      </ElContainer>
    )
  },
})
